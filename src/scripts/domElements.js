export let selectScreen;
export let gameWrapper;
export let puzzleImages;
export let questionText;
export let questionCounter;
export let attemptsDisplay;
export let attemptsCount;
export let answerInputDisplay;
export let alphabetContainer;
export let feedbackMessage;
export let checkAnswerBtn;
export let nextButton;
export let modalCloseBtn;
export let restartButton;
export let quizContainer;
export let finalPuzzleImage; 
export let emptyAnswerModal;
export let victoryModal;

export function initializeDOMElements() {
    selectScreen = document.getElementById('game-select-screen');
    gameWrapper = document.getElementById('gameWrapper');

    puzzleImages = document.querySelectorAll('.puzzle-image');
    quizContainer = document.querySelector('.quiz-container');
    questionText = document.querySelector('.question-text');
    questionCounter = document.querySelector('.question-counter');
    attemptsDisplay = document.querySelector('.attempts-display');
    attemptsCount = document.querySelector('.attempts-count');
    answerInputDisplay = document.querySelector('.answer-input-display');
    alphabetContainer = document.querySelector('.alphabet-container');
    feedbackMessage = document.querySelector('.feedback-message');
    checkAnswerBtn = document.querySelector('.check-answer-btn');
    nextButton = document.querySelector('.next-btn');

    emptyAnswerModal = document.getElementById('emptyAnswerModal');
    victoryModal = document.getElementById('victoryModal');
    
    modalCloseBtn = emptyAnswerModal ? emptyAnswerModal.querySelector('.modal-close-btn') : null;
    restartButton = victoryModal ? victoryModal.querySelector('.restart-btn') : null;
    finalPuzzleImage = victoryModal ? victoryModal.querySelector('.final-puzzle-image') : null;
}
