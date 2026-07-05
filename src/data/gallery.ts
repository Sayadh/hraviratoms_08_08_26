export type GalleryItemType = 'image' | 'video'

export interface GalleryItem {
  id: string
  type: GalleryItemType
  /** Full-size image src, or the playable video file src. */
  src: string
  /** Grid thumbnail. For videos this is the poster frame shown before play. */
  thumb: string
  width: number
  height: number
  alt: string
}

// ---------------------------------------------------------------------------
// How to add more photos & videos later
// ---------------------------------------------------------------------------
// 1. Drop image files into:  public/gallery/images/
//    Drop video files into:  public/gallery/videos/
// 2. Reference them below as `/gallery/images/your-file.jpg` or
//    `/gallery/videos/your-file.mp4` (the leading "/" is required — files in
//    `public/` are served from the site root).
// 3. For videos, `thumb` should point to a still poster image — put it in
//    `public/gallery/images/thumbs/`.
// 4. `width`/`height` should match the real file (used for masonry layout +
//    lightbox sizing).
// ---------------------------------------------------------------------------

export const gallery: GalleryItem[] = [
  {
    id: 'photo-1',
    type: 'image',
    src: '/gallery/images/SaveClip.App_522744584_17848233765524747_3589440605587817317_n.jpg',
    thumb: '/gallery/images/thumbs/SaveClip.App_522744584_17848233765524747_3589440605587817317_n.jpg',
    width: 1440,
    height: 957,
    alt: 'Հիշարժան պահ տոնակատարությունից',
  },
  {
    id: 'photo-2',
    type: 'image',
    src: '/gallery/images/SaveClip.App_522806850_17848232796524747_553465749492763806_n.jpg',
    thumb: '/gallery/images/thumbs/SaveClip.App_522806850_17848232796524747_553465749492763806_n.jpg',
    width: 1440,
    height: 958,
    alt: 'Ընտանիքի ու ընկերների հետ միասին',
  },
  {
    id: 'photo-3',
    type: 'image',
    src: '/gallery/images/SaveClip.App_523689953_17848228854524747_8244277353346915284_n.jpg',
    thumb: '/gallery/images/thumbs/SaveClip.App_523689953_17848228854524747_8244277353346915284_n.jpg',
    width: 1440,
    height: 957,
    alt: 'Ժպիտներով լի մի պահ',
  },
  {
    id: 'video-1',
    type: 'video',
    src: '/gallery/videos/SaveClip.App_AQND1u2eWfCiDEUxppDs8PtffNEJg8Ilo7TD4I5K9W3HT377OfXzYM5oYGId8jjMvVVV1w2xKIO1L9n_rA5_O1ujvnGu0dkrk4jORr0.mp4',
    thumb: '/gallery/images/thumbs/video-1-poster.jpg',
    width: 720,
    height: 1280,
    alt: 'Տեսանյութ տոնակատարությունից',
  },
  {
    id: 'photo-4',
    type: 'image',
    src: '/gallery/images/SaveClip.App_523893475_17848233753524747_930233002231983430_n.jpg',
    thumb: '/gallery/images/thumbs/SaveClip.App_523893475_17848233753524747_930233002231983430_n.jpg',
    width: 1440,
    height: 957,
    alt: 'Անմոռանալի հուշեր',
  },
  {
    id: 'photo-5',
    type: 'image',
    src: '/gallery/images/SaveClip.App_710555590_17891309676524747_7441923742614933082_n.jpg',
    thumb: '/gallery/images/thumbs/SaveClip.App_710555590_17891309676524747_7441923742614933082_n.jpg',
    width: 1600,
    height: 2000,
    alt: 'Հիշարժան պահ տոնից',
  },
  {
    id: 'photo-6',
    type: 'image',
    src: '/gallery/images/SaveClip.App_711135884_17891309721524747_332521184616493024_n.jpg',
    thumb: '/gallery/images/thumbs/SaveClip.App_711135884_17891309721524747_332521184616493024_n.jpg',
    width: 1600,
    height: 2000,
    alt: 'Ուրախ ակնթարթ',
  },
  {
    id: 'video-2',
    type: 'video',
    src: '/gallery/videos/SaveClip.App_AQNj1eZZeEV4s9TYumn0ulOJRp_PxcIQwzzXF3yIzvcLnBFHgs6H22cG3aVC1MZ3s9gvMrsIUB6O9TY8wFub41Q8KTJzxcRXJX0vox8.mp4',
    thumb: '/gallery/images/thumbs/video-2-poster.jpg',
    width: 720,
    height: 1280,
    alt: 'Հիշարժան պահեր տեսանյութում',
  },
  {
    id: 'photo-7',
    type: 'image',
    src: '/gallery/images/SaveClip.App_712389160_17891309712524747_9213499456139665102_n.jpg',
    thumb: '/gallery/images/thumbs/SaveClip.App_712389160_17891309712524747_9213499456139665102_n.jpg',
    width: 1600,
    height: 2000,
    alt: 'Տոնական մթնոլորտ',
  },
  {
    id: 'photo-8',
    type: 'image',
    src: '/gallery/images/SaveClip.App_715177950_17891309739524747_634684394836274715_n.jpg',
    thumb: '/gallery/images/thumbs/SaveClip.App_715177950_17891309739524747_634684394836274715_n.jpg',
    width: 1600,
    height: 2000,
    alt: 'Սիրով և ուրախությամբ',
  },
  {
    id: 'photo-9',
    type: 'image',
    src: '/gallery/images/SaveClip.App_719150225_17892379578524747_3557077901838022910_n.jpg',
    thumb: '/gallery/images/thumbs/SaveClip.App_719150225_17892379578524747_3557077901838022910_n.jpg',
    width: 3106,
    height: 2205,
    alt: 'Ընտանիքի ու ընկերների հետ միասին',
  },
  {
    id: 'photo-10',
    type: 'image',
    src: '/gallery/images/SaveClip.App_719217287_17892379584524747_4239314140159403404_n.jpg',
    thumb: '/gallery/images/thumbs/SaveClip.App_719217287_17892379584524747_4239314140159403404_n.jpg',
    width: 3106,
    height: 2205,
    alt: 'Ժպիտներով լի մի պահ',
  },
  {
    id: 'photo-11',
    type: 'image',
    src: '/gallery/images/SaveClip.App_721266260_17892379596524747_2390120975091776878_n.jpg',
    thumb: '/gallery/images/thumbs/SaveClip.App_721266260_17892379596524747_2390120975091776878_n.jpg',
    width: 3105,
    height: 2204,
    alt: 'Անմոռանալի հուշեր',
  },
]
