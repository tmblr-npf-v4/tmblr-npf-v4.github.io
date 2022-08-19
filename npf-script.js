/*---------------------------------------------------------

    NPF images fix (v4.0) by @glenthemes [2022]
    https://waa.ai/tmblr-npf-v4
    
---------------------------------------------------------*/

window.npf_v4_fix = function(o_o){
    document.addEventListener("DOMContentLoaded",() => {	
        window.jQuery || includejQuery();
    	
    	function includejQuery(){
    		let jq = document.createElement("script");
    		jq.src = "//code.jquery.com/jquery-3.6.0.min.js#tmblr-npf-v4";
    
    		let head = document.getElementsByTagName("head")[0];
    
    		head.insertBefore(jq, head.firstChild);
    	}
    });
    
    let kykwc = Date.now();
    let estjQueryLoad = 1000; // estimated jQuery load time
    
    let loadjQuery = setInterval(() => {
    	if(Date.now() - kykwc > estjQueryLoad){
    		clearInterval(loadjQuery);
    	} else {
    		if(typeof jQuery !== "undefined"){
    			console.log("jquery has loaded");
    			npf_v4_fix()
    			clearInterval(loadjQuery);
    		}
    	}
    },0);
    
    function npf_v4_fix(){
        $(document).ready(function(){
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
        
            // wrap non-npf-inst items
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
            
            $(".npf_inst").each(function(){
                let npf_ole = $(this).find(".post_media_photo_anchor").length;
                $(this).attr("npf-items",npf_ole)
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
            function npfIMGheights(){
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

                        // loading fallback
                        setTimeout(() => {
                            colparent.attr("height",$(that).height());
                            genShortestCol();
                        },269)

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

                    // loading fallback
                    $(this).find("img").one("load",function(){
                        colparent.attr("height",$(this).height());
                        genShortestCol();
                    })
                })// end a.anchor each
            }//end npfIMGheights
            
            npfIMGheights();
          
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
                var that = $(this);
                
                $(this).attr("npf-id","npf_" + Math.random().toString(36).substr(2, 5))
                
                $(this).find(".post_media_photo_anchor").each(function(a_a){
                    a_a += 1;
                    $(this).attr("npf-order",a_a)
                })
        
                /*----------*/
            	
            	$(this).find(".post_media_photo_anchor img").each(function(m_m){
            	    m_m += 1;
            	    $(this).attr("npf-img-order",m_m);
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
                
                $("body").prepend("<div bmlyi style='position:absolute; top:0; left:0; width:0; height:0; visibility:hidden'><img src='" + $(this).attr("data-big-photo") + "'></div>");
                })
        
                $(".post_media_photo_anchor",this).attr("onclick","Tumblr.Lightbox.init(" + JSON.stringify(aerie) + ")")
                
                // make npf images HD
                $(this).find("[data-big-photo]:has(img)").each(function(){
                    let bbdd = $(this).attr("data-big-photo");
                    $(this).find("img").attr("src",bbdd)
                })
        
                // remove the auto-lightbox on single npf images
                // (originally on a.post_media_photo_anchor)
                $("[data-big-photo]",this).removeAttr("data-big-photo");
        
            })//end .npf_inst
        
            /*-------------------------------------------*/
            
            $(".npf_inst .post_media_photo_anchor").click(function(){
        
                $("body").addClass("npf-lightbox-active");
                
                $("[bmlyi]").remove();
                
                let npf_id = $(this).parents(".npf_inst").attr("npf-id");
                
                let npf_total = Number($(this).parents(".npf_inst").attr("npf-items"));
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
                    
                    $(".tmblr-lightbox").attr("npf-id",npf_id);
                    $(".tmblr-lightbox").attr("npf-total",npf_total);
                    $(".tmblr-lightbox").attr("current-npf",ondex);
                    
                    
        
                    let lqwju = ondex - bonks;
                    let clicksneeded = lqwju + 1;
        
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
            
            function newCapts(){
                npfbase.each(function(){
                    let text_body = this;
                    // if npf's post is an ORIGINAL POST
                    if($(this).is("[original-post]")){
                        $(this).find(".npf_inst:first").each(function(){
                            // if similar to an original photo post
                            // aka if there is no text before it
                            if($.trim($(this).prevAll().text()) == ""){
                                $(this).addClass("npf_photo_origin");
                                $(this).insertBefore($(text_body));
                                
                                // NO text after img(s)
                                if($.trim($(this).nextAll().text()) == "" || $.trim($(this).nextAll().html()) == ""){
                                    
                                    $(text_body).remove();
                                }
                                
                                // HAS text after img(s)
                                else {
                                    
                                }
                            }//end if img(s) has no prev txt
                        })//end if npf_inst each
                    }//end if [original-post]
            
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
                                          $(this).insertBefore($(text_body));
                                          $(this).next(".npf_no_caption").remove()
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
                                        $(this).insertBefore($(text_body));
                                        $(this).next(".npf_no_caption").remove()
                                      }
                                    }//end NO caption
                                    
                                    // HAS caption
                                    else {
                                      $(text_body).addClass("npf_has_caption");
                                      
                                      if(reloz == "yes"){
                                        emP.remove();
                                        $(this).insertBefore($(text_body));
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
            }//end newCapts()
            
            newCapts();
        
            /*-------------------------------------------*/
            // OLD CAPTIONS
            
            function oldCapts(){
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
                                              
                                                $(this).insertBefore($(text_body))
                                                $(".bbq-tbd").remove();
                                                
                                                if(rmvop == "yes"){
                                                    peepee.remove()
                                                }
                                            }//end if-no-capt
                                            
                                            // if npf DOES HAVE caption
                                            else {
                                                if(reloz == "yes"){
                                                    $(this).insertBefore($(text_body));
                                                }
                                            }
                                        }// if a.tumblr-blog has no prev siblings
                                        
                                    }//end if a.tumblr-blog exists
                                }//end if peepee exists
                            }//end if parent is <blockquote>
                        }//end if npf_inst has no prev sibling
                    })//end npf_inst each
                    
                })//end npfbase each
            }//end oldCapts()
            
            oldCapts();
            
            /*-------------------------------------------*/
            // NPF LIGHTBOX BEHAVIOR, MOUSE CLICKS
            $(document).on("mouseover", ".lightbox-image", function(){
                let totalNPF = Number($(".tmblr-lightbox").attr("npf-total"));
                let npf_id = $(".tmblr-lightbox").attr("npf-id");
                
                if($(this).css("visibility") !== "hidden"){    
                    let currentNPF = Number($(".tmblr-lightbox").attr("current-npf"));
                    
                    let hoveredNPF = $(this).attr("src");
                    
                    let npfFAM = $(".npf_inst[npf-id='" + npf_id + "']");
                    
                    $(this).mousedown(function(h_h){
                        if(h_h.button == 0){
                            $(this).mouseup(function(){
                                npfFAM.find("img").each(function(){
                                    if($(this).attr("src") == hoveredNPF){
                                        
                                        let wozvc = $(this).attr("npf-img-order");
                                        
                                        // if the CENTER lightbox image is clicked, + NPF showcase order by 1
                                        if(currentNPF == wozvc){
                                            if(currentNPF < totalNPF){
                                                $(".tmblr-lightbox").attr("current-npf",Number(wozvc) + 1);
                                            }
                                            
                                        }
                                        
                                        // if LEFT or RIGHT lightbox image is clicked, + or - NPF showcase order number depending on direction
                                        else {
                                            $(".tmblr-lightbox").attr("current-npf",wozvc)
                                        }
                                        
                                        
                                    }//end: find matching img src
                                })//end posts' npf imgs
                            })//end mouseup
                        }//end mousedown = left
                    })//end mousedown
                }//end if-visible
            });
            
            /*-------------------------------------------*/
            // NPF LIGHTBOX BEHAVIOR, ARROW KEYS
            $(document).keydown(function(e_e){
                // left arrow key
                if(e_e.keyCode == 37){
                    npf_prev();
                    return false;
                }
                
                else if(e_e.keyCode == 39){
                    npf_next();
                    return false;
                }
            });//end keydown
            
            function npf_prev(){
                if($(".tmblr-lightbox[npf-total]").length){
                    let currentNPF = Number($(".tmblr-lightbox").attr("current-npf"));
                    
                    let prevNPF = Number(currentNPF) - 1;
                    
                    if(currentNPF > 1){
                        let quez = $(".lightbox-image-container").map(function(){
                            return parseFloat($(this).css("left"));
                        }).get();
                        
                        let mdirz = quez.filter(function(l_l){
                            return l_l < 0;
                        })
                        
                        let qquez = Math.max.apply(Math,mdirz);
                        
                        $(".lightbox-image-container").filter(function(){
                            return $(this).css("left") == qquez + "px"
                        }).click();
                        
                        $(".tmblr-lightbox").attr("current-npf",prevNPF);
                    }
                    
                    
                }
            }//end left arrow
            
            function npf_next(){
                if($(".tmblr-lightbox[npf-total]").length){
                    let currentNPF = Number($(".tmblr-lightbox").attr("current-npf"));
                    
                    let nextNPF = Number(currentNPF) + 1;
                    let npfTotal = Number($(".tmblr-lightbox").attr("npf-total"))
                    
                    if(currentNPF < npfTotal){
                        let quez = $(".lightbox-image-container").map(function(){
                            return parseFloat($(this).css("left"));
                        }).get();
                        
                        let mdirz = quez.filter(function(l_l){
                            return l_l > 0;
                        })
                        
                        let qquez = Math.min.apply(Math,mdirz);
                        
                        $(".lightbox-image-container").filter(function(){
                            return $(this).css("left") == qquez + "px"
                        }).click();
                        
                        $(".tmblr-lightbox").attr("current-npf",nextNPF);
                    }
                }
            }//end right arrow
            
            $(window).load(function(){
                npfIMGheights();
                $("[bmlyi]").remove();
            });
        });//end ready
    }//end dostuff
}//end entire npf function
