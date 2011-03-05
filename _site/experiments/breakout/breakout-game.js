var breakout = (function() {
	var stage, factory, ball, paddle, bricks;

	var breakout_factory = function(boundries) {

		return {

			create_paddle: function(width, height, speed) {
				var position = 295,
					currentSpeed = 0;

				$(document).keydown(function(e) {
					switch(e.keyCode) {
						case 37:
							currentSpeed = -speed;
							break;
						case 39:
							currentSpeed = speed;
							break;
					};
				});

				$(document).keyup(function(e) {
					currentSpeed = 0;
				});

				return {

					draw: function() {

						if(position + currentSpeed < boundries.left) {
							position = boundries.left;
						}
						else if(position + currentSpeed + width > boundries.right) {
						 	position = boundries.right - width;
						}
						else{
							position += currentSpeed;
						}

						stage.fillRect(position, boundries.bottom - height, width, height);
					},

					getPosition: function() {
						return position;
					},

					getWidth: function() {
						return width;
					}

				}
			},

			create_ball: function(radius, speed) {
				var xPos = 325,
					yPos = 325,
					xDir = speed,
					yDir = -speed;

				var move = function() {
					if((xPos + xDir) - radius <= boundries.left || (xPos + xDir) + radius >= boundries.right) xDir *= -1;
					if((yPos + yDir) - radius <= boundries.top) yDir *= -1;
					if((yPos + yDir) + radius >= boundries.bottom - 10) {
						
                        if((xPos + xDir) >= paddle.getPosition() && (xPos + xDir) <= paddle.getPosition() + paddle.getWidth()) {
							 yDir *= -1;
						}
						else{

						}

					};

					xPos += xDir;
					yPos += yDir;
				}

				return {

					draw: function() {
						move();

						stage.beginPath();
						stage.arc(xPos, yPos, radius, 0, (Math.PI/180) * 360, true);
						stage.closePath();
						stage.fill();
					},

					coordinates: function() {

						return {
							x: xPos,
							y: yPos
						};

					},

					bounce: function() {
						yDir *= -1;
					}
				}
			},

			create_bricks: function(numBricks, width, height) {
				var bricks = [];

				for (var i = 0; i < numBricks; i++) {
					var xPos = i > 0 ? bricks[i-1].x + width + 10 : 25,
						yPos = i > 0 ? bricks[i-1].y : 25;

					if(xPos > boundries.right - 20 - width) {
						xPos = 25;
						yPos += (height + 10);
					};

					bricks.push({

						x: xPos,
						y: yPos,

						draw: function() {
							if(!this.destroyed)
							  stage.fillRect(this.x, this.y, width, height);
						},

						clear: function() {
							stage.clearRect(this.x, this.y, width, height);
							this.destroyed = true;
						},

						destroyed: false

					});

				};

				return {
					draw: function() {

						for(var i = 0, l = bricks.length; i < l; i++) {
							var coordinates = ball.coordinates();

							if(!bricks[i].destroyed) {
								if(coordinates.y - 10 < bricks[i].y + height) {

									if(coordinates.x > bricks[i].x && coordinates.x < bricks[i].x + width) {
										bricks[i].clear();
										ball.bounce();
									}
									else{
										bricks[i].draw();
									}

								}
								else {
									bricks[i].draw();
								}
							}
						}

					}
				}

			},

			create_walls: function() {

				return {
					draw: function() {
						stage.beginPath();
						stage.moveTo(boundries.left, boundries.bottom + 10);
						stage.lineTo(boundries.left, boundries.top);
						stage.lineTo(boundries.right, boundries.top);
						stage.lineTo(boundries.right, boundries.bottom + 10);
						stage.closePath();
						stage.stroke();
					}
				}

			}
            
		}
	}

	var create_stage = function(canvas, lineWidth, colour) {
		var stage;

		if(canvas.getContext)
		  stage = canvas.getContext('2d');

		stage.lineWidth = lineWidth;
		stage.fillStyle = colour;
		stage.strokeStyle = colour;

		stage.display_list = function() {
			var children = [];

			return {
				add: function(child) {
					children.push(child);
				},
				children: function() {
					return children;
				}
			}

		}();

		stage.update = function() {
			this.clear();

			for (var i=0; i < this.display_list.children().length; i++) {
				this.display_list.children()[i].draw();
			};
		}

		stage.clear = function() {
			stage.clearRect(0, 0, canvas.width, canvas.height);
		}

		return stage;
	}

	var enter_frame = function(frameRate) {
		stage.update();
		setTimeout(enter_frame, 1000/frameRate);
	}

	return {

		init: function(canvas) {
			stage = create_stage(canvas, 10, "#0f0");

			factory = breakout_factory({ left: 0, right: 600, top: 0, bottom: 400 });

			stage.display_list.add(factory.create_walls());

			paddle = factory.create_paddle(80, 10, 5);
			stage.display_list.add(paddle);

			ball = factory.create_ball(10, 2);
			stage.display_list.add(ball);

			bricks = factory.create_bricks(42, 30, 10);
			stage.display_list.add(bricks);

			enter_frame(24);
		}

	}

})();

$(document).ready(function() {
	breakout.init(document.getElementById('breakout'));
});
