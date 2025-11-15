import { 
    monumentQuizQuestions, 
    streetQuizQuestions, 
    finalMonumentImagePath, 
} from './questions.js';
import { shuffleArray } from './utils.js';

let _allQuestions = [];
let _questionQueue = []; 
let _incorrectlyAnsweredQuestions = []; 
let _currentQuestionIndexInQueue = 0; 
let _currentQuestionData = null; 
let _currentAnswerState = []; 
let _remainingAttempts = 3; 
let _masteredQuestionsSet = new Set(); 
let _currentQuizType = ''; 

export const INITIAL_ATTEMPTS = 3;

export function initializeGameState(quizType) {
    _currentQuizType = quizType;
    
    const questionsSource = (quizType === 'streets') 
        ? streetQuizQuestions 
        : monumentQuizQuestions;

    _allQuestions = [...questionsSource]; 
    _questionQueue = [...questionsSource];
    shuffleArray(_questionQueue);

    _incorrectlyAnsweredQuestions = [];
    _currentQuestionIndexInQueue = 0;
    _remainingAttempts = INITIAL_ATTEMPTS;
    _masteredQuestionsSet.clear();
    _currentQuestionData = null;
    _currentAnswerState = [];
}

export function getNextQuestionData() {
    if (_currentQuestionIndexInQueue >= _questionQueue.length) {
        if (_incorrectlyAnsweredQuestions.length > 0) {
            _questionQueue = [..._incorrectlyAnsweredQuestions];
            shuffleArray(_questionQueue);
            _incorrectlyAnsweredQuestions = [];
            _currentQuestionIndexInQueue = 0;
        } else {
            return null;
        }
    }

    _currentQuestionData = _questionQueue[_currentQuestionIndexInQueue];
    _currentAnswerState = Array(_currentQuestionData.answer.length).fill('_');
    _remainingAttempts = INITIAL_ATTEMPTS;
    return _currentQuestionData;
}

export function getCurrentQuestion() { return _currentQuestionData; }
export function getCurrentAnswerState() { return _currentAnswerState; }
export function getRemainingAttempts() { return _remainingAttempts; }
export function getQuestionQueueLength() { return _questionQueue.length; }
export function getCurrentQuestionIndexInQueue() { return _currentQuestionIndexInQueue; }
export function getAllQuestions() { return _allQuestions; }
export function getMasteredQuestionsSet() { return _masteredQuestionsSet; }
export function getCurrentQuizType() { return _currentQuizType; }

export function getTotalPuzzleParts() {
    return _allQuestions.length; 
}

export function getFinalImagePath() {
    return finalMonumentImagePath; 
}



export function decrementAttempts() { _remainingAttempts--; }

export function updateAnswerState(index, char) { _currentAnswerState[index] = char; }

export function markQuestionAsMastered() {
    if (_currentQuestionData && !_masteredQuestionsSet.has(_currentQuestionData)) {
        _masteredQuestionsSet.add(_currentQuestionData);
        return true;
    }
    return false;
}

export function addQuestionToIncorrectQueue(questionData) {
    if (questionData && !_incorrectlyAnsweredQuestions.includes(questionData)) {
        _incorrectlyAnsweredQuestions.push(questionData);
    }
}

export function advanceQuestionInQueue() { _currentQuestionIndexInQueue++; }

export function setFullAnswerState(answer) { _currentAnswerState = answer.split(''); }
