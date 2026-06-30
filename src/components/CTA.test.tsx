import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import emailjs from '@emailjs/browser';
import CTA from './CTA';

vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn(),
  },
}));

describe('CTA notifications', () => {
  beforeEach(() => {
    vi.mocked(emailjs.send).mockResolvedValue({
      status: 200,
      text: 'OK',
    });
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(new Response(null, { status: 202 })))
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('keeps the email submission and sends the same application to the Kakao notification API', async () => {
    const user = userEvent.setup();

    render(<CTA />);

    await user.type(screen.getByPlaceholderText('홍길동'), '김담당');
    await user.type(screen.getByPlaceholderText('010-1234-5678'), '010-1111-2222');
    await user.type(screen.getByPlaceholderText('example@email.com'), 'apply@example.com');
    const [sidoSelect, experienceSelect] = screen.getAllByRole('combobox');
    if (sidoSelect === undefined || experienceSelect === undefined) {
      throw new Error('CTA form select controls were not rendered.');
    }

    await user.selectOptions(sidoSelect, '서울');
    await user.type(screen.getByPlaceholderText('예: 제주시 노형동, 서울 강남구'), '강남구');
    await user.selectOptions(experienceSelect, '처음이에요');
    await user.type(screen.getByPlaceholderText('자유롭게 적어주세요'), '주말반 가능한가요?');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: '우리 지역 팀 신청하기' }));

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        '/api/kakao-notify',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: '김담당',
            phone: '010-1111-2222',
            email: 'apply@example.com',
            sido: '서울',
            regionDetail: '강남구',
            experience: '처음이에요',
            question: '주말반 가능한가요?',
          }),
        })
      );
    });
    expect(screen.getByText('신청이 완료되었습니다!')).not.toBeNull();
  });
});
