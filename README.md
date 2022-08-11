## Tumblr NPF Images Fix

<sub>**v4.0 ヽ WRITTEN BY @GLENTHEMES [2022]&ensp;—&ensp; ~~last updated: 2022/08/09 15:50 GMT-7~~ EDITING IN PROGRESS**</sub>

#### ⸨&ensp;ABOUT&ensp;⸩

<sub>**WHAT IS NPF?**</sub>

> NPF stands for **Neue Post Format**. Tumblr used to have multiple types of post formats to choose from (namingly text, photo, quote, link, chat, audio, video). In recent years, any posts made via mobile or via the **new post editor** turn into NPF posts, which are rendered as **text posts**, and can be counterproductive to how the original poster wanted it to be displayed. NPF images are different from regular photo posts on Tumblr, so this fix only targets NPF images.

<sub>**PREVIOUS VERSIONS:**</sub>

- [v1.0](https://glenthemes.tumblr.com/post/614223478203285504) — Apr 2020
- [v2.0](https://glenthemes.tumblr.com/post/638038350689976320) — Dec 2020
- [v3.0](https://glenthemes.tumblr.com/post/659034084446748672) — Aug 2021

---

#### ⸨&ensp;FEATURES&ensp;⸩

- shows HD versions of images if available
- displays NPF images at their intended dimensions
- supports original blockquote captions as well as modern dashboard captions
- single and multi lightbox function
- custom images spacing
- custom spacing between images & captions

Options can be customized in `:root` in the CSS.

| Property Name                | Meaning                                    | Options               |
|------------------------------|--------------------------------------------|-----------------------|
| `--NPF-GIFV-To-GIF`          | Turns `.gifv` GIFs into `.gif` format.     | `"yes"` or `"no"`     |
| `--NPF-Photoset-Spacing`     | Spacing between NPF images.                | e.g. `4px`, `10px`    |
| `--NPF-Lightbox-Delay`       | After clicking an NPF image, this is the delay for the lightbox to show up. <br>Not recommended to leave this at `0`, as the wrong image may appear. | can be in `ms` or `s` |
| `--NPF-Lightbox-FadeIn`      | Fade-in speed of the lightbox. | can be in `ms` or `s`     |
| `--NPF-Captions-Spacing`     | Gap between NPF images and their caption. | e.g. `4px`, `10px`     |
| `--NPF-Move-1st-Photoset`    | Moves the first NPF photo (or photoset) to the top of the post, <br>mimicing regular photo posts. | `"yes"` or `"no"`     |
| `--NPF-No-Caption-Remove-OP` | If the post only consists of a NPF photo (or photoset) and has no caption, <br>remove original poster's username. | `"yes"` or `"no"`     |

---

#### ⸨&ensp;HOW TO USE&ensp;⸩

---

#### ⸨&ensp;NEED HELP?&ensp;⸩
