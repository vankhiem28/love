import type { MusicTrack } from "./types";

export const GIFT_PASSWORD = "tinhyeu";
export const GIRLFRIEND_NAME = "Em";
export const PET_NAME = "Bé yêu";

export const COUNTDOWN_TARGET = new Date(Date.UTC(2026, 1, 14, 14, 0, 0));
// export const COUNTDOWN_TARGET = new Date(Date.now() + 1 * 5 * 1000);

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: "love",
    title: "Love",
    artist: "Nghệ sĩ của tụi mình",
    src: "/music/love.mp3",
  },
];

export const STORY_PARAGRAPHS = [
  "Hello em ❤️, nhân dịp 14-2 nên anh làm cái này để tặng em. Anh biết em đã đoán được rồi nên anh nói luôn ở đây nhé. Vài điều nhỏ thôi, nhưng là những điều anh rất muốn nói với em.",
  "Anh xin lỗi vì 14-2 năm nay anh không thể ở bên cạnh em được. Hứa bù lại bằng một buổi hẹn thật tử tế và một cái ôm thật chặt khi mình gặp nhau.",
  "Có những ngày tụi mình bận rộn, có những ngày chỉ cần nhắn nhau vài câu là vui. Anh thích cảm giác đó — nhẹ nhàng, tự nhiên, và có em trong đó.",
  "Anh hứa sẽ lắng nghe kỹ hơn và bớt “cứng đầu” lại, để chuyện nhỏ không thành chuyện to. Anh muốn mình cười nhiều hơn và giận ít đi.",
  "Anh cũng thích phiên bản của tụi mình bây giờ: rõ ràng hơn, vui hơn, và biết trân trọng nhau nhiều hơn. Đi tiếp thôi, chậm cũng được, miễn là cùng nhau.",
  "Cảm ơn em vì đã kiên nhẫn với anh. Món quà này không phải “hoành tráng”, nhưng là thật lòng — giống như anh, lúc nào cũng chọn em.",
];

export type Memory = {
  id: string;
  title: string;
  date: string;
  caption: string;
};

export const MEMORIES: Memory[] = [
  {
    id: "first-meet",
    title: "Ngày mình gặp nhau",
    date: "12.08.2023",
    caption: "Khoảnh khắc ấy như mở ra một chương mới thật dịu dàng.",
  },
  {
    id: "first-trip",
    title: "Chuyến đi đầu tiên",
    date: "02.11.2023",
    caption: "Mình đã có rất nhiều bức ảnh và tiếng cười đáng nhớ.",
  },
  {
    id: "anniversary",
    title: "Ngày kỷ niệm",
    date: "12.08.2024",
    caption: "Cảm ơn em vì đã luôn ở đây, dịu dàng và kiên nhẫn.",
  },
];

export const TREASURED_MOMENTS = [
  "Ngày gặp nhau lần đầu, anh còn nhớ mình cười hơi ngại.",
  "Lần đầu nắm tay, anh giả vờ bình tĩnh thôi chứ tim đập nhanh.",
  "Những cuộc hẹn nhỏ, nói chuyện linh tinh mà vui ghê.",
];

export type PromiseCard = {
  title: string;
  body: string;
};

export const PROMISES: PromiseCard[] = [
  {
    title: "Lắng nghe rõ ràng",
    body: "Anh sẽ nói và nghe thật rõ, để không ai phải đoán ý và không ai cảm thấy bị bỏ quên, dù khoảng cách có xa.",
  },
  {
    title: "Kiên nhẫn và dịu dàng",
    body: "Anh sẽ chậm lại đúng lúc, ôm lấy những mệt mỏi của em và của cả mình trong những ngày xa nhau.",
  },
  {
    title: "Giữ lấy lần trở lại",
    body: "Anh sẽ trân trọng sự quay lại này như một điều quý giá, để mình không lạc nhau thêm lần nào nữa, dù đang yêu xa.",
  },
];

export const FUTURE_WISHES = [
  "14-2 này mình hẹn nhau một lời chúc dễ thương, một bài hát chung và một lời hẹn chắc chắn.",
  "Khi gặp lại, mình sẽ có một buổi hẹn thật tử tế: cà phê, đi dạo, và ôm thật chặt.",
  "Anh muốn mình giữ những điều giản dị: quan tâm đúng lúc, nói thật lòng, và chọn nhau thêm nhiều ngày.",
];

export type FloatingHeart = {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
};

