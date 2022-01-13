leftWristX="";
leftWristY="";
rightWristX="";
rightWristY="";
scoreleftWrist=0;
scoreRighttWrist=0;

status_1="";
status_2="";
  
function setup()
{
    canvas=createCanvas(500,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
      poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
 function gotPoses(results)
 {
     if(results.length > 0)
     {
         console.log(results);
         scoreleftWrist=results[0].pose.keypoints[9].score;
         scoreRightWrist=results[0].pose.keypoints[10].score;
         
  console.log(results);
         leftWristX=results[0].pose.leftWrist.x;
         leftWristY=results[0].pose.leftWrist.y;
        
            console.log("leftWristX=" +leftWristX+"leftWristY="+ leftWristY);
            rightWristX=results[0].pose.rightWrist.x;
            rightWristY=results[0].pose.rightWrist.y;
         console.log("righttWristY=" +rightWristY+"rightWristY="+ rightWristY);
     }
 }
 
 function modelLoaded()
 {
     console.log("PoseNet is intialized! Hurray!")
 }

 function draw()
 {
     image(video,0,0,500,500);
     status_1=song.isPlaying();
     status_2=song2.isPlaying();
    
     fill("#FF0000");
     stroke("#FF0000");

     if(scoreleftWrist> 0.2)
     {
        circle(leftWristX,leftWristY,20);
        song.stop();
       
        if(status_2 == false)
        {
            song2.play();
        }
        else
        {
            document.getElementById("play_button").innerHTML = "Song Name:Peter Pan ";
        }

     }

     if(scoreRighttWrist> 0.2)
     {
        circle(leftWristX,leftWristY,20);
        song2.stop();
       
        if(status_1 == false)
        {
            song.play();
        }
        else
        {
            document.getElementById("play_button").innerHTML = "Song Name:Harry Potter";
        }
    }
 }

 function preload()
 {
     song = loadSound("music.mp3");
     song2=loadSound('music2.mp3');
 }



