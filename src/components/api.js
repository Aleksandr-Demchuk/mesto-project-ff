const config = {
    baseURL: 'https://nomoreparties.co/v1/wff-cohort-16',
    headers: {
      authorization: '3f7965b0-1c44-44e9-aa0e-abbc64bd2fbc',
      'Content-Type': 'application/json',
    },
};

function getUser() {
  return fetch(`${config.baseURL}/users/me`, {
    headers: config.headers,
  })
  .then((res) => getResponseData(res));
}

function getInitialCards() {
  return fetch(`${config.baseURL}/cards`, {
    headers: config.headers,
  })
  .then((res) => getResponseData(res));
}

function updateUser(name, description) {
  return fetch(`${config.baseURL}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  })
  .then((res) => getResponseData(res));
}

function addNewCard(name, link) {
  return fetch(`${config.baseURL}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
  .then((res) => getResponseData(res));
}

function delCard(cardId) {
  return fetch(`${config.baseURL}/cards/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  })
  .then((res) => getResponseData(res));
}

function putLike(cardId) {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "PUT",
  })
  .then((res) => getResponseData(res));
}

function deleteLike(cardId) {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  })
  .then((res) => getResponseData(res));
}

function updateProfileImage(link) {
  return fetch(`${config.baseURL}/users/me/avatar`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      avatar: link,
    }),
  })
  .then((res) => getResponseData(res));
}

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export {
  getUser,
  getInitialCards,
  updateUser,
  addNewCard,
  delCard,
  putLike,
  deleteLike,
  updateProfileImage 
};