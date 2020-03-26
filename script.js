/* Navigation */

/* Active tabs navigation */

let navigationSections = document.querySelectorAll('section');
let navigation = document.getElementById('header-navigation');
let navigationItem = navigation.querySelectorAll('li');

navigation.addEventListener('click', function (event) {
  navigationItem.forEach(el => el.classList.remove('navigation-link-active'));
  event.target.parentElement.classList.add('navigation-link-active');
});

document.addEventListener('scroll', onScroll);
let headerHeight = document.getElementById('header').clientHeight;

function onScroll(event) {
  let scrollPosition = window.scrollY + headerHeight;
  let navigationLinks = document.querySelectorAll('#header-navigation a');
  navigationSections.forEach(el => {
    if (el.offsetTop <= scrollPosition && (el.offsetTop + el.offsetHeight) > scrollPosition) {
      navigationLinks.forEach(link => {
        link.parentElement.classList.remove('navigation-link-active');
        if (el.getAttribute('id') === link.getAttribute('href').substring(1)) {
          link.parentElement.classList.add('navigation-link-active');
        }
      })
    }
  })
};

/* Smooth scrolling to anchor*/

let anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
  anchor.addEventListener("click", function (event) {
    event.preventDefault()
    let blockID = anchor.getAttribute("href").substr(1)
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

/* Top Scroll */

let basicScrollTop = function () {
  // The button
  let buttonTop = document.querySelector('#goTop');
  // Reveal the button
  let buttonReveal = function () {
    if (window.scrollY >= 300) {
      buttonTop.classList.add('is-visible');
    } else {
      buttonTop.classList.remove('is-visible');
    }
  }
  // Smooth scroll top
  let TopscrollTo = function () {
    if (window.scrollY != 0) {
      setTimeout(function () {
        window.scrollTo(0, window.scrollY - 30);
        TopscrollTo();
      }, 5);
    }
  }
  // Listeners
  window.addEventListener('scroll', buttonReveal);
  buttonTop.addEventListener('click', TopscrollTo);

};
basicScrollTop();


/* Burger menu */

let burgerHeader = document.querySelector('.header-burger');
let burgerImage = document.querySelector('.header-burger img');
let blackblock = document.querySelector('.blackblock');
let navigationMobile = document.querySelector('.header-navigation-mobile');

burgerHeader.addEventListener('click', function () {
  burgerImage.classList.toggle('rotated');
  toggleVisible(blackblock);
  toggleVisible(navigationMobile);

});

blackblock.addEventListener('click', function () {
  toggleVisible(blackblock);
  toggleVisible(navigationMobile);
  burgerImage.classList.toggle('rotated');
});

navigationMobile.addEventListener('click', function () {
  toggleVisible(blackblock);
  toggleVisible(navigationMobile);
  burgerImage.classList.toggle('rotated');
});


function toggleVisible(elem) {
  if (elem.style.display == 'block') {
    elem.style.display = 'none';
  } else {
    elem.style.display = 'block';
  }
}


/* Scroll Indicator */
window.onscroll = function () {
  progressIndicator()
};

function progressIndicator() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}



/* Portfolio images */

/* Reorder images */

let portfolioButton = document.querySelectorAll(".portfolio-buttons");
let portfolioImages = document.querySelectorAll(".work-card img");

for (let elem of portfolioButton) {
  elem.addEventListener("click", portfolioButtons);
}

function portfolioButtons() {
  for (let elem of portfolioButton) {
    elem.classList.remove("portfolio-buttons-active");
  }
  this.classList.toggle("portfolio-buttons-active");

  for (let elem of portfolioImages) {
    elem.classList.remove("bordered");
  }

  document.querySelector('.portfolio-work').querySelectorAll('.work-card').forEach(element => {
    element.style.order = Math.floor(1 + Math.random() * 12);
  });
}

/* Portfolio images border */

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

/*Control keyboard*/

document.onkeydown = function (event) {
  switch (event.keyCode) {
    case 37:
      //left
      event.preventDefault();
      prevSlide();
      break;
    case 39:
      //right
      event.preventDefault();
      nextSlide();
      break;
  }
}

/*Switch display iphones*/

let phones = document.querySelectorAll(".phone");
for (let elem of phones) {
  elem.addEventListener("click", function () {
    elem.classList.toggle("display-switch");
  });
};

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

