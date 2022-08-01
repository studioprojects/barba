function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

function pageTransition() {
  var tl = gsap.timeline();
  tl.to('.loading-screen', {
    duration: 0.8,
    width: '100%',
    left: '0%',
    ease: 'Expo.easeInOut',
  });

  tl.to('.loading-screen', {
    duration: 0.6,
    width: '100%',
    left: '100%',
    ease: 'Expo.easeInOut',
    delay: 0.3,
  });
  tl.set('.loading-screen', { left: '-100%' });
}

function menuAnimateOut() {
  var tl = gsap.timeline
    .to('.slider-top', { right: '-100%', duration: 0.5, ease: 'inOut' })
    .to('.slider-bottom', { right: '-100%', duration: 0.3, ease: 'inOut' });
}

barba.init({
  sync: true,

  transitions: [
    {
      async leave(data) {
        const done = this.async();

        pageTransition();
        await delay(1000);
        done();
      },

      async enter(data) {
        menuAnimateOut();
      },

      async once(data) {
        menuAnimateOut();
      },
    },
  ],
});
