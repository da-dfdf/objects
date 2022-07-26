img = "";
status = "";
objects = [];

function preload(){
     img = loadImage("dog_cat.jpg");
}

function setup(){
    canvas = createCanvas(640,420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded(){
    console.log("model loaded");
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    status = true;

    objectDetector.detect(img, gotResults);
     
}
    

function gotResults(error, results){
    if(error){
        console.log(error);
    }

    console.log(results);
    objects = results;
}

function draw(){
    image(img,0,0,640,420);

    if(status != ""){
        for(i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("red");
            stroke("red");
            
            accuracy = floor(objects[i].confidence*100);

            text(objects[i].label + " " + accuracy + "%", objects[i].x, objects[i].y);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }

    
}