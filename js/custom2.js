(function ($) {
  "use strict";

  let shadow = window['_shadow'];
  let main_menu = shadow.querySelector('.main_menu');
  let counter = shadow.querySelector('.counter');
  console.log('Page Scroll',$('.page-scroll',shadow),$('.counter',shadow),$('.main_menu',shadow),main_menu);

  // menu fixed js code
  $(window).scroll(function () {
    var window_top = $(window).scrollTop() + 1;
    if (window_top > 50) {
      $('.main_menu',shadow).addClass('menu_fixed animated fadeInDown');
    } else {
      $('.main_menu',shadow).removeClass('menu_fixed animated fadeInDown');
    }
  });
  if (shadow.getElementById('default-select')) {
    $('select',shadow).niceSelect();
  }

  // page-scroll

  $('.page-scroll',shadow).bind('click', function (event) {
    var $anchor = $(this);
    var headerH = '80';
    $('html, body',shadow).stop().animate({
      scrollTop: $($anchor.attr('href'),shadow).offset().top - headerH + "px"
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });

  //counter up
  $('.counter',shadow).counterUp({
    delay: 10,
    time: 2000
  });

  //masonry js
  $('.grid',shadow).masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
  });
  //gallery js
  // $('.gallery').each(function () {
  //   $(this).magnificPopup({
  //     delegate: 'a',
  //     type: 'image',
  //     gallery: {
  //       enabled: true
  //     }
  //   });
  // });

  if ($('.img-gal',shadow).length > 0) {
    $('.img-gal',shadow).magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  }

  $('.slider',shadow).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    speed: 500,
    infinite: true,
    asNavFor: '.slider-nav-thumbnails',
    autoplay: true,
    autoplaySpeed: 3000,
    touchThreshold: 1000,
    pauseOnFocus: true,
    dots: false,
  });

  $('.slider-nav-thumbnails',shadow).slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider',
    focusOnSelect: true,
    infinite: true,
    prevArrow: false,
    nextArrow: false,
    centerMode: true,
    autoplaySpeed: 3000,
    touchThreshold: 1000,
    speed: 500,

    // responsive: [
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       centerMode: false,
    //     }
    //   }
    // ]
  });

  //UPDATED 

  if (shadow.getElementById('default-select, .nice-select')) {
    $('select',shadow).niceSelect();
  }
  $(document).ready(function () {
    $('select',shadow).niceSelect();
  });
  //------- Mailchimp js --------//  
  function mailChimp() {
    $('#mc_embed_signup',shadow).find('form').ajaxChimp();
  }
  mailChimp();

}(jQuery));