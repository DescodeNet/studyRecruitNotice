import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import handler from './kakao-notify.js';

function createResponse() {
  return {
    statusCode: 200,
    headers: {},
    payload: undefined,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };
}

describe('kakao-notify API', () => {
  beforeEach(() => {
    vi.stubEnv('KAKAO_REST_API_KEY', 'rest-key');
    vi.stubEnv('KAKAO_REFRESH_TOKEN', 'refresh-token');
    vi.stubEnv('KAKAO_SITE_URL', 'https://study-recruit-notice.vercel.app/');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('refreshes a Kakao access token and sends the application memo', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: 'new-access-token' }), { status: 200 }))
        .mockResolvedValueOnce(new Response(JSON.stringify({ result_code: 0 }), { status: 200 }))
    );

    const response = createResponse();

    await handler(
      {
        method: 'POST',
        body: {
          name: '김담당',
          phone: '010-1111-2222',
          email: 'apply@example.com',
          referrer: '박소개',
          sido: '서울',
          regionDetail: '강남구',
          experience: '처음이에요',
          selfDiagnostic: ['유튜브로 경제 공부 시작했는데, 뭐가 맞는 말인지 모르겠다'],
          question: '주말반 가능한가요?',
        },
      },
      response
    );

    expect(response.statusCode).toBe(202);
    expect(response.payload).toEqual({ ok: true });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://kauth.kakao.com/oauth/token',
      expect.objectContaining({ method: 'POST' })
    );
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://kapi.kakao.com/v2/api/talk/memo/default/send',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ Authorization: 'Bearer new-access-token' }),
      })
    );
  });
});
