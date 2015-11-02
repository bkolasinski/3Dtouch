/*
*	BARTOSZ KOLASINSKI bartosz@crabby.pl
*/

(function ( $ ) {
    $.fn.touch = function( options ) {
    	var settings = $.extend({
            time: "600"
        }, options );

		var startX, startY, endX, endY, outStartX, outStartY, outEndX, outEndY, d, x, y, timeStart, timeStop, time, response, timetmp;
		var x = document.getElementsByClassName("3Dtouch");
		var thisitem = $(this).attr('data-item');
		x[0].addEventListener('touchmove', function(e) {
		    e.preventDefault();
		    var touch = e.touches[0];

		    if(startX==undefined) startX = touch.pageX;
		    if(startY==undefined) startY = touch.pageY;
		    endX = touch.pageX;
		    endY = touch.pageY;

		    if(startX<endX)
		    {
		    	outStartX = startX;
		    	outEndX = endX;
		    }else{
		    	outStartX = endX;
		    	outEndX = startX;
		    }
		    if(startY<endY)
		    {
		    	outStartY = startY;
		    	outEndY = endY;
		    }else{
		    	outStartY = endY;
		    	outEndY = startY;
		    }

		    x = outEndX-outStartX;
		    y = outEndY-outStartY;
		    d = Math.sqrt((x*x)+(y*y));



		    timetmp = (new Date).getTime()-timeStart;

		    if(timetmp>300) response = 'hold';
		    if(timetmp>300 && d>3 && d<30) response = 'holdpress';
		    if(d>30) response = 'swipe';

		    if(response != undefined) $('.'+thisitem).addClass('active').addClass(response);

		}, false);

		$(this).on('touchstart',function(){
			timeStart = (new Date).getTime();
		})

		$(this).on('touchend',function(){
			timeStop = (new Date).getTime();
			time = timeStop - timeStart;

			if(time<100) response = 'quicktap';
			if(time>100 && time<300) response = 'tap';
			if(time>300) response = 'hold';

			if(response != undefined) $('.'+thisitem).addClass('active').addClass(response);

			startX = undefined;
			startY = undefined;
			endX = undefined;
			endY = undefined;
			outStartX = undefined;
			outStartY = undefined;
			outEndX = undefined;
			outEndY = undefined;
			d = undefined;
			x = undefined;
			y = undefined;
			timeStart = undefined;
			timeStop = undefined;
			time = undefined;
			response = undefined;
			timetmp = undefined;
			if(settings.time>0) setTimeout(
			  function() 
			  {
			    $('.'+thisitem).removeClass('active').removeClass('hold').removeClass('holdpress').removeClass('swipe').removeClass('tap').removeClass('quicktap');
			  }, settings.time);
		})
	};
 
}( jQuery ));

$(document).ready(function(){
	$('.3Dtouch').touch({
		time:1000
	});
})