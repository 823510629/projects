var slideGuider=function(e){e=LT.Object.extend({second:0,close:null},e),!LT.User.isLogin&&window.setTimeout(function(){tlog=window.tlog||[],tlog.push("s:w_layer_show_new"),NodeTpl.get("http://s.lietou-static.com/revs/tpls/www/beta2/user/slide_register_guide_36e0a85f.js",e,function(e){$("body").append(e)})},1e3*e.second)},topAttachGuider=function(e){e=LT.Object.extend({domHeight:"20px"},e),!LT.User.isLogin&&function(){NodeTpl.get("http://s.lietou-static.com/revs/tpls/www/beta2/home/top_register_guide_9d1690d5.js",e,function(e){$(e).insertAfter($("header"))})}()};