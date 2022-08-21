## Tumblr NPF Images Fix

<sub>**v4.0 ヽ WRITTEN BY @GLENTHEMES [2022]&ensp;—&ensp; last updated: 2022/08/11 14:34 GMT-7**</sub>

##### TABLE OF CONTENTS:
- [About](#about)
- [Features](#features)
- [Warning](#warning)
- [How to Use](#how-to-use)
- [Options / customization](#options)
- [Need help?](#need-help)

---

#### ⸨&ensp;ABOUT&ensp;⸩

<sub>**WHAT IS NPF?**</sub>

> NPF stands for **Neue Post Format**. Tumblr used to have multiple types of post formats to choose from (namingly text, photo, quote, link, chat, audio, video). In recent years, any posts made via mobile or via the **new post editor** turn into NPF posts, which are rendered as **text posts**, and can be counterproductive to how the original poster wanted it to be displayed. NPF images are different from regular photo posts on Tumblr, so this fix only targets NPF images.

<sub>**PREVIOUS VERSIONS:**</sub>

- [v1.0](https://glenthemes.tumblr.com/post/614223478203285504) — Apr 2020
- [v2.0](https://glenthemes.tumblr.com/post/638038350689976320) — Dec 2020
- [v3.0](https://glenthemes.tumblr.com/post/659034084446748672) — Aug 2021

<sub>**WHAT'S NEW:**</sub>  
❀ &thinsp;can use the function with or without `$(document).ready(function(){...`  
❀ &thinsp;auto-adds jQuery if you don't already have it  
❀ &thinsp;more options for caption/photoset placement  
❀ &thinsp;lightboxes — works with mouse clicks & arrow keys  
❀ &thinsp;«&thinsp;ᴏᴘᴛɪᴏɴᴀʟ&thinsp;»&ensp;change `.gifv` to `.gif`

---

#### ⸨&ensp;FEATURES&ensp;⸩

- shows HD versions of images if available
- displays NPF images at their intended dimensions
- supports original blockquote captions as well as modern dashboard captions
- single and multi lightbox function
- custom images spacing
- custom spacing between images & captions

---

#### ⸨&ensp;WARNING&ensp;⸩
If your theme already uses a NPF fix, such as my previous versions or @codematurgy's (search for `boscoxvi` in your theme), there *will* be conflicts and things may go wrong. If you *can* find existing NPF modifications in your theme but you want to switch to this one, **you need to remove your existing NPF fixes.**   

I've tried to make this as easy to install as possible, but I can't guarantee that it'll be a "one size fits all" mod. Feel free to [send me a message](#need-help) if you have any questions or problems.  

---

#### ⸨&ensp;HOW TO USE&ensp;⸩

1. Go into `Edit HTML` of your blog's customize page, and locate `{block:Posts` by typing it into the searchbar:  
   <img width="350" src="https://user-images.githubusercontent.com/110954255/184795109-403aa334-dfe7-4831-830f-a621723b3129.png">  
   
   Highlight that line and replace it with:
   ```
   {block:Posts inlineMediaWidth="1280" inlineNestedMediaWidth="1280"}
   ```
   
2. We install the actual NPF mods in this step.  
   You have two choices, you can either:  
   ❀ &thinsp;a. paste these just above `</head>`   
   ❀ &thinsp;b. paste these just above `</body>`
   ```html
   <!------ NPF images fix (v4.0) by @glenthemes [2022] ------>
   <!------         https://waa.ai/tmblr-npf-v4         ------>
   <script src="//tmblr-npf-v4.github.io/npf-script.js"></script>
   <link href="//tmblr-npf-v4.github.io/npf-styling.css" rel="stylesheet">
   <link href="//assets.tumblr.com/client/prod/standalone/blog-network-npf/index.build.css" rel="stylesheet" media="screen">
   <script>npf_v4_fix();</script>
   
   <style>
   :root {
       --NPF-GIFV-To-GIF:"yes";
       --NPF-Photoset-Spacing:4px;
       --NPF-Lightbox-Delay:100ms; /* can be ms or s */
       --NPF-Lightbox-FadeIn:100ms; /* can be ms or s */
       --NPF-Captions-Spacing:1em;
   
       --NPF-Move-1st-Photoset:"yes";
       --NPF-No-Caption-Remove-OP:"yes";
   }
   </style>
   ```

3. Using the searchbar, find and go to `{block:Text}`  
   <img width="350" src="https://user-images.githubusercontent.com/110954255/184223991-f465ca44-9082-4ece-8cc9-be49d95f5927.png">  
   If you can find `{block:NotReblog}`, highlight the `{Body}` inside it and replace it with:
   ```
   <div npf-multimedia original-post>{Body}</div>
   ```
   Further down, if you can find `{block:Reblogs}`, paste this directly under it:
   ```
   <div npf-multimedia reblogged-post>
   ```
   Paste this just before `{/block:Reblogs}`:
   ```
   </div>
   ```
   If you can't find `{block:NotReblog}` or `{block:Reblogs}`, highlight `{Body}` and replace it with:
   ```
   <div npf-multimedia {block:NotReblog}original-post{/block:NotReblog} {block:RebloggedFrom}reblogged-post{/block:RebloggedFrom}>
   ```
---

#### ⸨&ensp;OPTIONS&ensp;⸩

Options can be customized in `:root` in the CSS.

| Property Name                | Meaning                                    | Options               |
|------------------------------|--------------------------------------------|-----------------------|
| `--NPF-GIFV-To-GIF`          | Turns `.gifv` GIFs into `.gif` format.     | `"yes"` or `"no"`     |
| `--NPF-Photoset-Spacing`     | Spacing between NPF images.                | e.g. `4px`, `10px`    |
| `--NPF-Lightbox-Delay`       | After clicking an NPF image, this is the delay for the lightbox to show up. <br>Not recommended to leave this at `0`, as there is a very <br>short delay before the lightbox appears, and will cause a flash. | can be in `ms` or `s` |
| `--NPF-Lightbox-FadeIn`      | Fade-in speed of the lightbox. | can be in `ms` or `s`     |
| `--NPF-Captions-Spacing`     | Gap between NPF images and their caption. | e.g. `4px`, `10px`     |
| `--NPF-Move-1st-Photoset`    | Moves the first NPF photo (or photoset) to the top of the post, <br>mimicking regular photo posts. | `"yes"` or `"no"`     |
| `--NPF-No-Caption-Remove-OP` | If the post only consists of a NPF photo (or photoset) and has no caption, <br>remove original poster's username. | `"yes"` or `"no"`     |

---

#### ⸨&ensp;NEED HELP?&ensp;⸩

If you run into any issues, please contact me on Discord ([discord.gg/RcMKnwz](https://discord.gg/RcMKnwz)).  
Read the **#server-rules** once you're there, and share your Pastery theme code so I can take a look at it.  

If you found this helpful, please consider donating @ [ko-fi.com/glenthemes](https://ko-fi.com/glenthemes)!

<sub>[**-ˋˏ✄┈┈&ensp;BACK TO TOP**](#tumblr-npf-images-fix)</sub>
