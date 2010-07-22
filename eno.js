var eno = (function(){
	var stage,
		circles = [],
		samples = [];
	
	var drawCircle = function(event){
		var circle = {
			x: event.pageX,
			y: event.pageY,
			radius: 0,
			speed: 1,
			changeDirection: function(){
				this.speed *= -1;
			},
			draw: function(){
				if(this.radius <= 0)
				  this.speed = 1;
				
				stage.beginPath();
				stage.arc(this.x, this.y, this.radius += this.speed, 0, Math.PI*2, true);
				stage.closePath();
				stage.stroke();
			}
		}
		
		circles.push(circle);
	};
	
	var createPoint = function(x, y, degree, radius){
		var opposite = Math.sin(degree) * radius,
			adjacent = Math.cos(degree) * radius,
			xCoordinate = Math.round(x + adjacent),
			yCoordinate = Math.round(y + opposite),
			point = [xCoordinate, yCoordinate];
			
		return point;
	};
	
	var enterFrame = function(frameRate){
		
		var hitPoints = {};
		
		stage.clearRect(0, 0, 500, 400);
		
		for (var i = 0, l = circles.length; i < l; i++) {
			var circle = circles[i];
			
			for(var degree = 0; degree < 360; degree++) {
				var point = createPoint(circle.x, circle.y, degree, circle.radius + circle.speed);
				
				if(!hitPoints[point]){
					hitPoints[point] = circle;
				}
				else if(hitPoints[point] != circle){
					hitPoints[point].changeDirection();
					circle.changeDirection();
					playSound(circle.radius);
					playSound(hitPoints[point].radius);
				}
			};
			
			circle.draw();
		};
		
		setTimeout(enterFrame, 1000/frameRate);
	};
	
	var playSound = function(d){
		var sound = Math.round((d/200) * samples.length);
		samples[sound > samples.length - 1 ? samples.length - 1 : sound].play();
	};
	
	var loadSamples = function(prefix, numSamples){
		$('#samples').children().remove();
		
		for (var i=0; i < numSamples; i++) {
			$('#samples').append("<audio id='pitch" + (i+1) + "'><source src='samples/" + prefix + "0" + (i+1) + ".mp3' type='audio/mp3' /></audio>");
		};
		
		samples = $('#samples').find('audio');
		console.log(samples);
	};
	
	return{
		init: function(canvas, params) {
			var frameRate = params.frameRate || 24;
			
			if(canvas.getContext)
			  stage = canvas.getContext('2d');
			
			loadSamples("eno", 11);
			
			$(canvas).click(drawCircle);
			enterFrame(frameRate);
		},
		changeSamples: function(){
			var artist = $(this).attr('href'),
				numSamples = $(this).attr('class');
			
			loadSamples(artist, numSamples);
			
			return false;
		}
	};
})();

$(document).ready(function() {
	eno.init(document.getElementById('10010'), {frameRate: 30});
	
	$('#artists a').click(eno.changeSamples)
});