import * as GameState from './gameState.js';
import * as UIRenderer from './uiRenderer.js';
import * as Modals from './modals.js';
import * as AlphabetInput from './alphabetInput.js';

export function handleAlphabetButtonClick(letter, button) {
    const currentQuestion = GameState.getCurrentQuestion();
    if (!currentQuestion || GameState.getRemainingAttempts() <= 0) return;

    const answer = currentQuestion.answer.toUpperCase();
    const clickedLetter = letter.toUpperCase();
    let found = false;

    const currentAnswerState = GameState.getCurrentAnswerState();
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === clickedLetter) {
            GameState.updateAnswerState(i, clickedLetter);
            found = true;
        }
    }

    button.disabled = true;
    UIRenderer.renderAnswerDisplay(GameState.getCurrentAnswerState());

    if (!found) {
        GameState.decrementAttempts();
        UIRenderer.updateAttemptsDisplay(GameState.getRemainingAttempts());
        UIRenderer.showFeedback(`Символа "${clickedLetter}" нет в слове.`, 'incorrect');

        if (GameState.getRemainingAttempts() <= 0) {
            handleOutOfAttempts();
        }
    } else {
        UIRenderer.showFeedback(`Символ "${clickedLetter}" найден!`, 'correct');
    }

    if (GameState.getCurrentAnswerState().join('') === answer.replace(/\s/g, '_')) {
        handleCorrectAnswer();
    }
}

export function handleCheckAnswer() {
    const currentQuestion = GameState.getCurrentQuestion();
    if (!currentQuestion) return;

    const userAnswer = GameState.getCurrentAnswerState().join('').replace(/_/g, '').replace(/\s/g, '');
    const correctAnswer = currentQuestion.answer.replace(/\s/g, '');

    if (userAnswer.length === 0) {
        Modals.showEmptyAnswerModal();
        return;
    }

    if (userAnswer.toUpperCase() === correctAnswer.toUpperCase()) {
        GameState.setFullAnswerState(currentQuestion.answer);
        UIRenderer.renderAnswerDisplay(GameState.getCurrentAnswerState());
        handleCorrectAnswer();
    } else {
        GameState.decrementAttempts();
        UIRenderer.updateAttemptsDisplay(GameState.getRemainingAttempts());
        UIRenderer.showFeedback(`Неверный ответ. Попыток осталось: ${GameState.getRemainingAttempts()}`, 'incorrect');

        if (GameState.getRemainingAttempts() <= 0) {
            handleOutOfAttempts();
        }
    }
}

function handleCorrectAnswer() {
    UIRenderer.showFeedback('Верно! Отличная работа!', 'correct');
    AlphabetInput.disableAlphabetButtons();
    UIRenderer.updateCheckAnswerButtonState(true);
    UIRenderer.updateNextButtonState(false);

    if (GameState.markQuestionAsMastered()) {
        UIRenderer.updatePuzzle(GameState.getAllQuestions(), GameState.getMasteredQuestionsSet());
        
        if (GameState.getMasteredQuestionsSet().size === GameState.getTotalPuzzleParts()) {
            UIRenderer.showVictoryScreen();
        }
    }
    GameState.advanceQuestionInQueue();
}

function handleOutOfAttempts() {
    UIRenderer.showFeedback(`Попытки закончились. Ответ был: ${GameState.getCurrentQuestion().answer}`, 'incorrect');
    AlphabetInput.disableAlphabetButtons();
    UIRenderer.updateCheckAnswerButtonState(true);
    UIRenderer.updateNextButtonState(false);
    GameState.advanceQuestionInQueue();
    GameState.addQuestionToIncorrectQueue(GameState.getCurrentQuestion());
}
