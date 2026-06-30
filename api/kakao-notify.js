const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
const KAKAO_MEMO_URL = 'https://kapi.kakao.com/v2/api/talk/memo/default/send';
const DEFAULT_SITE_URL = 'https://study-recruit-notice.vercel.app/';

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}

class KakaoApiError extends Error {
  constructor(message, responseText) {
    super(message);
    this.name = 'KakaoApiError';
    this.responseText = responseText;
  }
}

function readRequiredEnv(name) {
  const value = process.env[name];
  if (value === undefined || value.trim() === '') {
    throw new HttpError(500, `${name} is not configured.`);
  }

  return value;
}

function readStringField(body, fieldName) {
  const value = body[fieldName];
  if (typeof value !== 'string') {
    throw new HttpError(400, `${fieldName} is required.`);
  }

  return value.trim();
}

function parseBody(body) {
  if (typeof body === 'string') {
    return JSON.parse(body);
  }

  return body;
}

function parseApplication(body) {
  const parsedBody = parseBody(body);
  if (typeof parsedBody !== 'object' || parsedBody === null || Array.isArray(parsedBody)) {
    throw new HttpError(400, 'Invalid application payload.');
  }

  return {
    name: readStringField(parsedBody, 'name'),
    phone: readStringField(parsedBody, 'phone'),
    email: readStringField(parsedBody, 'email'),
    sido: readStringField(parsedBody, 'sido'),
    regionDetail: readStringField(parsedBody, 'regionDetail'),
    experience: readStringField(parsedBody, 'experience'),
    question: readStringField(parsedBody, 'question'),
  };
}

function buildTokenParams() {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: readRequiredEnv('KAKAO_REST_API_KEY'),
    refresh_token: readRequiredEnv('KAKAO_REFRESH_TOKEN'),
  });
  const clientSecret = process.env.KAKAO_CLIENT_SECRET;
  if (clientSecret !== undefined && clientSecret.trim() !== '') {
    params.set('client_secret', clientSecret);
  }

  return params;
}

async function readJson(response) {
  const text = await response.text();
  if (text.trim() === '') {
    return {};
  }

  return JSON.parse(text);
}

async function refreshAccessToken() {
  const response = await fetch(KAKAO_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: buildTokenParams(),
  });
  const responseBody = await readJson(response);
  if (!response.ok) {
    throw new KakaoApiError('Failed to refresh Kakao access token.', JSON.stringify(responseBody));
  }
  if (typeof responseBody.access_token !== 'string') {
    throw new KakaoApiError('Kakao token response did not include access_token.', JSON.stringify(responseBody));
  }

  return responseBody.access_token;
}

function buildMessage(application) {
  const email = application.email === '' ? '미입력' : application.email;
  const experience = application.experience === '' ? '미입력' : application.experience;
  const question = application.question === '' ? '없음' : application.question;

  return [
    '[스터디 신청 접수]',
    `이름: ${application.name}`,
    `연락처: ${application.phone}`,
    `이메일: ${email}`,
    `지역: ${application.sido} ${application.regionDetail}`,
    `경험: ${experience}`,
    `질문: ${question}`,
  ].join('\n');
}

async function sendKakaoMemo(accessToken, application) {
  const siteUrl = process.env.KAKAO_SITE_URL || DEFAULT_SITE_URL;
  const params = new URLSearchParams({
    template_object: JSON.stringify({
      object_type: 'text',
      text: buildMessage(application),
      link: {
        web_url: siteUrl,
        mobile_web_url: siteUrl,
      },
    }),
  });
  const response = await fetch(KAKAO_MEMO_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    body: params,
  });
  const responseBody = await readJson(response);
  if (!response.ok) {
    throw new KakaoApiError('Failed to send Kakao memo.', JSON.stringify(responseBody));
  }
}

function sendError(response, error) {
  if (error instanceof HttpError) {
    response.status(error.statusCode).json({ ok: false, message: error.message });
    return;
  }
  if (error instanceof KakaoApiError) {
    console.error(error.message, error.responseText);
    response.status(502).json({ ok: false, message: 'Kakao notification failed.' });
    return;
  }

  throw error;
}

export default async function handler(request, response) {
  response.setHeader('Allow', 'POST');
  if (request.method !== 'POST') {
    response.status(405).json({ ok: false, message: 'Method not allowed.' });
    return;
  }

  try {
    const application = parseApplication(request.body);
    const accessToken = await refreshAccessToken();
    await sendKakaoMemo(accessToken, application);
    response.status(202).json({ ok: true });
  } catch (error) {
    sendError(response, error);
  }
}
