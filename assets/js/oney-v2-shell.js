(function(){var root=document.documentElement;function get(){try{return localStorage.getItem("oney-theme")}catch(e){return null}}function put(v){try{localStorage.setItem("oney-theme",v)}catch(e){}}
root.setAttribute("data-theme",get()==="dark"?"dark":"light");
var btn=document.getElementById("oneyV2Toggle");if(btn){btn.addEventListener("click",function(){var next=root.getAttribute("data-theme")==="dark"?"light":"dark";root.setAttribute("data-theme",next);put(next)})}
var nav=document.querySelector("nav.oney-v2-nav"),burger=document.getElementById("oneyV2Burger"),menu=document.getElementById("oneyV2Menu");
if(nav&&burger&&menu){var isOpen=function(){return nav.classList.contains("is-open")},set=function(open){nav.classList.toggle("is-open",open);burger.setAttribute("aria-expanded",open?"true":"false");burger.setAttribute("aria-label",open?"Close menu":"Open menu")};
burger.addEventListener("click",function(){var open=!isOpen();set(open);if(open){var first=menu.querySelector("a");if(first)first.focus()}});
menu.addEventListener("click",function(e){if(e.target.closest("a"))set(false)});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&isOpen()){set(false);burger.focus()}});
document.addEventListener("click",function(e){if(isOpen()&&!nav.contains(e.target))set(false)});
if(window.matchMedia){var mq=window.matchMedia("(min-width:641px)"),onMq=function(e){if(e.matches)set(false)};if(mq.addEventListener)mq.addEventListener("change",onMq);else if(mq.addListener)mq.addListener(onMq)}}
})();
