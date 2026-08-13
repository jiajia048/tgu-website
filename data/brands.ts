/**
 * Shared brand portfolio data.
 * Used by both the business page (filterable matrix) and the home marquee.
 *
 * NOTE: on-disk folder for 中餐 is `chineses/` (trailing "s"). The
 *       `mainCategory` id stays `chinese` per product spec; `logoPath` reflects
 *       the actual filesystem path.
 */

export type MainCat = "chinese" | "asian" | "cafe_bakery_desserts" | "western";

export type SubKey =
  | "canto" | "huaiyang" | "shanghai" | "hunan" | "sichuan" | "xibei"
  | "japanese" | "korean" | "singapore" | "viet"
  | "cafe" | "bakery" | "dessert"
  | "kuaican" | "pub";

export type Brand = {
  id: string;
  name: string;
  mainCategory: MainCat;
  subCategory: SubKey;
  logoPath: string;
};

export const MAIN_ORDER: MainCat[] = [
  "chinese",
  "asian",
  "cafe_bakery_desserts",
  "western",
];

/** Ordered sub-categories per main. */
export const SUBS_BY_MAIN: Record<MainCat, SubKey[]> = {
  chinese: ["canto", "huaiyang", "shanghai", "hunan", "sichuan", "xibei"],
  asian: ["japanese", "korean", "singapore", "viet"],
  cafe_bakery_desserts: ["cafe", "bakery", "dessert"],
  western: ["kuaican", "pub"],
};

