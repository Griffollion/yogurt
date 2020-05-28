var globalType = null;

var el = 0;
var counter = 0;
var progressElement = document.querySelector(".progress");
var screen2 = document.querySelector(".screen.screen-2");
var screen3 = document.querySelector(".screen.screen-3");
var screen4 = document.querySelector(".screen.screen-4");

let fruits = {
  cup: null,
  apple: { w: 70 },
  zerno: null,
  malina: null,
  grecha: null,
  klukva: null,
  cherry: null,
  objects: [],
  width: 240,
  height: 400,
  isClicked: false,
  init: function () {
    this.canvas = document.getElementById("canvas");
    this.ctx = document.getElementById("canvas").getContext("2d");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.setEvents();
  },
  setEvents() {
    window.addEventListener("mousedown", (e) => {
      this.isClicked = true;
    });

    window.addEventListener("mouseup", (e) => {
      this.isClicked = false;
    });

    window.addEventListener("mousemove", (e) => {
      if (this.isClicked) {
        this.cup.move(e.pageX);
      }
    });

    setInterval(function () {
      var el = getRandomInt(1, 7);
      var obj = null;
      var type = null;
      var maxSpeed = getRandomInt(100, 200);
      var graviry = 0.10;

      if(counter > 5) {
          graviry = 0.14
      } else if(counter > 10) {
        graviry = 0.20
      } else if(counter > 15) {
          graviry = 0.25
      }

      if (el == 1) {
        obj = "../images/object1.png";
        type = 0;
      } else if (el == 2) {
        obj = "../images/object2.png";
        type = 0;
      } else if (el == 3) {
        obj = "../images/object3.png";
        type = 2;
      } else if (el == 4) {
        obj = "../images/object4.png";
        type = 2;
      } else if (el == 5) {
        obj = "../images/object5.png";
        type = 1;
      } else if (el == 6) {
        obj = "../images/object6.png";
        type = 1;
      }

      fruits.objects.push(
        new Apple(
          getRandomInt(0, fruits.width - fruits.apple.w),
          -200,
          obj,
          maxSpeed,
          type,
          graviry
        )
      );
    }, 400);
  },
  preload(callback) {
    this.cupI = new Image();
    if(globalType == 0) {
      this.cupI.src = "../images/yogurt1.png";
    } else if(globalType == 1) {
      this.cupI.src = "../images/yogurt2.png";
    } else if(globalType == 2) {
      this.cupI.src = "../images/yogurt3.png";
    }

    this.appleI = new Image();
    this.appleI.src = "../images/object1.png";

    this.zernoI = new Image();
    this.zernoI.src = "../images/object2.png";

    this.malinaI = new Image();
    this.malinaI.src = "../images/object3.png";

    this.grechaI = new Image();
    this.grechaI.src = "../images/object4.png";

    this.klukvaI = new Image();
    this.klukvaI.src = "../images/object5.png";

    this.cherryI = new Image();
    this.cherryI.src = "../images/object6.png";

    callback();
  },
  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (i in this.objects) {
      this.objects[i].grav();
      this.objects[i].move();
      this.objects[i].count();
      this.objects[i].draw();
    }
    this.ctx.drawImage(
      this.cupI,
      this.cup.x,
      this.cup.y,
      this.cup.w,
      this.cup.h
    );
  },

  update() {
    //console.log(this.objects);
  },
  run() {
    window.requestAnimationFrame(() => {
      this.update();
      this.render();
      this.run();
    });
  },
  start: function () {
    this.init();
    this.preload(() => {
      this.run();
    });
  },
};

fruits.cup = {
  w: 106,
  h: 125,
  x: 48,
  y: 330,
  dx: 0,
  dy: 0,
  move(x) {
    if (x <= fruits.width - this.w / 2 && x > 0 + this.w / 2) {
      this.x = x - this.w / 2;
    } else if (x > fruits.width - this.w / 2) {
      this.x = fruits.width - this.w;
    } else {
      this.x = 0;
    }
  },
};

var Apple = function (x, y, src, spd, type, dd) {
  (this.x = x), (this.y = y), (this.dy = 0);
  (this.max = spd),
    (this.dd = dd),
    (this.src = src),
    (this.img = new Image()),
    (this.img.src = src),
    (this.type = type),
    (this.isCount = false);
};

Apple.prototype = {
  move: function () {
    this.y += this.dy;
  },
  grav: function () {
    this.dy += this.dy <= this.max ? this.dd : 0;
  },
  draw: function () {
    fruits.ctx.drawImage(this.img, this.x, this.y);
  },
  count: function () {
    if (
      this.y +20 >= fruits.cup.y &&
      this.x <= fruits.cup.w + fruits.cup.x &&
      this.x  >= fruits.cup.x &&
      !this.isCount &&
      this.type == globalType
    ) {
      this.isCount = true;
      this.y = 1500;
      counter++;
      console.log(counter);
    }
    if (
      this.y + 100 > fruits.cup.y &&
      this.x + 80 > fruits.cup.w &&
      this.x < fruits.cup.x &&
      !this.isCount
    ) {
      this.isCount = true;
    }
  },
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function userProgress(counter) {
  var start = counter * 4;

  if (start > 100) {
    userProgressCallBack();
  } else {
    progressElement.style.width = +start * 1.9 + "px";
  }
}

function userProgressCallBack() {
  screen3.classList.remove("active");
  screen4.classList.add("active");
}

setInterval(function () {
  userProgress(counter);
}, 100);

function startGame() {
  globalType = document
    .querySelector(".container")
    .getAttribute("data-selected");

  setTimeout(function () {
    screen2.classList.remove("active");
    screen3.classList.add("active");
    fruits.start();
  }, 100);
}
