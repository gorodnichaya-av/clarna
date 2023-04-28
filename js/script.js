$(function () {
  $(document).ready(function(){
    // Mobile header menu 
    $('.js-menu-btn').on('click', function (){
      if ($(this).hasClass('opened')) {
        $(this).removeClass('opened');
        $('.js-menu').slideUp();
      } else {
        $(this).addClass('opened');
        $('.js-menu').slideDown();
      }
    });

    // Scroll to part of page from menu 
    $('.js-scroll-to').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");
      let windowWidth = $(window).width();
      
      $('.js-menu a').each(function () {
          $(this).removeClass('active');
      });
      $(this).addClass('active');
    
      var target = this.hash,
          menu = target;
      $target = $(target);
      var scrollStop = (windowWidth > 480) ? ($target.offset().top - 50) : $target.offset().top - 30;

      $('html, body').stop().animate({
          'scrollTop': scrollStop
      }, 500, 'swing', function () {
          $(document).on("scroll", onScroll);
      });

      if(windowWidth < 1024) {
        $('.js-menu').slideUp();
        $('.js-menu-btn').removeClass('opened');
      }
    });

    // Banner sliders
    $('.js-banner-general-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
    });
    $('.js-banner-nav > div').click(function() {
      $('.js-banner-nav > div').removeClass('active');
      $(this).addClass('active');
      $('.js-banner-general-slider').slick('slickGoTo',$(this).index());
    });

    // Content sliders
    $('.js-testimonials-slider').slick({
      centerMode: true,
      slidesToShow: 5,
      arrows: false,
      dots: true,
      infinite: true,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 1279,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });

    $('.js-ingredients-slider').slick({
      slidesToShow: 4,
      arrows: false,
      dots: true,
      infinite: true,
      responsive: [
        {
          centerMode: true,
          breakpoint: 991,
          settings: {
            centerMode: true,
            slidesToShow: 2,
            variableWidth: true,
          }
        },
        {
          breakpoint: 640,
          settings: {
            centerMode: true,
            slidesToShow: 1,
            variableWidth: true,
          }
        }
      ]
    });


    // Accordion
    $('.js-accordion').on('click', '.js-accordion-btn', function(){
      let parent = $(this).parent();

      if (parent.hasClass('opened')) {
        parent.removeClass('opened').find('.js-accordion-content').slideUp();
      } else {
        parent.addClass('opened').find('.js-accordion-content').slideDown();
      }
    });

    // Progress bar
    $('.js-progress-parent').each(function(){
      let progressVal = $(this).find('.js-progress-val').text();
      $(this).find('.js-progress').width(progressVal);
    });
  })
})