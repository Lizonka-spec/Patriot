import * as DOM from './domElements.js';
import '../styles/modals.module.scss';

export function showEmptyAnswerModal() {
  DOM.emptyAnswerModal.classList.add('active');
}

export function hideEmptyAnswerModal() {
  DOM.emptyAnswerModal.classList.remove('active');
}

export function showVictoryModal(finalPuzzleImagePath) {
  DOM.finalPuzzleImage.src = finalPuzzleImagePath;
  DOM.victoryModal.classList.add('active');
}

export function hideVictoryModal() {
  DOM.victoryModal.classList.remove('active');
}

export function hideAllModals() {
  hideEmptyAnswerModal();
  hideVictoryModal();
}
