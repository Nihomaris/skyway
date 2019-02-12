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
	$('#menu_toggle').on('click', function() {
		$('#main_menu').css('display', 'block')
	})
	$('#close_main_menu').on('click', function() {
		$('#main_menu').css('display', 'none')
	})
   	
	/* Фиксированный хэдер */

    
});


/* ==========================================================================
	TOUR PAGE
========================================================================== */




jQuery(document).ready(function($) {
	
	/* Раскрывающийся список деталей тура */
	$('.tour_shedule__name').on('click', function() {
		var $container = $(this).parent(),
			$detailBlock = $container.find('.tour_shedule__day_detail'),
			$separator = $container.find('.tour_shedule__separator');

		if($detailBlock.hasClass('tour_shedule__day_detail--open'))	{
			$detailBlock.css('display', 'none').removeClass('tour_shedule__day_detail--open');
			$separator.css('display', 'none');
		} else {
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

});