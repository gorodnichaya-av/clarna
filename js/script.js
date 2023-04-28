$(function () {
  $(document).ready(function(){
    // Mobile header menu 
    $('.js-menu-btn').on('click', function (){
      if ($(this).hasClass('opened')) {
        $(this).removeClass('opened');
        $('.js-menu').slideUp();
        $('.js-sticky-btn').fadeIn();
      } else {
        $(this).addClass('opened');
        $('.js-menu').slideDown();
        $('.js-sticky-btn').fadeOut();
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

    // Add the same height for list in pricing
    function addHeightPticingList() {
      let heightArray = [];
      function getMaxOfArray(numArray) {
          return Math.max.apply(null, numArray);
      }
      $('.js-pricing-count').each(function() {
        heightArray.push($(this).outerHeight(true));
      });
      maxHeight = getMaxOfArray(heightArray);
      $('.js-pricing-count').each(function() {
          $(this).css({
            'min-height': `${maxHeight}px`
          });
      });
    }

    addHeightPticingList();

    // Premium scare height
    function addPremiumScareHeight() {
      const premiumScareHeight = $('.js-premium-scare-height').outerHeight(true),
          premiumScareBlock = $('.js-premium-scare');

      premiumScareBlock.css({
        'min-height':  premiumScareHeight
      });
    }

    addPremiumScareHeight();

    $(window).resize(function() {
      addHeightPticingList();
      addPremiumScareHeight();
    });

    // Payment discount
    dollarUSLocale = Intl.NumberFormat('en-US')
    $('.js-pricing-total').each(function() {
      let totalVal = $(this).html();
          totalVal = dollarUSLocale.format(totalVal);

      $(this).html(`${totalVal}.-`);
    });
    
    $('.js-pricing-btn').on('click', function(e) {
      e.preventDefault();

      let dataPayment = $(this).attr('data-payment');
      if(dataPayment) {
        $('.js-pricing-payment, .js-pricing-hidden-text').show(0);
      } else {
        $('.js-pricing-payment, .js-pricing-hidden-text').hide(0);
      }

      $('.js-pricing-total').each(function() {
        let newTotalVal = ($(this).html()).match(/\d+/g).join("");
        newTotalVal = dollarUSLocale.format(newTotalVal*0.9);

        $(this).html(`${newTotalVal}.-`);
      });

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

    // Modal 
    $('.js-modal-btn').on('click', function(e) {
      e.preventDefault();
      const dataId = $(this).attr('data-modal');
      $(dataId).fadeIn();
      $('body').css({
        'overflow': 'hidden'
      })
    });
    $('.js-modal-close').on('click', function(e) {
      $(this).closest('.js-modal').fadeOut();
      $('body').css({
        'overflow': ' '
      });
    });
    $(document).on('click',function(e){
      if(!(($(e.target).closest('.js-modal-content').length > 0 ) || ($(e.target).closest(".js-modal-btn").length > 0))){
        $(".js-modal").fadeOut();
       }
    });

  })
})