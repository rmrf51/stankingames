const canvas = document.querySelector('.canvas-pong');
canvas.width = 800;
canvas.height = 600;
const context = canvas.getContext('2d');
let keys = {};
let scorePlayer_1 = 0;
let scorePlayer_2 = 0;
const backgroundMusic = new Audio('assets/background_music.mp3');
backgroundMusic.volume = 0.05;
backgroundMusic.loop = true;
const splashMusic = new Audio('');
splashMusic.volume = 0.1;
const ballImg = [new Image(), new Image()];
ballImg[0].src = 'assets/1.jpg';
ballImg[1].src = 'assets/2.png';

document.addEventListener('keydown', e =>{
	// console.log(e);
	keys[e.keyCode] = true;
});
document.addEventListener('keyup', e =>{
	delete keys[e.keyCode];
});

const ball = {
	x : canvas.width / 2 - 5,
	y : canvas.height / 2 - 5,
	h : 10,
	w : 10,
	dx : 5,
	dy : 5,
	move : function () {
		this.x += this.dx;
		this.y += this.dy;
	}
};
const player_1 = {
	x : 10,
	y : canvas.height / 2 - 50,
	h : 100,
	w : 10,
	dy : 20,
	moveUp : function() {
		if ( this.y - 20 >= 0 )
		  this.y -= this.dy;
	},
	moveDown : function() {
		if ( this.y + 20 <= canvas.height - 100 )
			this.y += this.dy;
	}
	
};
const player_2 = {
	x : canvas.width - 20,
	y : canvas.height / 2 - 50,
	h : 100,
	w : 10,
	dy : 20,
	moveUp : function() {
		if ( this.y - 20 >= 0 )
			this.y -= this.dy;
	},
	moveDown : function() {
		if ( this.y + 20 <= canvas.height - 100 )
			this.y += this.dy;
	}
	
};
function randomInteger( min, max ) {
	let rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return Math.abs(rand);
}

function collision () {
	if( ball.y + 5 <= 15 || ball.y + 20 >= canvas.height)
		ball.dy = -ball.dy;
	//player.x + 20
  if ( ball.x + 5 === 20 && (ball.y + 5 >= player_1.y && ball.y + 5 <= player_1.y + 100) ){
		ball.dx = -ball.dx;
		splashMusic.play();
  }
  if ( ball.x + 5 === canvas.width - 20 && ( ball.y + 5 >= player_2.y && ball.y + 5 <= player_2.y + 100 ) ){
      ball.dx = -ball.dx;
      splashMusic.play();
  }
}
function addPoint () {
	if ( ball.x + 5  > canvas.width - 7) {
		// alert('ldasd');
		scorePlayer_1 += 1;
		console.log(scorePlayer_1);
		ball.x = canvas.width / 2 - 5;
		ball.y = canvas.height / 2 - 5;
		let upOrDown = randomInteger(0, 1);
		if(upOrDown === 0){
			ball.dy = -ball.dy;
		} else {
			ball.dy = ball.dy;
		}
		ball.dx = - ball.dx;
	} else if (ball.x + 10 === 5 ) {
		scorePlayer_2 += 1;
		console.log(scorePlayer_2);
		ball.x = canvas.width / 2 - 5;
		ball.y = canvas.height / 2 - 5;
		let upOrDown = randomInteger(0, 1);
		if(upOrDown === 0){
			ball.dy = -ball.dy;
		} else {
			ball.dy = ball.dy;
		}
		ball.dx = - ball.dx;
	}
	
}
function drawBall () {
	context.beginPath();
	context.fillStyle = 'white';
	context.fillRect(ball.x, ball.y, ball.w, ball.h);
	context.closePath();
}
function moveBall () {
	addPoint();
	collision();
	ball.move();
}
function movePlayer () {
	if ( 80 in keys ) player_2.moveUp();
	if ( 186 in keys ) player_2.moveDown();
	if ( 81 in keys ) player_1.moveUp();
	if ( 65 in keys ) player_1.moveDown();
}
function drawPlayer (player) {
	context.beginPath();
	context.fillStyle = 'white';
	context.fillRect(player.x, player.y, player.w, player.h);
	context.closePath();
}
function drawBg () {
	context.beginPath();
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.closePath();
	
	context.beginPath();
	context.fillStyle = 'white';
	context.fillRect(0, 5, canvas.width, 10);
	context.fillRect(0, canvas.height - 15, canvas.width, 10);
	context.closePath();
	
	context.beginPath();
	context.strokeStyle = 'white';
	context.lineWidth = 5;
	context.setLineDash([5, 15]);
	context.moveTo(canvas.width / 2, 0);
	context.lineTo(canvas.width / 2, canvas.height);
	context.stroke();
	context.closePath();
}
function drawScore () {
	context.beginPath();
	context.fillStyle = 'white';
	context.font = "20pt Arial";
	context.fillText(scorePlayer_1, 200, 50);
	context.fillText(scorePlayer_2, 600, 50);
	context.closePath();
}
function endGame () {
	if(scorePlayer_1 === 11){
		alert('Player 1 win');
		scorePlayer_2 = 0;
		scorePlayer_1 = 0;
		ball.x = canvas.width / 2 - 5;
		ball.y = canvas.height / 2 - 5;
	}else if ( scorePlayer_2 === 11 ){
		alert('Player 2 win');
		scorePlayer_2 = 0;
		scorePlayer_1 = 0;
		ball.x = canvas.width / 2 - 5;
		ball.y = canvas.height / 2 - 5;
	}
}
function render () {
	drawBg();
	drawBall();
	drawPlayer(player_1);
	drawPlayer(player_2);
	drawScore();
	moveBall();
	movePlayer();
	endGame();
	
	requestAnimationFrame(render);
}

drawBg();

let flag = 0;

addEventListener('keypress', ev => {
	if ( ev.keyCode === 13 && flag !== 1){
		render();
	    backgroundMusic.play();
		flag = 1;
	}
});