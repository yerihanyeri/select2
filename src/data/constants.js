// 영상 데이터
export const HERO_VIDEO =
  "https://videos.pexels.com/video-files/3752528/3752528-uhd_2560_1440_25fps.mp4";

export const COLLECTION_VIDEOS = [
  "https://videos.pexels.com/video-files/4936696/4936696-uhd_2560_1440_25fps.mp4",
  "https://videos.pexels.com/video-files/6603347/6603347-uhd_2560_1440_25fps.mp4",
  "https://videos.pexels.com/video-files/7653698/7653698-uhd_2560_1440_25fps.mp4",
  "https://videos.pexels.com/video-files/5309395/5309395-uhd_2560_1440_25fps.mp4",
];

// 상품 목록 데이터
export const PRODUCTS = [
  {
    id: "N.01",
    name: "The Silence",
    type: "SILK",
    price: "₩245,000",
    vid: COLLECTION_VIDEOS[1],
    desc: "Noise-canceling texture.",
    stats: { softness: 98, breathability: 85, thermal: 60 },
    detail:
      "최고급 멀버리 실크 100%. 피부 마찰 계수를 0에 가깝게 줄여 수면 중 뒤척임 소음까지 차단합니다.",
    images: {
      main: "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?q=80&w=1000&auto=format&fit=crop",
      fabric:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop",
    },
  },
  {
    id: "N.02",
    name: "Cloud Walker",
    type: "COTTON",
    price: "₩189,000",
    vid: COLLECTION_VIDEOS[0],
    desc: "Zero gravity structure.",
    stats: { softness: 90, breathability: 95, thermal: 70 },
    detail:
      "무중력 방적 기술로 공기층을 극대화한 코튼. 구름 위를 걷는 듯한 가벼움을 선사합니다.",
    images: {
      main: "https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?q=80&w=1000&auto=format&fit=crop",
      fabric:
        "https://images.unsplash.com/photo-1594913785162-349c4fa22df7?q=80&w=1000&auto=format&fit=crop",
    },
  },
  {
    id: "N.03",
    name: "Midnight Flow",
    type: "MODAL",
    price: "₩198,000",
    vid: COLLECTION_VIDEOS[2],
    desc: "Fluid dynamics fabric.",
    stats: { softness: 96, breathability: 88, thermal: 65 },
    detail:
      "너도밤나무에서 추출한 모달 섬유. 유체 역학을 적용한 드레이프성으로 몸의 곡선을 따라 흐릅니다.",
    images: {
      main: "https://images.unsplash.com/photo-1582253074360-179427499778?q=80&w=1000&auto=format&fit=crop",
      fabric:
        "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=1000&auto=format&fit=crop",
    },
  },
  {
    id: "N.04",
    name: "Raw Earth",
    type: "LINEN",
    price: "₩210,000",
    vid: COLLECTION_VIDEOS[3],
    desc: "Organic ventilation.",
    stats: { softness: 75, breathability: 99, thermal: 40 },
    detail:
      "자연 그대로의 통기성을 가진 린넨. 피부의 열을 즉각적으로 배출하는 천연 쿨링 시스템입니다.",
    images: {
      main: "https://images.unsplash.com/photo-1596483232822-75eb9a008c4e?q=80&w=1000&auto=format&fit=crop",
      fabric:
        "https://images.unsplash.com/photo-1575336332825-962832049b42?q=80&w=1000&auto=format&fit=crop",
    },
  },
  {
    id: "N.05",
    name: "Deep Dive",
    type: "VELVET",
    price: "₩280,000",
    vid: COLLECTION_VIDEOS[1],
    desc: "Thermal regulation.",
    stats: { softness: 92, breathability: 70, thermal: 95 },
    detail:
      "체온을 가두는 마이크로 벨벳. 깊은 심해처럼 고요하고 따뜻한 수면 환경을 조성합니다.",
    images: {
      main: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
      fabric:
        "https://images.unsplash.com/photo-1612459992383-7c70c0c804b1?q=80&w=1000&auto=format&fit=crop",
    },
  },
];

// 저널(뉴스) 데이터
export const JOURNAL_POSTS = [
  {
    id: 1,
    title: "The Science of 22°C",
    desc: "Why we obsess over the perfect sleep temperature.",
    img: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Beyond Cotton",
    desc: "Exploring the next generation of organic fibers.",
    img: "https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Morning Rituals",
    desc: "How to wake up feeling weightless.",
    img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1000&auto=format&fit=crop",
  },
];
