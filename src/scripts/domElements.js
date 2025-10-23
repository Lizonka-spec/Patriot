export let questionText;
export let questionCounter;
export let answerInputDisplay;
export let attemptsDisplay;
export let alphabetContainer;
export let feedbackMessage;
export let checkAnswerBtn;
export let nextButton;
export let puzzleImages;
export let quizContainer;

export let emptyAnswerModal;
export let modalCloseBtn;
export let victoryModal;
export let finalPuzzleImage;
export let restartButton;

export let gameWrapper;

export function initializeDOMElements() {
    questionText = document.querySelector('.question-text');
    questionCounter = document.querySelector('.question-counter');
    answerInputDisplay = document.querySelector('.answer-input-display');
    attemptsDisplay = document.querySelector('.attempts-count');
    alphabetContainer = document.querySelector('.alphabet-container');
    feedbackMessage = document.querySelector('.feedback-message');
    checkAnswerBtn = document.querySelector('.check-answer-btn');
    nextButton = document.querySelector('.next-btn');
    puzzleImages = document.querySelectorAll('.puzzle-image');
    quizContainer = document.querySelector('.quiz-container');

    emptyAnswerModal = document.getElementById('emptyAnswerModal');
    modalCloseBtn = document.querySelector('.modal-close-btn');
    victoryModal = document.getElementById('victoryModal');
    finalPuzzleImage = document.querySelector('.final-puzzle-image');
    restartButton = document.querySelector('.restart-btn');

    gameWrapper = document.getElementById('gameWrapper');
    if (!gameWrapper) {
        console.error("DOM Error: Элемент #gameWrapper не найден в DOM. Убедитесь, что он есть в game.html.");
    }
    if (!emptyAnswerModal) {
        console.error("DOM Error: Элемент #emptyAnswerModal не найден в DOM. Убедитесь, что он есть в game.html.");
    }
    if (!victoryModal) {
        console.error("DOM Error: Элемент #victoryModal не найден в DOM. Убедитесь, что он есть в game.html.");
    }
}
