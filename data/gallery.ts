/**
 * Shared gallery brand data.
 * Used by both the Gallery page and the home-page case carousel.
 */

export type BrandId =
  | "eggbomb"
  | "canton8"
  | "googse"
  | "segafredo"
  | "wangshifu";

export type GalleryBrand = {
  id: BrandId;
  logoPath: string;
  storeImage: string;
  menuImages: string[];
};

export const GALLERY_DATA: GalleryBrand[] = [
  {
    id: "eggbomb",
    logoPath: "/images/gallery/eggbomb/egg.png",
    storeImage: "/images/gallery/eggbomb/store1.jpg",
    menuImages: [
      "/images/gallery/eggbomb/menu1.jpg",
      "/images/gallery/eggbomb/menu2.jpg",
      "/images/gallery/eggbomb/menu3.jpg",
    ],
  },
  {
    id: "canton8",
    logoPath: "/images/gallery/canton8/logo.jpg",
    storeImage: "/images/gallery/canton8/store.jpg",
    menuImages: [
      "/images/gallery/canton8/menu1.jpg",
      "/images/gallery/canton8/menu2.jpg",
      "/images/gallery/canton8/menu3.jpg",
      "/images/gallery/canton8/menu4.jpg",
    ],
  },
  {
    id: "googse",
    logoPath: "/images/gallery/googse/logo.png",
    storeImage: "/images/gallery/googse/store.jpg",
    menuImages: [
      "/images/gallery/googse/menu1.jpg",
      "/images/gallery/googse/menu2.jpg",
      "/images/gallery/googse/menu3.jpg",
    ],
  },
  {
    id: "segafredo",
    logoPath: "/images/gallery/segafredo/logo.png",
    storeImage: "/images/gallery/segafredo/store.jpg",
    menuImages: [
      "/images/gallery/segafredo/menu1.jpg",
      "/images/gallery/segafredo/menu2.jpg",
      "/images/gallery/segafredo/menu3.jpg",
    ],
  },
  {
    id: "wangshifu",
    logoPath: "/images/gallery/wangshifu/logo.png",
    storeImage: "/images/gallery/wangshifu/store.jpg",
    menuImages: ["/images/gallery/wangshifu/menu.jpg"],
  },
];
