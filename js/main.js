
const hamburger = document.querySelector('.hamburger');
const sliderTop = document.querySelector('.slider-top');
const sliderBtm = document.querySelector('.slider-bottom');


var tl = gsap.timeline({
    paused: true,
    reversed: true
})
.to('.slider-top', {right: '0', duration: 0.5, ease: 'inOut'})
.to('.slider-bottom', {right: '0', duration: 0.3, ease: 'inOut'})

hamburger.addEventListener('click', function (){
    this.classList.toggle('is-active');

    tl.reversed() ? tl.play() : tl.reverse();
}); 


// console.log(sliderTop)