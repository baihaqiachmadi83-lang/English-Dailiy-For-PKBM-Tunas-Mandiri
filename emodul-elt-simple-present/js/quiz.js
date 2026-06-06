// =====================================================
// QUIZ.JS - Final Assessment
// =====================================================

const quizQuestions = [
    {
        question: "I ___ to school every day.",
        options: ["go", "goes", "going", "went"],
        correct: 0,
        explanation: "Untuk 'I' gunakan verb bentuk dasar"
    },
    {
        question: "She ___ English very well.",
        options: ["speak", "speaks", "speaking", "spoke"],
        correct: 1,
        explanation: "Untuk 'She' tambahkan -s pada verb"
    },
    {
        question: "They ___ like spicy food.",
        options: ["doesn't", "don't", "isn't", "aren't"],
        correct: 1,
        explanation: "Untuk 'They' gunakan 'don't'"
    },
    {
        question: "___ you study English?",
        options: ["Does", "Do", "Are", "Is"],
        correct: 1,
        explanation: "Untuk 'You' gunakan 'Do' dalam pertanyaan"
    },
    {
        question: "My father ___ in an office.",
        options: ["work", "works", "working", "worked"],
        correct: 1,
        explanation: "'My father' = He, jadi gunakan works"
    },
    {
        question: "We ___ watch TV on weekdays.",
        options: ["doesn't", "don't", "isn't", "aren't"],
        correct: 1,
        explanation: "Untuk 'We' gunakan 'don't'"
    },
    {
        question: "The cat ___ milk every morning.",
        options: ["drink", "drinks", "drinking", "drank"],
        correct: 1,
        explanation: "'The cat' = It, jadi gunakan drinks"
    },
    {
        question: "___ she like pizza?",
        options: ["Do", "Does", "Is", "Are"],
        correct: 1,
        explanation: "Untuk 'She' gunakan 'Does' dalam pertanyaan"
    },
    {
        question: "My friends and I ___ football every Sunday.",
        options: ["plays", "play", "playing", "played"],
        correct: 1,
        explanation: "'My friends and I' = We, gunakan play"
    },
    {
        question: "He ___ his homework after school.",
        options: ["do", "does", "doing", "did"],
        correct: 1,
        explanation: "Untuk 'He' gunakan does"
    },
    {
        question: "The sun ___ in the east.",
        options: ["rise", "rises", "rising", "rose"],
        correct: 1,
        explanation: "'The sun' = It, gunakan rises"
    },
    {
        question: "I ___ not understand this lesson.",
        options: ["does", "do", "is", "am"],
        correct: 1,
        explanation: "Untuk 'I' gunakan 'do'"
    },
    {
        question: "Complete: She always ___ her teeth before bed.",
        options: ["brush", "brushes", "brushing", "brushed"],
        correct: 1,
        explanation: "Untuk 'She' tambahkan -es (brush → brushes)"
    },
    {
        question: "___ your brother play guitar?",
        options: ["Do", "Does", "Is", "Are"],
        correct: 1,
        explanation: "'Your brother' = He, gunakan 'Does'"
    },
    {
        question: "Birds ___ in the sky.",
        options: ["fly", "flies", "flying", "flew"],
        correct: 0,
        explanation: "'Birds' = They, gunakan fly"
    },
    {
        question: "She ___ coffee in the morning.",
        options: ["doesn't drink", "don't drink", "isn't drink", "aren't drink"],
        correct: 0,
        explanation: "Untuk 'She' negative: doesn't + verb"
    },
    {
        question: "Fill: My mother always ___ delicious food.",
        options: ["cook", "cooks", "cooking", "cooked"],
        correct: 1,
        explanation: "'My mother' = She, gunakan cooks"
    },
    {
        question: "___ they live in Jakarta?",
        options: ["Does", "Do", "Are", "Is"],
        correct: 1,
        explanation: "Untuk 'They' gunakan 'Do'"
    },
    {
        question: "Water ___ at 100 degrees Celsius.",
        options: ["boil", "boils", "boiling", "boiled"],
        correct: 1,
        explanation: "'Water' = It, gunakan boils (fakta umum)"
    },
    {
        question: "My sister and I ___ to the same school.",
        options: ["goes", "go", "going", "went"],
        correct: 1,
        explanation: "'My sister and I' = We, gunakan go"
    }
];

let currentQuestion = 0;
let userAnswers = [];
let quizStartTime;

function startQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    quizStartTime = Date.now();
    displayQuestion();
    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
}

function displayQuestion() {
    const q = quizQuestions[currentQuestion];
    const container = document.getElementById('quiz-questions');

    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <span class="question-number">Soal ${currentQuestion + 1} dari ${quizQuestions.length}</span>
                <span class="question-score">${currentQuestion} / ${quizQuestions.length} dijawab</span>
            </div>
            <div class="question-text">${q.question}</div>
            <div class="options-grid" id="quiz-options"></div>
            <div class="action-buttons">
                ${currentQuestion > 0 ? '<button class="btn btn-secondary" onclick="previousQuestion()">← Sebelumnya</button>' : ''}
                ${currentQuestion < quizQuestions.length - 1 ?
            '<button class="btn btn-primary" onclick="nextQuestion()" id="next-btn" disabled>Selanjutnya →</button>' :
            '<button class="btn btn-success" onclick="submitQuiz()" id="submit-btn" disabled>🎯 Submit Quiz!</button>'}
            </div>
        </div>
    `;

    // Display options
    const optionsContainer = document.getElementById('quiz-options');
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (userAnswers[currentQuestion] === index) {
            btn.classList.add('selected');
        }
        btn.innerHTML = `
            <span class="option-label">${String.fromCharCode(65 + index)}</span>
            <span>${option}</span>
        `;
        btn.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(index) {
    userAnswers[currentQuestion] = index;

    // Update visual selection
    document.querySelectorAll('.option-btn').forEach((btn, i) => {
        btn.classList.toggle('selected', i === index);
    });

    // Enable next/submit button
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    if (nextBtn) nextBtn.disabled = false;
    if (submitBtn) submitBtn.disabled = false;
}

function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        displayQuestion();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

function submitQuiz() {
    // Calculate score
    let correct = 0;
    quizQuestions.forEach((q, index) => {
        if (userAnswers[index] === q.correct) {
            correct++;
        }
    });

    const totalTime = Math.round((Date.now() - quizStartTime) / 1000);
    const percentage = Math.round((correct / quizQuestions.length) * 100);

    // Save to localStorage
    const quizResults = {
        correct,
        total: quizQuestions.length,
        percentage,
        time: totalTime,
        answers: userAnswers,
        date: new Date().toISOString()
    };

    localStorage.setItem('quizResults', JSON.stringify(quizResults));
    localStorage.setItem('quizCompleted', 'true');
    localStorage.setItem('quizScore', correct);

    // Redirect to results page
    window.location.href = 'result.html';
}

// Initialize quiz on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if coming back from results
    if (localStorage.getItem('quizCompleted') === 'true') {
        const retake = confirm('Kamu sudah pernah mengerjakan quiz. Mau coba lagi?');
        if (!retake) {
            window.location.href = 'result.html';
        } else {
            localStorage.removeItem('quizCompleted');
            localStorage.removeItem('quizResults');
        }
    }
});
