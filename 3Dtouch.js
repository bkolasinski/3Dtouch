/*
*	BARTOSZ KOLASINSKI bartosz@crabby.pl
*/

(function ( $ ) {
    $.fn.touch = function( options ) {
    	var settings = $.extend({
            time: "600"
        }, options );

    	var i=0;
		var startX = new Array();
		var startY = new Array();
		var endX = new Array();
		var endY = new Array();
		var outStartX = new Array();
		var outStartY = new Array();
		var outEndX = new Array();
		var outEndY = new Array();
		var d = new Array();
		var xd = new Array();
		var yd = new Array();
		var timeStart = new Array();
		var timeStop = new Array();
		var time = new Array();
		var response = new Array();
		var timetmp = new Array();
		var thisitem = new Array();
		var touch = new Array();
		var x = document.getElementsByClassName("3Dtouch");

		for (iter = 0; iter < x.length; iter++) {
			x[iter].className = x[iter].className + ' 3DtouchItem'+iter;
			$('.3DtouchItem'+iter).attr('data-iter',iter);
			thisitem[iter] = $('.3DtouchItem'+iter).attr('data-item');

			x[iter].addEventListener('touchmove', function(e) {
			    e.preventDefault();
			    touch[i] = e.touches[0];

			    if(startX[i]==undefined) startX[i] = touch[i].pageX;
			    if(startY[i]==undefined) startY[i] = touch[i].pageY;
			    endX[i] = touch[i].pageX;
			    endY[i] = touch[i].pageY;

			    if(startX[i]<endX[i])
			    {
			    	outStartX[i] = startX[i];
			    	outEndX[i] = endX[i];
			    }else{
			    	outStartX[i] = endX[i];
			    	outEndX[i] = startX[i];
			    }
			    if(startY[i]<endY[i])
			    {
			    	outStartY[i] = startY[i];
			    	outEndY[i] = endY[i];
			    }else{
			    	outStartY[i] = endY[i];
			    	outEndY[i] = startY[i];
			    }

			    xd[i] = outEndX[i]-outStartX[i];
			    yd[i] = outEndY[i]-outStartY[i];
			    d[i] = Math.sqrt((xd[i]*xd[i])+(yd[i]*yd[i]));


			    timetmp[i] = (new Date).getTime()-timeStart[i];

			    if(timetmp[i]>300) response[i] = 'hold';
			    if(timetmp[i]>300 && d[i]>3 && d[i]<30) response[i] = 'holdpress';
			    if(d[i]>30) response[i] = 'swipe';

			    if(response[i] != undefined) $('.'+thisitem[i]).addClass('active').addClass(response[i]);
			    console.log(d);
			}, false);
		

			$('.3Dtouch').on('touchstart',function(){
				i = $(this).attr('data-iter');
				timeStart[i] = (new Date).getTime();
			})

			$('.3DtouchItem'+i).on('touchend',function(){
				timeStop[i] = (new Date).getTime();
				time[i] = timeStop[i] - timeStart[i];

				if(time[i]<100) response[i] = 'quicktap';
				if(time[i]>100 && time[i]<300) response[i] = 'tap';
				if(time[i]>300) response[i] = 'hold';

				if(response[i] != undefined) $('.'+thisitem[i]).addClass('active').addClass(response[i]);

				startX[i] = undefined;
				startY[i] = undefined;
				endX[i] = undefined;
				endY[i] = undefined;
				outStartX[i] = undefined;
				outStartY[i] = undefined;
				outEndX[i] = undefined;
				outEndY[i] = undefined;
				d[i] = undefined;
				xd[i] = undefined;
				yd[i] = undefined;
				timeStart[i] = undefined;
				timeStop[i] = undefined;
				time[i] = undefined;
				response[i] = undefined;
				timetmp[i] = undefined;
				if(settings.time>0) setTimeout(
				  function() 
				  {
				    $('.'+thisitem[i]).removeClass('active').removeClass('hold').removeClass('holdpress').removeClass('swipe').removeClass('tap').removeClass('quicktap');
				  }, settings.time);
			})
		}
	};
 	
}( jQuery ));