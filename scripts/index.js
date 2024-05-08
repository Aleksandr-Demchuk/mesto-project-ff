//Темплейт карточки.
const cardTemplate = document.querySelector('#card-template').content;
//DOM узлы.
const content = document.querySelector('.content');
const places = content.querySelector('.places');
const deleteButton = cardTemplate.querySelector('.card__delete-button');
const placesList = content.querySelector('.places__list');

//Функция создания карточки.
function addCard(initialCards, onDelete) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');
  card.querySelector('.card__title').textContent = initialCards.name;
  card.querySelector('.card__image').src = initialCards.link;
  card.querySelector('.card__image').alt = initialCards.name;

  deleteButton.addEventListener('click', () => {
    onDelete(card);
  });

  return card;
}

//Функция удаления карточки.
function deleteCard(removeData) {
  removeData.remove();
}

//Вывод карточки на страницу.
function showCards() {
  for (let i = 0; i < initialCards.length; i++) {
    const result = addCard(initialCards[i], deleteCard);
    placesList.append(result);
  }
}
showCards();
