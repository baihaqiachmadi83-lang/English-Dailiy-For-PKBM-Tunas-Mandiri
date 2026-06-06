// =====================================================
// PRACTICE.JS - Interactive Exercises
// Multiple exercise types for SMP students
// =====================================================

// Current active exercise
let currentExercise = 'multiple-choice';
let exerciseScores = {
    'multiple-choice': { correct: 0, total: 0 },
    'fill-blanks': { correct: 0, total: 0 },
    'drag-drop': { correct: 0, total: 0 },
    'matching': { correct: 0, total: 0 },
    'true-false': { correct: 0, total: 0 }
};

// ===== EXERCISE NAVIGATION =====
function switchExercise(exerciseId) {
    // Hide all exercises
    document.querySelectorAll('.exercise-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected exercise
    const selected = document.getElementById(exerciseId);
    if (selected) {
        selected.classList.add('active');
        currentExercise = exerciseId;
    }

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// ===== MULTIPLE CHOICE =====
const mcQuestions = [
    {
        question: "She ___ to school every day.",
        options: ["go", "goes", "going", "to go"],
        correct: 1,
        explanation: "Untuk 'She' (He/She/It) gunakan verb + s/es"
    },
    {
        question: "They ___ English on Monday.",
        options: ["studies", "study", "studying", "to study"],
        correct: 1,
        explanation: "Untuk 'They' gunakan verb bentuk dasar tanpa -s/es"
    },
    {
        question: "I ___ like coffee.",
        options: ["doesn't", "don't", "isn't", "aren't"],
        correct: 1,
        explanation: "Untuk I/You/We/They gunakan 'don't'"
    },
    {
        question: "___ he play football?",
        options: ["Do", "Does", "Is", "Are"],
        correct: 1,
        explanation: "Untuk He/She/It gunakan 'Does' dalam bentuk tanya"
    },
    {
        question: "My sister ___ the piano very well.",
        options: ["play", "plays", "playing", "played"],
        correct: 1,
        explanation: "'My sister' = She, jadi gunakan plays"
    },
    {
        question: "We ___ watch TV on weekdays.",
        options: ["doesn't", "don't", "isn't", "aren't"],
        correct: 1,
        explanation: "Untuk 'We' gunakan 'don't'"
    },
    {
        question: "The sun ___ in the east.",
        options: ["rise", "rises", "rising", "rose"],
        correct: 1,
        explanation: "'The sun' = It, jadi gunakan rises"
    },
    {
        question: "___ you speak Indonesian?",
        options: ["Does", "Do", "Are", "Is"],
        correct: 1,
        explanation: "Untuk 'You' gunakan 'Do' dalam bentuk tanya"
    },
    {
        question: "He ___ his homework after school.",
        options: ["do", "does", "doing", "did"],
        correct: 1,
        explanation: "Untuk 'He' gunakan does"
    },
    {
        question: "My friends and I ___ badminton every Sunday.",
        options: ["plays", "play", "playing", "played"],
        correct: 1,
        explanation: "'My friends and I' = We, jadi gunakan play"
    },
    {
        question: "She ___ not like spicy food.",
        options: ["do", "does", "is", "are"],
        correct: 1,
        explanation: "Untuk 'She' gunakan 'does' dalam negative"
    },
    {
        question: "___ they live in Jakarta?",
        options: ["Does", "Do", "Are", "Is"],
        correct: 1,
        explanation: "Untuk 'They' gunakan 'Do' dalam bentuk tanya"
    }
];

let currentMCQuestion = 0;
let mcStreak = 0;

function displayMCQuestion() {
    const container = document.getElementById('mc-questions');
    if (!container) return;

    container.innerHTML = '';
    const q = mcQuestions[currentMCQuestion];

    const card = document.createElement('div');
    card.className = 'question-card';
    card.innerHTML = `
        <div class="question-header">
            <span class="question-number">Soal ${currentMCQuestion + 1} dari ${mcQuestions.length}</span>
            ${mcStreak > 0 ? `<span class="streak-badge">🔥 Streak: ${mcStreak}</span>` : ''}
        </div>
        <div class="question-text">${q.question}</div>
        <div class="options-grid" id="mc-options"></div>
        <div class="feedback" id="mc-feedback"></div>
        <div class="action-buttons">
            ${currentMCQuestion < mcQuestions.length - 1 ?
            '<button class="btn btn-primary" onclick="nextMCQuestion()" id="mc-next-btn" style="display:none;">Soal Berikutnya →</button>' :
            '<button class="btn btn-success" onclick="completeMC()" id="mc-complete-btn" style="display:none;">🎉 Selesai!</button>'}
        </div>
    `;
    container.appendChild(card);

    // Display options
    const optionsContainer = document.getElementById('mc-options');
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `
            <span class="option-label">${String.fromCharCode(65 + index)}</span>
            <span>${option}</span>
        `;
        btn.onclick = () => checkMCAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

function checkMCAnswer(selected) {
    const q = mcQuestions[currentMCQuestion];
    const options = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('mc-feedback');
    const nextBtn = document.getElementById('mc-next-btn') || document.getElementById('mc-complete-btn');

    // Disable all options
    options.forEach(btn => btn.disabled = true);

    exerciseScores['multiple-choice'].total++;

    if (selected === q.correct) {
        options[selected].classList.add('correct');
        feedback.className = 'feedback correct show';
        feedback.innerHTML = `✅ <strong>Benar!</strong><div class="feedback-explanation">${q.explanation}</div>`;
        exerciseScores['multiple-choice'].correct++;
        mcStreak++;
    } else {
        options[selected].classList.add('wrong');
        options[q.correct].classList.add('correct');
        feedback.className = 'feedback wrong show';
        feedback.innerHTML = `❌ <strong>Salah!</strong><div class="feedback-explanation">${q.explanation}<br>Jawaban yang benar: <strong>${q.options[q.correct]}</strong></div>`;
        mcStreak = 0;
    }

    nextBtn.style.display = 'block';
}

function nextMCQuestion() {
    currentMCQuestion++;
    displayMCQuestion();
}

function completeMC() {
    const score = exerciseScores['multiple-choice'];
    const percentage = Math.round((score.correct / score.total) * 100);
    showExerciseCompletion('Multiple Choice', percentage, score.correct, score.total);
}

// ===== FILL IN THE BLANKS =====
const blankStory = `Hi, I'm Dina. I'm a student in SMP 1. Every morning, I <input class="fill-blank-input" data-answer="wake" placeholder="..."> up at 5 AM. I <input class="fill-blank-input" data-answer="brush" placeholder="..."> my teeth and <input class="fill-blank-input" data-answer="take" placeholder="..."> a shower. 

After that, I <input class="fill-blank-input" data-answer="eat" placeholder="..."> breakfast with my family. My mom always <input class="fill-blank-input" data-answer="cooks" placeholder="..."> delicious food. My little brother <input class="fill-blank-input" data-answer="drinks" placeholder="..."> milk every morning.

Then I <input class="fill-blank-input" data-answer="go" placeholder="..."> to school at 6:30 AM. My friend and I <input class="fill-blank-input" data-answer="walk" placeholder="..."> to school together. We <input class="fill-blank-input" data-answer="arrive" placeholder="..."> at school at 7 AM.

I <input class="fill-blank-input" data-answer="study" placeholder="..."> many subjects at school. I <input class="fill-blank-input" data-answer="like" placeholder="..."> English and Math. After school, I <input class="fill-blank-input" data-answer="do" placeholder="..."> my homework.`;

function initFillBlanks() {
    const container = document.getElementById('fill-story');
    if (!container) return;

    container.innerHTML = blankStory;

    // Add event listeners to all inputs
    const inputs = container.querySelectorAll('.fill-blank-input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('correct', 'wrong');
        });
    });
}

