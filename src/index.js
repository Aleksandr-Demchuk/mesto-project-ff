import { initialCards } from './components/cards';
import './pages/index.css';
import {
  createCard,
  deleteCard,
  likeIconCard
} from './components/card';
import {openModal, closeModal} from './components/modal';

import { enableValidation , clearValidation } from './components/validation';

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileEdit = document.querySelector('.profile__edit-button');
const profileAdd = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const closeCrossButtons = document.querySelectorAll('.popup__close');
const openNewCard = document.querySelector('.popup_type_new-card');
const openImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const formAddCard = document.forms['new-place'];
const formElement = document.forms['edit-profile'];
const inputTypeName = formElement.querySelector('.popup__input_type_name');
const inputTypeDescr = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const newCardName =  formAddCard.querySelector('.popup__input_type_card-name');
const newCardLink = formAddCard.querySelector('.popup__input_type_url');

const avatarProfileButton = document.querySelector('.profile__avatar-button');
const avatarEditForm = document.forms['edit-avatar'];
const avatarEditPopup = document.querySelector('.popup_type_edit_avatar');
const newCardForm = document.forms["new-place"];


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);

avatarProfileButton.addEventListener('click', (item) => {
  avatarEditForm.reset();
  openModal(avatarEditPopup);
  clearValidation(newCardForm, validationConfig);
});

function profileFormSubmit(item) {
  item.preventDefault();
  profileTitle.textContent = inputTypeName.value;
  profileDescription.textContent = inputTypeDescr.value;

  closeModal(popupTypeEdit);
}

function defaultProfileInputs() {
  inputTypeName.value = profileTitle.textContent;
  inputTypeDescr.value = profileDescription.textContent;
}

  function createNewCard(item) {
    item.preventDefault();
    
    
    const makeCard = {
      name: newCardName.value,
      link: newCardLink.value
    };
    const card = createCard(makeCard, deleteCard, likeIconCard, showImage);
    placesList.prepend(card);
    item.target.reset();
    closeModal(openNewCard);
    
  }

  function showImage(image) {
    openModal(openImage);
    popupImage.src = image.link;
    popupImage.alt = image.name;
    popupCaption.textContent = image.name;
  }

  function showCards() {
    initialCards.forEach(function(item) {
    const result = createCard(item, deleteCard, likeIconCard, showImage);
    placesList.append(result);
    });
  }
  showCards();

  closeCrossButtons.forEach((item) => {
    const close = item.closest('.popup');
    item.addEventListener('click', () => closeModal(close));
  });

  profileEdit.addEventListener('click', () => {
    openModal(popupTypeEdit);
    defaultProfileInputs();
  });
  
  profileAdd.addEventListener('click', () => {
    openModal(openNewCard);
  });

  formElement.addEventListener('submit', profileFormSubmit);
  formAddCard.addEventListener('submit', createNewCard);
  