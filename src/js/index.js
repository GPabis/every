$('.header__slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 6000,
  dots: true,
});

$(function() {
  var header = $(".nav");
  $(window).scroll(function() {    
      var scroll = $(window).scrollTop();
      if (scroll >= 50) {
          header.addClass("scrolled");
      } else {
          header.removeClass("scrolled");
      }
  });

});

function toggleMobileMenu(){
  let hamburger = document.querySelector('.hamburger');
  hamburger.addEventListener('click', (event) =>{
    if(event.currentTarget.classList.contains('is-active')) {
      event.currentTarget.classList.remove('is-active');
      document.querySelector('.nav').classList.remove('dark');
      document.querySelector('.nav__mobile-menu').classList.remove('mobile-active')
      document.querySelector('.nav__mobile-menu').classList.add('mobile-disable')
    }
    else {
      event.currentTarget.classList.add('is-active');
      document.querySelector('.nav').classList.add('dark');
      document.querySelector('.nav__mobile-menu').classList.add('mobile-active')
      if(document.querySelector('.nav__mobile-menu').classList.contains('mobile-disable'))document.querySelector('.nav__mobile-menu').classList.remove('mobile-disable')
    }
  })
}

toggleMobileMenu()