import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HowItWorks from './HowItWorks';

describe('HowItWorks gallery', () => {
  it('opens a clicked thumbnail in a lightbox, advances, and closes with Escape', async () => {
    const user = userEvent.setup();

    render(<HowItWorks />);

    await user.click(screen.getByRole('button', { name: '스터디 현장 사진 2 크게 보기' }));

    const dialog = screen.getByRole('dialog', { name: '스터디 현장 사진 2' });
    const image = within(dialog).getByRole('img', { name: '스터디 현장 사진 2' });
    expect(image.getAttribute('src')).toBe('/img/study/study-02.jpeg');

    await user.click(within(dialog).getByRole('button', { name: '다음 사진' }));

    const nextImage = within(dialog).getByRole('img', { name: '스터디 현장 사진 3' });
    expect(nextImage.getAttribute('src')).toBe('/img/study/study-03.jpeg');

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });
});
