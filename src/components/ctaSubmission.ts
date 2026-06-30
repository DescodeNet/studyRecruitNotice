import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_ncti5e9';
const EMAILJS_TEMPLATE_ID = 'template_e1qs48p';
const EMAILJS_PUBLIC_KEY = 'bkVln7d1E5k2oO-eA';
const KAKAO_NOTIFY_ENDPOINT = '/api/kakao-notify';

export interface FormData {
  readonly name: string;
  readonly phone: string;
  readonly email?: string;
  readonly sido: string;
  readonly regionDetail: string;
  readonly experience?: string;
  readonly question?: string;
  readonly consent: boolean;
}

interface KakaoNotificationPayload {
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly sido: string;
  readonly regionDetail: string;
  readonly experience: string;
  readonly question: string;
}

class KakaoNotificationError extends Error {
  constructor(readonly status: number) {
    super(`Kakao notification failed with status ${status}.`);
    this.name = 'KakaoNotificationError';
  }
}

function toEmailTemplateParams(data: FormData) {
  return {
    from_name: data.name,
    phone: data.phone,
    email: data.email || '미입력',
    sido: data.sido,
    region_detail: data.regionDetail,
    experience: data.experience || '미입력',
    question: data.question || '없음',
  };
}

function toKakaoNotificationPayload(data: FormData): KakaoNotificationPayload {
  return {
    name: data.name,
    phone: data.phone,
    email: data.email || '',
    sido: data.sido,
    regionDetail: data.regionDetail,
    experience: data.experience || '',
    question: data.question || '',
  };
}

async function notifyKakao(data: FormData): Promise<void> {
  const response = await fetch(KAKAO_NOTIFY_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toKakaoNotificationPayload(data)),
  });

  if (!response.ok) {
    throw new KakaoNotificationError(response.status);
  }
}

export async function submitApplication(data: FormData): Promise<void> {
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    toEmailTemplateParams(data),
    EMAILJS_PUBLIC_KEY
  );

  try {
    await notifyKakao(data);
  } catch (error) {
    if (error instanceof Error) {
      console.warn('카카오톡 알림 전송 실패:', error.message);
      return;
    }

    throw error;
  }
}
