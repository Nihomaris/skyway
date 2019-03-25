/*--------------------------------------------------------------
>>> CONTENTS:
----------------------------------------------------------------
	MAIN SCRIPTS

	MAIN PAGE
	
	COUNTRY PAGE

	TOUR PAGE

	GALLERY

	BLOG

	PLACE LIST

	HOTEL LIST

	TOUR LIST

	VISA
--------------------------------------------------------------*/

/* ==========================================================================
	MAIN SCRIPTS
========================================================================== */

jQuery(document).ready(function($) {

	/* Адаптивность видео */
	$('.my-background-video').bgVideo({
		fullScreen: false,
		showPausePlay: false,
		fadeIn: 1000, 
	});

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
		$('body').on('keydown', function(e) {
			if(e.which === 27) {
				$('#main_menu').css('display', 'none');
				$('body').css('overflow', '');
				$('body').off('keydown')
			}
		})
		
		if(!$('#menu-country-blocks').hasClass('slick-initialized') && $(window).width() < 768) {
			
			var slides = 2

			if($(window).width() < 480) { slides = 1; }
		  	
		  	$('#menu-country-blocks').slick({
				infinite: true,
		  		slidesToShow: slides,
		 		slidesToScroll: 1
		  	})

	  	    /* Переключение блоков стран в меню */

	  	    $('#menu-more-btn').on('click', function() {
	  	    	$('#menu-country-blocks .slick-next').click();
	  	    })

		}
	  	
	})
	$('#close_main_menu').on('click', function() {
		$('#main_menu').css('display', 'none');
		$('body').css('overflow', '');
		$('body').off('keydown')
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

    var countryObj = {
    	'country-uz': 'top_section--uz',
    	'country-kz': 'top_section--kz',
    	'country-kg': 'top_section--kg',    	
    }

    bindControlHandle('country-kz');
    changeDescrContainer('country-kz');
    changeBgContainer('country-kz');
    console.log($('.top_section__bg_container--active'))
    renderVideoController($('.top_section__bg_container--active'))
	
    $(".main_slider_country").on('click', function() {

	  	if($(this).hasClass('main_slider_country--active')) { return false; }

		var	oldCountry = $('.main_slider_country--active'),
			newCountry = $(this);

  		var id = $(this).attr('id'),
			countryClass = countryObj[id];

		
    	toggleCountry(newCountry, oldCountry);
		
	    moveAndChangeColorBg(countryClass);

	    changeDescrContainer(id);

	    changeBgContainer(id);

	    bindControlHandle(id);

	    renderVideoController($('.top_section__bg_container--active'))
		 
    })


    function toggleCountry(newCountry, prevCountry) {
		prevCountry.removeClass('main_slider_country--active');
		newCountry.addClass('main_slider_country--active');
    }

    function moveAndChangeColorBg(newClass) {

		var container = $('#top-section');
		var secondClass = container.attr('class').split(' ')[1];

    	$("#header-slider-bg, #body-slider-bg, #bottom-slider-bg")
    	.animate({
			right: '-100%'
    	}, 1000, function() { container.removeClass(secondClass).addClass(newClass) })
    	.animate({ 
			right: '0'
    	}, 1000, function() { })
    }

    function changeDescrContainer(id) {

    	var oldContainer = $('.main_banner__description_container--active'),
    		newContainer = $('#'+id+'-descr');
		
		if(oldContainer.length) {
			oldContainer.removeClass('main_banner__description_container--active');
	    	oldContainer.children().each( function(i, item) { $(item).hide(); } )
		}
		
		newContainer.children().first().show();
		newContainer.addClass('main_banner__description_container--active');


		return newContainer;
    }
	
	function changeBgContainer(id) {
		var oldContainer = $('.top_section__country_bg--active'),
			newContainer = $('#'+id+'-bg');
		
		if(oldContainer.length) {
			oldContainer.removeClass('top_section__country_bg--active');
	    	oldContainer.children().each( function(i, item) { $(item).removeClass('top_section__bg_container--active') } )
		}
		
    	newContainer.children().first().addClass('top_section__bg_container--active')
    	newContainer.addClass('top_section__country_bg--active');
	}

    function bindControlHandle(id) {
		
		var controller = $('#banner-slider-control'),
	   	    descriptions = $('#'+id+'-descr').children(),
	   	    backgrounds = $('#'+id+'-bg').children();
		
		// Удаляем предыдущие контроллеры
	   	controller.html('');

    	if(descriptions.length < 2) { return false; }
			   	
		descriptions.each(function(i, item) {
			var control = renderController(i, controller),
				descr = $(item),
				bg = $(backgrounds[i]);
			
			control.on('click', function() {

				// скрываем элементы
			   	descriptions.each( function(i, item) { $(item).hide(); } )
			   	$('.top_section__bg_container--active').removeClass('top_section__bg_container--active'); 
			   	$('.main_banner__slide_control--active').removeClass('main_banner__slide_control--active');

				// отображаем новые
				$(this).addClass('main_banner__slide_control--active')
				descr.show();
				bg.addClass('top_section__bg_container--active');

				// управление видео
				renderVideoController(bg);
			})
	
		})
    }

    function renderController(i, controller) {
		
		var name = i + 1;
		var control = $('<span></span>');
	
		if(i === 0) {
			controller.append(control.addClass('main_banner__slide_control--active').html('0'+name));
		} else {
			controller.append(control.html('0'+name));
		}

		return control;
		
    }

    function renderVideoController(video) {

		var container = $('#video-control');
		var playBtn = $('<div class="main_banner__start_btn main_banner__start_btn--active"></div>');
        var volumeBtn = $('<div class="main_banner__speaker"></div>');
		var video = video.children();
		
		// удаляем старые контроллеры видео
        container.html('')
		
        if(video.prop('tagName') !== 'VIDEO') { return false; }
		
		// вешаем обработчики
		playBtn.on('click', function() {

			if($(this).hasClass('main_banner__start_btn--active')) {
				video[0].play();
				$(this).removeClass('main_banner__start_btn--active');
			} else {
				video[0].pause();
				$(this).addClass('main_banner__start_btn--active');
			}

		})
		volumeBtn.on('click', function() {
			
			if($(this).hasClass('main_banner__speaker--active')) {
				video.prop('muted', false);
				$(this).removeClass('main_banner__speaker--active');
			} else {
				video.prop('muted', true);
				$(this).addClass('main_banner__speaker--active');
			}

		})

		// Добавляем
        container.append(playBtn);
        container.append(volumeBtn);


		// Запуск видео
		video.prop('muted', false);
		video[0].play();
		
    }

      	

    /* Переключение текста в главном туре на витрине */
    var descrBlocks = $('#main-tour-descr-block').children();
	var activeBlockNum = 0;
    var descrObject = [];

    if(descrBlocks.length) {

		if(descrBlocks.length > 1) {
			/* Отображаем описание */
			descrBlocks.first().show();
			/* Отображаем контроллеры */
			$('#main-tour-switchers').show();
			$('#main-tour-controller').show();

			descrBlocks.map(function(i, item) { 
				
				/* Созд */
				var switcher = $('<span class="switcher main_tour_block_switcher"></span>');
				if(i === 0) { switcher.addClass('switcher--active'); }

				$('#main-tour-switchers').append(switcher);
				descrObject.push({description: $(item), switcher: switcher})
			})
			
			$('#main-tour-controller-left, #main-tour-controller-right').on('click', function() {
				
				var id = $(this).attr('id');
				var currentBlockNum = activeBlockNum;
				var currentObject = descrObject;
				var nextBlockNum; 

				if(id === 'main-tour-controller-left') {

					if(activeBlockNum === 0) {
						nextBlockNum = currentObject.length - 1;
					} else {
						nextBlockNum = currentBlockNum - 1; 
					}

				} 
				if (id === 'main-tour-controller-right') {

					if(activeBlockNum === currentObject.length - 1) {
						nextBlockNum = 0;
					} else {
						nextBlockNum = currentBlockNum + 1;
					}

				}
				
				currentObject[currentBlockNum].description.hide();
				currentObject[currentBlockNum].switcher.removeClass('switcher--active');
				currentObject[nextBlockNum].description.show();
				currentObject[nextBlockNum].switcher.addClass('switcher--active');

				activeBlockNum = nextBlockNum;

			})
		} else {
			/* Отображаем описание */
			descrBlocks.first().show();
		}

    }
	
});


