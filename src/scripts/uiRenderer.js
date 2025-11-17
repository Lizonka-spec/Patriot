import * as DOM from "./domElements.js";
import * as GameState from "./gameState.js";
import * as Modals from "./modals.js";
import { finalMonumentImagePath, finalStreetImagePath } from "./questions.js";
import "../styles/quiz.module.scss";
import "../styles/puzzle.module.scss";
import "../styles/buttons.module.scss";

export function renderQuestion(
  questionData,
  currentQueueIndex,
  totalQueueLength,
  masteredCount,
  totalUniqueQuestions
) {
  DOM.questionText.textContent = questionData.question;
  DOM.questionCounter.textContent = `Вопрос ${
    currentQueueIndex + 1
  } из ${totalQueueLength} (отвечено верно: ${masteredCount}/${totalUniqueQuestions})`;
  clearFeedback();
}

export function renderAnswerDisplay(answerState) {
  DOM.answerInputDisplay.innerHTML = "";
  answerState.forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char === "_" ? " " : char;
    DOM.answerInputDisplay.appendChild(span);
  });
}

export function updateAttemptsDisplay(attempts) {
  DOM.attemptsCount.textContent = attempts;
}

export function showFeedback(message, type) {
  DOM.feedbackMessage.textContent = message;
  DOM.feedbackMessage.classList.remove("correct", "incorrect");
  DOM.feedbackMessage.classList.add(type);
}

export function clearFeedback() {
  DOM.feedbackMessage.textContent = "";
  DOM.feedbackMessage.classList.remove("correct", "incorrect");
}

export function updateCheckAnswerButtonState(disabled) {
  if (DOM.checkAnswerBtn) DOM.checkAnswerBtn.disabled = disabled;
}

export function updateNextButtonState(disabled) {
  if (DOM.nextButton) DOM.nextButton.disabled = disabled;
}

export function updatePuzzle(allQuestions, masteredQuestionsSet) {
  const totalParts = GameState.getTotalPuzzleParts();

  DOM.puzzleImages.forEach((img, index) => {
    if (index >= totalParts) {
      img.classList.add("hidden");
      return;
    }

    const questionData = allQuestions[index];
    const isStreetPuzzle = questionData.type === "street";

    if (isStreetPuzzle) {
      img.classList.add("street-puzzle-image");
      img.classList.remove("puzzle-image");
    } else {
      img.classList.add("puzzle-image");
      img.classList.remove("street-puzzle-image");
    }

    if (masteredQuestionsSet.has(questionData)) {
      img.src = questionData.imagePath;
      img.classList.remove("hidden");
    } else {
      img.classList.add("hidden");
    }
  });
}

export function showVictoryScreen() {
  const finalPath = GameState.getFinalImagePath();
  Modals.showVictoryModal(finalPath);
}

export function showQuizScreen() {
  if (DOM.quizContainer) DOM.quizContainer.classList.remove("hidden");
}

export function hideQuizScreen() {
  if (DOM.quizContainer) DOM.quizContainer.classList.add("hidden");
}
