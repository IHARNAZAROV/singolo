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
    k = Math.floor(Math.random() * (i + 2));
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

let phones = document.querySelectorAll(".phone");
for (let elem of phones) {
  elem.addEventListener("click", function () {
    elem.classList.toggle("display-switch");
  });
};

/* Smooth scrolling to anchor*/

let anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    let blockID = anchor.getAttribute("href").substr(1)

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
    if (temp.classList.contains("slide-active")) {
      index = tempindex;
      temp.classList.remove("slide-active");
    }
  });

  return index;
}

function changeSlides(Number) {
  slider.classList.toggle("slider-first", Number === 0);
  slider.classList.toggle("slider-second", Number === 1);
  slider.style.transition = "transform 5s ease-in-out";
}


function nextSlide() {

  let prevIndex = sliderReset();
  let nextIndex = (prevIndex + 1) % slides.length;

  slides[nextIndex].animate([{
      transform: 'translate(-100%)'
    },
    {
      transform: 'translate(0)'
    },
    {
      transform: 'rotate(180deg)'
    }
  ], {
    duration: 700
  });

  slides[prevIndex].animate([{
      transform: 'translate(0)'
    },
    {
      transform: 'translate(100%)'
    },
    {
      transform: 'rotate(180deg)'
    }
  ], {
    duration: 700,
  });

  slides[nextIndex].classList.add("slide-active");
  changeSlides(nextIndex);
}

function prevSlide() {
  let prevIndex = sliderReset()
  let nextIndex = prevIndex - 1;
  if (nextIndex < 0) nextIndex = slides.length - 1;

  slides[nextIndex].animate([{
      transform: 'translate(100%)'
    },
    {
      transform: 'translate(0)'
    },
    {
      transform: 'rotate(180deg)'
    }
  ], {
    duration: 700
  });

  slides[prevIndex].animate([{
      transform: 'translate(0)'
    },
    {
      transform: 'translate(-100%)'
    },
    {
      transform: 'rotate(180deg)'
    }
  ], {
    duration: 700
  });

  slides[nextIndex].classList.add('slide-active');
  changeSlides(nextIndex);
}

let prevArrow = document.querySelector(".arrow-left");
let nextArrow = document.querySelector(".arrow-right");

prevArrow.addEventListener("click", function () {
  prevSlide();
});

nextArrow.addEventListener("click", function () {
  nextSlide();
});

/*Get the button Gotop */
let scrollButton = document.getElementById("scrollButton");

/* When the user scrolls down 20px from the top of the document, show the button */
window.onscroll = function () {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
}

/* When the user clicks on the button, scroll to the top of the document */
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

/* Modal */

function modalWindow() {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject-input").value;
  let description = document.getElementById("textarea").value;
  let text = `<h1>Письмо отправлено</h1><br><b>Имя : </b>${name || 'Без имени'}<br><b>Почта : </b>${email || 'Без почты'}<br><b>Тема : </b>${subject || 'Без темы'}<br><b>Описание : </b>${description || 'Без описания'}`;
  document.getElementById("result").innerHTML = text;
}

document.getElementById("submit-button").addEventListener("click", modalWindow);

let modal = document.getElementById("modal-window");
let submitButton = document.getElementById("submit-button");
let closeButton = document.getElementsByClassName("close")[0];

submitButton.addEventListener("click", function () {
  modal.style.display = "block";
})

closeButton.addEventListener("click", function () {
  let form = document.querySelector('form');
  modal.style.display = "none";
  form.reset();
})

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
})
