// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
// Імпорт з документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
console.log(galleryItems);
console.log('galleryItems');
// import '../css/common.css';
// import '../css/01-gallery.css';


//присвоююю змінній результат функції(рядок коду HTML)
const cardsMurkup = createMurcup(galleryItems);

//ловлю список в якій вставлятиму створені лішки
const gallaryContainerElem = document.querySelector(".gallery");
//вставляю готову розмітку в HTML
gallaryContainerElem.insertAdjacentHTML('beforeend', cardsMurkup);
//функція, що створює рядок з розміткою
function createMurcup(gallarys) {
    const murcup = gallarys.map(({preview, original, description}) => {
        return `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    alt="${description}"
                />
            </a>
        </li>
        `
    });
    // console.log(murcup.join(''))
    return murcup.join('');
}


//використовую бібліотеку SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    scrollZoom: false,
    // captionPosition: 'outside'
});