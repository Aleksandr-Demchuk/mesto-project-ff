const openModal = (item) => {
    item.classList.add('popup_is-opened');
    item.classList.add('popup_is-animated');
    item.addEventListener('mousedown', closeModalByClick);
    document.addEventListener('keydown', handleEscape);
};

const closeModal = (item) => {
    item.classList.remove('popup_is-opened');
    item.removeEventListener('mousedown', closeModalByClick);
    document.removeEventListener('keydown', handleEscape);
};

const handleEscape = (item) => {
    if (item.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_is-opened');
        closeModal(popupOpened);
    }
};

const closeModalByClick = (item) => {
    if (item.target === item.currentTarget ) {
        closeModal(item.target);
    }
};

export { openModal, closeModal};
