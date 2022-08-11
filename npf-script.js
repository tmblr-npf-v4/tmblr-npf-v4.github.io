/*---------------------------------------------------------

    NPF images fix (v4.0) by @glenthemes [2022]
    https://waa.ai/tmblr-npf-v4
    
---------------------------------------------------------*/

$(document).ready(function(){
    window.npf_v4_fix = function(o_o){
        let rootGET = getComputedStyle(document.documentElement);
      
        // append npf-build.css
        if(!$("link[href*='blog-network-npf/index.build.css']").length){
            $("head").prepend("<link rel='stylesheet' media='screen' href='//assets.tumblr.com/client/prod/standalone/blog-network-npf/index.build.css'>");
        }
        
        // initialize delay
        let npf_lightbox_delay = $.trim(rootGET.getPropertyValue("--NPF-Lightbox-Delay"));
      
        let xdlyy = parseFloat(npf_lightbox_delay);
        let pzpyb = npf_lightbox_delay.replace(xdlyy,"");
      
        if(pzpyb == "s"){
            npf_lightbox_delay = xdlyy * 1000;
        } else if(pzpyb == "ms"){
            npf_lightbox_delay = parseFloat(npf_lightbox_delay);
        }
      
        // initialize fadeIn speed
        let npf_lightbox_fadeIn = $.trim(rootGET.getPropertyValue("--NPF-Lightbox-FadeIn"));
      
        let eoxbs = parseFloat(npf_lightbox_fadeIn);
        let wlykg = npf_lightbox_fadeIn.replace(eoxbs,"");
      
        if(wlykg == "s"){
            npf_lightbox_fadeIn = eoxbs * 1000;
        } else if(wlykg == "ms"){
            npf_lightbox_fadeIn = parseFloat(npf_lightbox_fadeIn);
        }
      
        let JQversion = jQuery.fn.jquery.replaceAll(".","");
      
        // change .gifv to .gif - y/n
        let ungifv = $.trim(rootGET.getPropertyValue("--NPF-GIFV-To-GIF")).replace(/"/g,'');
        if(ungifv == "yes"){
            $(".tmblr-full img[src$='.gifv']").each(function(){
                let og_gifv = $(this).attr("src");
                let new_gif_url = og_gifv.slice(0,-5) + ".gif";
                $(this).attr("src",new_gif_url)
            })
          
            $("a.post_media_photo_anchor[data-big-photo$='.gifv']").each(function(){
                let og_gifv = $(this).attr("data-big-photo");
                let new_gif_url = og_gifv.slice(0,-5) + ".gif";
                $(this).attr("data-big-photo",new_gif_url)
            })
        }

        // wrap each npf "group"
        let npf__row = ".npf_row";

        $(npf__row).each(function(){
            $(this).not(npf__row +"+"+ npf__row).each(function(){
                if(JQversion >= "180"){
                    $(this).nextUntil(":not(" + npf__row + ")").addBack().wrapAll("<div class='npf_inst'></div>");
                } else {
                    $(this).nextUntil(":not(" + npf__row + ")").andSelf().wrapAll("<div class='npf_inst'></div>");
                }
            });//end .npf_row wrap
        })// end .npf_row each

        // wrap non-npf-inst stuff
        let solofig = ".tmblr-full";

        $(solofig).each(function(){
            if(!$(this).parents(".npf_inst").length){
                $(this).not(solofig +"+"+ solofig).each(function(){
                    if(JQversion >= "180"){
                        $(this).nextUntil(":not(" + solofig + ")").addBack().wrapAll("<div class='npf_inst'></div>");
                    } else {
                        $(this).nextUntil(":not(" + solofig + ")").andSelf().wrapAll("<div class='npf_inst'></div>");
                    }
                });//end .tmblr-full wrap
            }// end parent check

            // check if every figure.tmblr-full has a.post anchor whatever
            if(!$(this).find("a.post_media_photo_anchor").length){
                let imgw = $(this).attr("data-orig-width");
                let imgh = $(this).attr("data-orig-height");
                let imgurl = $(this).find("img").attr("src");
                $(this).wrapInner("<a class='post_media_photo_anchor' data-big-photo-width='" + imgw + "' data-big-photo-height='" + imgh + "' data-big-photo='" + imgurl + "'></a>")
            }
        })// end .tmblr-full each
      
        $(".npf_inst + .npf_inst").each(function(){
            $(this).children().appendTo($(this).prev());
            $(this).remove();
        })
      
        /*-------------------------------*/
        // if npf has columns, make each row's columns to be the height of the shortest item
      
        let spacz = parseFloat(rootGET.getPropertyValue("--NPF-Photoset-Spacing"));
      
        // get column widths
        $(".npf_row:has(.npf_col)").each(function(){
            let vmwsu = $(this).width();
            let colcvnt = $(this).find(".npf_col").length;
            let kzwiy = (vmwsu - (spacz * (colcvnt - 1))) / colcvnt;
            $(this).find(".npf_col").attr("width",Math.floor(kzwiy))
        })
      
        // get ORIGINAL IMAGE's dimensions,
        // take that ratio and apply it on current column size
        $(".npf_col a.post_media_photo_anchor").each(function(){
            let that = this;
          
            let z_ogw = parseInt($(this).attr("data-big-photo-width"));
            let z_ogh = parseInt($(this).attr("data-big-photo-height"));            

            let z_ratio = z_ogw / z_ogh;          

            let rowparent = $(this).parents(".npf_row");
            let colparent = $(this).parents(".npf_col");
          
            // fallback for if [data-big-photo-width] doesn't have a value
            if(isNaN(z_ogw)){
                $(this).addClass("npf-no-data");
                
                // loading fallback, #1
                setTimeout(() => {
                    colparent.attr("height",$(that).height());
                    genShortestCol();
                },269)
              
                // loading fallback, #2
                $(this).find("img").one("load",function(){
                    colparent.attr("height",$(this).height());
                    genShortestCol();
                })
            }

            if(colparent.is("[width]")){
                let colw = parseFloat(colparent.attr("width"));
                let colh = Math.floor(colw / z_ratio);
                colparent.attr("height",colh);

                genShortestCol();
            }
        })// end a.anchor each
      
        function genShortestCol(){
            $(".npf_row:has(.npf_col[height])").each(function(){
                let colhz = $(this).find(".npf_col[height]").map(function(){
                    return $(this).attr("height")
                }).get();

                let colmin = Math.min.apply(Math,colhz);
                $(this).height(colmin)
            })
        }

        /*-------------------------------*/

        $(".npf_inst").each(function(){

            $(this).find(".post_media_photo_anchor").each(function(a_a){
                a_a += 1;
                $(this).attr("npf-order",a_a)
            })

            /*----------*/

            let aerie = [];

            // enable new object creation
            function npfIMG(w, h, ld, hd){
              this.width = Number(w);
              this.height = Number(h);
              this.low_res = ld;
              this.high_res = ld; // temporarily make the HD version == the ONLY available img src
            }

            $(".post_media_photo_anchor",this).each(function(){
              aerie.push(new npfIMG(
                $(this).attr("data-big-photo-width"),
                $(this).attr("data-big-photo-height"),
                $(this).attr("data-big-photo"),
                $(this).attr("data-big-photo")
              ));
              
              let loadit = new Image();
              loadit.src = $(this).attr("data-big-photo")
            })

            $(".post_media_photo_anchor",this).attr("onclick","Tumblr.Lightbox.init(" + JSON.stringify(aerie) + ")")

            // remove the auto-lightbox on single npf images
            // (originally on a.post_media_photo_anchor)
            $("[data-big-photo]",this).removeAttr("data-big-photo");

        })//end .npf_inst

        /*-------------------------------------------*/

        $(".npf_inst .post_media_photo_anchor").click(function(){

            $("body").addClass("npf-lightbox-active");

            let ondex = Number($(this).attr("npf-order"));

            setTimeout(function(){

                let npf_lightbox_open_time = Date.now();

                let npfOpenTimer = setInterval(() => {
                  if(Date.now() - npf_lightbox_open_time > npf_lightbox_delay){
                    clearInterval(npfOpenTimer);
                  } else {
                    $(".tmblr-lightbox .vignette").nextAll(".lightbox-image-container").addClass("ghouligan");
                    $(".lightbox-image-container.ghouligan").hide()
                  }
                },0);

                let bonks = $(".lightbox-image-container").length;

                $(".tmblr-lightbox").attr("clicked-npf-child",ondex);
                $(".tmblr-lightbox").attr("last-lightbox",bonks);

                let lqwju = ondex - bonks;
                let clicksneeded = lqwju + 1;

                $(".tmblr-lightbox").attr("npf-diff",lqwju);
                $(".tmblr-lightbox").attr("npf-jumps",clicksneeded);

                for(let vz=0; vz<clicksneeded; vz++){
                    $(".lightbox-image-container:last-child").click();
                }

                setTimeout(function(){
                    $("body.npf-lightbox-active").removeClass("npf-lightbox-active");
                    $(".ghouligan").fadeIn(npf_lightbox_fadeIn)
                },npf_lightbox_delay);
            },npf_lightbox_delay);
        })// end click function
      
        /*-------------------------------------------*/
        // MODERN CAPTIONS
        // if: move 1st photoset
        let reloz = $.trim(rootGET.getPropertyValue("--NPF-Move-1st-Photoset")).replace(/"/g,'');
        let rmvop = $.trim(rootGET.getPropertyValue("--NPF-No-Caption-Remove-OP")).replace(/"/g,'');
      
        let npfbase = $("[npf-multimedia]");
      
        npfbase.each(function(){
            let text_body = this;
            // if npf's post is an ORIGINAL POST
            if($(this).is("[original-post]")){
                $(this).find(".npf_inst:first").each(function(){
                    // if similar to an original photo post
                    // aka if there is no text before it
                    if($.trim($(this).prevAll().text()) == ""){
                        $(this).addClass("npf_photo_origin")
                    }
                })
            }

            // if npf's post is a REBLOG
            else if($(this).is("[reblogged-post]")){
                $(this).find(".npf_inst:first").each(function(){
                    // if similar to an original photo post
                    // [1/2]: if there is no text before it
                  
                    // prev <p>, check conditions:
                    // 1. that it exists
                    // 2. that it has no text in it
                    // 3. that there's nothing BEFORE it (the <p>)
                    // 4. the photo-origin is OP, i.e. not a reblog trail
                    let emP = $(this).prev("p");
                    if(emP.length){
                      if($.trim(emP.text()) == ""){
                        if(!emP.prev().length){
                          if(!$(text_body).prev(npfbase).length){
                            $(this).addClass("npf_photo_origin");
                            
                            // NO caption
                            if($.trim($(this).nextAll().text()) == "" || $.trim($(this).nextAll().html()) == ""){
                              $(text_body).addClass("npf_no_caption");
                              
                              if(reloz == "yes"){                                
                                // if yes-move,
                                // a. move it to the top
                                // b. but only do it if user wishes to remove OP info
                                if(rmvop == "yes"){
                                  emP.remove();
                                  $(this).prependTo($(text_body));
                                  $(this).nextAll().remove()
                                }
                                
                                else if(rmvop == "no"){
                                  $(this).css("margin-bottom","var(--NPF-Captions-Spacing)")
                                }                                
                              }//end if yes-move
                              
                              // if:
                              // a. no caption
                              // b. so OP info is ABOVE the npf image(s)
                              // c. user WANTS OP info to be removed
                              if(reloz == "no" && rmvop == "yes"){
                                emP.remove();
                                $(this).prependTo($(text_body));
                                $(this).nextAll().remove()
                              }
                            }//end NO caption
                            
                            // HAS caption
                            else {
                              $(text_body).addClass("npf_has_caption");
                              
                              if(reloz == "yes"){
                                emP.remove();
                                $(this).prependTo($(text_body));
                                $(this).css("margin-bottom","var(--NPF-Captions-Spacing)")
                              }
                            }//end HAS caption
                          }// end <p> condition #4
                        } // end <p> condition #3                 
                      }// end <p> condition #2
                    }// end <p> condition #1
                  
                })//end target first npf
            }//end if post is a REBLOG

        })//end npfbase each

        /*-------------------------------------------*/
        // OLD CAPTIONS
        npfbase.each(function(){
            let text_body = this;
          
            $(this).find(".npf_inst:first").each(function(){
                if(!$(this).prev().length){
                    if($(this).parent().is("blockquote")){
                        $(this).parent("blockquote").contents().filter(function(){
                            return this.nodeType == 3
                        }).wrap("<span/>");
                      
                        let peepee = $(this).parent().prev("p");
                        if(peepee.length){
                            // if previous <p> holds the @blog-name of OP
                            if(peepee.find("a.tumblr_blog").length){
                                peepee.contents().filter(function(){
                                    return this.nodeType == 3
                                }).wrap("<span/>");
                              
                                if(!peepee.prev().length){
                                    $(this).addClass("npf_photo_origin");

                                    // if npf has NO caption
                                    if($.trim($(this).nextAll().text()) == "" || $.trim($(this).nextAll().html()) == ""){
                                        $(text_body).addClass("npf_no_caption");
                                      
                                        peepee.find("span").each(function(){
                                            if($.trim($(this).text()) == ":"){
                                                $(this).remove()
                                            }
                                        })

                                        peepee.prepend("(Source: ");
                                        peepee.append(")");
                                      
                                        $(this).parent("blockquote").addClass("bbq-tbd");
                                      
                                        $(this).prependTo($(text_body))
                                        $(".bbq-tbd").remove();
                                        
                                        if(rmvop == "yes"){
                                            peepee.remove()
                                        }
                                    }//end if-no-capt
                                    
                                    // if npf DOES HAVE caption
                                    else {
                                        if(reloz == "yes"){
                                            $(this).prependTo($(text_body));
                                        }
                                    }
                                }// if a.tumblr-blog has no prev siblings
                                
                            }//end if a.tumblr-blog exists
                        }//end if peepee exists
                    }//end if parent is <blockquote>
                }//end if npf_inst has no prev sibling
            })//end npf_inst each
            
        })//end npfbase each
    }//end entire npf function
});//end ready