export const FLOATING_HEARTS: FloatingHeart[] = [
  { left: "8%", top: "15%", size: 18, delay: "0s", duration: "14s" },
  { left: "22%", top: "55%", size: 14, delay: "2s", duration: "12s" },
  { left: "35%", top: "30%", size: 20, delay: "1s", duration: "16s" },
  { left: "52%", top: "10%", size: 24, delay: "3s", duration: "18s" },
  { left: "70%", top: "40%", size: 16, delay: "1.5s", duration: "13s" },
  { left: "82%", top: "18%", size: 22, delay: "2.5s", duration: "17s" },
  { left: "90%", top: "60%", size: 14, delay: "0.8s", duration: "12s" },
];

export type FallingHeart = {
  left: string;
  size: number;
  delay: string;
  duration: string;
  drift: string;
  opacity: number;
};

export const FALLING_HEARTS: FallingHeart[] = [
  { left: "4%", size: 50, delay: "0s", duration: "10s", drift: "18px", opacity: 0.5 },
  { left: "10%", size: 18, delay: "1.5s", duration: "12s", drift: "-22px", opacity: 0.65 },
  { left: "16%", size: 22, delay: "3s", duration: "11s", drift: "16px", opacity: 0.6 },
  { left: "24%", size: 22, delay: "0.8s", duration: "13s", drift: "-14px", opacity: 0.55 },
  { left: "31%", size: 20, delay: "2.4s", duration: "12s", drift: "20px", opacity: 0.7 },
  { left: "38%", size: 30, delay: "1.2s", duration: "9.5s", drift: "-16px", opacity: 0.5 },
  { left: "45%", size: 94, delay: "2.9s", duration: "14s", drift: "24px", opacity: 0.75 },
  { left: "52%", size: 18, delay: "0.4s", duration: "11.5s", drift: "-18px", opacity: 0.6 },
  { left: "58%", size: 14, delay: "1.8s", duration: "10.5s", drift: "14px", opacity: 0.5 },
  { left: "64%", size: 21, delay: "3.4s", duration: "13.5s", drift: "-20px", opacity: 0.7 },
  { left: "71%", size: 44, delay: "2.1s", duration: "10.8s", drift: "18px", opacity: 0.55 },
  { left: "77%", size: 12, delay: "0.9s", duration: "12.6s", drift: "-22px", opacity: 0.65 },
  { left: "83%", size: 99, delay: "2.7s", duration: "9.8s", drift: "12px", opacity: 0.5 },
  { left: "88%", size: 33, delay: "1.4s", duration: "14.2s", drift: "-24px", opacity: 0.75 },
  { left: "93%", size: 23, delay: "3.1s", duration: "11.2s", drift: "16px", opacity: 0.6 },
  { left: "97%", size: 56, delay: "2.2s", duration: "10.1s", drift: "-12px", opacity: 0.5 },
];

export const CONFETTI_COLORS = [
  "#ffc6d4",
  "#ffe5ec",
  "#eadcf6",
  "#fff1c7",
  "#c9f4e2",
];

export const FLIP_CARD_FRONT_LABELS = [
  "Hộp quà 01",
  "Hộp quà 02",
  "Hộp quà 03",
  "Hộp quà 04",
  "Hộp quà 05",
  "Hộp quà 06",
];

export const FLIP_CARD_REWARD_LABELS = [
  "Quà nho nhỏ để em vui: 2.000.000đ",
  "Tặng em chút ngọt ngào: 1.000.000đ",
  "Một chiếc lì xì đáng yêu: 700.000đ",
  "Bỏ heo đất tặng em: 500.000đ",
  "Bỏ heo đất tặng em: 200.000đ",
  "Bỏ heo đất tặng em: 10.000đ",
];

export type HeroBackgroundImage = {
  src: string;
  alt: string;
};

export const HERO_BACKGROUND_IMAGES: HeroBackgroundImage[] = [
  { src: "/img/h8.jpg", alt: "Ảnh của em" },
  { src: "/img/h1.jpg", alt: "Ảnh của em" },
  { src: "/img/h2.jpg", alt: "Ảnh của em" },
  { src: "/img/h8.jpg", alt: "Ảnh của em" },
  { src: "/img/h4.jpg", alt: "Ảnh của em" },
  { src: "/img/h8.jpg", alt: "Ảnh của em" },
  { src: "/img/h9.jpg", alt: "Ảnh của em" },
  { src: "/img/h10.jpg", alt: "Ảnh của em" },
  { src: "/img/h12.jpg", alt: "Ảnh của em" },
];
