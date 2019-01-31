/*--------------------------------------------------------------
>>> CONTENTS:
----------------------------------------------------------------
	MAIN SCRIPTS

	MAIN PAGE


--------------------------------------------------------------*/

/* ==========================================================================
	MAIN SCRIPTS
========================================================================== */

jQuery(document).ready(function($) {

	/*  */
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
});
