// ====================================
// QUIZ JavaScript - Final Evaluation
// ====================================

// Quiz Questions Bank
const quizQuestions = [
    {
        id: 1,
        question: "I usually _____ breakfast at 7 AM.",
        options: ["eat", "eats", "eating", "ate"],
        correct: 0
    },
    {
        id: 2,
        question: "She _____ to the gym every Monday.",
        options: ["go", "goes", "going", "gone"],
        correct: 1
    },
    {
        id: 3,
        question: "They _____ in a big house.",
        options: ["lives", "live", "living", "lived"],
        correct: 1
    },
    {
        id: 4,
        question: "My father _____ coffee in the morning.",
        options: ["drink", "drinks", "drinking", "drank"],
        correct: 1
    },
    {
        id: 5,
        question: "We _____ English every day.",
        options: ["studies", "study", "studying", "studied"],
        correct: 1
    },
    {
        id: 6,
        question: "The sun _____ in the west.",
        options: ["set", "sets", "setting", "setted"],
        correct: 1
    },
    {
        id: 7,
        question: "_____ you like pizza?",
        options: ["Does", "Do", "Did", "Is"],
        correct: 1
    },
    {
        id: 8,
        question: "She _____ not speak French.",
        options: ["do", "does", "did", "is"],
        correct: 1
    },
    {
        id: 9,
        question: "Cats _____ fish.",
        options: ["loves", "love", "loving", "loved"],
        correct: 1
    },
    {
        id: 10,
        question: "He _____ his homework every night.",
        options: ["do", "does", "doing", "did"],
        correct: 1
    },
    {
        id: 11,
        question: "I _____ play tennis on weekends.",
        options: ["doesn't", "don't", "didn't", "am not"],
        correct: 1
    },
    {
        id: 12,
        question: "Water _____ at 100 degrees Celsius.",
        options: ["boil", "boils", "boiling", "boiled"],
        correct: 1
    },
    {
        id: 13,
        question: "_____ she work in a hospital?",
        options: ["Do", "Does", "Did", "Is"],
        correct: 1
    },
    {
        id: 14,
        question: "My brother _____ TV every evening.",
        options: ["watch", "watches", "watching", "watched"],
        correct: 1
    },
    {
        id: 15,
        question: "Birds _____ in the sky.",
        options: ["flies", "fly", "flying", "flew"],
        correct: 1
    }
];

// Quiz State
let currentQuestionIndex = 0;
let userAnswers = [];
let quizStartTime = null;

// ====================================
// START QUIZ
// ====================================
function startQuiz() {
    // Hide info, show questions
    document.getElementById('quizInfo').style.display = 'none';
    document.getElementById('quizQuestions').style.display = 'block';

    // Initialize
    currentQuestionIndex = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    quizStartTime = new Date();

    // Show first question
    renderQuestion();
    updateProgress();
}

// ====================================
// RENDER QUESTION
// ====================================
function renderQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const questionCard = document.getElementById('questionCard');

    let optionsHTML = '';
    question.options.forEach((option, index) => {
        const isChecked = userAnswers[currentQuestionIndex] === index ? 'checked' : '';
        optionsHTML += `
      <label class="quiz-option">
        <input type="radio" name="quiz-answer" value="${index}" ${isChecked}
               onchange="selectAnswer(${index})">
        <span class="option-text">${option}</span>
        <span class="option-indicator"></span>
      </label>
    `;
    });

    questionCard.innerHTML = `
    <div class="question-content">
      <h3 class="quiz-question-text">${question.question}</h3>
      <div class="quiz-options">
        ${optionsHTML}
      </div>
    </div>
  `;

    // Update navigation buttons
    updateNavigationButtons();
}

// ====================================
// SELECT ANSWER
// ====================================
function selectAnswer(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;

    // Enable next button
    document.getElementById('nextBtn').disabled = false;
}

// ====================================
// NAVIGATION
// ====================================
function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
        updateProgress();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
        updateProgress();
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    // Previous button
    prevBtn.disabled = currentQuestionIndex === 0;

    // Check if current question answered
    const isAnswered = userAnswers[currentQuestionIndex] !== null;
    nextBtn.disabled = !isAnswered;

    // Last question - show submit button
    if (currentQuestionIndex === quizQuestions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

// ====================================
// UPDATE PROGRESS
// ====================================
function updateProgress() {
    const current = currentQuestionIndex + 1;
    const total = quizQuestions.length;
    const percentage = (current / total) * 100;

    document.getElementById('currentQuestion').textContent = current;
    document.getElementById('totalQuestions').textContent = total;
    document.getElementById('quizProgressBar').style.width = percentage + '%';
}

// ====================================
// SUBMIT QUIZ
// ====================================
function submitQuiz() {
    // Check if all questions answered
    const unanswered = userAnswers.filter(ans => ans === null).length;

    if (unanswered > 0) {
        alert(`⚠️ Masih ada ${unanswered} soal yang belum dijawab. Silakan jawab semua soal terlebih dahulu.`);
        return;
    }

    // Confirm submission
    const confirmSubmit = confirm('Apakah kamu yakin ingin submit quiz? Kamu tidak bisa mengubah jawaban setelah submit.');

    if (!confirmSubmit) return;

    // Calculate score
    let correctCount = 0;
    quizQuestions.forEach((q, index) => {
        if (userAnswers[index] === q.correct) {
            correctCount++;
        }
    });

    const totalQuestions = quizQuestions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    // Save results
    const quizResults = {
        score: score,
        correct: correctCount,
        wrong: totalQuestions - correctCount,
        total: totalQuestions,
        answers: userAnswers,
        questions: quizQuestions,
        completedAt: new Date().toISOString()
    };

    localStorage.setItem('quizResults', JSON.stringify(quizResults));
    localStorage.setItem('quizScore', score);

    // Redirect to results page
    window.location.href = 'result.html';
}

// ====================================
// RETRY QUIZ (from result page)
// ====================================
function retryQuiz() {
    localStorage.removeItem('quizResults');
    localStorage.removeItem('quizScore');
    window.location.href = 'quiz.html';
}

// ====================================
// EXPORT FUNCTIONS
// ====================================
if (typeof window !== 'undefined') {
    window.startQuiz = startQuiz;
    window.selectAnswer = selectAnswer;
    window.nextQuestion = nextQuestion;
    window.previousQuestion = previousQuestion;
    window.submitQuiz = submitQuiz;
    window.retryQuiz = retryQuiz;
}
