const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, onDelete, onLike, showImage) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');
  const cardImage = card.querySelector('.card__image');
  const Likecard = card.querySelector('.card__like-button');

  card.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link; 
  cardImage.alt = cardData.name;

  deleteButton.addEventListener('click', () => {
    onDelete(card);
  });

  cardImage.addEventListener('click', () => {
    showImage(cardData);
  });

  Likecard.addEventListener('click', () => onLike(Likecard));

  return card;
}

function deleteCard(removeData) {
    removeData.remove();
  }

function likeIconCard(likeIcon) {
  likeIcon.classList.toggle('card__like-button_is-active');
}

export {
  createCard,
  deleteCard,
  likeIconCard
};
  