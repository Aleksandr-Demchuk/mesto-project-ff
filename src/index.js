import './pages/index.css';
import {
  getUser,
  getInitialCards,
  updateUser,
  addNewCard,
  updateProfileImage
} from './components/api.js';
import { createCard, toggleLike, deleteCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { clearValidation, enableValidation } from './components/validation.js';

export const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

const avatarEditBtn = document.querySelector('.profile__avatar-button');
const avatarEditPopup = document.querySelector('.popup_type_edit_avatar');
const avatarEditForm = document.forms['edit-avatar'];
const avatarLinkInput = avatarEditForm.elements.link;
const avatarLink = document.querySelector('.profile__image');
const avatarSubmitBtn = avatarEditPopup.querySelector('.popup__button');

const profileEdit  = document.querySelector('.profile__edit-button');
const popupTypeEdit  = document.querySelector('.popup_type_edit');
const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;
const descriptionInput = formElement.elements.description;
const editProfileSubmitBtn = popupTypeEdit .querySelector('.popup__button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const profileAdd  = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const formAddCard  = document.forms['new-place'];
const placeNameInput = formAddCard .elements['place-name'];
const imageSrcInput = formAddCard .elements.link;
const newCardSubmitBtn = newCardPopup.querySelector('.popup__button');

const openImage  = document.querySelector('.popup_type_image');
const image = openImage .querySelector('.popup__image');
const popupCaption  = openImage .querySelector('.popup__caption');

const deletePopup = document.querySelector('.popup_type_remove_card');
const deleteForm = document.forms['remove-card'];

const popups = document.querySelectorAll('.popup');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);

// Настройки аватара
avatarEditBtn.addEventListener('click', (item) => {
  avatarEditForm.reset();
  openModal(avatarEditPopup);
  clearValidation(avatarEditForm, validationConfig);
});

avatarEditForm.addEventListener('submit', (item) => {
  item.preventDefault();

  const imgUrl = avatarLinkInput.value;

  avatarSubmitBtn.textContent = 'Сохранение...';

  updateProfileImage(imgUrl)
    .then((res) => {
      avatarLink.style.backgroundImage = `url("${res.avatar}")`;
      closeModal(avatarEditPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      avatarSubmitBtn.textContent = 'Сохранить';
    });
});

// Настройка профиля
profileEdit .addEventListener('click', (item) => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
  clearValidation(formElement, validationConfig);
});

formElement.addEventListener('submit', (item) => {
  item.preventDefault();

  editProfileSubmitBtn.textContent = 'Сохранение...';

  updateUser(nameInput.value, descriptionInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupTypeEdit );
    })
    .catch((err) => console.log(err))
    .finally(() => {
      editProfileSubmitBtn.textContent = 'Сохранить';
    });
});

// Работа с карточками
profileAdd .addEventListener('click', (item) => {
  openModal(newCardPopup);
  clearValidation(formAddCard , validationConfig);
});

formAddCard.addEventListener('submit', (item) => {
  item.preventDefault();

  newCardSubmitBtn.textContent = 'Сохранение...';

  addNewCard(placeNameInput.value, imageSrcInput.value)
    .then((res) => {
      placesList.prepend(
        createCard(res, deleteCard, toggleLike, viewImagePopup, res.owner, userId)
      );
      formAddCard.reset();
      closeModal(newCardPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      newCardSubmitBtn.textContent = 'Сохранить';
    });
});

function viewImagePopup(card) {
  image.src = card.link;
  image.alt = card.name;
  popupCaption .textContent = card.name;

  openModal(openImage );
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (item) => {
    if (
      item.target.classList.contains('popup_is-opened') ||
      item.target.classList.contains('popup__close')
    ) {
      closeModal(popup);
    }
  });
});

let userId;

Promise.all([getUser(), getInitialCards()])
  .then(([user, initialCards]) => {
    userId = user._id;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url("${user.avatar}")`;

    initialCards.forEach((card) => {
      placesList.append(
        createCard(card, deleteCard, toggleLike, viewImagePopup, user, userId)
      );
    });
  })
  .catch((err) => {
    console.error(err)});