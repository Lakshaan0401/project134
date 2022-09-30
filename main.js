stats = "";
object =[];
song = "";
function preload(){
    song = loadSound("bell-ringing-01c.mp3");
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelloaded);
}

function draw(){
    image(video,0,0,380,380);
    if(stats != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotresults);
        document.getElementById("status").innerHTML="Status : Detecting Objects";
        for(i=0; i<object.length; i++){
         fill(r,g,b);
         noFill();
         percent = floor(object[i].confidence*100);
         text(object[i].label+" "+percent+" % ",object[i].x+15,object[i].y+15);
         stroke(r,g,b);
         rect(object[i].x,object[i].y,object[i].width,object[i].height);
         if(object.length==1){
            document.getElementById("found").innerHTML="Baby Found";
            song.play();
         }
         else{
            document.getElementById("found").innerHTML="Baby Not Found";
            song.play();
         }
    }
}
}

function gotresults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object = results;
    }
}

function modelloaded(){
    console.log("model is loaded");
    stats = true;
}

