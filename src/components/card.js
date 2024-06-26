import { cardTemplate } from '../index.js';
import { putLike, deleteLike, delCard } from './api.js';
import { closeModal, openModal } from './modal.js';

const deleteCardPopup = document.querySelector('.popup_type_remove_card');
const deleteCardBtn = deleteCardPopup.querySelector('.popup__button');

function createCard(card, onDelete, onLike, showImage, user) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage  = cardElement.querySelector('.card__image');
  const deleteButton  = cardElement.querySelector('.card__delete-button');
  const likeButton  = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardElement.id = card._id;
  cardImage .src = card.link;
  cardImage .alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  
  likeButton .addEventListener('click', () => {
    onLike(likeButton , card, likeCounter);
  });

  likeCounter.textContent = card.likes.length;

  cardImage .addEventListener('click', () => showImage(card));

  if (card.owner._id !== user._id) {
    deleteButton .remove();
  } else {
    deleteButton .addEventListener('click', () => {
      onDelete(card);
    });
  }

  if (card.likes.some((like) => like._id === user._id)) {
    likeButton .classList.add('card__like-button_is-active');
  }

  return cardElement;
}

deleteCardPopup.addEventListener('submit', (item) => {
  item.preventDefault();

  const card_Id = deleteCardPopup.dataset.cardId;

  deleteCardBtn.textContent = 'Удаление...';

  delCard(card_Id)
    .then(() => {
      document.getElementById(card_Id).remove();
      deleteCardPopup.dataset.cardId = "";
      closeModal(deleteCardPopup);
    })
    .catch((err) => console.log(`Ошибка удаления карточки ${err}`))
    .finally(() => deleteCardBtn.textContent = 'Да');
});

function deleteCard(card) {
  openModal(deleteCardPopup);
  deleteCardPopup.dataset.cardId = card._id;
}

function toggleLike(likeButton , card, likeCounter) {
  const isLiked = likeButton .classList.contains('card__like-button_is-active'); 
  const likeMetod = isLiked ? deleteLike : putLike;
  likeMetod(card._id) 
  .then((res) => {
    likeButton .classList.toggle('card__like-button_is-active'); 
    likeCounter.textContent = res.likes.length; 
})
.catch(err => console.log(`Ошибка ${ isLiked ?  "удаления" : ""} лайка карточки ${err}`));
}


export { createCard, deleteCard, toggleLike };