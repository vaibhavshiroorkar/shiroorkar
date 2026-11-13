# Images

Drop photos into `public/images/`, using the folder and file name listed for each slot below.
Then set that slot's `src` in the content file named in the table, for example
`src: "/images/hero/cutout.png"`. Until a slot has a `src`, the site shows a plain tonal
placeholder there.

Use real photos of Udaykumar and his work only: no stock images, no AI-generated faces, and
no press or film images without written permission. JPG or PNG are fine; the site converts
them to modern formats and sizes automatically. Keep each file under about 5 MB.

## Homepage

| Folder | File | What it shows | Shape and size | Set in |
|---|---|---|---|---|
| `hero/` | `cutout.png` | Udaykumar, background removed (transparent PNG), three-quarter or full body | Portrait, at least 2000 px tall | `content/bio.ts`, `heroCutout.desktop` |
| `hero/` | `cutout-mobile.png` | The same cutout, cropped waist-up | Portrait, at least 1200 px tall | `content/bio.ts`, `heroCutout.mobile` |
| `stories/second-chances/` | `school.jpg` | The Dongri night school or a classroom | 4:3, at least 1600 px wide | `content/bio.ts`, Second chances, The school |
| `stories/second-chances/` | `workers.jpg` | With the civic workers | 4:3 | Second chances, The workers |
| `stories/second-chances/` | `result.jpg` | The felicitation at the night school | 4:3 | Second chances, The result |
| `stories/second-chances/` | `film.jpg` | His own photo at the premiere or a screening | 4:3 | Second chances, The film |
| `stories/recognition/` | `real-hero.jpg` | At the Prahaar office or the premiere | 4:3 | Recognition, Real hero |
| `stories/recognition/` | `service-beyond-duty.jpg` | From the ABP Live interview | 4:3 | Recognition, Service beyond duty |
| `stories/recognition/` | `ideas-of-india.jpg` | On stage at Ideas of India | 4:3 | Recognition, Ideas of India |
| `stories/nisarg-rakshak/` | `field.jpg` | Environmental work in the field; it fills the whole screen | Landscape, at least 2400 px wide | Nisarg Rakshak, Green cover |

## Other pages

| Folder | File | What it shows | Shape and size | Set in |
|---|---|---|---|---|
| `about/` | `portrait.jpg` | Editorial portrait, seated or at his desk | 4:5, at least 1600 px tall | `content/bio.ts`, `portraits.about` |
| `reels/` | `reel-1.jpg` ... | Cover frame of each Reel | 9:16 | `content/media.ts`, each reel's `thumb` |
| `work/` | one per project | Photo of each environmental project | 4:3 | `content/initiatives.ts`, each initiative's `image` |
| `photos/` | any | Photos for the Media page's Photos tab | 4:3 | `content/media.ts`, `photo` items |

Interview thumbnails come from YouTube automatically; nothing to add for those.

## Making the hero cutout

Use the Photoroom app or remove.bg to remove the background and export a PNG. A photo taken
against a plain wall in soft daylight gives the cleanest edges. Keep his arms and the top of
his head inside the frame.
