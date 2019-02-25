/*--------------------------------------------------------------
>>> CONTENTS:
----------------------------------------------------------------
	MAIN SCRIPTS

	MAIN PAGE

	TOUR PAGE


--------------------------------------------------------------*/

/* ==========================================================================
	MAIN SCRIPTS
========================================================================== */

jQuery(document).ready(function($) {

	/* Декоративная бегующая полоска под хэдэром */
    $('#top-section').on('mousemove', function(e) {
		var lineWidth = parseInt($('#header-line').css('width'))/2,
			maxWindowWidth = $(window).width()-lineWidth,
			coordinateX = 0;

		if(e.pageX < lineWidth) {
			coordinateX = 0;
		} else if(e.pageX > maxWindowWidth) {
			coordinateX = maxWindowWidth-lineWidth;
		} else {
			coordinateX = e.pageX-lineWidth;
		}

    	$('#header-line').css({'left': coordinateX+'px'})

    })
	
	/* Переключение меню */
	$('#menu_toggle, #menu_toggle_2').on('click', function() {
		$('#main_menu').css('display', 'block');
		$('body').css('overflow', 'hidden');

	})
	$('#close_main_menu').on('click', function() {
		$('#main_menu').css('display', 'none');
		$('body').css('overflow', '');

	})
   	
	/* Фиксированный хэдер */
	
	$(window).on('scroll', function(e) {
		var bannerHeight = $('#top-section').height();

		if(this.scrollY > bannerHeight) {
			$('#header_spy').show();	
		} else {
			$('#header_spy').hide();
		}

	})
    
    /* Слайдер */

    $("#country-uz, #country-kz, #country-kg").on('click', function() {

    	if($(this).hasClass('main_slider_country--active')) { return false; }
		
		var id = $(this).attr('id');
		var oldDescr = $('.main_banner__description_container--active');
		var newDescr = $('#'+id+'-descr');

    	$('.main_slider_country--active').removeClass('main_slider_country--active');
    	$(this).addClass('main_slider_country--active');
		
		oldDescr.removeClass('main_banner__description_container--active');
		
		if($(window).width() > 768) {

	    	$("#header-slider-bg, #body-slider-bg, #bottom-slider-bg").animate({
				right: '-100%'
	    	}, 1000).animate({ 
				right: '0'
	    	}, 1000, function() {
	    		newDescr.addClass('main_banner__description_container--active');
	    	})

	    } else {
	    	newDescr.addClass('main_banner__description_container--active');
	    }

		  	
    })

    /* Переключение блоков стран в меню */

    $('#menu-more-btn').on('click', function() {
    	var container = $('#menu-country-blocks');
		var hiddenCountry = container.find('.mobile_menu_right__country--hidden');
    	
    	var nextHiddenCountry = hiddenCountry.next('.mobile_menu_right__country');

    	if(!nextHiddenCountry.length) {
    		nextHiddenCountry = container.find('.mobile_menu_right__country').first();
    	}

    	nextHiddenCountry.addClass('mobile_menu_right__country--hidden');
		hiddenCountry.removeClass('mobile_menu_right__country--hidden');
    })

});


/* ==========================================================================
	TOUR PAGE
========================================================================== */




jQuery(document).ready(function($) {
	
	/* Раскрывающийся список деталей тура */
	$('.tour_shedule__name').on('click', function() {
		var $container = $(this).parent(),
			$detailBlock = $container.find('.tour_shedule__day_detail'),
			$separator = $container.find('.tour_shedule__separator'),
			$arrow = $(this).find('.tour_shedule__arrow');

		if($detailBlock.hasClass('tour_shedule__day_detail--open'))	{
			$arrow.removeClass('tour_shedule__arrow--active');
			$detailBlock.css('display', 'none').removeClass('tour_shedule__day_detail--open');
			$separator.css('display', 'none');
		} else {
			$arrow.addClass('tour_shedule__arrow--active');
			$detailBlock.css('display', 'block').addClass('tour_shedule__day_detail--open');
			$separator.css('display', 'block');
		}
		
		
	})
	/* Раскрыть все детали */
	$('#all_tour_btn').on('click', function() {
		var $detailBlocks = $('.tour_shedule__day_detail'),
			$separators = $('.tour_shedule__separator');

		if($(this).hasClass('tour_shedule_all_btn--open')) {
			$detailBlocks.css('display', 'none').removeClass('tour_shedule__day_detail--open');
			$separators.css('display', 'none');
			$(this).removeClass('tour_shedule_all_btn--open');
		} else {
			$detailBlocks.css('display', 'block').addClass('tour_shedule__day_detail--open');
			$separators.css('display', 'block');
			$(this).addClass('tour_shedule_all_btn--open');
		}
		
	})
	
	/* Фиксированная кнопка */
	$(window).on('scroll', function(e) {
		var bannerHeight = $('#top-section').height();

		if(this.scrollY > bannerHeight) {
			$('#order-spy').show();	
		} else {
			$('#order-spy').hide();
		}

	})

	/* Модальное окно */

	$('#order-main, #order-spy').on('click', function() {
		$('#lead-form').show();
	})

	$('#close-lead').on('click', function() {
		$('#lead-form').hide();
	})

});