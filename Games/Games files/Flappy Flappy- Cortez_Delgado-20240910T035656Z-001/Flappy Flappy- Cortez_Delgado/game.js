var myGamePiece;
        var myObstacles = [];
        var myScore;

        function startGame() {
            myGamePiece = new component(30, 30, "Green", 10, 120);
            myGamePiece.gravity = 0.05;
            myScore = new component("30px", "Consolas", "white", 280, 40, "text");
            myGameArea.start();
            }

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        tryAgainButton.style.display = "none";
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.hitCeiling();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.hitCeiling = function() {
    var ceiling = 0;
    if (this.y < ceiling) {
        this.y = ceiling;
        this.gravitySpeed = 0;
    }
}
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            // Game over, show the try again button
            tryAgainButton.style.display = "block";
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "silver", x, 0));
        myObstacles.push(new component(10, x - height - gap, "silver", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
    
    if (myGameArea.frameNo % 1000 == 0) {
        myGameArea.interval = clearInterval(myGameArea.interval);
        myGameArea.interval = setInterval(updateGameArea, 15); // Decrease interval time to increase speed
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}

// Create a new button element
var tryAgainButton = document.createElement("button");
tryAgainButton.innerHTML = "Try Again";
tryAgainButton.style.position = "absolute";
tryAgainButton.style.top = "50%";
tryAgainButton.style.left = "50%";
tryAgainButton.style.transform = "translate(-50%, -50%)";
tryAgainButton.style.fontSize = "24px";
tryAgainButton.style.padding = "10px 20px";
tryAgainButton.style.border = "none";
tryAgainButton.style.borderRadius = "5px";
tryAgainButton.style.background = "#36454F";
tryAgainButton.style.color = "#fff";
tryAgainButton.style.cursor = "pointer";

// Add the button to the page
document.body.appendChild(tryAgainButton);

// Add an event listener to the button
tryAgainButton.addEventListener("click", function() {
  // Reset the game state
  myGamePiece.x = 10;
  myGamePiece.y = 120;
  myGamePiece.gravity = 0.05;
  myGamePiece.gravitySpeed = 0;
  myObstacles = [];
  myScore.text = "SCORE: 0";
  myGameArea.frameNo = 0;
  myGameArea.clear();
  clearInterval(myGameArea.interval); // Clear the old interval
  myGameArea.start();
  tryAgainButton.style.display = "none"; // Hide the button
});

document.addEventListener('keydown', (event) => {
      if (event.key === ' ' || event.key === 'Spacebar') {
        accelerate(-0.2);
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.key === ' ' || event.key === 'Spacebar') {
        accelerate(0.05);
      }
    });

    document.addEventListener('mousedown', function() { accelerate(-0.2); });

   document.addEventListener('mouseup', function() { accelerate(0.05); });