function checkFillBlanks() {
    const inputs = document.querySelectorAll('.fill-blank-input');
    let correct = 0;
    let total = inputs.length;

    inputs.forEach(input => {
        const answer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();

        if (answer === correctAnswer) {
            input.classList.add('correct');
            input.classList.remove('wrong');
            correct++;
        } else if (answer !== '') {
            input.classList.add('wrong');
            input.classList.remove('correct');
        }
    });

    exerciseScores['fill-blanks'] = { correct, total };

    const feedback = document.getElementById('fill-feedback');
    if (feedback) {
        const percentage = Math.round((correct / total) * 100);
        feedback.className = correct === total ? 'feedback correct show' : 'feedback wrong show';
        feedback.innerHTML = `
            <strong>Score: ${correct}/${total} (${percentage}%)</strong>
            <div class="feedback-explanation">
                ${correct === total ? '🎉 Perfect! Semua benar!' :
                correct > total / 2 ? '👍 Bagus! Coba perbaiki yang salah.' :
                    '💪 Coba lagi! Perhatikan subject-nya.'}
            </div>
        `;
    }

    if (correct === total) {
        document.getElementById('fill-complete-btn').style.display = 'block';
    }
}

function showFillHints() {
    const hints = ['wake', 'brush', 'take', 'eat', 'cooks', 'drinks', 'go', 'walk', 'arrive', 'study', 'like', 'do'];
    alert('💡 Hints: ' + hints.join(', '));
}

