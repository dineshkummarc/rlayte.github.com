var eno = (function(){
	var stage,
		circles = [],
		samples = [],
		colours = [];
		
	
	var randomNumber = function(startValue, endValue){
		return Math.round(Math.random() * (endValue - startValue) + startValue);
	}
	
	var drawCircle = function(event){
		var circle = {
			x: event.pageX - $(this).offset().left,
			y: event.pageY - $(this).offset().top,
			radius: 0,
			speed: 1,
			changeDirection: function(){
				this.speed *= -1;
			},
			colour: (function(){
				return colours[randomNumber(0,colours.length)]
			})(),
			draw: function(){
				if(this.radius <= 0)
				  this.speed = 1;
				
				stage.beginPath();
				stage.fillStyle = this.colour;
				stage.arc(this.x, this.y, this.radius += this.speed, 0, Math.PI*2, true);
				stage.closePath();
				stage.fill();
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
		
		stage.clearRect(0, 0, stage.width, stage.height);
		
		for (var i = 0, l = circles.length; i < l; i++) {
			var circle = circles[i];
			
			for(var degree = 0; degree < 360; degree++) {
				var point = createPoint(circle.x, circle.y, degree, circle.radius + (circle.speed*2));
				
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
		var sound = Math.round((d/(stage.width / 3)) * samples.length);
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
			
			stage.width = canvas.width;
			stage.height = canvas.height;
			
			colours = params.colours || [ "#00aeef", "#ec008c", "#fff200" ];
			
			loadSamples("reich", 11);
			stage.globalAlpha = 0.6;
			
			$(canvas).click(drawCircle);
			enterFrame(frameRate);
		},

		changeSamples: function(){
			var artist = $(this).attr('href'),
				numSamples = $(this).attr('class');
			
			loadSamples(artist, numSamples);
			
			event.preventDefault();
			return false;
		}

	};
})();

$(document).ready(function() {
	eno.init(document.getElementById('10010'), {frameRate: 30});
	$('#artists a').click(eno.changeSamples)
});
