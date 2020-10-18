import gsap from 'gsap';
const tl = gsap.timeline();
export const animateHero = (title, subtitle, buttons) => {
  tl.from(
    title.current,
    {
      y: -250,
      scale: 3,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      ease: 'back'
    },
    '<'
  )
    .from(
      subtitle.current,
      { y: 200, opacity: 0, ease: 'power3.inout' },
      '<0.3'
    )
    .from(
      buttons.current,
      {
        opacity: 0,
        yPercent: 50,
        ease: 'back',
        duration: 1
      },
      '<0.5'
    );
};
export const animateBurgerMenuOpen = (menu, cb) => {
  gsap.from(menu.current, { opacity: 0, onComplete: cb });
};