function completeFillBlanks() {
    const score = exerciseScores['fill-blanks'];
    const percentage = Math.round((score.correct / score.total) * 100);
    showExerciseCompletion('Fill in the Blanks', percentage, score.correct, score.total);
}

// ===== DRAG AND DROP =====
const dragDropQuestions = [
    {
        words: ['She', 'plays', 'badminton', 'every', 'Sunday'],
        correct: ['She', 'plays', 'badminton', 'every', 'Sunday']
    },
    {
        words: ['Do', 'you', 'like', 'pizza', '?'],
        correct: ['Do', 'you', 'like', 'pizza', '?']
    },
    {
        words: ['My', 'brother', 'watches', 'TV', 'after', 'dinner'],
        correct: ['My', 'brother', 'watches', 'TV', 'after', 'dinner']
    },
    {
        words: ['They', "don't", 'study', 'on', 'weekends'],
        correct: ['They', "don't", 'study', 'on', 'weekends']
    },
    {
        words: ['The', 'cat', 'sleeps', 'on', 'the', 'sofa'],
        correct: ['The', 'cat', 'sleeps', 'on', 'the', 'sofa']
    },
    {
        words: ['We', 'eat', 'breakfast', 'at', '7', 'AM'],
        correct: ['We', 'eat', 'breakfast', 'at', '7', 'AM']
    },
    {
        words: ['Does', 'she', 'speak', 'English', '?'],
        correct: ['Does', 'she', 'speak', 'English', '?']
    },
    {
        words: ['I', 'always', 'do', 'my', 'homework'],
        correct: ['I', 'always', 'do', 'my', 'homework']
    },
    {
        words: ['He', 'goes', 'to', 'school', 'by', 'bus'],
        correct: ['He', 'goes', 'to', 'school', 'by', 'bus']
    },
    {
        words: ['My', 'parents', 'work', 'in', 'an', 'office'],
        correct: ['My', 'parents', 'work', 'in', 'an', 'office']
    }
];

let currentDDQuestion = 0;

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function initDragDrop() {
    displayDDQuestion();
}

function displayDDQuestion() {
    const container = document.getElementById('dd-container');
    if (!container) return;

    const q = dragDropQuestions[currentDDQuestion];
    const shuffled = shuffleArray(q.words);

    container.innerHTML = `
        <div class="question-header">
            <span class="question-number">Soal ${currentDDQuestion + 1} dari ${dragDropQuestions.length}</span>
        </div>
        <p class="zone-label">Susun kata-kata di bawah menjadi kalimat yang benar! (Drag ke drop zone)</p>
        <div class="word-bank" id="word-bank"></div>
        <div class="drop-zone" id="drop-zone"></div>
        <div class="feedback" id="dd-feedback"></div>
        <div class="action-buttons">
            <button class="btn btn-secondary" onclick="checkDragDrop()">✓ Cek Jawaban</button>
            <button class="btn btn-primary" onclick="nextDDQuestion()" id="dd-next-btn" style="display:none;">Soal Berikutnya →</button>
        </div>
    `;

    const wordBank = document.getElementById('word-bank');
    shuffled.forEach(word => {
        const tile = document.createElement('div');
        tile.className = 'word-tile';
        tile.textContent = word;
        tile.draggable = true;
        tile.addEventListener('dragstart', handleDragStart);
        tile.addEventListener('dragend', handleDragEnd);
        wordBank.appendChild(tile);
    });

    const dropZone = document.getElementById('drop-zone');
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleDrop);
    dropZone.addEventListener('dragleave', handleDragLeave);

    // Also make word bank a drop zone
    wordBank.addEventListener('dragover', handleDragOver);
    wordBank.addEventListener('drop', handleDrop);
    wordBank.addEventListener('dragleave', handleDragLeave);
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.remove('drag-over');

    if (draggedElement && this.classList.contains('word-bank') || this.classList.contains('drop-zone')) {
        this.appendChild(draggedElement);
    }
}

