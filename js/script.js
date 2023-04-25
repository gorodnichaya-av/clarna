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

    // Accordion
    $('.js-accordion').on('click', '.js-accordion-btn', function(){
      let parent = $(this).parent();

      if (parent.hasClass('opened')) {
        parent.removeClass('opened').find('.js-accordion-content').slideUp();
      } else {
        parent.addClass('opened').find('.js-accordion-content').slideDown();
      }
    });
  })
})