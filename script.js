/* Active tabs navigation */

let navigationItem = document.querySelectorAll(".navigation-link");
for (let elem of navigationItem) {
  elem.addEventListener("click", navigationColor);
}

function navigationColor() {
  for (let elem of navigationItem) {
    elem.classList.remove("navigation-link-active");
  }
  this.classList.toggle("navigation-link-active");
}

/* Reorder images */

let portfolioButton = document.querySelectorAll(".portfolio-buttons");
let portfolioImages = document.querySelectorAll(".work-card img");

for (let elem of portfolioButton) {
  elem.addEventListener("click", portfolioButtons);
}

function reorder(array) {
  let i = array.length;
  let k = 0;
  let j;
  while (i -= 1) {
    k = Math.floor(Math.random() * (i + 1));
    j = array[i];
    array[i] = array[k];
    array[k] = j;
  }
  return array;
}

function portfolioButtons() {
  for (let elem of portfolioButton) {
    elem.classList.remove("portfolio-buttons-active");
  }
  this.classList.toggle("portfolio-buttons-active");

  for (let elem of portfolioImages) {
    elem.classList.remove("bordered");
  }

  let number = reorder([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  let length = number.length;
  for (let i = 0; i < length; i += 1) {
    portfolioImages[i].src = `assets/img/work/work_0${number[i]}.jpg`;
  }
}

/* Work images border */

for (elem of portfolioImages) {
  elem.addEventListener("click", borderOn);
  elem.addEventListener("dblclick", borderOff);
}

function borderOn() {
  for (let elem of portfolioImages) {
    elem.classList.remove("bordered");
  }
  this.classList.toggle("bordered");
}

function borderOff(event) {
  target = event.target;
  if (target.classList.contains("bordered")) {
    target.classList.remove("bordered");
  }
}

/*Switch display iphones*/

let phones = document.querySelectorAll('.phone');
for (let elem of phones) {
  elem.addEventListener("click", function () {
    elem.classList.toggle("display-switch");
  });
};

/* Submit */

function submitInput() {
  let theme = document.querySelectorAll('.input')[2].value ? `Тема: ${document.querySelectorAll('.input')[2].value}` : 'Без темы';
  let description = document.querySelectorAll('.input')[3].value ? `Описание: ${document.querySelectorAll('.input')[3].value}` : 'Без описания';
  let alertmessage = `Письмо отправлено
  ${theme}
  ${description}
  `;
  alert(alertmessage);
}

/* Smooth scrolling to anchor*/

let anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    let blockID = anchor.getAttribute('href').substr(1)
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

/* Slider */

let slider = document.querySelector(".slider");
let slides = slider.querySelectorAll(".slide");

function sliderReset() {
  let index = 0;
  slides.forEach((temp, tempindex) => {
    if(temp.classList.contains("slide-active")) {
      index = tempindex;
      temp.classList.remove("slide-active");
    }
  });

  return index;
}

function changeSlides(Number) {
  slider.classList.toggle("slider-first", Number === 0);
  slider.classList.toggle("slider-second", Number === 1);
}

function nextSlide() {
  let index = (sliderReset() + 1) % slides.length;
  slides[index].classList.add("slide-active");
  changeSlides(index);
}

function prevSlide() {
  let index = sliderReset() - 1;
  if(index < 0) index = slides.length - 1;
  slides[index].classList.add("slide-active");
  changeSlides(index);
}

let prevArrow = document.querySelector(".arrow-left");
let nextArrow = document.querySelector(".arrow-right");

prevArrow.addEventListener("click", function () {
  prevSlide();
});

nextArrow.addEventListener("click", function () {
  nextSlide();
});