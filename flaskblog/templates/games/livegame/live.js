
var canvas = document.getElementById('canvas-live'); 
var ctx = canvas.getContext('2d'); 
var mas=[]; 
var count=0; 
var timer; 
var ret = false;
var stop = false;
var pointcount = 0;

canvas.onclick = function(event){ 
    var x = event.offsetX; 
    var y = event.offsetY; 
    console.log(x); 
    console.log(y); 
    x = Math.floor(x/10); 
    y = Math.floor(y/10); 
    mas[y][x]=1; 
    console.log(mas); 
    drawField(); 
    pointcount++;
} 

function goLife(){ 
    var n=60, m=60; 
    for (var i=0; i<m; i++){ 
        mas[i]=[]; 
        for (var j=0; j<n; j++){ 
            mas[i][j]=0; 
            } 
        } 
} 
goLife(); 

var start = document.getElementById('start');
start.addEventListener('click',function(){
    if(pointcount === 0){
        alert('Нарисуйте изначальные клетки');
    }else{
        ret = false;
        stop = false;
        console.log(pause);
        startLife();
    }
});

var pause = document.getElementById('pause');
pause.addEventListener('click',function(){
    pauseClick();
});
function pauseClick(){
    stop = true;
}
var cont = document.getElementById('cont');
cont.addEventListener('click',function(){
    stop = false;
    startLife();
});

var re = document.getElementById('restart');
re.addEventListener('click',function(){
    ret= true;
    pointcount = 0;
    restart();
    
});
function restart(){
    ctx.clearRect(0, 0, 600, 600); 
    for (var i=0; i<60; i++){ 
        for (var j=0; j<60; j++){ 
                mas[i][j] = 0; 
            } 
     } 
     count = 0;
     document.getElementById('count').innerHTML = count; 
     goLife();
}

function drawField(){ 
    ctx.clearRect(0, 0, 600, 600); 
    for (var i=0; i<60; i++){ 
        for (var j=0; j<60; j++){ 
            if (mas[i][j]==1){ 
                ctx.fillStyle = '#66ff00';
                ctx.fillRect(j*10, i*10, 10, 10); 
                } 
            } 
     } 
} 

function startLife(){ 
    if(ret){
       return;
    } else if(stop){
        return;
    } else{
        var mas2 = []; 
        for (var i=0; i<60; i++){ 
            mas2[i]=[]; 
            for (var j=0; j<60; j++){ 
                var neighbors = 0; 
                if (mas[fpm(i)-1][j]==1) neighbors++;
                if (mas[i][fpp(j)+1]==1) neighbors++;
                if (mas[fpp(i)+1][j]==1) neighbors++;
                if (mas[i][fpm(j)-1]==1) neighbors++;
                if (mas[fpm(i)-1][fpp(j)+1]==1) neighbors++; 
                if (mas[fpp(i)+1][fpp(j)+1]==1) neighbors++; 
                if (mas[fpp(i)+1][fpm(j)-1]==1) neighbors++; 
                if (mas[fpm(i)-1][fpm(j)-1]==1) neighbors++; 
                (neighbors==2 || neighbors==3) ? mas2[i][j]=1 : mas2[i][j]==0; 
            } 
        } 
        mas = mas2; 
        drawField(); 
        count++; 
        document.getElementById('count').innerHTML = count; 
        timer = setTimeout(startLife, 300); 
    }
} 

function fpm(i){ 
    if(i==0) return 60; 
        else return i; 
    } 
function fpp(i){ 
    if(i==59) return -1; 
    else return i; 
} 

// document.getElementById('start').onclick = startLife;