var gamecanvas,mh,mw,basicdrawing,canvas,animation = new Array(),done = 0,fps = 100,count=0,jumpU = false,jump = false,decend = false,starttime=0,useW,useH,decendU = false,start = true,rh=0,rw=0,rhU=0,rwU=0,score=0,initial=true;
//115 162
window.onload = function(){
    gamecanvas = document.getElementById("gamecanvas");
    mh = window.innerHeight;
    mw = window.innerWidth;
    gamecanvas.width = mw;
    gamecanvas.height = mh;
    canvas = gamecanvas.getContext("2d");
    
    canvas.beginPath();
    canvas.rect(0,0,mw,mh);
    canvas.fillStyle = "#ff3030";
    canvas.fill();
    
    canvas.beginPath();
    canvas.rect(0,mh-10,mw,mh);
    canvas.fillStyle = "#000";
    canvas.fill();
    
    canvas.beginPath();
    canvas.rect(0,(mh/2)-10,mw,10);
    canvas.fillStyle = "#000";
    canvas.fill();
    
    canvas.beginPath();
    canvas.rect(0,0,mw,((mh/2)-10));
    canvas.fillStyle = "#00f439";
    canvas.fill();
    
    var images = gamecanvas.toDataURL();
    basicdrawing = new Image();
    basicdrawing.src = images;
 
    for(i = 0; i <=8; i++){
        loadImages(i);
    }
    var moveup = moveupU = 0;
    var movebrick = cf = 0;
    var movebrickU = cfU = 0;
    var incg = 0;
    setInterval(function(){
        if(start === true){
            if(count == 8){
                count = 0;
            }    
            if(done == 9){
                startfill();
                var currentIm = animation[count];
                /*****************************  TOP  *************************************/
                if(jumpU === false){
                    canvas.drawImage(currentIm,0,(mh/2)-(10+useH),useW,useH);
                    var topU = (mh/2)+110;
                    var botU = (mh/2)+10;
                }
                else{
                    canvas.drawImage(currentIm,0,(mh/2)-(10+useH+moveupU),useW,useH);
                    var topU = (mh/2)+110+moveupU;
                    var botU = (mh/2)+10+moveupU;
                    if(decendU === true){
                        if(moveupU <= 0){
                            moveupU = 0;
                            jumpU = false;
                            decendU = false;
                        }
                        else{
                            moveupU = moveupU - 5;
                        }
                    }
                    else if(decendU==false){
                        moveupU += 5;
                        if(moveupU >= 200){
                            decendU = true;
                        }
                    }
                }
                // bricks here
                if((cfU+rwU)<=0){
                    if(initial===false){
                        score++;
                    }
                    cfU = movebrickU = 0;
                    rhU = getRandomInt(50,120);
                    rwU = getRandomInt(20,130);
                }
                cfU = mw - (movebrickU+50);
                var btopU = (mh/2)+rhU;
                var bbotU = (mh/2)+10;
                canvas.rect(cfU, (mh/2)-(rhU+10),rwU,rhU);
                canvas.fillStyle = "#000";
                canvas.fill();
                var cond1U = (btopU <= topU && btopU >= botU) || (bbotU <= topU && bbotU >= botU);  
                if(cfU>=24 && cfU<=76 && cond1U){
                    var audio = document.createElement('audio');
                    audio.setAttribute('src','images/crash.mp3');
                    audio.play();
                    start = false;
                }
                movebrickU = movebrickU + 11;

                /*****************************  BOTTOM  *************************************/
                if(jump === false){
                    canvas.drawImage(currentIm,0,mh-(10+useH),useW,useH);
                    var top = 110;
                    var bot = 10;
                }
                else{
                    canvas.drawImage(currentIm,0,mh-(10+useH+moveup),useW,useH);
                    var top = 110+moveup;
                    var bot = 10+moveup;
                    if(decend === true){
                        if(moveup <= 0){
                            moveup = 0;
                            jump = false;
                            decend = false;
                        }
                        else{
                            moveup = moveup - 5;
                        }
                    }
                    else if(decend==false){
                        moveup += 5;
                        if(moveup >= 200){
                            decend = true;
                        }
                    }
                }
                // bricks here
                if((cf+rw)<=0){
                    if(initial===false){
                        score++;
                    }
                    cf = movebrick = 0;
                    rh = getRandomInt(50,120);
                    rw = getRandomInt(20,130);
                }
                cf = mw - (movebrick+50);
                var btop = rh;
                var bbot = 10;
                canvas.rect(cf, mh-(rh+10),rw, mh-10);
                canvas.fillStyle = "#000";
                canvas.fill();

                var cond1 = (btop <= top && btop >= bot) || (bbot <= top && bbot >= bot);  

                if(cf>=24 && cf<=76 && cond1){
                    var audio = document.createElement('audio');
                    audio.setAttribute('src','images/crash.mp3');
                    audio.play();
                    start = false;
                }

                movebrick = movebrick + 13;
                if(incg==3){
                    incg = 0;
                    count++;
                }
                else{
                    incg++;
                }
                initial=false;
            }
        }
    },1000/fps);
    
}

function drawBricks(){
    var movebrick = cf = 0;
    canvas.beginPath();
    //var inter = setInterval(function(){
        cf = mw - (movebrick+20);
        canvas.rect(cf, mh-100,20, mh-10);
        canvas.fillStyle = "#000";
        canvas.fill();
        if(cf <= 0){
            window.clearInterval(inter);
        }
        movebrick = movebrick + 1;
    //},10);
}


function loadImages(i){
    var io = new Image();
    io.src = 'images/'+i+'.png';
    io.onload = function(){
        done++; 
        animation[i] = io; 
        var prop = io.width/io.height;
        useH = 100;
        useW = prop*useH;
    }    
}

function startfill(){
    canvas.beginPath();
    canvas.clearRect(0, 0, mw, mh);
    canvas.drawImage(basicdrawing,0,0,mw,mh);
    canvas.font="40px Arial";
    canvas.fillText("Score : "+score,mw-250,60 );
    //drawBricks();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.onkeydown = function(e){
    if(e.keyCode==40 && jump === false){
        jump = true;
        var audio = document.createElement('audio');
        audio.setAttribute('src','images/jump.mp3');
        audio.play();
    }
    if(e.keyCode==38 && jumpU === false){
        jumpU = true;
        var audio = document.createElement('audio');
        audio.setAttribute('src','images/jump.mp3');
        audio.play();
    }
    if(e.keyCode==13){
        window.location.reload();
    }
}