import './pages/index.css';
import {
  addCard,
  deleteCard,
  showCards,
  placesList,
} from './components/card';

import {openModal, closeModal} from './components/modal';

showCards();

const profileEdit = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit')
const closeCrossButton = document.querySelectorAll(".popup__close");

profileEdit.addEventListener('click', () => {
  openModal(popupTypeEdit);
});

closeCrossButton.forEach((item) => {
  const close = item.closest('.popup');
  item.addEventListener('click', () => closeModal(close));
});