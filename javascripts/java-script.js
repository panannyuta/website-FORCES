document.addEventListener("DOMContentLoaded", () => {
  // === 1. Бургер меню ===
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

// === 2. Прокрутка постеров ===
const wrapper = document.getElementById('posterWrapper');
const leftBtn = document.getElementById('scrollLeft');
const rightBtn = document.getElementById('scrollRight');

if (wrapper && leftBtn && rightBtn) {
  const scrollAmount = () => window.innerWidth * 0.8;
  
  function updateButtons() {

    if (window.innerWidth > 768) {
      leftBtn.style.display = 'none';
      rightBtn.style.display = 'none';
      return;
    }
    
    const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
    const currentScroll = wrapper.scrollLeft;
    
    leftBtn.style.display = currentScroll > 10 ? 'block' : 'none';
    rightBtn.style.display = currentScroll < maxScroll - 10 ? 'block' : 'none';
  }
  
  leftBtn.addEventListener('click', () => {
    wrapper.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });
  
  rightBtn.addEventListener('click', () => {
    wrapper.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });
  
  wrapper.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);
  updateButtons();
}

  // === 3. Постеры и регистрация ===
  let activePoster = null;

  function deactivatePoster() {
    if (activePoster) {
      activePoster.classList.remove('active');
      activePoster.style.cssText = '';
      activePoster.innerHTML = activePoster.originalContent;
      activePoster = null;
    }

    const form = document.querySelector('.register-form-container');
    if (form) form.remove();
  }

  document.querySelectorAll('.poster').forEach(poster => {
    poster.originalContent = poster.innerHTML;

    poster.addEventListener('click', (e) => {
      e.stopPropagation();

      if (poster === activePoster) return;

      deactivatePoster();
      activePoster = poster;

      poster.classList.add('active');
      poster.style.position = 'fixed';
      poster.style.top = '50vh';
      poster.style.left = '50vw';
      poster.style.transform = 'translate(-50%, -50%)';
      poster.style.width = '300px';
      poster.style.zIndex = '1000';

      const registerBtn = document.createElement('button');
      registerBtn.className = 'register-btn';
      registerBtn.textContent = 'Регистрация';
      poster.appendChild(registerBtn);

      registerBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        poster.style.display = 'none';

        const formContainer = document.createElement('div');
        formContainer.className = 'register-form-container';
        formContainer.innerHTML = `
          <form class="register-form" style="display:flex; flex-direction: column; gap: 12px; height: 100%;">
            <input type="text" name="name" placeholder="Имя" required />
            <input type="number" name="age" placeholder="Возраст" required />
            <input type="tel" name="phone" placeholder="Телефон" required />
            <input type="email" name="email" placeholder="Почта" required />
            <button type="submit" style="margin-top:auto;">Отправить</button>
          </form>
        `;

        document.body.appendChild(formContainer);

        const form = formContainer.querySelector('form');
        form.addEventListener('click', e => e.stopPropagation());
        form.addEventListener('submit', e => {
          e.preventDefault();
          formContainer.remove();
          deactivatePoster();
        });
      });
    });
  });

  document.body.addEventListener('click', () => {
    deactivatePoster();
  });

// === 4. Книга: логика выбора страниц ===
const mainImage = document.getElementById("main-book-image");
const mainLink = document.getElementById("main-book-link");
const prevImage = document.getElementById("prev-book-image");
const nextImage = document.getElementById("next-book-image");
const thumbnails = document.querySelectorAll(".thumbnail");

function updateBookDisplay(id) {
  if (!id) {

    mainImage.src = "img/book/book.gif";
    mainLink.href = "https://www.calameo.com/read/007902741400e3c1fece9";
    prevImage.style.display = "none";
    nextImage.style.display = "none";
    return;
  }

  mainImage.src = `img/book/${id}_.png`;
  mainLink.href = `https://www.calameo.com/read/007902741400e3c1fece9#page=${id}`;

  if (id > 1) {
    prevImage.src = `img/book/${id - 1}_.png`;
    prevImage.style.display = "block";
  } else {
    prevImage.style.display = "none";
  }

  if (id < 12) {
    nextImage.src = `img/book/${id + 1}_.png`;
    nextImage.style.display = "block";
  } else {
    nextImage.style.display = "none";
  }
}

function clearActiveThumbnails() {
  thumbnails.forEach(t => t.classList.remove('active'));
}

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener("click", () => {
    const id = parseInt(thumbnail.dataset.id);
    updateBookDisplay(id);
    clearActiveThumbnails();
    thumbnail.classList.add('active');
  });
});


updateBookDisplay(null);
});


// здание
document.addEventListener('DOMContentLoaded', function() {
  const numbers = document.querySelectorAll('.number');
  const floorInfos = document.querySelectorAll('.floor-info');
  let currentlyActiveNumber = null;

  function closeAllFloors() {
    floorInfos.forEach(floor => {
      floor.classList.remove('active');
    });
    
    numbers.forEach(num => {
      num.classList.remove('active');
    });
    
    currentlyActiveNumber = null;
  }

  function setupFloorPosition(floorInfo, floorNumber) {
    if (window.innerWidth <= 768) {

      floorInfo.classList.remove('left-floor', 'right-floor');
    } else {

      const isEven = parseInt(floorNumber) % 2 === 0;
      floorInfo.classList.toggle('left-floor', !isEven);
      floorInfo.classList.toggle('right-floor', isEven);
    }
  }

  numbers.forEach(number => {
    number.addEventListener('click', function(e) {
      e.stopPropagation();
      const floorNumber = this.classList[1].replace('number', '');
      const floorId = `floor${floorNumber}-info`;
      const floorInfo = document.getElementById(floorId);
      
      if (!floorInfo) return;
      
      if (currentlyActiveNumber === this) {
        closeAllFloors();
      } else {
        closeAllFloors();
        
        setupFloorPosition(floorInfo, floorNumber);
        this.classList.add('active');
        floorInfo.classList.add('active');
        currentlyActiveNumber = this;
      }
    });
  });


  window.addEventListener('resize', function() {
    if (currentlyActiveNumber) {
      const floorNumber = currentlyActiveNumber.classList[1].replace('number', '');
      const floorId = `floor${floorNumber}-info`;
      const floorInfo = document.getElementById(floorId);
      setupFloorPosition(floorInfo, floorNumber);
    }
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.number') && !e.target.closest('.floor-info')) {
      closeAllFloors();
    }
  });
});


