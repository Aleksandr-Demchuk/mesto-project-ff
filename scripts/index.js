//Темплейт карточки.
const cardTemplate = document.querySelector('#card-template').content;
//DOM узлы.
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

//Функция создания карточки.
function addCard(cardsList, onDelete) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');
  const cardImage = card.querySelector('.card__image')
  card.querySelector('.card__title').textContent = cardsList.name;
  cardImage.src = cardsList.link; 
  cardImage.alt = cardsList.name

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
  initialCards.forEach(function(item) {
    const result = addCard(item, deleteCard);
    placesList.append(result);
  });
}
showCards();


