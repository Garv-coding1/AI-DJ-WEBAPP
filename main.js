song="";
leftWristX = 0;
leftWristY = 0;
rightWristX= 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 450);
    canvas.position(450, 250);

    video = createCapture(VIDEO);
    video.hide();

 poseNet= ml5.poseNet(video, modelLoaded);
 poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is initialized!");
}

function draw() {
    image(video, 0, 0, 600, 450);
    fill("#00ff00");
    stroke("#00ff00");
    circle(rightWristX, rightWristY, 30);
    if (rightWristY > 0 && rightWristY <= 90){
        song.rate(0.5);
        document.getElementById("speed_value").innerHTML = "0.5x"
    }
    if (rightWristY > 90 && rightWristY <= 180) {
        song.rate(1);
        document.getElementById("speed_value").innerHTML = "1x"
    }
    if (rightWristY > 180 && rightWristY <= 270) {
        song.rate(1.5);
        document.getElementById("speed_value").innerHTML = "1.5x";
    }
    if (rightWristY > 270 && rightWristY <= 360) {
        song.rate(2);
        document.getElementById("speed_value").innerHTML = "2x";
    }
    if (rightWristY > 360 && rightWristY <= 450) {
        song.rate(2.5);
        document.getElementById("speed_value").innerHTML = "2.5x";
    }
    if (scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 30);
    leftWristYNo = Number(leftWristY);
    decimal_remove = floor(leftWristYNo);
    volume = decimal_remove/450
    document.getElementById("volume_value").innerHTML = volume;
    song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.rate(1);
    song.setVolume(1);
}

function stop() {
    song.stop();
}

function pause(){
    song.pause();
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score of Left Wrist = " + scoreLeftWrist);
        console.log("Score of Right Wrist  = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist X = " + leftWristX + " and Left Wrist Y = " + leftWristY);
        console.log("Right Wrist X = " + rightWristX + " and Right Wrist Y = " + rightWristY);
    }
}