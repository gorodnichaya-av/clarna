$(function () {
  $(document).ready(function(){
    // Headerr fixed
    var lastScrollTop = 0;
    $(window).scroll(function(){
        let sticky = $('.fixed-navbar'),
            stickyHeight = sticky.height() + 50,
            scroll = $(window).scrollTop();

      if (scroll > stickyHeight) {
        sticky.addClass('fixed')
      } else {
        sticky.removeClass('fixed')
        $('.js-menu a').each(function () {
          $(this).removeClass('active');
        });
      }

      if (scroll > lastScrollTop){
        sticky.addClass('transition');
      } else {
        sticky.removeClass('transition');
      }
      lastScrollTop = scroll;


      // Hide sticky footer CTA on pricing
      const pricingSection = $('.pricing'),
            pricingSectionStartScroll = pricingSection.offset().top,
            pricingSectionEndScroll = pricingSection.outerHeight(true, true) + pricingSectionStartScroll - 100; 

      if(scroll > pricingSectionStartScroll && scroll < pricingSectionEndScroll) {
        $('.js-sticky-btn').fadeOut();
      } else {
        $('.js-sticky-btn').fadeIn();
      }

    });


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
    
      let target = this.hash;
      $target = $(target);
      let scrollStop = (windowWidth > 480) ? ($target.offset().top - 107) : $target.offset().top - 92;

      $('html, body').stop().animate({
          'scrollTop': scrollStop
      }, 500, 'swing', function () {
          $(document).on("scroll", onScroll);
      });

      if(windowWidth < 1024) {
        $('.js-menu').slideUp();
        $('.js-menu-btn').removeClass('opened');
        $('.js-sticky-btn').fadeIn();
      }
    });

    // Banner sliders
    if($('.js-banner-general-slider').length > 0) {
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

      const navSlider = document.querySelector('.js-banner-nav'),
          navArray = navSlider.querySelectorAll('.banner__slider-nav-item');
      $('.js-banner-general-slider').on('click', '.slick-arrow', function () {
        let activeIndex = $(this).closest('.slick-slider').find('.slick-active').attr('data-slick-index');
        $('.banner__slider-nav-item').removeClass('active');
        navArray[activeIndex].classList.add('active');
      });
    }
    

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
      centerMode: true,
      slidesToShow: 5,
      arrows: false,
      dots: true,
      infinite: true,
      variableWidth: true,
      responsive: [
        {
          centerMode: true,
          breakpoint: 1025,
          settings: {
            centerMode: true,
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
    function addHeightPticingList(elem) {
      let heightArray = [];
      function getMaxOfArray(numArray) {
          return Math.max.apply(null, numArray);
      }
      elem.each(function() {
        heightArray.push($(this).outerHeight(true));
      });
      maxHeight = getMaxOfArray(heightArray);
      elem.each(function() {
          $(this).css({
            'height': `${maxHeight}px`
          });
      });
    }

    addHeightPticingList($('.js-pricing-count'));

    // Premium scare height
    function addPremiumScareHeight() {
      const premiumScareHeight = $('.js-premium-scare-height').outerHeight(true),
          premiumScareBlock = $('.js-premium-scare');

      premiumScareBlock.css({
        'min-height':  premiumScareHeight
      });
    }

    addPremiumScareHeight();


    // Functions on resize
    $(window).resize(function() {
      addPremiumScareHeight();
      addHeightPticingList($('.js-pricing-count'));
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

      $('.js-pricing-btn').removeClass('active');
      $(this).addClass('active');
      let dataPayment = $(this).attr('data-payment');
      if(dataPayment) {
        $('.js-pricing-payment, .js-pricing-hidden-text').show(0);
        $('.js-pricing-total').each(function() {
          let newTotalVal = $(this).attr('data-price');
          newTotalVal = dollarUSLocale.format(newTotalVal*0.9);
  
          $(this).html(`${newTotalVal}.-`);
        });
      } else {
        $('.js-pricing-payment, .js-pricing-hidden-text').hide(0);
        $('.js-pricing-total').each(function() {
          let dataPrice = $(this).attr('data-price');
          $(this).html(`${dataPrice}.-`);
        });
      }
    });

    // Horizontall Scroll

    let holder = $(".js-holder"),
        list = holder.find(".js-holder-list"),
        clonedList = list.clone();
    var widthArr = [];

    list.find('li').each(function() {
      widthArr.push($(this).outerWidth(true, true));
    });

    let listWidth = widthArr.reduce((a, b) => {
      return a + b;
    }, 10);
    
    var endPos = holder.width() - listWidth;
    list.add(clonedList).css({
      "width" : listWidth + "px"
    });
    clonedList.addClass("cloned").appendTo(holder);
    //TimelineMax
    var infinite = new TimelineMax({repeat: -1, paused: false});
    var time = 15;
    infinite.fromTo(list, time, {left:0}, {left: -listWidth, ease: Linear.easeNone}, 0);
    infinite.fromTo(clonedList, time, {left:listWidth}, {left:0, ease: Linear.easeNone}, 0);
    infinite.set(list, {left: listWidth});
    infinite.to(clonedList, time, {left: -listWidth, ease: Linear.easeNone}, time);
    infinite.to(list, time, {left: 0, ease: Linear.easeNone}, time);
    //Pause/Play
    holder.on("mouseenter", function(){
      infinite.pause();
    }).on("mouseleave", function(){
      infinite.play();
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
        'overflow': 'unset'
      });
    });
    $(document).on('click',function(e){
      if(!(($(e.target).closest('.js-modal-content').length > 0 ) || ($(e.target).closest(".js-modal-btn").length > 0))){
        $(".js-modal").fadeOut();
        $('body').css({
          'overflow': 'unset'
        });
       }
    });

    // Active class of header item on scroll
    $(document).on("scroll", onScroll);
    function onScroll(event){
      var scrollPos = $(document).scrollTop();
      $('.js-menu a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr('href'));
        if ((refElement.position().top - $(window).height() / 2) <= scrollPos && (refElement.position().top - $(window).height() / 2) + refElement.height() > scrollPos) {
          $('.js-menu a').removeClass('active');
          currLink.addClass('active');
        } else {
          currLink.removeClass('active');
        }
      });
    }

    // Pintrest grid 
    function resizeGridItem(item){
      const grid = document.querySelector(".js-testimonials-grid"),
            rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')),
            rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
            rowSpan = Math.ceil((item.querySelector('.card__content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
        
      item.style.gridRowEnd = `span ${rowSpan}`; 
    }
    
    function resizeAllGridItems(){
      const grid = document.querySelector(".js-testimonials-grid"),
            allItems = grid.querySelectorAll(".card");
      for(x=0;x<allItems.length;x++){
        resizeGridItem(allItems[x]);
      }
    }
    
    function resizeInstance(instance){
      item = instance.elements[0];
      resizeGridItem(item);
    }
    
    window.onload = resizeAllGridItems();
    window.addEventListener("resize", resizeAllGridItems);
    
    const grid = document.querySelector(".js-testimonials-grid"),
          allItems = grid.querySelectorAll(".card");
    for(x=0;x<allItems.length;x++){
      imagesLoaded( allItems[x], resizeInstance);
    }

  })
})