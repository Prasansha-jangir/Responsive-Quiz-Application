const apiURL = "https://opentdb.com/api.php?amount=5&type=multiple";
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let timer;
const timeLimit = 15; // time limit per question in seconds
let timeLeft = timeLimit;
let highScore = localStorage.getItem('highScore') || 0;

const questionEl = document.getElementById("question");
const answersListEl = document.getElementById("answers-list");
const nextBtn = document.getElementById("next-btn");
const feedbackEl = document.getElementById("feedback");
const finalScoreEl = document.getElementById("final-score");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const progressEl = document.getElementById("progress");
const timerEl = document.getElementById("timer");
const highScoreEl = document.getElementById("high-score");

async function fetchQuizData() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        questions = data.results;
        displayQuestion();
    } catch (error) {
        console.error("Error fetching quiz data:", error);
    }
}

function displayQuestion() {
    clearInterval(timer); // clear previous timer
    timeLeft = timeLimit; // reset time left
    updateTimer(); // update timer display
    timer = setInterval(countdown, 1000); // start timer

    feedbackEl.textContent = "";
    nextBtn.disabled = true;
    const questionData = questions[currentQuestionIndex];
    questionEl.innerHTML = decodeHtml(questionData.question);
    
    const correctAnswer = decodeHtml(questionData.correct_answer);
    const answers = [...questionData.incorrect_answers.map(decodeHtml), correctAnswer];
    shuffleArray(answers);

    answersListEl.innerHTML = "";
    answers.forEach(answer => {
        const li = document.createElement("li");
        li.textContent = answer;
        li.addEventListener("click", () => selectAnswer(answer, correctAnswer));
        answersListEl.appendChild(li);
    });

    updateProgress();
}

function selectAnswer(answer, correctAnswer) {
    selectedAnswer = answer;
    Array.from(answersListEl.children).forEach(li => {
        li.classList.remove("selected");
        if (li.textContent === answer) {
            li.classList.add("selected");
            li.classList.add(answer === correctAnswer ? "correct" : "incorrect");
        }
    });

    nextBtn.disabled = false;
    feedbackEl.textContent = answer === correctAnswer ? "Correct!" : "Incorrect!";
    feedbackEl.classList.toggle("incorrect", answer !== correctAnswer);
    feedbackEl.classList.toggle("correct", answer === correctAnswer);
    if (answer === correctAnswer) score++;
}

function handleNextQuestion() {
    clearInterval(timer);
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        displayFinalScore();
    }
}

function countdown() {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
        handleNextQuestion(); // automatically go to the next question
    }
}

function updateTimer() {
    timerEl.textContent = `Time Left: ${timeLeft}s`;
    timerEl.classList.toggle("warning", timeLeft <= 5);
}

function displayFinalScore() {
    clearInterval(timer);
    finalScoreEl.classList.remove("hidden");
    quiz.classList.add("hidden");

    const finalScorePercentage = ((score / questions.length) * 100).toFixed(2);
    scoreEl.textContent = finalScorePercentage;

    if (finalScorePercentage > highScore) {
        highScore = finalScorePercentage;
        localStorage.setItem('highScore', highScore);
    }
    highScoreEl.textContent = `High Score: ${highScore}%`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    finalScoreEl.classList.add("hidden");
    quiz.classList.remove("hidden");
    fetchQuizData();
}

function updateProgress() {
    progressEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function decodeHtml(html) {
    const text = document.createElement("textarea");
    text.innerHTML = html;
    return text.value;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

nextBtn.addEventListener("click", handleNextQuestion);
restartBtn.addEventListener("click", restartQuiz);

fetchQuizData();
