scoreLeftWrist=0;
scoreRightWrist=0;
song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotResults);
}

function draw()
{
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist>0.2)
    {
    circle(leftwristx,leftwristy,20);
    convertLeftWristy=Number(leftwristy);
    removeDecimal=floor(convertLeftWristy);
    volume=removeDecimal/500;
    document.getElementById("volume").innerHTML="Volume="+volume;
    song.setVolume(volume);
    }

    if(scoreRightWrist>0.2)
    {

    
    circle(rightwristx,rightwristy,20);
    if(rightwristy>0 && rightwristy<=100)
    {
    document.getElementById("speed").innerHTML="Speed=0.5x";
    song.rate(0.5);
    }

   else if(rightwristy>100 && rightwristy<=200)
    {
    document.getElementById("speed").innerHTML="Speed=1x";
    song.rate(1);
    }

    else if(rightwristy>200 && rightwristy<=300)
    {
    document.getElementById("speed").innerHTML="Speed=1.5x";
    song.rate(1.5);
    }

   else if(rightwristy>300 && rightwristy<=400)
    {
    document.getElementById("speed").innerHTML="Speed=2x";
    song.rate(2);
    }

   else if(rightwristy>400 && rightwristy<=500)
    {
    document.getElementById("speed").innerHTML="Speed=2.5x";
    song.rate(2.5);
    }
}
}

function preload()
{
    song=loadSound("music1.mp3");
}

function music()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelloaded()
{
    console.log('model is loaded');
}

function gotResults(results)
{
    if(results.length>0)
    {
        console.log(results);

        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;

        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("leftwrist x="+leftwristx+"leftwrist y="+leftwristy);

        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("rightwrist x="+rightwristx+"rightwrist y="+rightwristy);
    }
}