// Quiz Data
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
        correct: 1
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correct: 2
    },
    {
        question: "Which country is home to the Great Wall?",
        options: ["Japan", "India", "China", "Korea"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for Gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2
    },
    {
        question: "How many sides does a hexagon have?",
        options: ["5", "6", "7", "8"],
        correct: 1
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
        correct: 2
    },
    {
        question: "Which year did World War 2 end?",
        options: ["1943", "1944", "1945", "1946"],
        correct: 2
    }
];

// Quiz State
let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(quizData.length).fill(null);
let quizStarted = false;

// DOM Elements
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');

const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const restartBtn = document.getElementById('restartBtn');

const questionElement = document.getElementById('question');
const questionNumber = document.getElementById('questionNumber');
const scoreDisplay = document.getElementById('score');
const progressFill = document.getElementById('progressFill');

const optionInputs = document.querySelectorAll('input[name="answer"]');
const optionLabels = document.querySelectorAll('.option label');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', previousQuestion);
restartBtn.addEventListener('click', restartQuiz);

optionInputs.forEach((input, index) => {
    input.addEventListener('change', () => selectOption(index));
});

// Start Quiz
function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    score = 0;
    userAnswers = new Array(quizData.length).fill(null);
    
    switchScreen(startScreen, quizScreen);
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const question = quizData[currentQuestion];
    
    // Update question
    questionElement.textContent = question.question;
    
    // Update question number
    questionNumber.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    
    // Update progress bar
    updateProgressBar();
    
    // Load options
    question.options.forEach((option, index) => {
        document.getElementById(`optionText${index}`).textContent = option;
        optionInputs[index].checked = userAnswers[currentQuestion] === index;
        optionInputs[index].disabled = false;
        optionLabels[index].classList.remove('correct', 'incorrect');
    });
    
    // Update buttons
    updateButtons();
    
    // Scroll to top
    quizScreen.scrollTop = 0;
}

// Update Progress Bar
function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = progress + '%';
}

// Select Option
function selectOption(index) {
    userAnswers[currentQuestion] = index;
    scoreDisplay.textContent = `Score: ${calculateCurrentScore()}`;
}

// Calculate Current Score
function calculateCurrentScore() {
    return userAnswers.reduce((total, answer, index) => {
        return answer === quizData[index].correct ? total + 1 : total;
    }, 0);
}

// Next Question
function nextQuestion() {
    if (userAnswers[currentQuestion] === null) {
        alert('Please select an option!');
        return;
    }
    
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        finishQuiz();
    }
}

// Previous Question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

// Finish Quiz
function finishQuiz() {
    score = calculateCurrentScore();
    switchScreen(quizScreen, resultScreen);
    showResults();
}

// Show Results
function showResults() {
    const percentage = Math.round((score / quizData.length) * 100);
    const accuracy = percentage;
    
    // Update score circle
    document.getElementById('finalScore').textContent = percentage + '%';
    
    // Update message
    let message = '';
    let description = '';
    
    if (percentage === 100) {
        message = '🎉 Perfect Score!';
        description = 'Outstanding! You got all questions correct!';
    } else if (percentage >= 80) {
        message = '🌟 Excellent!';
        description = 'Great job! You have a strong understanding of the topic.';
    } else if (percentage >= 60) {
        message = '👍 Good Job!';
        description = 'You did well! Keep practicing to improve further.';
    } else if (percentage >= 40) {
        message = '📚 Keep Learning!';
        description = 'You\'re on the right track. Review and try again!';
    } else {
        message = '💪 Keep Practicing!';
        description = 'Don\'t give up! Review the material and try once more.';
    }
    
    document.getElementById('resultMessage').textContent = message;
    document.getElementById('resultDescription').textContent = description;
    
    // Update stats
    document.getElementById('correctCount').textContent = `${score}/${quizData.length}`;
    document.getElementById('accuracy').textContent = accuracy + '%';
    
    // Show review
    showReview();
}

// Show Review
function showReview() {
    const reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = '';
    
    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;
        
        let html = `<div class="review-question">Q${index + 1}: ${question.question}</div>`;
        
        if (userAnswer !== null) {
            html += `<div class="review-answer user">Your Answer: ${question.options[userAnswer]}</div>`;
        } else {
            html += `<div class="review-answer user">Your Answer: Not answered</div>`;
        }
        
        if (!isCorrect) {
            html += `<div class="review-answer correct">Correct Answer: ${question.options[question.correct]}</div>`;
        }
        
        reviewItem.innerHTML = html;
        reviewContainer.appendChild(reviewItem);
    });
}

// Update Buttons
function updateButtons() {
    // Previous button
    prevBtn.disabled = currentQuestion === 0;
    
    // Next button
    if (currentQuestion === quizData.length - 1) {
        nextBtn.textContent = 'Finish Quiz →';
    } else {
        nextBtn.textContent = 'Next →';
    }
}

// Restart Quiz
function restartQuiz() {
    switchScreen(resultScreen, startScreen);
    quizStarted = false;
    currentQuestion = 0;
    score = 0;
    userAnswers = new Array(quizData.length).fill(null);
}

// Switch Screen
function switchScreen(from, to) {
    from.classList.remove('active');
    to.classList.add('active');
}

// Initialize
window.addEventListener('load', () => {
    loadQuestion();
});