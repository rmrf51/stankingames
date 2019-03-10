var cvs = document.getElementById('canvas-ball');
var ctx =cvs.getContext('2d');
var start = document.getElementById('start');
var restart = document.getElementById('restart');



var bird = new Image();
var backGround = new Image();
var frontGround = new Image();
var bottomGround = new Image();
var upGround = new Image();

backGround.src = "img/bg.png ";
frontGround.src = "img/fg.png ";
bottomGround.src = "img/pipeBottom.png ";
upGround.src = "img/pipeUp.png ";
bird.src = 'img/bird.png';

var gap = 105;
var xPos = 10;
var yPos = 150;
var gravity = 1.5;
var score = 0;
// var flyAudio = new Audio();
// var scoreAudio = new Audio();

// flyAudio.src = 'music/fly.mp3';
// scoreAudio.src = 'music/score.mp3';

document.addEventListener('keydown',function(e){
    if ( e.keyCode === 32){
        moveUp();
    } 
});

start.addEventListener('click',drawScene);
restart.addEventListener('click',reload);

function moveUp(){
    // flyAudio.play();
    for(var i =0; i< 30; i++){
        yPos-= 1;
    }
   
    gravity = 1.5;
    
}

var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}

function drawScene(){
    start.classList.add('hidden');
    ctx.drawImage(backGround,0,0);
    for( var i =0; i< pipe.length;i++){
        ctx.drawImage(upGround,pipe[i].x,pipe[i].y);
        ctx.drawImage(bottomGround,pipe[i].x, pipe[i].y + upGround.height + gap);
        pipe[i].x --;

        if(pipe[i].x == 110){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * upGround.height) - upGround.height
            })
        }

        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + upGround.width
            && (yPos <= pipe[i].y + upGround.height
            || yPos + bird.height >= pipe[i].y + upGround.height + gap) || yPos + bird.height >= cvs.height - frontGround.height) {
            restart.classList.remove('hidden');
            ctx.fillText('Ваш счет ' + score, 85, cvs.height-230)
            return 0;
            }


        if(pipe[i].x ==5 ){
            score++;
            // scoreAudio.play();
        }
    }
    ctx.drawImage(frontGround,0, cvs.height - frontGround.height);
    ctx.drawImage(bird,xPos,yPos);

    yPos+=gravity;
    gravity+=0.02;
    ctx.fillStyle="#000";
    ctx.font = "24px Arial";
    ctx.fillText('Score ' + score, 10, cvs.height-20);

    requestAnimationFrame(drawScene);
}
function reload(){
    location.reload();
}

