import * as DOM from './domElements.js';
import { finalPuzzleImagePath } from './questions.js';
import * as Modals from './modals.js';
import '../styles/quiz.module.scss';
import '../styles/puzzle.module.scss';
import '../styles/buttons.module.scss';

export function renderQuestion(questionData, currentQueueIndex, totalQueueLength, masteredCount, totalUniqueQuestions) {
  DOM.questionText.textContent = questionData.question;
  DOM.questionCounter.textContent = `Вопрос ${currentQueueIndex + 1} из ${totalQueueLength} (отвечено верно: ${masteredCount}/${totalUniqueQuestions})`;
  clearFeedback();
}

export function renderAnswerDisplay(answerState) {
  DOM.answerInputDisplay.innerHTML = '';
  answerState.forEach(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? ' ' : char;
    DOM.answerInputDisplay.appendChild(span);
  });
}

export function updateAttemptsDisplay(attempts) {
  DOM.attemptsDisplay.textContent = attempts;
}

export function showFeedback(message, type) {
  DOM.feedbackMessage.textContent = message;
  DOM.feedbackMessage.classList.remove('correct', 'incorrect');
  DOM.feedbackMessage.classList.add(type);
}

export function clearFeedback() {
  DOM.feedbackMessage.textContent = '';
  DOM.feedbackMessage.classList.remove('correct', 'incorrect');
}

export function updateCheckAnswerButtonState(disabled) {
  DOM.checkAnswerBtn.disabled = disabled;
}

export function updateNextButtonState(disabled) {
  DOM.nextButton.disabled = disabled;
}

export function updatePuzzle(allQuestions, masteredQuestionsSet) {
  DOM.puzzleImages.forEach((img, originalIndex) => {
    const question = allQuestions[originalIndex];
    
    if (!question) {
        img.classList.add('hidden');
        return;
    }

    if (masteredQuestionsSet.has(question.question)) {
      img.src = question.imagePath;
      img.classList.remove('hidden');
    } else {
      img.classList.add('hidden');
    }
  });
}

export function showVictoryScreen() {
  Modals.showVictoryModal(finalPuzzleImagePath);
}

export function showQuizScreen() {
  DOM.quizContainer.style.display = 'block';
  console.log('UIRenderer: quizContainer shown.');
}

export function hideQuizScreen() {
  DOM.quizContainer.style.display = 'none';
  console.log('UIRenderer: quizContainer hidden.');
}

export function showGameWrapper() {
  DOM.gameWrapper.style.display = 'flex';
  console.log('UIRenderer: gameWrapper shown.');
}

export function hideGameWrapper() {
  DOM.gameWrapper.style.display = 'none';
  console.log('UIRenderer: gameWrapper hidden.');
}
