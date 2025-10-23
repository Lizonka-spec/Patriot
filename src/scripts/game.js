import * as DOM from './domElements.js';
import * as GameState from './gameState.js';
import * as UIRenderer from './uiRenderer.js';
import * as AlphabetInput from './alphabetInput.js';
import * as AnswerChecker from './answerChecker.js';
import * as Modals from './modals.js';
import '../styles/base.module.scss';
import '../styles/buttons.module.scss';
import '../styles/quiz.module.scss';
import '../styles/puzzle.module.scss';

function startGame() {
  console.log('>>> startGame() called. Game is starting immediately.');

  GameState.initializeGameState();
  UIRenderer.hideQuizScreen();
  Modals.hideAllModals();
  UIRenderer.showGameWrapper();
  UIRenderer.showQuizScreen();
  UIRenderer.updatePuzzle(GameState.getAllQuestions(), GameState.getMasteredQuestionsSet());
  displayNextQuestion();

  console.log('<<< startGame() finished.');
}

function displayNextQuestion() {
  const questionData = GameState.getNextQuestionData();
  if (questionData === null) {
    UIRenderer.showVictoryScreen();
    return;
  }
  UIRenderer.renderQuestion(
    questionData,
    GameState.getCurrentQuestionIndexInQueue(),
    GameState.getQuestionQueueLength(),
    GameState.getMasteredQuestionsSet().size,
    GameState.getAllQuestions().length
  );
  UIRenderer.renderAnswerDisplay(GameState.getCurrentAnswerState());
  UIRenderer.updateAttemptsDisplay(GameState.getRemainingAttempts());
  UIRenderer.updateCheckAnswerButtonState(false);
  UIRenderer.updateNextButtonState(true);
  AlphabetInput.renderAlphabetButtons(AnswerChecker.handleAlphabetButtonClick);
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('--- DOMContentLoaded fired. Start of initialization for game.html ---');
  DOM.initializeDOMElements(); 
  
  if (!DOM.gameWrapper) {
      console.error("Критическая ошибка: DOM.gameWrapper не найден после initializeDOMElements(). Проверьте game.html.");
      return;
  }
  
  console.log('DOM-элементы инициализированы. DOM.gameWrapper:', DOM.gameWrapper);

  Modals.hideAllModals();
  console.log('DECISION: game.html always starts the game directly.');
  startGame();
  
  DOM.nextButton.addEventListener('click', displayNextQuestion);
  DOM.checkAnswerBtn.addEventListener('click', AnswerChecker.handleCheckAnswer);
  DOM.modalCloseBtn.addEventListener('click', () => Modals.hideEmptyAnswerModal());
  DOM.restartButton.addEventListener('click', () => {
      console.log('User clicked "Начать заново" button. Calling startGame().');
      startGame(); 
  });
  console.log('--- DOMContentLoaded finished for game.html ---');
});