export const BRANDS: Brand[] = [
  // ── Chinese / Cantonese (粤菜) ──
  { id: "canton_8", name: "Canton 8", mainCategory: "chinese", subCategory: "canto", logoPath: "/images/business/chineses/canto/canton_8.jpg" },
  { id: "ejiang", name: "Ejiang", mainCategory: "chinese", subCategory: "canto", logoPath: "/images/business/chineses/canto/ejiang.png" },
  { id: "feizapmailaan", name: "Fei Zap Mai Laan", mainCategory: "chinese", subCategory: "canto", logoPath: "/images/business/chineses/canto/feizapmailaan.jpg" },
  { id: "lixin", name: "Lixin", mainCategory: "chinese", subCategory: "canto", logoPath: "/images/business/chineses/canto/lixin.png" },
  { id: "muikee", name: "Mui Kee", mainCategory: "chinese", subCategory: "canto", logoPath: "/images/business/chineses/canto/muikee.jpg" },
  { id: "royalchina", name: "Royal China", mainCategory: "chinese", subCategory: "canto", logoPath: "/images/business/chineses/canto/royalchina.png" },
  { id: "shundexiaoguan", name: "Shunde Xiaoguan", mainCategory: "chinese", subCategory: "canto", logoPath: "/images/business/chineses/canto/shundexiaoguan.png" },
  { id: "siyanzai", name: "Siyanzai", mainCategory: "chinese", subCategory: "canto", logoPath: "/images/business/chineses/canto/siyanzai.png" },
  { id: "xijigangjiu", name: "Xijigangjiu", mainCategory: "chinese", subCategory: "canto", logoPath: "/images/business/chineses/canto/xijigangjiu.png" },
  { id: "yuehaitang", name: "Yuehaitang", mainCategory: "chinese", subCategory: "canto", logoPath: "/images/business/chineses/canto/yuehaitang.png" },

  // ── Chinese / Huaiyang (淮扬菜) ──
  { id: "quyuan", name: "Quyuan", mainCategory: "chinese", subCategory: "huaiyang", logoPath: "/images/business/chineses/huaiyang/quyuan.png" },
  { id: "shichun", name: "Shichun", mainCategory: "chinese", subCategory: "huaiyang", logoPath: "/images/business/chineses/huaiyang/shichun.png" },
  { id: "yongchunyuan", name: "Yongchunyuan", mainCategory: "chinese", subCategory: "huaiyang", logoPath: "/images/business/chineses/huaiyang/yongchunyuan.png" },

  // ── Chinese / Shanghainese (本帮菜) ──
  { id: "chansanchi", name: "Chansanchi", mainCategory: "chinese", subCategory: "shanghai", logoPath: "/images/business/chineses/shanghai/chansanchi.png" },
  { id: "lulubaobao", name: "Lulubaobao", mainCategory: "chinese", subCategory: "shanghai", logoPath: "/images/business/chineses/shanghai/lulubaobao.png" },
  { id: "ruyi", name: "Ruyi", mainCategory: "chinese", subCategory: "shanghai", logoPath: "/images/business/chineses/shanghai/ruyi.png" },
  { id: "sumianfang", name: "Sumianfang", mainCategory: "chinese", subCategory: "shanghai", logoPath: "/images/business/chineses/shanghai/sumianfang.png" },

  // ── Chinese / Hunan (湖南菜) ──
  { id: "baichunyuan", name: "Baichunyuan", mainCategory: "chinese", subCategory: "hunan", logoPath: "/images/business/chineses/hunan/baichunyuan.png" },
  { id: "wangshifu", name: "Wangshifu", mainCategory: "chinese", subCategory: "hunan", logoPath: "/images/business/chineses/hunan/wangshifu.png" },

  // ── Chinese / Sichuan (川菜) ──
  { id: "bacui", name: "Bacui", mainCategory: "chinese", subCategory: "sichuan", logoPath: "/images/business/chineses/sichuan/bacui.png" },
  { id: "chuanchengyuan", name: "Chuanchengyuan", mainCategory: "chinese", subCategory: "sichuan", logoPath: "/images/business/chineses/sichuan/chuanchengyuan.jpg" },
  { id: "ciqingtian", name: "Ciqingtian", mainCategory: "chinese", subCategory: "sichuan", logoPath: "/images/business/chineses/sichuan/ciqingtian.png" },
  { id: "quanniujiang", name: "Quanniujiang", mainCategory: "chinese", subCategory: "sichuan", logoPath: "/images/business/chineses/sichuan/quanniujiang.jpg" },
  { id: "tangshuichuancai", name: "Tangshuichuancai", mainCategory: "chinese", subCategory: "sichuan", logoPath: "/images/business/chineses/sichuan/tangshuichuancai.jpg" },
  { id: "yuxiaomian", name: "Yuxiaomian", mainCategory: "chinese", subCategory: "sichuan", logoPath: "/images/business/chineses/sichuan/yuxiaomian.png" },

  // ── Chinese / Northwestern (西北菜) ──
  { id: "chenxianggui", name: "Chenxianggui", mainCategory: "chinese", subCategory: "xibei", logoPath: "/images/business/chineses/xibei/chenxianggui.jpg" },
  { id: "liangshitun", name: "Liangshitun", mainCategory: "chinese", subCategory: "xibei", logoPath: "/images/business/chineses/xibei/liangshitun.png" },
  { id: "qinxiaomao", name: "Qinxiaomao", mainCategory: "chinese", subCategory: "xibei", logoPath: "/images/business/chineses/xibei/qinxiaomao.png" },
  { id: "tangyao", name: "Tangyao", mainCategory: "chinese", subCategory: "xibei", logoPath: "/images/business/chineses/xibei/tangyao.png" },
  { id: "ximaxiang", name: "Ximaxiang", mainCategory: "chinese", subCategory: "xibei", logoPath: "/images/business/chineses/xibei/ximaxiang.jpg" },
  { id: "xishaoye", name: "Xishaoye", mainCategory: "chinese", subCategory: "xibei", logoPath: "/images/business/chineses/xibei/xishaoye.jpg" },
  { id: "zhanglala", name: "Zhanglala", mainCategory: "chinese", subCategory: "xibei", logoPath: "/images/business/chineses/xibei/zhanglala.png" },

  // ── Asian / Japanese ──
  { id: "biefu", name: "Biefu", mainCategory: "asian", subCategory: "japanese", logoPath: "/images/business/asian/japanese/biefu.png" },
  { id: "kajiken", name: "Kajiken", mainCategory: "asian", subCategory: "japanese", logoPath: "/images/business/asian/japanese/kajiken.png" },
  { id: "tonchin", name: "Tonchin", mainCategory: "asian", subCategory: "japanese", logoPath: "/images/business/asian/japanese/tonchin.png" },

  // ── Asian / Korean ──
  { id: "korean_3", name: "3", mainCategory: "asian", subCategory: "korean", logoPath: "/images/business/asian/korean/3.png" },
  { id: "qingaiting", name: "Qingaiting", mainCategory: "asian", subCategory: "korean", logoPath: "/images/business/asian/korean/qingaiting.png" },
  { id: "sanquan", name: "Sanquan", mainCategory: "asian", subCategory: "korean", logoPath: "/images/business/asian/korean/sanquan.png" },

  // ── Asian / Singaporean ──
  { id: "katong", name: "Katong", mainCategory: "asian", subCategory: "singapore", logoPath: "/images/business/asian/singapore/katong.jpg" },
  { id: "yummy", name: "Yummy", mainCategory: "asian", subCategory: "singapore", logoPath: "/images/business/asian/singapore/yummy.png" },

  // ── Asian / Vietnamese ──
  { id: "fenyao", name: "Fenyao", mainCategory: "asian", subCategory: "viet", logoPath: "/images/business/asian/viet/fenyao.png" },
  { id: "hexian", name: "Hexian", mainCategory: "asian", subCategory: "viet", logoPath: "/images/business/asian/viet/hexian.png" },
  { id: "lapho", name: "La Pho", mainCategory: "asian", subCategory: "viet", logoPath: "/images/business/asian/viet/lapho.png" },

  // ── Cafe / Bakery / Desserts ──
  { id: "72bing", name: "72 Bing", mainCategory: "cafe_bakery_desserts", subCategory: "bakery", logoPath: "/images/business/cafe_bakery_desserts/bakery/72bing.png" },
  { id: "fascino", name: "Fascino", mainCategory: "cafe_bakery_desserts", subCategory: "bakery", logoPath: "/images/business/cafe_bakery_desserts/bakery/fascino.png" },
  { id: "our_bakery", name: "Our Bakery", mainCategory: "cafe_bakery_desserts", subCategory: "bakery", logoPath: "/images/business/cafe_bakery_desserts/bakery/our_bakery.png" },
  { id: "qianshengyuan", name: "Qianshengyuan", mainCategory: "cafe_bakery_desserts", subCategory: "bakery", logoPath: "/images/business/cafe_bakery_desserts/bakery/qianshengyuan.png" },
  { id: "segafredo", name: "Segafredo", mainCategory: "cafe_bakery_desserts", subCategory: "cafe", logoPath: "/images/business/cafe_bakery_desserts/cafe/segafredo.png" },
  { id: "sensory_zero", name: "Sensory Zero", mainCategory: "cafe_bakery_desserts", subCategory: "cafe", logoPath: "/images/business/cafe_bakery_desserts/cafe/sensory_zero.png" },
  { id: "igelato", name: "IGelato", mainCategory: "cafe_bakery_desserts", subCategory: "dessert", logoPath: "/images/business/cafe_bakery_desserts/desserts/igelato.png" },
  { id: "luneurs", name: "Luneurs", mainCategory: "cafe_bakery_desserts", subCategory: "dessert", logoPath: "/images/business/cafe_bakery_desserts/desserts/luneurs.jpg" },
  { id: "mr_yeti", name: "Mr. Yeti", mainCategory: "cafe_bakery_desserts", subCategory: "dessert", logoPath: "/images/business/cafe_bakery_desserts/desserts/mr_yeti.jpg" },

  // ── Western ──
  { id: "beefbomb", name: "Beef Bomb", mainCategory: "western", subCategory: "kuaican", logoPath: "/images/business/western/kuaican/beefbomb.png" },
  { id: "carlsjr", name: "Carl's Jr.", mainCategory: "western", subCategory: "kuaican", logoPath: "/images/business/western/kuaican/carlsjr.png" },
  { id: "egg", name: "EGG", mainCategory: "western", subCategory: "kuaican", logoPath: "/images/business/western/kuaican/egg.png" },
  { id: "nyc", name: "NYC", mainCategory: "western", subCategory: "kuaican", logoPath: "/images/business/western/kuaican/nyc.png" },
  { id: "JingA", name: "Jing-A", mainCategory: "western", subCategory: "pub", logoPath: "/images/business/western/pub/JingA.png" },
  { id: "bruteatery", name: "Brute Eatery", mainCategory: "western", subCategory: "pub", logoPath: "/images/business/western/pub/bruteatery.png" },
  { id: "goose_island", name: "Goose Island", mainCategory: "western", subCategory: "pub", logoPath: "/images/business/western/pub/goose_island.jpg" },
];
