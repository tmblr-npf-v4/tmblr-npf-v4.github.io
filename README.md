## Tumblr NPF Images Fix

<sub>**v4.0 ヽ WRITTEN BY @GLENTHEMES [2022]&ensp;—&ensp; last updated: 2022/08/11 13:45 GMT-7**</sub>

##### TABLE OF CONTENTS:
- [About](#about)
- [Features](#features)
- [How to Use](#how-to-use)
	- [step 1](#step-1basic-setup)&ensp;⸺&ensp;jQuery & basic setup
	- [step 2](#step-2find-out-what-captions-your-theme-uses)&ensp;⸺&ensp;find out what type of captions your theme uses
	- [old captions](#step-3-afor-old-captions)
	- [new captions](#step-3-bfor-new-captions)
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

---


#### ⸨&ensp;FEATURES&ensp;⸩

- shows HD versions of images if available
- displays NPF images at their intended dimensions
- supports original blockquote captions as well as modern dashboard captions
- single and multi lightbox function
- custom images spacing
- custom spacing between images & captions

---

#### ⸨&ensp;HOW TO USE&ensp;⸩

###### STEP 1&ensp;⸺&ensp;BASIC SETUP
1. Locate `{block:Posts}` by typing it into the searchbar:  
   <img width="350" src="https://user-images.githubusercontent.com/110954255/184245885-5a3c8522-d2aa-4071-aa7b-556c71918d9c.png">  
   
   Highlight it and replace it with:
   ```
   {block:Posts inlineMediaWidth="1280" inlineNestedMediaWidth="1280"}
   ```

2. Find out if your theme already has jQuery installed. To do this, type `jquery` into the searchbar:  
   <img width="350" src="https://user-images.githubusercontent.com/110954255/184226559-22a74190-2373-4f48-b05a-1d8550204288.png">  
   If it doesn't exist, paste this somewhere under `<head>`:
   ```
   <script src="//ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
   ```
   
3. Paste this under the jQuery script:
   ```html
   <!------ NPF images fix (v4.0) by @glenthemes [2022] ------>
   <!------         https://waa.ai/tmblr-npf-v4         ------>
   <script src="//tmblr-npf-v4.github.io/npf-script.js"></script>
   <link href="//tmblr-npf-v4.github.io/npf-styling.css" rel="stylesheet">
   <script>
   $(document).ready(function(){
       npf_v4_fix();
   });
   </script>
   
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

---

###### STEP 2&ensp;⸺&ensp;FIND OUT WHAT CAPTIONS YOUR THEME USES

Using the searchbar, search for `{block:Reblogs}`  
<img width="350" src="https://user-images.githubusercontent.com/110954255/184223511-62fa418c-815a-4272-8112-2ac8aa2fdc94.png">  
If it doesn't exist, your theme uses **old captions**. Jump to [this step](#step-3-afor-old-captions).  
If it exists, your theme uses **new captions**. Jump to [this step](#step-3-bfor-new-captions).

---

###### STEP 3 (A)&ensp;⸺&ensp;FOR OLD CAPTIONS

1. Using the searchbar, go to `{block:Text}`  
   <img width="350" src="https://user-images.githubusercontent.com/110954255/184223991-f465ca44-9082-4ece-8cc9-be49d95f5927.png">  
2. There should be a `{Body}` in there. Highlight it, and replace it with:
  
   ```
   <div npf-multimedia {block:NotReblog}original-post{/block:NotReblog} {block:RebloggedFrom}reblogged-post{/block:RebloggedFrom}>{Body}</div>
   ```

---

###### STEP 3 (B)&ensp;⸺&ensp;FOR NEW CAPTIONS

1. Using the searchbar, go to `{block:Text}`  
   <img width="350" src="https://user-images.githubusercontent.com/110954255/184223991-f465ca44-9082-4ece-8cc9-be49d95f5927.png"> 
2. Travel a few lines down until you see `{block:Reblogs}`. Just after it, there should be a `div` that contains the reblogger information (usually it's their name and their icon). Paste this just before the **closing pointy right bracket** `>`:  
   
   ```
    npf-multimedia {block:NotReblog}original-post{/block:NotReblog} {block:RebloggedFrom}reblogged-post{/block:RebloggedFrom}
   ```
   
   Result should look something like this:
   
   ```
   {block:Reblogs}
   <div class="reblogger-head" npf-multimedia {block:NotReblog}original-post{/block:NotReblog} {block:RebloggedFrom}reblogged-post{/block:RebloggedFrom}>
   ```
---

#### ⸨&ensp;OPTIONS&ensp;⸩

Options can be customized in `:root` in the CSS.

| Property Name                | Meaning                                    | Options               |
|------------------------------|--------------------------------------------|-----------------------|
| `--NPF-GIFV-To-GIF`          | Turns `.gifv` GIFs into `.gif` format.     | `"yes"` or `"no"`     |
| `--NPF-Photoset-Spacing`     | Spacing between NPF images.                | e.g. `4px`, `10px`    |
| `--NPF-Lightbox-Delay`       | After clicking an NPF image, this is the delay for the lightbox to show up. <br>Not recommended to leave this at `0`, as the wrong image may appear. | can be in `ms` or `s` |
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
