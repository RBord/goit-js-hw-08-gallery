import galleryItems from './js/gallery-items.js';
import galleryCardTpl from './templates/gallery-card.hbs'
import './styles.css';


const galleryContainer = document.querySelector('.js-gallery');
const imagesMarkup = createImagesMarkup(galleryItems);
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
const overlayDiv = document.querySelector('.lightbox__overlay');
galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);

function createImagesMarkup (galleryItems) {
    return galleryItems.map(galleryCardTpl).join('');
}

function stopDefAction(evt) {
  evt.preventDefault();
}

const refsEl = document.querySelectorAll('.gallery__link');
refsEl.forEach(ref => {
  ref.addEventListener('click', stopDefAction)
})

galleryContainer.addEventListener('click', onImgClick );

function onImgClick (evt) {
  if(evt.target.nodeName !== 'IMG'){
    return;
  }

  openModal();
  
  const imgEl = document.querySelector('.lightbox__image');
  imgEl.setAttribute('src', evt.target.dataset.source);

}

function setModalImage (index) {
  const imgEl = document.querySelector('.lightbox__image');
  imgEl.setAttribute('src', galleryItems[index].original);
  imgEl.setAttribute('alt', galleryItems[index].description);
}

closeBtn.addEventListener('click', closedModal);

function closedModal () {
  const divEl = document.querySelector('.lightbox');
  divEl.classList.remove('is-open');

  const imgEl = document.querySelector('.lightbox__image');
  imgEl.setAttribute('src', '');
}

function openModal (evt) {
  const divEl = document.querySelector('.lightbox');
  divEl.classList.add('is-open');

  let currentIndex = 0;

  window.addEventListener('keydown', (evt) => {
    
  if(evt.key === 'Escape'){
    closedModal();
  } 
  if(evt.key === 'ArrowRight'){
    currentIndex +=1;
  }
  if(evt.key === 'ArrowLeft'){
    currentIndex -=1;
  }
  if(currentIndex === galleryItems.length){
    currentIndex = 0;
  }
  
  setModalImage(currentIndex);
  }) 
}

overlayDiv.addEventListener('click', (evt) => {
  if(evt.target.nodeName === 'DIV'){
    closedModal();
  }
})