function checkDragDrop() {
    const dropZone = document.getElementById('drop-zone');
    const tiles = Array.from(dropZone.querySelectorAll('.word-tile'));
    const userAnswer = tiles.map(tile => tile.textContent);
    const correctAnswer = dragDropQuestions[currentDDQuestion].correct;

    const feedback = document.getElementById('dd-feedback');
    const nextBtn = document.getElementById('dd-next-btn');

    exerciseScores['drag-drop'].total++;

    const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);

    if (isCorrect) {
        dropZone.classList.add('correct');
        feedback.className = 'feedback correct show';
        feedback.innerHTML = '✅ <strong>Benar!</strong> Kalimatmu sudah tepat!';
        exerciseScores['drag-drop'].correct++;
        nextBtn.style.display = 'block';
    } else {
        dropZone.classList.add('wrong');
        feedback.className = 'feedback wrong show';
        feedback.innerHTML = `❌ <strong>Belum benar.</strong><div class="feedback-explanation">Coba susun ulang! Jawaban yang benar: <strong>${correctAnswer.join(' ')}</strong></div>`;
    }
}

function nextDDQuestion() {
    currentDDQuestion++;
    if (currentDDQuestion < dragDropQuestions.length) {
        displayDDQuestion();
    } else {
        const score = exerciseScores['drag-drop'];
        const percentage = Math.round((score.correct / score.total) * 100);
        showExerciseCompletion('Drag & Drop', percentage, score.correct, score.total);
    }
}

// ===== COMPLETION SCREEN =====
function showExerciseCompletion(exerciseName, percentage, correct, total) {
    const container = document.getElementById(currentExercise);
    const stars = percentage >= 90 ? '⭐⭐⭐' : percentage >= 70 ? '⭐⭐' : '⭐';

    const completionHTML = `
        <div class="completion-screen show">
            <h2>🎉 ${exerciseName} Selesai!</h2>
            <div class="score-circle">${percentage}%</div>
            <div class="stars-rating">${stars}</div>
            <p>Score: ${correct}/${total} benar</p>
            <p>${percentage >= 90 ? '🏆 Perfect! Kamu luar biasa!' :
            percentage >= 70 ? '👍 Bagus! Terus berlatih!' :
                '💪 Coba lagi untuk score lebih baik!'}</p>
            <div class="action-buttons" style="margin-top: var(--spacing-xl);">
                <button class="btn btn-outline" onclick="location.reload()" style="background:white;">🔄 Coba Lagi</button>
                <button class="btn btn-primary" onclick="window.location.href='quiz.html'" style="background:white; color: var(--primary-color);">
                    Lanjut ke Quiz →
                </button>
            </div>
        </div>
    `;

    container.innerHTML = completionHTML;

    // Save progress
    const totalScore = Object.values(exerciseScores).reduce((sum, s) => sum + (s.correct || 0), 0);
    localStorage.setItem('practiceScore', totalScore);

    if (typeof celebrateAchievement === 'function') {
        celebrateAchievement('Practice Complete!');
    }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Multiple Choice
    if (document.getElementById('mc-questions')) {
        displayMCQuestion();
    }

    // Initialize Fill in the Blanks
    if (document.getElementById('fill-story')) {
        initFillBlanks();
    }

    // Initialize Drag & Drop
    if (document.getElementById('dd-container')) {
        initDragDrop();
    }
});
