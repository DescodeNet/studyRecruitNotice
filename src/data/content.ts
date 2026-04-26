type IconKey = 'book' | 'users' | 'pencil' | 'map-pin' | 'calendar' | 'wallet' | 'message-circle';

export interface CurriculumTopic {
  text: string;
}

export interface CurriculumSublesson {
  title: string;
  topics: string[];
}

export interface CurriculumWeek {
  week: number;
  title: string;
  subtitle: string;
  topics?: string[];
  sublessons?: CurriculumSublesson[];
  tag?: string;
}

export interface RegionStep {
  title: string;
  description: string;
}

export interface InfoItem {
  label: string;
  value: string;
  subtext?: string | null;
  icon: IconKey;
}

export const SI_DO_OPTIONS = [
  '서울', '경기', '인천',
  '부산', '대구', '대전', '광주', '울산', '세종',
  '강원', '충북', '충남', '전북', '전남', '경북', '경남',
  '제주', '아직 지역 미정',
];

export const content = {
  hero: {
    headline: "기초부터 시작하는\n6강 완성 경제 스터디 모임",
    subheadline: "혼자서는 어렵던 경제 공부를\n같은 지역 사람들과 함께 시작합니다",
    badges: ["전국 12개 팀 운영", "5~10명 소수팀", "초반 3회 무료"],
    cta: "우리 지역 팀 신청하기"
  },

  painPoint: {
    headline: "혹시 이런 생각,\n해보신 적 있나요?",
    subheadline: "경제 공부, 시작은 했는데...",
    items: [
      "유튜브로 경제 공부 시작했는데,\n뭐가 맞는 말인지 모르겠다",
      "주식 계좌는 만들었는데,\n뭘 사야 할지 감이 안 온다",
      "금리가 올랐다는데,\n그게 나한테 좋은 건지 나쁜 건지 헷갈린다",
      "연말정산 때마다\n\"세액공제 상품 들어야 하나?\" 고민만 하다 끝난다",
      "노후 준비, 해야 하는 건 아는데\n어디서부터 손대야 할지 막막하다"
    ],
    closing: "하나라도 해당된다면,\n같은 지역 팀에서 함께 시작해보세요."
  },

  about: {
    headline: "혼자 듣는 강의가 아니라,\n함께 읽고 질문하는 실전 스터디입니다",
    subheadline: "전국에서 운영 중인 소규모 경제 스터디 모임,\n같은 지역 사람들과 함께합니다.",
    cards: [
      {
        icon: "book" as IconKey,
        title: "6강 구성 커리큘럼",
        description: "재무 진단부터 경제순환, 투자 기초,\n재무설계, 세금까지.\n순서대로 따라가며 익히는 6강 구성."
      },
      {
        icon: "users" as IconKey,
        title: "5~10명 소수 팀",
        description: "한 팀은 5명에서 시작해 최대 10명까지.\n질문하고 토론하기 좋은 규모로\n운영합니다."
      },
      {
        icon: "pencil" as IconKey,
        title: "지역 기반 오프라인 모임",
        description: "내 지역에 같은 사람이 모이면 팀이 열립니다.\n일정과 장소는 팀원들과\n함께 정합니다."
      }
    ],
    stats: [
      { value: "12", suffix: "개 팀", label: "전국 운영 중" },
      { value: "3", suffix: "개 팀", label: "제주 운영 중" },
      { value: "6", suffix: "강", label: "정규 커리큘럼" }
    ],
    socialProof: "현재 전국 12개 팀, 제주 3개 팀이 함께 공부하고 있습니다."
  },

  curriculum: {
    headline: "6강으로 정리하는\n경제 문해력",
    subheadline: "재무 진단부터 세금까지,\n순서대로 따라가는 6강 구성입니다",
    weeks: [
      {
        week: 1,
        title: "처방 전 진단부터!\n내 재무상황 진단하기",
        subtitle: "내 돈의 현주소를 먼저 본다",
        topics: [
          "자산 vs 금융 vs 재무",
          "장사 vs 사업 vs 경영 / 돈이 스스로 일하게 하라",
          "내 이상과 현실 파악하기",
          "그래서 어떻게? 모으고 투자하고 남는 걸로 쓰자"
        ],
        tag: "진단"
      },
      {
        week: 2,
        title: "경제순환 기초",
        subtitle: "물가, 금리, 경기 흐름을 같은 언어로 본다",
        sublessons: [
          {
            title: "2-1강. 경제순환? 왜 알아야 하나?",
            topics: [
              "“은행 ONLY” 왜 안 돼요?",
              "물가가 뭐길래, 음의 복리? 구매력?",
              "단리와 복리, 무슨 차이?"
            ]
          },
          {
            title: "2-2강. 흐름을 어떻게 볼 것인가",
            topics: [
              "금리가 경기 흐름과 무슨 상관?",
              "경기는 어떻게 순환할까? 돈의 흐름 알기",
              "뉴스에서 뭘 봐야 하지?",
              "나만의 기준금리를 세워보자!\n자산 방어와 상승, 그 어디쯤"
            ]
          }
        ],
        tag: "기초"
      },
      {
        week: 3,
        title: "재테크 본격 시작,\n뭐부터 해볼까?",
        subtitle: "주식·채권·달러를 한 번에 정리한다",
        sublessons: [
          {
            title: "3-1강. 주식 기초 / 주식, ETF, 펀드",
            topics: [
              "ETF가 뭐예요? 개념 정리",
              "우등생에 투자하면 인서울은 하겠지! 투자 시작",
              "양도세? 배당소득세? 금융종합과세?"
            ]
          },
          {
            title: "3-2강. 채권 기초",
            topics: [
              "채권 = 차용증",
              "현금은 단기채권으로 보유한다",
              "채권이 주식보다 수익률이 좋다고?"
            ]
          },
          {
            title: "3-3강. 기축통화",
            topics: [
              "전세계는 왜 달러를 외치는가",
              "달러가 왜 안전자산이지?",
              "달러/환율, 이제는 구분할 수 있다"
            ]
          }
        ],
        tag: "투자 기초"
      },
      {
        week: 4,
        title: "원자재 / 가상화폐",
        subtitle: "대체자산을 보는 기준을 만든다",
        topics: [
          "금, 은, 구리, 원유 / 기본은 알아두자",
          "디지털 금 / 스테이블 코인 = 달러"
        ],
        tag: "대체자산"
      },
      {
        week: 5,
        title: "공부 끝, 재무설계 시작",
        subtitle: "내 숫자로 직접 계획을 짠다",
        sublessons: [
          {
            title: "5-1강. 내 재무재표 만들기",
            topics: [
              "나는 평생 얼마가 필요할까? 은퇴자금 계산 실습",
              "중위소득? 난 못 벌지 않아, 못 모을 뿐!\n(홈택스 소득서류 떼보기)",
              "현금흐름표 작성 실습 / 재무목표 세우기"
            ]
          },
          {
            title: "5-2강. 재테크도 계획적으로",
            topics: [
              "액티브인컴(근로소득) / 패시브인컴(금융소득)",
              "“기획” 해볼까? 세로저축, 가로저축 / 도식화 실습",
              "“실행” 해볼까? 저축플랜 짜보기 / 포폴 만들기",
              "저축과 투자, 어떻게 다를까?\n목적자금, 예비자금, 투자자금 구분하기"
            ]
          }
        ],
        tag: "실습"
      },
      {
        week: 6,
        title: "짚고 가자 세금,\n아껴보자 세금",
        subtitle: "내 손에 남는 돈의 기준을 잡는다",
        topics: [
          "수익률이 같은데 나만 세금 내요, 억울해",
          "내가 내는 세금의 종류",
          "세제적격 / 세제비적격",
          "세액공제의 함정 / 연말정산 내역 뜯어보기"
        ],
        tag: "세금"
      }
    ] as CurriculumWeek[]
  },

  howItWorks: {
    headline: "강의실이 아니라,\n함께 읽고 질문하는 자리입니다",
    subheadline: "듣기만 하는 수업이 아닙니다.\n질문하고, 토론하고, 함께 고민합니다.",
    structure: {
      title: "한 회차는 이렇게 진행됩니다",
      items: [
        "60~90분: 주최자 강의\n(개념 설명 + 사례)",
        "30분: Q&A 및 자유 토론\n(돈 관련 무엇이든)",
        "회차마다 직접 해보는 실습 과제"
      ]
    },
    qna: [
      { q: "모르는 거 물어봐도 되나요?", a: "당연히요.\n그래서 5~10명 소수팀입니다." },
      { q: "경제 완전 초보인데요", a: "기초부터 시작합니다.\n걱정 마세요." },
      { q: "혼자 공부하면 작심삼일이에요", a: "같은 지역 팀과\n함께하면 다릅니다." }
    ],
    testimonial: null
  },

  reviews: {
    headline: "함께한 분들의 이야기",
    note: "현재 표시된 후기는 운영 중인 팀에서 받은 의견을 정리한 예시입니다. 실제 후기 원문은 추후 교체될 수 있습니다.",
    items: [
      {
        quote: "정말 경제나 재테크에 관해 아무것도 몰랐지만,\n제 눈높이에 맞게 쉽게 설명해주셔서\n처음으로 경제에 흥미를 느꼈습니다.",
        author: "20대 직장인",
        team: "제주 1팀"
      },
      {
        quote: "지희 재무코치님은 단순히 지식을 전달하는 것이 아니라\n제 상황을 이해하고 진심으로 도움이 될 수 있는\n방향을 함께 고민해 주셨습니다.",
        author: "30대 프리랜서",
        team: "서울 2팀"
      },
      {
        quote: "완전 경린이였는데\n현금흐름표를 작성하고 나니\n돈이 어디로 새는지 보이더라고요.",
        author: "20대 사회초년생",
        team: "제주 2팀"
      },
      {
        quote: "금융문맹 탈출했습니다.\n막연히 불안했던 미래가\n구체적인 계획으로 바뀌었어요.",
        author: "30대 직장인",
        team: "서울 1팀"
      },
      {
        quote: "40대에 경제 공부 시작하는 게\n늦은 줄 알았는데,\n오히려 지금이 딱이더라고요.",
        author: "40대 직장인",
        team: "제주 3팀"
      },
      {
        quote: "50대에도 충분히 따라갈 수 있었어요.\n어려운 용어 없이 설명해 주셔서\n노후 자금 굴리는 법을 드디어 이해했습니다.",
        author: "50대 자영업자",
        team: "지역 팀"
      }
    ]
  },

  info: {
    headline: "지역에 5명이 모이면,\n새 팀이 열립니다",
    subheadline: "전국 어디서든 신청할 수 있고,\n같은 지역 신청자가 모이면 팀이 개설됩니다.",
    items: [
      {
        label: "팀 인원",
        value: "5명 ~ 10명",
        subtext: "최소 5명 모이면 팀이 시작됩니다",
        icon: "users" as IconKey
      },
      {
        label: "회차당 시간",
        value: "약 2시간",
        subtext: "강의 60~90분 + Q&A 30분",
        icon: "calendar" as IconKey
      },
      {
        label: "참가비",
        value: "초반 3회 무료",
        subtext: "이후 회당 5만원",
        icon: "wallet" as IconKey
      },
      {
        label: "장소 / 일정",
        value: "팀별 협의",
        subtext: "단톡방에서 함께 정합니다",
        icon: "map-pin" as IconKey
      }
    ] as InfoItem[],
    flow: [
      { title: "희망 지역으로 신청", description: "내가 살고 있거나 모일 수 있는 지역을 남깁니다." },
      { title: "같은 지역 신청자 5명 이상 모집", description: "신청 인원이 모이면 자동으로 팀 개설 후보가 됩니다." },
      { title: "담당자 개별 연락", description: "팀 개설이 가능해지면 순차적으로 연락드립니다." },
      { title: "팀 단톡방 개설", description: "참여 확정자들로 팀 단톡방을 만듭니다." },
      { title: "일정·장소 협의", description: "단톡방에서 모일 수 있는 시간과 장소를 함께 정합니다." },
      { title: "6강 스터디 시작", description: "정해진 일정에 따라 6강 커리큘럼을 함께 진행합니다." }
    ] as RegionStep[],
    note: "혼자 신청해도 괜찮습니다. 같은 지역에서 5명이 모이면 새 팀이 열립니다."
  },

  instructor: {
    headline: "이 스터디를 운영하는 사람",
    subheadline: "경제를 어렵지 않게,\n삶에 연결되게 전달합니다",
    name: "현지희 재무코치",
    bio: "복잡한 경제 개념을\n쉽고 실용적으로 전달하는 재무코치입니다.\n전국 각 지역의 팀과 함께\n경제 공부의 첫 걸음을 만들어 갑니다.",
    stats: "현재 전국 12개 팀(제주 3개 팀 포함) 운영 중",
    philosophy: "경제 공부는 '지식'이 아니라\n'관점'을 배우는 것입니다"
  },

  faq: {
    headline: "자주 묻는 질문",
    items: [
      {
        question: "우리 지역에 아직 팀이 없으면\n어떻게 되나요?",
        answer: "신청을 남겨주시면 같은 지역 신청자가 5명 이상 모였을 때\n담당자가 개별로 연락드립니다.\n신청 즉시 팀이 확정되는 것은 아닙니다."
      },
      {
        question: "일정은 정해져 있나요?",
        answer: "고정된 일정은 없습니다.\n팀이 개설되면 단톡방에서 참여자들과 함께 조율합니다."
      },
      {
        question: "장소는 어디인가요?",
        answer: "장소는 팀별로 다르며, 참여자 협의를 통해 정해집니다.\n오프라인 모임이 가능한 지역으로 운영합니다."
      },
      {
        question: "몇 명이 모이면 시작하나요?",
        answer: "최소 5명 이상 모이면 시작할 수 있고,\n한 팀은 최대 10명까지 운영됩니다."
      },
      {
        question: "비용은 어떻게 되나요?",
        answer: "초반 3회는 무료이며, 이후 회당 5만원으로 진행됩니다.\n결제 방식은 팀 개설 후 단톡방에서 별도로 안내드립니다."
      },
      {
        question: "경제 지식이 전혀 없는데\n따라갈 수 있을까요?",
        answer: "네, 기초부터 시작합니다.\n“은행에 왜 돈을 넣으면 손해인가?”부터 설명합니다.\n오히려 백지 상태에서 시작하는 분들이 체계를 잡기 더 좋습니다."
      }
    ]
  },

  cta: {
    headline: "우리 지역에서\n함께 공부할 사람을 찾고 있어요",
    subheadline: "신청 즉시 팀이 확정되는 것은 아니며,\n같은 지역 신청자가 모이면 개별로 안내드립니다.",
    primaryButton: "우리 지역 팀 신청하기",
    secondaryButton: "궁금한 점 먼저 문의하기",
    formFields: {
      name: { label: "이름", placeholder: "홍길동" },
      phone: { label: "연락처", placeholder: "010-1234-5678" },
      email: { label: "이메일 (선택)", placeholder: "example@email.com" },
      sido: { label: "희망 시/도", options: SI_DO_OPTIONS },
      regionDetail: { label: "상세 희망 지역", placeholder: "예: 제주시 노형동, 서울 강남구" },
      experience: {
        label: "경제 공부 경험 (선택)",
        options: ["처음이에요", "유튜브로 조금 봤어요", "책/강의 경험 있어요"]
      },
      question: { label: "궁금한 점이 있다면 (선택)", placeholder: "자유롭게 적어주세요" },
      consent: { label: "신청 내용 확인 및 연락을 위한 개인정보 수집·이용에 동의합니다." }
    },
    submitMessage: "신청이 접수되었습니다.\n같은 지역 신청자가 5명 이상 모이면\n담당자가 카카오톡 또는 문자로 안내드립니다."
  },

  footer: {
    brand: "현지희 재무코칭",
    tagline: "전국 지역별로 운영되는\n경제 문해력 스터디 모임",
    contactLabel: "카카오톡 문의"
  }
};
