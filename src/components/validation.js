function enableValidation(validationItemsList) {
    const forms = Array.from(document.querySelectorAll(validationItemsList.formSelector));

    forms.forEach((formElement) => {
        const formInputsList = Array.from(formElement.querySelectorAll(validationItemsList.inputSelector));
        const formButton = formElement.querySelector(validationItemsList.submitButtonSelector);
    });
    toggleButtonState(formInputsList, formButton, validationItemsList);
    formInputsList.forEach((item) => {
        item.addEventListener('input'), () => {
            toggleButtonState(formInputsList, formButton, validationItemsList);
        }
    })
}

function toggleButtonState(itemList, buttonItem) {
    if(hasInvalidInput(itemList)) {
        buttonItem.classList.add(validationItemsList.inactiveButtonClass);
        buttonItem.disabled = true;
    } else {
        buttonItem.classList.remove(validationItemsList.inactiveButtonClass);
        button.disabled = false;
    }
}

function hasInvalidInput(itemList) {
    return itemList.some((input) => !input.validity.valid);
}

function clearValidation() {
    

}

export {enableValidation, clearValidation};