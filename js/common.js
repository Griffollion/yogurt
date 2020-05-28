var slideIndex = 1;
var objects = [
  "./images/yogurt1.png",
  "./images/yogurt2.png",
  "./images/yogurt3.png",
];
var texts = [
  "./images/page2__yogurt-text-1.png",
  "./images/page2__yogurt-text-2.png",
  "./images/page2__yogurt-text-3.png",
];
var zzz = [
  ["./images/object2.png", "./images/object1.png"],
  ["./images/object6.png", "./images/object5.png"],
  ["./images/object4.png", "./images/object3.png"],
];
var screens = document.querySelectorAll(".screen");

function plusSlides(n, cls) {
  showSlides((slideIndex += n), cls);
}

function showSlides(n, cls) {
  var i;
  var slides = document.querySelectorAll(".screen__object-container");

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
    slides[i].classList.remove("fwd");
    slides[i].classList.remove("bck");
  }

  slides[slideIndex - 1].classList.add("active");
  slides[slideIndex - 1].classList.add(cls);
}

function setImages(variant) {
  var screen2Text = document.querySelector(".screen-2 .screen__text-1 img");
  var screen2Img = document.querySelector(".screen-2 .screen__object img");
  var screen4Img = document.querySelector(".screen-4 .screen__object img");
  var ingridients = document.querySelectorAll(
    ".screen-4 .screen__ingrideent img"
  );
  screen2Text.setAttribute("src", texts[variant]);
  screen2Img.setAttribute("src", objects[variant]);
  screen4Img.setAttribute("src", objects[variant]);
  console.log(zzz[variant]);
  //   ingridients.forEach(function (el, index) {
  //     el.setAttribute('src', zzz[variant][index]);
  //   });

  for (var i = 0, len = ingridients.length; i < len; i++) {
    ingridients[i].setAttribute("src", zzz[variant][i]);
  }
}

function setObject() {
  var selectedObject = document.querySelector(
    ".screen__object-container.active"
  );
  var container = document.querySelector(".container");
  var chose = selectedObject.getAttribute("data-object");
  container.setAttribute("data-selected", chose);
  setImages(chose);

  for (var i = 0, len = screens.length; i < len; i++) {
    screens[i].classList.remove("active");
  }
  //   screens.forEach(function (el) {
  //     el.classList.remove('active');
  //   });
  screens[1].classList.add("active");
}

function startGame() {
//   screens.forEach(function (el) {
//     el.classList.remove("active");
//   });
  for (var i = 0, len = screens.length; i < len; i++) {
    screens[i].classList.remove("active");
  }
  screens[3].classList.add("active");
}

window.addEventListener("load", function () {
  var screen1 = this.document.querySelector(".screen.screen-1");
  screen1.classList.add("active");
});
