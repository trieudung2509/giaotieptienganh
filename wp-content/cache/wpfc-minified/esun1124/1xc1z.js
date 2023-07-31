var CRUMINA={};
(function ($){
"use strict";
var $window=$(window),
$document=$(document),
$body=$('body'),
$header=$('#site-header'),
$preloader=$('#hellopreloader'),
$topbar=$header.siblings('.top-bar'),
$counter=$('.counter'),
$progress_bar=$('.skills-item'),
$pie_chart=$('.pie-chart'),
$animatedIcons=$('.js-animate-icon'),
$asidePanel=$('.right-menu'),
$subscribe_section=$('#subscribe-section'),
back_to_top=document.querySelector('.back-to-top'),
$footer=$('#site-footer'),
$mainContent=$('.content-wrapper'),
$adminBar=$('#wpadminbar');
var $popupSearch=$(".popup-search");
CRUMINA.backToTop=function (){
window.onscroll=function (){
if(back_to_top.classList.contains('back-to-top-fixed')){
let pageOffset=document.documentElement.scrollTop||document.body.scrollTop;
if(pageOffset > 500){
back_to_top.style.opacity="1";
back_to_top.style.visibility="visible";
}else{
back_to_top.style.opacity="0";
back_to_top.style.opacity="hidden";
}}
};
back_to_top.addEventListener("click", function (e){
e.preventDefault();
window.scroll({top: 0, behavior: 'smooth'});
});
};
CRUMINA.preloader=function (){
setTimeout(function (){
$preloader.fadeOut(800);
}, 500);
return false;
};
CRUMINA.parallaxFooter=function (){
if($footer.length&&$footer.hasClass('js-fixed-footer')){
$footer.before('<div class="block-footer-height"></div>');
$('.block-footer-height').matchHeight({
target: $footer
});
}};
CRUMINA.counters=function (){
if($counter.length){
$counter.each(function (){
var $this=$(this);
$this.waypoint(function (){
var $current=$this.find('span'),
$count=$current.data('to');
if(!$current.hasClass('animated')){
$current.countup($count);
$current.addClass('animated');
}}, {offset: '95%', triggerOnce: true});
});
}};
CRUMINA.progresBars=function (){
$progress_bar.each(function (){
var $this=$(this);
$this.find('.skills-item-meter-active').addClass('item-fully-transparent');
$this.waypoint(function (){
var $current=$this.find('.count-animate'),
$count=$current.data('to');
if(!$current.hasClass('animated')){
$current.countup($count);
$current.addClass('animated');
}
$this.find('.skills-item-meter-active').fadeTo(300, 1).addClass('skills-animate').removeClass('item-fully-transparent');
}, {offset: '85%', triggerOnce: true});
});
};
CRUMINA.pieCharts=function (){
if($pie_chart.length){
$pie_chart.each(function (){
$(this).waypoint(function (){
var current_cart=$(this);
var startColor=current_cart.data('startcolor');
var endColor=current_cart.data('endcolor');
var emptyfill=current_cart.data('emptyfill');
var chartsize=parseInt(current_cart.data('chartsize'));
var counter=current_cart.data('value') * 100;
current_cart.circleProgress({
thickness: chartsize / 20,
size: chartsize,
startAngle: -Math.PI / 4 * 2,
emptyFill: emptyfill,
lineCap: 'round',
fill: {
gradient: [endColor, startColor],
gradientAngle: Math.PI / 4
}}).on('circle-animation-progress', function (event, progress){
current_cart.find('.content').html(parseInt(counter * progress, 10) + '<span>%</span>'
)
});
}, {offset: '90%', triggerOnce: true});
});
}};
CRUMINA.animateSvg=function (){
if($animatedIcons.length){
$animatedIcons.each(function (){
var $this=$(this);
$(this).waypoint(function (){
var mySVG=$this.find('> svg').drawsvg();
mySVG.drawsvg('animate');
}, {offset: '95%', triggerOnce: true});
});
}};
CRUMINA.chartJs=function (){
$('.chart-js-run').each(function (){
var $wrapper=$(this);
$(this).waypoint(function (){
var el_id=$wrapper.data('id');
var dataholder=$wrapper.find('.chart-data');
var $fill=true;
var $scales=true;
var $borderColor='rgba(255, 255, 255, 0.1)';
var ctx=document.getElementById(el_id);
if($wrapper.data('type')==='line'){
$fill=false;
$borderColor=dataholder.data('bordercolor');
}
if($wrapper.data('type')==='doughnut'||$wrapper.data('type')==='pie'||$wrapper.data('type')==='polarArea'){
$scales=false;
}
var myChart=new Chart(ctx, {
type: $wrapper.data('type'),
data: {
labels: dataholder.data('labels'),
datasets: [
{
data: dataholder.data('numbers'),
backgroundColor: dataholder.data('colors'),
borderColor: $borderColor,
pointBackgroundColor: dataholder.data('colors'),
pointBorderColor: dataholder.data('colors'),
fill: $fill
}]
},
options: {
legend: {
display: false
},
scales: {
yAxes: [{
display: $scales,
ticks: {
beginAtZero: true,
min: 0
},
}],
xAxes: [{
display: false,
}]
}},
animation: {
animateScale: true
}});
}, {offset: '75%', triggerOnce: true});
});
};
CRUMINA.runchartJS=function ($wrapper){
var el_id=$wrapper.data('id');
var dataholder=$wrapper.find('.chart-data');
var $fill=true;
var $scales=true;
var $borderColor='rgba(255, 255, 255, 0.1)';
var ctx=document.getElementById(el_id);
if($wrapper.data('type')==='line'){
$fill=false;
$borderColor=dataholder.data('bordercolor');
}
if($wrapper.data('type')==='doughnut'||$wrapper.data('type')==='pie'||$wrapper.data('type')==='polarArea'){
$scales=false;
}
var myChart=new Chart(ctx, {
type: $wrapper.data('type'),
data: {
labels: dataholder.data('labels'),
datasets: [
{
data: dataholder.data('numbers'),
backgroundColor: dataholder.data('colors'),
borderColor: $borderColor,
pointBackgroundColor: dataholder.data('colors'),
pointBorderColor: dataholder.data('colors'),
fill: $fill
}]
},
options: {
legend: {
display: false
},
scales: {
yAxes: [{
display: $scales,
ticks: {
beginAtZero: true,
min: 0
},
}],
xAxes: [{
display: false,
}]
}},
animation: {
animateScale: true
}});
};
$("#top-bar-language").on('change', function (){
var lang_href=jQuery(jQuery(this).children('[value=' + $(this).val() + ']')).data('url');
if(lang_href){
document.location.href=lang_href;
}});
CRUMINA.togglePanel=function (){
if($asidePanel.length){
$asidePanel.toggleClass('opened');
$body.toggleClass('overlay-enable');
}};
CRUMINA.toggleBar=function (){
$topbar.toggleClass('open');
$body.toggleClass('overlay-enable');
return false;
};
CRUMINA.toggleSearch=function (){
$body.toggleClass('open');
$('.overlay_search-input').focus();
};
CRUMINA.mediaPopups=function (){
$('.js-popup-iframe').magnificPopup({
disableOn: 700,
type: 'iframe',
mainClass: 'mfp-fade',
removalDelay: 160,
preloader: false,
fixedContentPos: false
});
$('.js-zoom-image, .link-image').magnificPopup({
type: 'image',
removalDelay: 500,
callbacks: {
beforeOpen: function (){
this.st.image.markup=this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
this.st.mainClass='mfp-zoom-in';
}},
closeOnContentClick: true,
midClick: true
});
$('.js-zoom-gallery').each(function (){
$(this).magnificPopup({
delegate: 'a[data-lightbox="gallery-item"]',
type: 'image',
gallery: {
enabled: true
},
removalDelay: 500,
callbacks: {
beforeOpen: function (){
this.st.image.markup=this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
this.st.mainClass='mfp-zoom-in';
}},
closeOnContentClick: true,
midClick: true
});
});
$('.js-open-video').magnificPopup({
type: 'inline',
mainClass: 'inline--media-content overlay active animation-wrapper',
zoom: {
enabled: true,
duration: 300,
easing: 'ease-in-out'
},
callbacks: {
open: function (){
var player=plyr.setup('.plyr-module');
},
close: function (){
var player=plyr.get('.plyr-module');
player[0].destroy();
}}
});
};
CRUMINA.equalHeight=function (){
$('.js-equal-child').find('.theme-module, .crumina-module').matchHeight({
property: 'min-height'
});
};
CRUMINA.SubscribeScrollAnnimation=function (){
var controller=new ScrollMagic.Controller();
new ScrollMagic.Scene({triggerElement: "#subscribe-section"})
.setVelocity(".gear", {opacity: 1, rotateZ: "360deg"}, 1200)
.triggerHook(0.8)
.addTo(controller);
new ScrollMagic.Scene({triggerElement: "#subscribe-section"})
.setVelocity(".mail", {opacity: 1, bottom: "0"}, 600)
.triggerHook(0.8)
.addTo(controller);
new ScrollMagic.Scene({triggerElement: "#subscribe-section"})
.setVelocity(".mail-2", {opacity: 1, right: "0"}, 800)
.triggerHook(0.9)
.addTo(controller);
};
CRUMINA.SeoScoreScrollAnnimation=function (){
var controller=new ScrollMagic.Controller();
new ScrollMagic.Scene({triggerElement: ".crumina-your-score"})
.setVelocity(".crumina-your-score .seoscore1", {opacity: 1, top: "-10"}, 400)
.triggerHook("onEnter")
.addTo(controller);
new ScrollMagic.Scene({triggerElement: ".crumina-your-score"})
.setVelocity(".crumina-your-score .seoscore2", {opacity: 1, bottom: "0"}, 800)
.triggerHook(0.7)
.addTo(controller);
new ScrollMagic.Scene({triggerElement: ".crumina-your-score"})
.setVelocity(".crumina-your-score .seoscore3", {opacity: 1, bottom: "0"}, 1000)
.triggerHook(0.8)
.addTo(controller);
};
CRUMINA.TestimonialScrollAnnimation=function (){
var controller=new ScrollMagic.Controller();
new ScrollMagic.Scene({triggerElement: ".crumina-testimonial-slider"})
.setVelocity(".crumina-testimonial-slider .testimonial2", {opacity: 1, bottom: "-50"}, 400)
.triggerHook(0.6)
.addTo(controller);
new ScrollMagic.Scene({triggerElement: ".crumina-testimonial-slider"})
.setVelocity(".crumina-testimonial-slider .testimonial1", {opacity: 1, top: "20"}, 600)
.triggerHook(1)
.addTo(controller);
};
CRUMINA.OurVisionScrollAnnimation=function (){
var controller=new ScrollMagic.Controller();
new ScrollMagic.Scene({triggerElement: ".crumina-our-vision"})
.setVelocity(".crumina-our-vision .elements", {opacity: 1}, 600)
.triggerHook(0.6)
.addTo(controller);
new ScrollMagic.Scene({triggerElement: ".crumina-our-vision"})
.setVelocity(".crumina-our-vision .eye", {opacity: 1, bottom: "-90"}, 1000)
.triggerHook(1)
.addTo(controller);
};
CRUMINA.MountainsScrollAnnimation=function (){
var controller=new ScrollMagic.Controller();
new ScrollMagic.Scene({triggerElement: ".crumina-background-mountains"})
.setVelocity(".crumina-background-mountains .mountain1", {
opacity: 1,
bottom: "0",
paddingBottom: "10%"
}, 800)
.triggerHook(0.4)
.addTo(controller);
new ScrollMagic.Scene({triggerElement: ".crumina-background-mountains"})
.setVelocity(".crumina-background-mountains .mountain2", {opacity: 1, bottom: "0"}, 800)
.triggerHook(0.3)
.addTo(controller);
};
CRUMINA.SeoCustomScrollAnnimation=function (){
var controller=new ScrollMagic.Controller();
new ScrollMagic.Scene({triggerElement: ".crumina-custom-image-bg.b_c"})
.setVelocity(".crumina-custom-image-bg.b_c img", {opacity: 1, bottom: "0"}, 800)
.triggerHook(0.5)
.addTo(controller);
new ScrollMagic.Scene({triggerElement: ".crumina-custom-image-bg.t_c"})
.setVelocity(".crumina-custom-image-bg.t_c img", {opacity: 1, top: "0"}, 800)
.triggerHook(0.5)
.addTo(controller);
new ScrollMagic.Scene({triggerElement: ".crumina-custom-image-bg.c_c"})
.setVelocity(".crumina-custom-image-bg.c_c img", {opacity: 1, bottom: "50%"}, 800)
.triggerHook(0.5)
.addTo(controller);
};
CRUMINA.blogMasonry=function (){
$('.post--grid-masonry-container').each(function (){
var $grid=$(this);
$grid.imagesLoaded().done(function (){
$grid.isotope({
itemSelector: '.post--grid-masonry-col',
layoutMode: 'masonry',
percentPosition: true
});
});
});
};
CRUMINA.IsotopeSort=function (){
var $container=$('.sorting-container');
$container.each(function (){
var $current=$(this);
var layout=($current.data('layout').length) ? $current.data('layout'):'masonry';
$current.isotope({
itemSelector: '.sorting-item',
layoutMode: layout,
percentPosition: true
});
$current.imagesLoaded().progress(function (){
$current.isotope('layout');
});
var $sorting_buttons=$current.siblings('.sorting-menu').find('li');
$sorting_buttons.each(function (){
var selector=$(this).data('filter');
var count=$container.find(selector).length;
if(count===0){
$(this).css('display', 'none');
}});
if($sorting_buttons.filter(':visible').length < 2){
$container.siblings('.sorting-menu').hide();
}
$sorting_buttons.on('click', function (){
if($(this).hasClass('active'))
return false;
$(this).parent().find('.active').removeClass('active');
$(this).addClass('active');
var filterValue=$(this).data('filter');
if(typeof filterValue!="undefined"){
$current.isotope({filter: filterValue});
return false;
}});
});
};
CRUMINA.Swiper={
$swipers: {},
init: function (){
var _this=this;
$('.swiper-container').each(function (idx){
var $self=$(this);
var id='swiper-unique-id-' + idx;
$self.addClass(id + ' initialized').attr('id', id);
$self.parent().find('.swiper-pagination').addClass('pagination-' + id);
_this.$swipers[id]=new Swiper('#' + id, _this.getParams($self, id));
_this.addEventListeners(_this.$swipers[id]);
});
},
getParams: function ($swiper, id){
var params={
parallax: true,
breakpoints: false,
keyboardControl: true,
setWrapperSize: true,
preloadImages: false,
lazy: true,
updateOnImagesReady: true,
prevNext: ($swiper.data('prev-next')) ? $swiper.data('prev-next'):false,
changeHandler: ($swiper.data('change-handler')) ? $swiper.data('change-handler'):'',
direction: ($swiper.data('direction')) ? $swiper.data('direction'):'horizontal',
mousewheel: ($swiper.data('mouse-scroll')) ? {
releaseOnEdges: true
}:false,
slidesPerView: ($swiper.data('show-items')) ? $swiper.data('show-items'):1,
slidesPerGroup: ($swiper.data('scroll-items')) ? $swiper.data('scroll-items'):1,
spaceBetween: ($swiper.data('space-between')||$swiper.data('space-between')==0) ? $swiper.data('space-between'):20,
centeredSlides: ($swiper.data('centered-slider')) ? $swiper.data('centered-slider'):false,
autoplay: ($swiper.data('autoplay')) ? {
delay: parseInt($swiper.data('autoplay'))
}:false,
autoHeight: ($swiper.hasClass('auto-height')) ? true:false,
loop: ($swiper.data('loop')==false) ? $swiper.data('loop'):true,
effect: ($swiper.data('effect')) ? $swiper.data('effect'):'slide',
pagination: {
type: ($swiper.data('pagination')) ? $swiper.data('pagination'):'bullets',
el: '.pagination-' + id,
clickable: true
},
coverflow: {
stretch: ($swiper.data('stretch')) ? $swiper.data('stretch'):0,
depth: ($swiper.data('depth')) ? $swiper.data('depth'):0,
slideShadows: false,
rotate: 0,
modifier: 2
},
fade: {
crossFade: ($swiper.data('crossfade')) ? $swiper.data('crossfade'):true
},
};
if(params['slidesPerView'] > 1){
params['breakpoints']={
320: {
slidesPerView: 1,
slidesPerGroup: 1
},
580: {
slidesPerView: 2,
slidesPerGroup: 2
},
769: {
slidesPerView: params['slidesPerView'],
slidesPerGroup: params['slidesPerView']
}};}
return params;
},
addEventListeners: function ($swiper){
var _this=this;
var $wrapper=$swiper.$el.closest('.crumina-module-slider');
if($swiper.params.prevNext){
$wrapper.on('click', '.btn-next, .btn-prev', function (event){
event.preventDefault();
var $self=$(this);
if($self.hasClass('btn-next')){
$swiper.slideNext();
}else{
$swiper.slidePrev();
}});
}
$wrapper.on('click', '.slider-slides .slides-item', function (event){
event.preventDefault();
var $self=$(this);
if($swiper.params.loop){
$swiper.slideToLoop($self.index());
}else{
$swiper.slideTo($self.index());
}});
$swiper.on('slideChange', function (){
var handler=_this.changes[$swiper.params.changeHandler];
if(typeof handler==='function'){
handler($swiper, $wrapper, _this, this.realIndex);
}});
},
changes: {
'thumbsParent': function ($swiper, $wrapper){
var $thumbs=$wrapper.find('.slider-slides .slides-item');
$thumbs.removeClass('swiper-slide-active');
$thumbs.eq($swiper.realIndex).addClass('swiper-slide-active');
}}
};
CRUMINA.resizeSwiper=function (swiper){
swiper=(swiper) ? swiper:$(this)[0].swiper;
var activeSlideHeight=swiper.slides.eq(swiper.activeIndex).find('> *').outerHeight();
var $pagination=$(swiper.container).find('.slider-slides'),
$pagination_height=($pagination.length) ? $pagination.height():0;
if($(swiper.container).hasClass('pagination-vertical')){
var headlineHeights=swiper.slides.map(function (){
return $(this).find('> *').height();
}).get();
var maxHeadLineHeight=Math.max.apply(Math, headlineHeights);
swiper.container.css({height: maxHeadLineHeight + 'px'});
swiper.update(true)
}
if($pagination_height > 0){
swiper.container.css('paddingBottom', $pagination_height + 'px')
swiper.onResize();
}
if($(swiper.container).hasClass('auto-height')){
swiper=(swiper) ? swiper:$(this)[0].swiper;
swiper.container.css({height: activeSlideHeight + 'px'});
swiper.onResize();
}
CRUMINA.mainSliderHeight();
};
CRUMINA.mainSliderHeight=function (){
setTimeout(function (){
$('.swiper-container.js-full-window').each(function (){
var $slider=$(this),
$pagination=$slider.find('.slider-slides'),
$pagination_height=($pagination.length) ? $pagination.height():0,
winHei=$(window).height(),
$sliderSpaceOffsetTop=$mainContent.offset().top,
$sliderSlide=('.main-slider .container.d-flex'),
mobileWidthBase=580;
if($(window).innerWidth() > mobileWidthBase){
$($sliderSlide).imagesLoaded().done(function (){
var $sliderSlideHeight=$($sliderSlide).outerHeight();
if($sliderSlideHeight > winHei - $pagination_height - $sliderSpaceOffsetTop){
$slider.css('min-height', 'auto').css('height', 'auto');
$slider.find('> .swiper-wrapper').css('min-height', 'auto').css('height', 'auto');
}else{
$slider.css('min-height', winHei - $sliderSpaceOffsetTop + 'px').css('height', winHei - $sliderSpaceOffsetTop + 'px');
$slider.find('> .swiper-wrapper').css('min-height', winHei - $pagination_height - $sliderSpaceOffsetTop + 'px').css('height', winHei - $pagination_height - $sliderSpaceOffsetTop + 'px');
}});
}else{
return
}});
}, 300);
};
CRUMINA.initSmoothScroll=function (){
var $adminBarHeight=$adminBar.outerHeight(),
$scrollOffset=(70 + $adminBarHeight);
const hashLink=window.location.hash;
if(hashLink.length){
const $anchor=document.querySelector(hashLink);
let elmTop=$anchor.getBoundingClientRect().top + window.scrollY;
elmTop -=$scrollOffset;
window.scroll({top: elmTop, behavior: 'smooth'});
}
const menuLinks=document.querySelectorAll('a[href*="#"]:not(.accordion-heading)');
for (const link of menuLinks){
link.addEventListener("click", function (e){
const target=this.getAttribute("href");
const hash=target.split("#")[1];
const targetEl=document.getElementById(hash);
if(typeof (targetEl)!='undefined'&&targetEl!=null){
e.preventDefault();
let targetTop=targetEl.getBoundingClientRect().top + window.scrollY;
targetTop -=$scrollOffset;
window.scroll({top: targetTop, behavior: 'smooth'});
}});
}};
CRUMINA.initVideo=function (){
plyr.setup('.plyr');
};
CRUMINA.burgerAnimation=function (){
var beginAC=80,
endAC=320,
beginB=80,
endB=320;
function inAC(s){
s.draw('80% - 240', '80%', 0.3, {
delay: 0.1,
callback: function (){
inAC2(s)
}});
}
function inAC2(s){
s.draw('100% - 545', '100% - 305', 0.6, {
easing: ease.ease('elastic-out', 1, 0.3)
});
}
function inB(s){
s.draw(beginB - 60, endB + 60, 0.1, {
callback: function (){
inB2(s)
}});
}
function inB2(s){
s.draw(beginB + 120, endB - 120, 0.3, {
easing: ease.ease('bounce-out', 1, 0.3)
});
}
function outAC(s){
s.draw('90% - 240', '90%', 0.1, {
easing: ease.ease('elastic-in', 1, 0.3),
callback: function (){
outAC2(s)
}});
}
function outAC2(s){
s.draw('20% - 240', '20%', 0.3, {
callback: function (){
outAC3(s)
}});
}
function outAC3(s){
s.draw(beginAC, endAC, 0.7, {
easing: ease.ease('elastic-out', 1, 0.3)
});
}
function outB(s){
s.draw(beginB, endB, 0.7, {
delay: 0.1,
easing: ease.ease('elastic-out', 2, 0.4)
});
}
function addScale(m){
m.className='menu-icon-wrapper scaled';
}
function removeScale(m){
m.className='menu-icon-wrapper';
}
var pathD=document.getElementById('pathD'),
pathE=document.getElementById('pathE'),
pathF=document.getElementById('pathF'),
segmentD=new Segment(pathD, beginAC, endAC),
segmentE=new Segment(pathE, beginB, endB),
segmentF=new Segment(pathF, beginAC, endAC),
wrapper2=document.getElementById('menu-icon-wrapper'),
trigger2=document.getElementById('menu-icon-trigger'),
toCloseIcon2=true;
wrapper2.style.visibility='visible';
trigger2.onclick=function (){
addScale(wrapper2);
if(toCloseIcon2){
inAC(segmentD);
inB(segmentE);
inAC(segmentF);
}else{
outAC(segmentD);
outB(segmentE);
outAC(segmentF);
}
toCloseIcon2 = !toCloseIcon2;
setTimeout(function (){
removeScale(wrapper2)
}, 450);
};};
CRUMINA.indicatorMegaMenu=function (){
var megaMenuParrent=$('.menu-item-has-mega-menu > a');
megaMenuParrent.append('<span class="megamenu-indicator"></span>')
};
$window.keydown(function (eventObject){
if(eventObject.which==27){
if($asidePanel.hasClass('opened')){
CRUMINA.togglePanel();
}
if($popupSearch.hasClass('open')){
$popupSearch.toggleClass('open');
}
if($body.hasClass('open')){
CRUMINA.toggleSearch();
}
if($topbar.hasClass('open')){
CRUMINA.toggleBar();
}}
});
$document.on('click', function (event){
if(!$(event.target).closest('.search_main').length&&!$(event.target).closest($popupSearch).length&&$popupSearch.hasClass('open')){
$popupSearch.toggleClass('open');
}});
jQuery(".js-close-aside").on('click', function (){
if($asidePanel.hasClass('opened')){
CRUMINA.togglePanel();
}
return false;
});
jQuery(".js-open-aside").on('click', function (){
if(!$asidePanel.hasClass('opened')){
CRUMINA.togglePanel();
}
return false;
});
jQuery(".top-bar-link").on('click', function (){
CRUMINA.toggleBar();
});
jQuery('.top-bar-close').on('click', function (){
CRUMINA.toggleBar();
});
jQuery(".js-open-search").on('click', function (){
CRUMINA.toggleSearch();
return false;
});
jQuery(".overlay_search-close").on('click', function (){
$body.removeClass('open');
return false;
});
jQuery(".js-open-p-search").on('click', function (){
var $input=$popupSearch.find('input');
$popupSearch.toggleClass('open');
$popupSearch.animate({
'width': $popupSearch.closest('.container').width()
}, 600);
setTimeout(function (){
$input.focus();
}, 800);
});
$('.plyr').on('click', function (){
$(this).removeClass('hide-controls');
});
CRUMINA.quantity_selector_button_mod=function (){
jQuery(".quantity input[type=number]").each(function (){
var number=jQuery(this),
max=parseFloat(number.attr('max')),
min=parseFloat(number.attr('min')),
step=parseInt(number.attr('step'), 10),
newNum=jQuery(jQuery('<div />').append(number.clone(true)).html().replace('number', 'text')).insertAfter(number);
number.remove();
setTimeout(function (){
if(newNum.next('.quantity-plus').length==0){
var minus=jQuery('<input type="button" value="-" class="quantity-minus">').insertBefore(newNum),
plus=jQuery('<input type="button" value="+" class="quantity-plus">').insertAfter(newNum);
minus.on('click', function (){
var the_val=parseInt(newNum.val(), 10) - step;
the_val=the_val < 0 ? 0:the_val;
the_val=the_val < min ? min:the_val;
newNum.val(the_val);
enable_update_cart_button();
});
plus.on('click', function (){
var the_val=parseInt(newNum.val(), 10) + step;
the_val=the_val > max ? max:the_val;
newNum.val(the_val);
enable_update_cart_button();
});
}}, 10);
});
};
function enable_update_cart_button(){
var $update_cart_button=jQuery('table.shop_table.cart').closest('form').find('input[name="update_cart"]');
if($update_cart_button.length){
$update_cart_button.prop('disabled', false);
}}
jQuery(document).bind("updated_wc_div", function (){
CRUMINA.quantity_selector_button_mod();
});
$('.accordion-heading').on('click', function (){
$(this).parents('.panel-heading').toggleClass('active');
$(this).parents('.accordion-panel').toggleClass('active');
});
CRUMINA.initAccordion=function (wrp){
$(wrp).find('.accordion-heading')
.off('click')
.on('click', function (){
$(this).parents('.panel-heading').toggleClass('active');
$(this).parents('.accordion-panel').toggleClass('active');
});
};
$(".input-dark").find('input').focus(function (){
$(this).closest('form').addClass('input-drop-shadow');
}).blur(function (){
$(this).closest('form').removeClass('input-drop-shadow');
});
CRUMINA.navigation=function (){
var navigation=new Navigation(document.getElementById("site-header"), {
autoSubmenuIndicator: false
});
if($header.hasClass('sticky-top')){
window.addEventListener('scroll', function (event){
var timeout;
if(timeout){
window.cancelAnimationFrame(timeout);
}
timeout=window.requestAnimationFrame(function (){
let scrollPosition=Math.round(window.scrollY);
let headerHeight=$header.outerHeight();
if(scrollPosition > headerHeight){
$header.addClass('header--fixed');
}else{
$header.removeClass('header--fixed');
}});
}, false);
let scrollPosition=Math.round(window.scrollY);
let headerHeight=$header.outerHeight();
if(scrollPosition > headerHeight){
$header.addClass('header--fixed');
}else{
$header.removeClass('header--fixed');
}}
};
CRUMINA.fixMainMenu=function (){
const mobileWidthBase=992;
var submenus=$('.navigation-menu').children("li").find(".navigation-dropdown");
if($(window).innerWidth() > mobileWidthBase){
var menu_width=$("body").outerWidth(true);
for (var i=0; i < submenus.length; i++){
var submenusPosition=$(submenus[i]).css("display", "block").offset().left;
if($(submenus[i]).outerWidth() + submenusPosition > menu_width){
$(submenus[i]).addClass("navigation-dropdown-left");
}else{
if(menu_width==$(submenus[i]).outerWidth()||(menu_width - $(submenus[i]).outerWidth()) < 20){
$(submenus[i]).addClass("navigation-dropdown-left");
}
if(submenusPosition + $(submenus[i]).outerWidth() < menu_width){
$(submenus[i]).addClass("navigation-dropdown-right");
}}
}}
};
CRUMINA.init=function (){
CRUMINA.navigation();
CRUMINA.fixMainMenu();
if($('#menu-icon-wrapper').length){
CRUMINA.burgerAnimation();
}
if(typeof (back_to_top)!='undefined'&&back_to_top!=null){
CRUMINA.backToTop();
}
CRUMINA.Swiper.init();
CRUMINA.mainSliderHeight();
CRUMINA.equalHeight();
CRUMINA.mediaPopups();
CRUMINA.IsotopeSort();
CRUMINA.blogMasonry();
CRUMINA.parallaxFooter();
CRUMINA.indicatorMegaMenu();
CRUMINA.quantity_selector_button_mod();
CRUMINA.videoBgInit();
CRUMINA.niceSelectInit();
CRUMINA.notGruppedInit();
CRUMINA.cartPopup.init();
CRUMINA.backgroundAnimationInit();
CRUMINA.addEventListeners();
if($preloader.length){
CRUMINA.preloader();
}
CRUMINA.animateSvg();
CRUMINA.counters();
CRUMINA.progresBars();
CRUMINA.pieCharts();
CRUMINA.chartJs();
};
CRUMINA.addEventListeners=function (){
$(window).on('resize', function (){
setTimeout(function (){
CRUMINA.mainSliderHeight();
}, 300);
});
$document.on('click touch', function (event){
var $cartPopup=$('.cart-popup-wrap');
if(!$(event.target).closest($asidePanel).length){
if($asidePanel.hasClass('opened')){
CRUMINA.togglePanel();
}}
});
};
CRUMINA.videoBgInit=function (){
$('.js-section-background').background();
};
CRUMINA.niceSelectInit=function (){
$('select.nice-select, select.orderby, .variations select, .card-expiration select').niceSelect();
};
CRUMINA.backgroundAnimationInit=function (){
if($subscribe_section.length&&$subscribe_section.hasClass('js-animated')){
CRUMINA.SubscribeScrollAnnimation();
}
if($('.crumina-your-score').length){
CRUMINA.SeoScoreScrollAnnimation();
}
if($('.crumina-testimonial-slider').length){
CRUMINA.TestimonialScrollAnnimation();
}
if($('.crumina-our-vision').length){
CRUMINA.OurVisionScrollAnnimation();
}
if($('.crumina-background-mountains').length){
CRUMINA.MountainsScrollAnnimation();
}
if($('.crumina-custom-image-bg').length){
CRUMINA.SeoCustomScrollAnnimation();
}};
CRUMINA.notGruppedInit=function (){
$(".input-text").each(function (){
$(this).addClass('input-standard-grey');
});
$(".crumina-module.list").each(function (){
var $this=$(this);
var $icon=$(this).data('icon');
if($icon.length&&!$this.hasClass('already-with-icon')){
$this.find('li').wrapInner('<div class="ovh"></div>');
if(!$this.hasClass('icon-url')){
$this.find('li').prepend('<i class="' + $icon + '"></i>');
}else{
$this.find('li').prepend('<img class="list-icn" src="' + $icon + '"/>');
}
$this.addClass('already-with-icon');
}});
};
CRUMINA.cartPopup={
$wrap: null,
$cart: null,
init: function (){
this.$wrap=$('ul.nav-add .cart');
this.$link=$('.js-cart-animate', this.$wrap);
this.addEventListeners();
},
addEventListeners: function (){
var _this=this;
this.$wrap.on('click touch', '.js-cart-animate', function (){
_this.$wrap.toggleClass('visible');
});
$document.on('click touch', function (event){
if(!$(event.target).closest(_this.$wrap).length){
if(_this.$wrap.hasClass('visible')){
_this.$wrap.toggleClass('visible')
}}
});
}};
$document.ready(function (){
CRUMINA.init();
});
$window.load(function (){
CRUMINA.initSmoothScroll();
});
$(window).resize(function (){
CRUMINA.fixMainMenu();
});
})(jQuery);