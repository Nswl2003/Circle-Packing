class Circle {
    constructor(x, y, colour) {
        this.x = x;
        this.y = y;
        this.r = initialRad;
        this.c = colour;
        this.stoppedGrowing = false;
    }

    update() {
        if (this.stoppedGrowing == false) {
            for (var circle of circles) {
                if (circle != this) {
                    if ((dist(this.x, this.y, circle.x, circle.y) <= this.r + circle.r + 2) || this.x + this.r >= width || this.x - this.r <= 0 || this.y + this.r >= height || this.y - this.r <= 0) {
                        this.stoppedGrowing = true;
                    }
                }
            }
            this.r++;
        }
    }

    show() {
        if (document.getElementById("fill").checked) {
            noStroke();
            fill(this.c);
            ellipse(this.x, this.y, (this.r * 2) + 2);
        } else {
            noFill();
            stroke(this.c);
            ellipse(this.x, this.y, this.r * 2);
        }
    }
}