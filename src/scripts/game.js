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
import '../styles/streets.module.scss';

function startGame(quizType) {

  GameState.initializeGameState(quizType); 
  if (DOM.selectScreen) DOM.selectScreen.classList.add('hidden');

  if (DOM.gameWrapper) DOM.gameWrapper.classList.remove('hidden');
  
  Modals.hideAllModals();
  UIRenderer.hideQuizScreen(); 
  
  UIRenderer.updatePuzzle(GameState.getAllQuestions(), GameState.getMasteredQuestionsSet());
  UIRenderer.showQuizScreen();
  displayNextQuestion();
}

function displayNextQuestion() {
  const questionData = GameState.getNextQuestionData();
  
  if (questionData === null) {
    if (GameState.getMasteredQuestionsSet().size === GameState.getTotalPuzzleParts()) {
        UIRenderer.showVictoryScreen();
    }
    return;
  }
  
  UIRenderer.renderQuestion(
    questionData,
    GameState.getCurrentQuestionIndexInQueue(),
    GameState.getQuestionQueueLength(),
    GameState.getMasteredQuestionsSet().size,
    GameState.getTotalPuzzleParts()
  );
  
  UIRenderer.renderAnswerDisplay(GameState.getCurrentAnswerState());
  UIRenderer.updateAttemptsDisplay(GameState.getRemainingAttempts());
  UIRenderer.updateCheckAnswerButtonState(false);
  UIRenderer.updateNextButtonState(true);
  AlphabetInput.renderAlphabetButtons(AnswerChecker.handleAlphabetButtonClick);
}

document.addEventListener('DOMContentLoaded', () => {
  DOM.initializeDOMElements(); 
  
  if (!DOM.gameWrapper || !DOM.selectScreen) {
      console.error("Критическая ошибка: Элементы экранов не найдены.");
      return;
  }
  
  DOM.selectScreen.classList.remove('hidden'); 
  
  DOM.gameWrapper.classList.add('hidden'); 
  
  Modals.hideAllModals();

  const startQuizButtons = document.querySelectorAll('.start-quiz-button');
  startQuizButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const quizType = e.currentTarget.dataset.quizType;
      startGame(quizType);
    });
  });
  
  if (DOM.nextButton) DOM.nextButton.addEventListener('click', displayNextQuestion);
  if (DOM.checkAnswerBtn) DOM.checkAnswerBtn.addEventListener('click', AnswerChecker.handleCheckAnswer);
  if (DOM.modalCloseBtn) DOM.modalCloseBtn.addEventListener('click', () => Modals.hideEmptyAnswerModal());
  
  if (DOM.restartButton) DOM.restartButton.addEventListener('click', () => {
      window.location.reload(); 
  });
});
