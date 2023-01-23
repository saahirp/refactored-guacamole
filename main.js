video = "";
status = "";
items = [];
function preload(){
    video = createVideo("video.mp4");
}
function setup(){
    canvas = createCanvas(675, 450);
    canvas.center();
}
function draw(){
    image(video, 0, 0, 675, 450);
    if(status != ""){
        detection.detect(video, gotResult);
    }
    for (i = 0; i < items.length; i++){
        document.getElementById("output").innerHTML = "Status : Objects Detected";
        document.getElementById("output2").innerHTML = "Number of objects detected are : "+items.length;

        fill("#0000FF");
        percent = floor(items[i].confidence * 100);
        text(items[i].label + " "+ percent + "%", items[i].x + 15, objects[i].y + 15 );
        noFill();
        stroke("#0000FF");
        rect(items[i].x, items[i].y, items[i].width, items[i].height);
    }
}
function start(){
    detection = ml5.objectDetector('cocossd', modelLoaded);
}
function modelLoaded(){
    console.log("model loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    items = results;
}