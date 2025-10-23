import * as DOM from './domElements.js';
import { ALPHABET_CHARS } from './questions.js';
import '../styles/alphabet.module.scss';

let _alphabetButtons = [];

export function renderAlphabetButtons(onClickHandler, disableAll = false) {
  DOM.alphabetContainer.innerHTML = '';
  _alphabetButtons = [];
  ALPHABET_CHARS.forEach(letter => {
    const button = document.createElement('button');
    button.classList.add('alphabet-btn');
    button.textContent = letter;
    button.disabled = disableAll;
    button.onclick = () => onClickHandler(letter, button);
    DOM.alphabetContainer.appendChild(button);
    _alphabetButtons.push(button);
  });
}

export function disableAlphabetButtons() {
  _alphabetButtons.forEach(btn => btn.disabled = true);
}

export function enableAlphabetButtons() {
  _alphabetButtons.forEach(btn => btn.disabled = false);
}
