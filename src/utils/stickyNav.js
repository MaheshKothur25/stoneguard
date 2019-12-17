export default function stickyNavigation(nav, navTop) {
  console.log('called', nav, navTop);
  if (window.scrollY >= navTop) {
    // nav offsetHeight = height of nav
    document.body.style.paddingTop = `${nav.offsetHeight}px`;
    document.body.classList.add('fixed-nav');
  } else {
    document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-nav');
  }
}
