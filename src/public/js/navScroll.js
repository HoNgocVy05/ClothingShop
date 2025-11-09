//sticky navbar
const navbar = document.querySelector('.navbar');
const stickyOffset = navbar.offsetTop;

window.addEventListener('scroll', () => {
  if (window.pageYOffset >= stickyOffset) {
    navbar.classList.add('fixed');
  } else {
    navbar.classList.remove('fixed');
  }
});
