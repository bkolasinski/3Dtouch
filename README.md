# 3Dtouch
This is a prototype available under the MIT license.
<br/>
3Dtouch allows the use of twinning to "3D touch" technology using any touch screen, not just in iPhone 6s or iPhone 6s+.
<br/><br/>
<a href="http://touch.crabby.pl/" target="_blank">Click here to try demo</a>
<br/><br/>
## Simple installation:

1. Add jQuery, swipe settings, jQuery mobile and 3Dtouch.js:
```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script>
    $(document).bind("mobileinit", function(){
        $.event.special.swipe.horizontalDistanceThreshold = 1;
        $.event.special.swipe.verticalDistanceThreshold = 1;
    });
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.js"></script>
<script src="3Dtouch.js"></script>
```

2. Add items to your DOM
```
<div class="cloud">Hello world!</div>
<div class="icon 3Dtouch" data-item="cloud"></div>
```

3. Run script
```
$(document).ready(function(){
	$('.3Dtouch').touch({
		time:1000
	});
})
```