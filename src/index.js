import { initialCards } from './components/cards';

import './pages/index.css';

import {
  addCard,
  deleteCard,
  likeIconCard
} from './components/card';

import {openModal, closeModal} from './components/modal';

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');



const profileEdit = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit')
const closeCrossButton = document.querySelectorAll('.popup__close');

profileEdit.addEventListener('click', () => {
  openModal(popupTypeEdit);
});

closeCrossButton.forEach((item) => {
  const close = item.closest('.popup');
  item.addEventListener('click', () => closeModal(close));
});

  //Вывод карточки на страницу.
  function showCards() {
    initialCards.forEach(function(item) {
    const result = addCard(item, deleteCard, likeIconCard);
    placesList.append(result);
    });
  }
  showCards();

  function createNewCard(item) {
    
    
  }