/* ==========================================================================
	COUNTRY PAGE
========================================================================== */

jQuery(document).ready(function($) {
	
	var factsObj = [];
	var factText = $('#fact-text-blocks').children();

	if(factText.length) {
		if(factText.length > 1) {

			factText.map(function(i, item) { factsObj.push($(item)); });
			
			/* Инициализация слайдера фактов */
			var factController = new FactController(factsObj);
			
			/* ручное переключение */
			$('#fact-block-next').on('click', function() {
				factController.nextFact();
			})
			$('#fact-block-prev').on('click', function() {
				factController.prevFact();
			})
			
		} else {
			/* При инициализации первый факт отображается */
			$('#fact-separator-timer').css('width', '100%');
			factText.first().show();
		}
	}

	function FactController(facts) {
		this.facts = facts;
		this.activeFact = 0; // по умолчанию активен 1й по очереди факт
		this.PREV = 'fact-block-prev';
		this.NEXT = 'fact-block-next';
		this.loading = null;
		this.intervalNum = null;
		this.seconds = 7000;

		/* При инициализации первый факт отображается */
		facts[0].show();
		
		this.stopLoad = function() {
			if(this.loading) {
				this.loading.stop();
				this.loading = null
				clearInterval(this.intervalNum);
				this.intervalNum = null;
			}
		}
		this.startLoad = function() {
			var self = this;
			var separator = $('#fact-separator-timer');
			separator.css('width', 0);
			return separator.animate({'width': '100%'}, self.seconds, function() {
				self.loading = null;
				self.switchFact(self.NEXT);
			});
		}
		
		this.switchFact = function(type) {
			var newNum = 0;
			
			switch(type) {
				case this.PREV:
					if(this.activeFact === 0) {
						newNum = this.facts.length - 1;
					} else {
						newNum = this.activeFact - 1;
					}
					break;
				case this.NEXT:
					if(this.activeFact === this.facts.length - 1) {
						newNum = 0;
					} else {
						newNum = this.activeFact + 1;
					}
					break;
				default:
					newNum = 0;
					break;
			}
			
			this.facts[this.activeFact].hide();
			this.facts[newNum].show();

			this.activeFact = newNum;
		}
		
		this.init = function() {
			var self = this;

			this.intervalNum = setInterval(function() {
				self.loading = self.startLoad();
			}, 7200)
		}
		
		this.loading = this.startLoad();
		this.init();
		
	}
	
	FactController.prototype.nextFact = function() {
			this.stopLoad();
			this.switchFact(this.PREV)
			this.loading = this.startLoad();
			this.init();
	}
	FactController.prototype.prevFact = function() {
			this.stopLoad();
			this.switchFact(this.NEXT)
			this.loading = this.startLoad();
			this.init();
	}


	// Слайдер направлений
	var slides = 3;

	if($(window).width() < 992 && $(window).width() > 716) {
		slides = 2;
	} else if($(window).width() < 716) {
		slides = 1;
	}

	$('#dest-block-slider').slick({
		infinite: true,
  		slidesToShow: slides,
 		slidesToScroll: 1
 	})

 	$('#dest-prev-slide').on('click', function() {
		$('#dest-block-slider .slick-prev').click();
 	})
 	$('#dest-next-slide').on('click', function() {
		$('#dest-block-slider .slick-next').click();
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



	// Слайдер фотографий в блоке отеля
	$('.tour_hotels__photo_slider').each(function(i, item) {

		var photoContainer = $(item).parent();
		var photoBlocks = $(item).children();
		var activePhotoNum = 0;
	    var photoObject = [];

	    if(photoBlocks.length) {

			if(photoBlocks.length > 1) {
				
				/* Отображаем контроллеры */
				photoContainer.find('.hotel_switch').show();
				photoContainer.find('.hotel_arrow_switch').show();

				photoBlocks.map(function(i, item) { 				
					/* Созд */
					var switcher = $('<span class="switcher main_tour_block_switcher"></span>');
					if(i === 0) { switcher.addClass('switcher--active'); }

					photoContainer.find('.hotel_switch').append(switcher);
					photoObject.push({switcher: switcher})
				})

				photoContainer.find('.tour_hotels__photo_slider').slick({
					infinite: true,
			  		slidesToShow: 1,
			 		slidesToScroll: 1
			 	})

				photoContainer.find('.arrow_switcher--left').on('click', function() {
					photoContainer.find('.slick-prev').click();
					activePhotoNum = prevHotelPhoto(activePhotoNum, photoObject);
					
				})

				photoContainer.find('.arrow_switcher--right').on('click', function() {
					photoContainer.find('.slick-next').click();
					activePhotoNum = nextHotelPhoto(activePhotoNum, photoObject)
					
				})
			}
		}
	
	})

	function prevHotelPhoto(activePhotoNum, photoObject) {

		var currenPhotoNum = activePhotoNum;
		var currentPhoto = photoObject;
		var nextPhotoNum; 

		if(activePhotoNum === 0) {
			nextPhotoNum = currentPhoto.length - 1;
		} else {
			nextPhotoNum = currenPhotoNum - 1; 
		}

		currentPhoto[currenPhotoNum].switcher.removeClass('switcher--active');
		currentPhoto[nextPhotoNum].switcher.addClass('switcher--active');

		return nextPhotoNum;
	}

	function nextHotelPhoto(activePhotoNum, photoObject) {

		var currenPhotoNum = activePhotoNum;
		var currentPhoto = photoObject;
		var nextPhotoNum; 

		if(activePhotoNum === currentPhoto.length - 1) {
			nextPhotoNum = 0;
		} else {
			nextPhotoNum = currenPhotoNum + 1;
		}
			
		currentPhoto[currenPhotoNum].switcher.removeClass('switcher--active');
		currentPhoto[nextPhotoNum].switcher.addClass('switcher--active');

		return nextPhotoNum;
	}

	// Слайдер блоков отелей
	$('#tour-hotel-slider').slick({
		infinite: true,
  		slidesToShow: 1,
 		slidesToScroll: 1
 	})
	
	$('#hotel-prev-slide').on('click', function() {
		$('#tour-hotel-slider .slick-prev').click();
	})
	$('#hotel-next-slide').on('click', function() {
		$('#tour-hotel-slider .slick-next').click();
	})
	
	

});


/* ==========================================================================
	GALLERY
========================================================================== */


jQuery(document).ready(function($) {
	
	// Открытие фотограций
	$('.gallery__photo a').fancybox();
	$('.gallery_list__photo a').fancybox();

	// Слайдер галлереи
	var slides = 2;

	if($(window).width() < 992) {
		slides = 1;
	} 

	$('#gallery-slider').slick({
		infinite: true,
  		slidesToShow: slides,
 		slidesToScroll: 1
 	})

	 	$('#gallery-prev-slide').on('click', function() {
			$('#gallery-slider .slick-prev').click();
	 	})
	 	$('#gallery-next-slide').on('click', function() {
			$('#gallery-slider .slick-next').click();
	 	})

});


/* ==========================================================================
	ABOUT PAGE
========================================================================== */

jQuery(document).ready(function($) {

	// Слайдер галлереи
	var slides = 2;

	if($(window).width() < 768) {
		slides = 1;
	} 

	$('#reviews-slider').slick({
		infinite: true,
  		slidesToShow: slides,
 		slidesToScroll: 1
 	})

 	$('#reviews-prev-slide').on('click', function() {
		$('#reviews-slider .slick-prev').click();
 	})
 	$('#reviews-next-slide').on('click', function() {
		$('#reviews-slider .slick-next').click();
 	})

});


/* ==========================================================================
	BLOG
========================================================================== */

jQuery(document).ready(function($) {



});


/* ==========================================================================
	HOTEL LIST
========================================================================== */


jQuery(document).ready(function($) {

	// Переключение окна фильтров туров
	$('#place-filter-btn').on('click', function() {
		
		var active = $(this).hasClass('filter_toggle--active');
	
		if(active) {
			$('#place-filter').hide();
			$('#sidebar-close').hide();
			$(this).removeClass('filter_toggle--active');
			$(this).find('p').text('Открыть параметры поиска');
		} else {
			$('#place-filter').show();
			$('#sidebar-close').show();
			$(this).addClass('filter_toggle--active');
			$(this).find('p').text('Закрыть параметры поиска');
		}
		
	})


	
})


/* ==========================================================================
	HOTEL LIST
========================================================================== */


jQuery(document).ready(function($) {

	// Переключение окна фильтров туров
	$('#hotel-filter-btn').on('click', function() {
		
		var active = $(this).hasClass('filter_toggle--active');
	
		if(active) {
			$('#hotel-filter').hide();
			$('#sidebar-close').hide();
			$(this).removeClass('filter_toggle--active');
			$(this).find('p').text('Открыть параметры поиска');
		} else {
			$('#hotel-filter').show();
			$('#sidebar-close').show();
			$(this).addClass('filter_toggle--active');
			$(this).find('p').text('Закрыть параметры поиска');
		}
		
	})


	
})

/* ==========================================================================
	TOUR LIST
========================================================================== */


jQuery(document).ready(function($) {

	// Переключение окна фильтров туров
	$('#tour-filter-btn').on('click', function() {
		
		var active = $(this).hasClass('filter_toggle--active');
	
		if(active) {
			$('#tour-filter').hide();
			$('#sidebar-close').hide();
			$(this).removeClass('filter_toggle--active');
			$(this).find('p').text('Открыть параметры поиска');
		} else {
			$('#tour-filter').show();
			$('#sidebar-close').show();
			$(this).addClass('filter_toggle--active');
			$(this).find('p').text('Закрыть параметры поиска');
		}
		
	})


	
})


/* ==========================================================================
	VISA
========================================================================== */

jQuery(document).ready(function($) {

	// Переключение окна фильтров стран
	$('#visa-filter-btn').on('click', function() {
		
		var active = $(this).hasClass('top_banner_place--active');
		
		if(active) {
			$('#visa-filter').hide();
			$('#sidebar-close').hide();
			$(this).removeClass('top_banner_place--active');
			$(this).find('p').text('Открыть список стран');
		} else {
			$('#visa-filter').show();
			$('#sidebar-close').show();
			$(this).addClass('top_banner_place--active');
			$(this).find('p').text('Закрыть список стран');
		}
		
	})



});