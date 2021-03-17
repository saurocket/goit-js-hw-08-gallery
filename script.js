import cards from './gallery-items.js'

const galleryRef = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const bigImg = document.querySelector('.lightbox__image');

let currentPage = ''

const handleClickByImg = e => {
    e.preventDefault();
    const target = e.target;
    if (target.nodeName !== 'IMG'){
        return;
    }
    modal.classList.add('is-open');
    useModalWithProps(getDataImgWithActiveImage(target));
  getCurrentPage(getDataImgWithActiveImage(target).src);
}
const handleCatchEventByKeyboard = e => {
    if (e.key === 'Escape'){
        modalClose();
    }
    const data = {
        src: null,
        alt: null,
    }
    if (e.key === 'ArrowRight'){
        currentPage >= cards.length - 1 ? currentPage = 0: currentPage++;
        data.src = cards[currentPage].original;
        data.alt = cards[currentPage].description;
        useModalWithProps(data);
    }
    if (e.key === 'ArrowLeft'){
        currentPage === 0 ? currentPage = cards.length-1: currentPage--;
        data.src = cards[currentPage].original;
        data.alt = cards[currentPage].description;
        useModalWithProps(data);
    }

}
const createCards = (data) => {
    return data.map(card => {
        return (`<li class="gallery__item">
                    <a class="gallery__link"
                        href="${card.original}">
                    <img
                    class="gallery__image"
                    src="${card.preview}"
                    data-source="${card.original}"
                    alt="${card.description}"
                    />
                    </a>
                </li>`)
    }).join(' ');
}
const getDataImgWithActiveImage = (elem) => {
    if(!elem){return}
    currentPage = elem.dataset.source;
    return {src: elem.dataset.source, alt: elem.alt}
}
const useModalWithProps = ({src, alt}) => {
    bigImg.src = src;
    bigImg.alt = alt;
    window.addEventListener('keydown', handleCatchEventByKeyboard);
}
const modalClose = () => {
    modal.classList.remove('is-open')
    bigImg.src = '';
    bigImg.alt = '';
    currentPage = '';
    window.removeEventListener('keydown', handleCatchEventByKeyboard);
}
const handleCatchEventByMouseClose= (e) => {
    const target = e.target;
    if (target.classList.contains('lightbox__overlay') || target.classList.contains('lightbox__button')){
        modalClose();
    }

}
const getCurrentPage= (srs = '') => {
   cards.forEach((item, index) => {
       if (item.original === srs){
           currentPage = index;
           return;
       }
   })
}


galleryRef.addEventListener('click', handleClickByImg);
modal.addEventListener('click',handleCatchEventByMouseClose);

galleryRef.innerHTML = createCards(cards);


