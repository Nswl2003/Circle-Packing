const circlesPerFrame = 1;
const initialRad = 5;   //radius circles are initialized with
const fullness = 1000;  //amount of attempts to find new location for a circle
var circles = [];
var startPacking = false;
var complete = false;
var img;
var unvisitedPoints = [];

function preload() {
    img = loadImage("   "); //image path
}

function setup() {
    createCanvas(img.width, img.height);
    strokeWeight(2);
    for (var x = initialRad; x < width - initialRad; x++) {
        for (var y = initialRad; y < height - initialRad; y++) {
            unvisitedPoints.push(createVector(x, y));
        }
    }
}

function draw() {
    background(0);
   
    if (startPacking) {
        if (complete == false) {
            circlePack();
        }

        if (document.getElementById("animate").checked) {
            for (var c of circles) {
                if (complete == false) c.update();
                c.show();
            }
        } else {
            for (var c of circles) {
                if (complete == false) {
                    c.update();
                } else c.show();
            }
        }
    }
}

function circlePack() {
    var count = 0;
    var attempts = 0;
    while (count < circlesPerFrame) {
        var c = newCircle();
        if (c != null) {
            circles.push(c);
            count++;
        }
        attempts++;
        if (attempts > fullness) {
            console.log("DONE!");
            complete = true;
            break;
        }
    }
}

function newCircle() {
    var valid = true;
    var loc = random(unvisitedPoints);
    unvisitedPoints.splice(unvisitedPoints.indexOf(loc), 1);

    for (var c of circles) {
        var d = dist(loc.x, loc.y, c.x, c.y);
        if (d < c.r + initialRad + 1) {
            valid = false;
            break;
        }
    }

    if (valid) {
        var col = img.get(loc.x, loc.y);
        return new Circle(loc.x, loc.y, col);
    } else return null;
}
