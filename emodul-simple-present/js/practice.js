// ====================================
// PRACTICE JavaScript - Interactive Exercises
// ====================================

// Question Banks
const multipleChoiceQuestions = [
    {
        id: 1,
        question: "I _____ to school every day.",
        options: ["go", "goes", "going", "went"],
        correct: 0,
        explanation: "Untuk subject 'I', gunakan verb bentuk dasar 'go' tanpa tambahan s/es."
    },
    {
        id: 2,
        question: "She _____ English very well.",
        options: ["speak", "speaks", "speaking", "spoke"],
        correct: 1,
        explanation: "Untuk subject 'She' (He/She/It), tambahkan 's' pada verb → speaks."
    },
    {
        id: 3,
        question: "They _____ football every Sunday.",
        options: ["plays", "play", "playing", "played"],
        correct: 1,
        explanation: "Untuk subject 'They', gunakan verb bentuk dasar 'play' tanpa tambahan s/es."
    },
    {
        id: 4,
        question: "My mother _____ delicious food.",
        options: ["cook", "cooks", "cooking", "cooked"],
        correct: 1,
        explanation: "Untuk subject 'My mother' (She), tambahkan 's' pada verb → cooks."
    },
    {
        id: 5,
        question: "We _____ in Jakarta.",
        options: ["lives", "live", "living", "lived"],
        correct: 1,
        explanation: "Untuk subject 'We', gunakan verb bentuk dasar 'live' tanpa tambahan s/es."
    },
    {
        id: 6,
        question: "The sun _____ in the east.",
        options: ["rise", "rises", "rising", "rose"],
        correct: 1,
        explanation: "Untuk subject 'The sun' (It), tambahkan 's' pada verb → rises. Ini adalah fakta umum."
    },
    {
        id: 7,
        question: "I _____ coffee every morning.",
        options: ["drinks", "drink", "drinking", "drank"],
        correct: 1,
        explanation: "Untuk subject 'I', gunakan verb bentuk dasar 'drink' tanpa tambahan s/es."
    },
    {
        id: 8,
        question: "He _____ to work by car.",
        options: ["go", "goes", "going", "gone"],
        correct: 1,
        explanation: "Untuk subject 'He', tambahkan 'es' pada verb 'go' → goes."
    },
    {
        id: 9,
        question: "Cats _____ milk.",
        options: ["likes", "like", "liking", "liked"],
        correct: 1,
        explanation: "Untuk subject plural 'Cats' (They), gunakan verb bentuk dasar 'like'."
    },
    {
        id: 10,
        question: "My brother _____ TV every night.",
        options: ["watch", "watches", "watching", "watched"],
        correct: 1,
        explanation: "Untuk subject 'My brother' (He), tambahkan 'es' pada verb yang berakhiran ch → watches."
    }
];

const dragDropQuestions = [
    {
        id: 11,
        words: ["I", "study", "English", "every", "day"],
        correct: "I study English every day",
        hint: "Subject + Verb + Object + Time"
    },
    {
        id: 12,
        words: ["She", "goes", "to", "school", "by", "bus"],
        correct: "She goes to school by bus",
        hint: "Subject She gunakan verb 'goes' (tambah es)"
    },
    {
        id: 13,
        words: ["do", "not", "They", "play", "football", "on", "weekdays"],
        correct: "They do not play football on weekdays",
        hint: "Subject + do not + Verb (bentuk dasar)"
    },
    {
        id: 14,
        words: ["Does", "he", "like", "coffee", "?"],
        correct: "Does he like coffee?",
        hint: "Does + Subject + Verb (bentuk dasar) + ?"
    },
    {
        id: 15,
        words: ["always", "The", "sun", "rises", "in", "the", "east"],
        correct: "The sun always rises in the east",
        hint: "Adverb 'always' biasanya sebelum verb"
    }
];

const fillBlanksQuestions = [
    {
        id: 16,
        question: "She _____ (study) hard for the exam.",
        correct: ["studies"],
        verb: "study",
        explanation: "Verb 'study' berakhiran konsonan+y, ubah 'y' menjadi 'ies' untuk He/She/It → studies."
    },
    {
        id: 17,
        question: "They _____ (not/play) video games on weekdays.",
        correct: ["don't play", "do not play"],
        verb: "not play",
        explanation: "Untuk kalimat negatif dengan subject They, gunakan 'don't play' atau 'do not play'."
    },
    {
        id: 18,
        question: "_____ (do) you speak English?",
        correct: ["do"],
        verb: "do",
        explanation: "Untuk kalimat tanya dengan subject 'you', gunakan 'Do' di awal kalimat."
    },
    {
        id: 19,
        question: "He _____ (have) a beautiful car.",
        correct: ["has"],
        verb: "have",
        explanation: "Verb 'have' irregular untuk He/She/It → has."
    },
    {
        id: 20,
        question: "Water _____ (boil) at 100 degrees Celsius.",
        correct: ["boils"],
        verb: "boil",
        explanation: "Untuk subject 'Water' (It) dan fakta umum, tambahkan 's' → boils."
    },
    {
        id: 21,
        question: "My friends _____ (not/like) spicy food.",
        correct: ["don't like", "do not like"],
        verb: "not like",
        explanation: "Untuk kalimat negatif dengan subject plural, gunakan 'don't like' atau 'do not like'."
    },
    {
        id: 22,
        question: "_____ (does) she work here?",
        correct: ["does"],
        verb: "does",
        explanation: "Untuk kalimat tanya dengan subject 'she', gunakan 'Does' di awal kalimat."
    },
    {
        id: 23,
        question: "I _____ (read) books every day.",
        correct: ["read"],
        verb: "read",
        explanation: "Untuk subject 'I', gunakan verb bentuk dasar 'read' (dibaca: rid)."
    },
    {
        id: 24,
        question: "The baby _____ (cry) when hungry.",
        correct: ["cries"],
        verb: "cry",
        explanation: "Verb 'cry' berakhiran konsonan+y, ubah 'y' menjadi 'ies' untuk He/She/It → cries."
    },
    {
        id: 25,
        question: "Dogs _____ (bark) loudly at night.",
        correct: ["bark"],
        verb: "bark",
        explanation: "Untuk subject plural 'Dogs', gunakan verb bentuk dasar 'bark'."
    }
];

// State Management
let userAnswers = {
    multipleChoice: {},
    dragDrop: {},
    fillBlanks: {}
};

let stats = {
    correct: 0,
    wrong: 0,
    total: 25
};

// ====================================
// INITIALIZATION
// ====================================
document.addEventListener('DOMContentLoaded', function () {
    generateMultipleChoiceQuestions();
    generateDragDropQuestions();
    generateFillBlanksQuestions();
    loadSavedAnswers();
});

// ====================================
// GENERATE MULTIPLE CHOICE QUESTIONS
// ====================================
function generateMultipleChoiceQuestions() {
    const container = document.getElementById('multipleChoiceQuestions');

    multipleChoiceQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        questionDiv.id = `mc-${q.id}`;

        let optionsHTML = '';
        q.options.forEach((option, optIndex) => {
            optionsHTML += `
        <label class="option-label">
          <input type="radio" name="mc-${q.id}" value="${optIndex}" 
                 onchange="saveAnswer('mc', ${q.id}, ${optIndex})">
          <span class="option-text">${option}</span>
          <span class="option-indicator"></span>
        </label>
      `;
        });

        questionDiv.innerHTML = `
      <div class="question-header">
        <span class="question-number">${index + 1}</span>
        <div class="question-text">${q.question}</div>
      </div>
      <div class="options-container">
        ${optionsHTML}
      </div>
      <div class="feedback" id="feedback-mc-${q.id}" style="display: none;"></div>
    `;

        container.appendChild(questionDiv);
    });
}

// ====================================
// GENERATE DRAG & DROP QUESTIONS
// ====================================
function generateDragDropQuestions() {
    const container = document.getElementById('dragDropQuestions');
    if (!container) return;

    dragDropQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item drag-drop-item';
        questionDiv.id = `dd-${q.id}`;

        // Shuffle words for random order
        const shuffledWords = [...q.words].sort(() => Math.random() - 0.5);

        let wordsHTML = '';
        shuffledWords.forEach((word, wordIndex) => {
            wordsHTML += `
        <div class="word-item" draggable="true" data-word="${word}" 
             ondragstart="dragStart(event)" id="word-${q.id}-${wordIndex}">
          ${word}
        </div>
      `;
        });

        questionDiv.innerHTML = `
      <div class="question-header">
        <span class="question-number">${index + 11}</span>
        <div class="question-text">Susun kata-kata berikut menjadi kalimat yang benar:</div>
      </div>
      
      <div class="words-bank">
        ${wordsHTML}
      </div>
      
      <div class="drop-zone" 
           ondrop="drop(event, ${q.id})" 
           ondragover="allowDrop(event)"
           data-question-id="${q.id}">
        <span class="drop-placeholder">Seret kata-kata ke sini...</span>
      </div>
      
      <div class="drag-drop-actions">
        <button class="btn btn-sm btn-secondary" onclick="resetDragDrop(${q.id})">
          🔄 Reset
        </button>
        <button class="btn btn-sm btn-primary" onclick="checkDragDrop(${q.id})" disabled id="check-${q.id}">
          ✓ Check
        </button>
      </div>
      
      <div class="hint">💡 Hint: ${q.hint}</div>
      <div class="feedback" id="feedback-dd-${q.id}" style="display: none;"></div>
    `;

        container.appendChild(questionDiv);
    });
}

// ====================================
// DRAG AND DROP HANDLERS
// ====================================
let draggedElement = null;

function dragStart(event) {
    draggedElement = event.target;
    event.dataTransfer.effectAllowed = 'move';
    event.target.style.opacity = '0.5';
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event, questionId) {
    event.preventDefault();

    if (!draggedElement) return;

    const dropZone = event.currentTarget;
    const placeholder = dropZone.querySelector('.drop-placeholder');
    if (placeholder) placeholder.remove();

    const wordClone = draggedElement.cloneNode(true);
    wordClone.draggable = false;
    wordClone.classList.add('dropped-word');
    wordClone.onclick = function () { removeWord(this, questionId); };

    dropZone.appendChild(wordClone);
    draggedElement.style.display = 'none';
    draggedElement.style.opacity = '1';
    draggedElement = null;

    document.getElementById(`check-${questionId}`).disabled = false;
}

function removeWord(element, questionId) {
    const word = element.dataset.word;
    element.remove();

    const wordBank = document.querySelector(`#dd-${questionId} .words-bank`);
    const originalWord = wordBank.querySelector(`[data-word="${word}"]`);
    if (originalWord) originalWord.style.display = 'inline-block';

    const dropZone = document.querySelector(`#dd-${questionId} .drop-zone`);
    if (dropZone.querySelectorAll('.dropped-word').length === 0) {
        dropZone.innerHTML = '<span class="drop-placeholder">Seret kata-kata ke sini...</span>';
        document.getElementById(`check-${questionId}`).disabled = true;
    }
}

function resetDragDrop(questionId) {
    const dropZone = document.querySelector(`#dd-${questionId} .drop-zone`);
    const wordBank = document.querySelector(`#dd-${questionId} .words-bank`);

    dropZone.innerHTML = '<span class="drop-placeholder">Seret kata-kata ke sini...</span>';
    wordBank.querySelectorAll('.word-item').forEach(word => {
        word.style.display = 'inline-block';
    });

    document.getElementById(`feedback-dd-${questionId}`).style.display = 'none';
    document.getElementById(`check-${questionId}`).disabled = true;
    delete userAnswers.dragDrop[questionId];
}

function checkDragDrop(questionId) {
    const dropZone = document.querySelector(`#dd-${questionId} .drop-zone`);
    const droppedWords = Array.from(dropZone.querySelectorAll('.dropped-word'))
        .map(word => word.dataset.word);

    const userSentence = droppedWords.join(' ');
    userAnswers.dragDrop[questionId] = userSentence;

    const question = dragDropQuestions.find(q => q.id === questionId);
    const isCorrect = userSentence.toLowerCase() === question.correct.toLowerCase();

    const feedbackDiv = document.getElementById(`feedback-dd-${questionId}`);
    const questionDiv = document.getElementById(`dd-${questionId}`);

    if (isCorrect) {
        feedbackDiv.className = 'feedback success';
        feedbackDiv.innerHTML = `✅ <strong>Benar!</strong> Kalimat kamu sudah sempurna.`;
        questionDiv.classList.add('correct');
        dropZone.classList.add('correct');
    } else {
        feedbackDiv.className = 'feedback error';
        feedbackDiv.innerHTML = `
      ❌ <strong>Belum tepat.</strong> Jawaban yang benar: <strong>${question.correct}</strong><br>
      💡 ${question.hint}
    `;
        questionDiv.classList.add('wrong');
        dropZone.classList.add('wrong');
    }

    feedbackDiv.style.display = 'block';
    dropZone.querySelectorAll('.dropped-word').forEach(word => {
        word.onclick = null;
    });

    document.getElementById(`check-${questionId}`).disabled = true;
}

// ====================================
// GENERATE FILL IN THE BLANKS QUESTIONS
// ====================================
function generateFillBlanksQuestions() {
    const container = document.getElementById('fillBlanksQuestions');

    fillBlanksQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        questionDiv.id = `fb-${q.id}`;

        const parts = q.question.split('_____');

        questionDiv.innerHTML = `
      <div class="question-header">
        <span class="question-number">${index + 16}</span>
        <div class="question-text">
          ${parts[0]}
          <input type="text" class="fill-blank-input" id="input-${q.id}" 
                 placeholder="..." 
                 oninput="saveAnswer('fb', ${q.id}, this.value)">
          ${parts[1] || ''}
        </div>
      </div>
      <div class="hint">💡 Hint: (${q.verb})</div>
      <div class="feedback" id="feedback-fb-${q.id}" style="display: none;"></div>
    `;

        container.appendChild(questionDiv);
    });
}

// ====================================
// SAVE ANSWER
// ====================================
function saveAnswer(type, questionId, answer) {
    if (type === 'mc') {
        userAnswers.multipleChoice[questionId] = parseInt(answer);
    } else if (type === 'fb') {
        userAnswers.fillBlanks[questionId] = answer.trim();
    }

    // Save to localStorage
    localStorage.setItem('practiceAnswers', JSON.stringify(userAnswers));
}

// ====================================
// LOAD SAVED ANSWERS
// ====================================
function loadSavedAnswers() {
    const saved = localStorage.getItem('practiceAnswers');
    if (saved) {
        userAnswers = JSON.parse(saved);

        // Restore multiple choice selections
        Object.keys(userAnswers.multipleChoice).forEach(qId => {
            const radio = document.querySelector(`input[name="mc-${qId}"][value="${userAnswers.multipleChoice[qId]}"]`);
            if (radio) radio.checked = true;
        });

        // Restore fill blanks inputs
        Object.keys(userAnswers.fillBlanks).forEach(qId => {
            const input = document.getElementById(`input-${qId}`);
            if (input) input.value = userAnswers.fillBlanks[qId];
        });
    }
}

// ====================================
// CHECK ALL ANSWERS
// ====================================
function checkAllAnswers() {
    stats = { correct: 0, wrong: 0, total: 25 };

    // Check multiple choice
    multipleChoiceQuestions.forEach(q => {
        checkMultipleChoice(q);
    });

    // Check drag drop
    dragDropQuestions.forEach(q => {
        const userAnswer = userAnswers.dragDrop[q.id];
        if (!userAnswer || userAnswer === '') {
            stats.wrong++;
        } else {
            const isCorrect = userAnswer.toLowerCase() === q.correct.toLowerCase();
            if (isCorrect) stats.correct++;
            else stats.wrong++;
        }
    });

    // Check fill blanks
    fillBlanksQuestions.forEach(q => {
        checkFillBlank(q);
    });

    // Update stats display
    updateStatsDisplay();

    // Calculate and save score
    const score = Math.round((stats.correct / stats.total) * 100);
    localStorage.setItem('practiceScore', score);

    // Show results
    showResults(score);

    // Disable check button
    const checkBtn = document.getElementById('checkAllBtn');
    checkBtn.textContent = '✅ Sudah Diperiksa';
    checkBtn.disabled = true;

    // Scroll to results
    setTimeout(() => {
        document.getElementById('resultsSummary').scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

// ====================================
// CHECK MULTIPLE CHOICE
// ====================================
function checkMultipleChoice(question) {
    const userAnswer = userAnswers.multipleChoice[question.id];
    const feedbackDiv = document.getElementById(`feedback-mc-${question.id}`);
    const questionDiv = document.getElementById(`mc-${question.id}`);

    if (userAnswer === undefined) {
        feedbackDiv.style.display = 'block';
        feedbackDiv.className = 'feedback warning';
        feedbackDiv.innerHTML = `⚠️ Belum dijawab`;
        stats.wrong++;
        return;
    }

    const isCorrect = userAnswer === question.correct;

    if (isCorrect) {
        stats.correct++;
        feedbackDiv.className = 'feedback success';
        feedbackDiv.innerHTML = `
      ✅ <strong>Benar!</strong> ${question.explanation}
    `;
        questionDiv.classList.add('correct');
    } else {
        stats.wrong++;
        feedbackDiv.className = 'feedback error';
        feedbackDiv.innerHTML = `
      ❌ <strong>Salah.</strong> Jawaban yang benar: <strong>${question.options[question.correct]}</strong><br>
      💡 ${question.explanation}
    `;
        questionDiv.classList.add('wrong');
    }

    feedbackDiv.style.display = 'block';

    // Highlight correct answer
    const options = questionDiv.querySelectorAll('.option-label');
    options[question.correct].classList.add('correct-answer');
    if (!isCorrect && userAnswer !== undefined) {
        options[userAnswer].classList.add('wrong-answer');
    }
}

// ====================================
// CHECK FILL IN THE BLANK
// ====================================
function checkFillBlank(question) {
    const userAnswer = userAnswers.fillBlanks[question.id];
    const feedbackDiv = document.getElementById(`feedback-fb-${question.id}`);
    const questionDiv = document.getElementById(`fb-${question.id}`);
    const inputField = document.getElementById(`input-${question.id}`);

    if (!userAnswer || userAnswer === '') {
        feedbackDiv.style.display = 'block';
        feedbackDiv.className = 'feedback warning';
        feedbackDiv.innerHTML = `⚠️ Belum dijawab`;
        stats.wrong++;
        return;
    }

    // Check if answer matches any correct answer (case insensitive)
    const isCorrect = question.correct.some(ans =>
        ans.toLowerCase() === userAnswer.toLowerCase()
    );

    if (isCorrect) {
        stats.correct++;
        feedbackDiv.className = 'feedback success';
        feedbackDiv.innerHTML = `
      ✅ <strong>Benar!</strong> ${question.explanation}
    `;
        questionDiv.classList.add('correct');
        inputField.classList.add('correct-input');
    } else {
        stats.wrong++;
        feedbackDiv.className = 'feedback error';
        feedbackDiv.innerHTML = `
      ❌ <strong>Salah.</strong> Jawaban yang benar: <strong>${question.correct[0]}</strong><br>
      💡 ${question.explanation}
    `;
        questionDiv.classList.add('wrong');
        inputField.classList.add('wrong-input');
    }

    feedbackDiv.style.display = 'block';
    inputField.disabled = true;
}

// ====================================
// UPDATE STATS DISPLAY
// ====================================
function updateStatsDisplay() {
    document.getElementById('correctCount').textContent = stats.correct;
    document.getElementById('wrongCount').textContent = stats.wrong;
    document.getElementById('totalAnswered').textContent = `${stats.correct + stats.wrong}/25`;

    const score = Math.round((stats.correct / stats.total) * 100);
    document.getElementById('currentScore').textContent = score;
}

// ====================================
// SHOW RESULTS
// ====================================
function showResults(score) {
    const resultsSection = document.getElementById('resultsSummary');

    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalCorrect').textContent = stats.correct;
    document.getElementById('finalWrong').textContent = stats.wrong;
    document.getElementById('finalPercentage').textContent = score + '%';

    // Result message based on score
    const messageDiv = document.getElementById('resultMessage');
    let message = '';

    if (score >= 90) {
        message = `
      <div class="alert alert-success">
        🌟 <strong>Excellent!</strong> Pemahaman kamu tentang Simple Present sangat baik! 
        Kamu siap untuk mengerjakan quiz evaluasi.
      </div>
    `;
    } else if (score >= 70) {
        message = `
      <div class="alert alert-info">
        👍 <strong>Good Job!</strong> Pemahaman kamu cukup baik. 
        Review materi sekali lagi sebelum mengerjakan quiz.
      </div>
    `;
    } else if (score >= 50) {
        message = `
      <div class="alert alert-warning">
        📚 <strong>Keep Learning!</strong> Masih ada beberapa konsep yang perlu dipelajari lebih dalam. 
        Coba ulangi latihan dan baca materi lagi.
      </div>
    `;
    } else {
        message = `
      <div class="alert alert-error">
        💪 <strong>Don't Give Up!</strong> Belajar butuh proses. 
        Kembali ke halaman materi dan pelajari dengan lebih teliti, lalu coba lagi!
      </div>
    `;
    }

    messageDiv.innerHTML = message;
    resultsSection.style.display = 'block';
}

// ====================================
// RETRY PRACTICE
// ====================================
function retryPractice() {
    // Clear all answers
    userAnswers = { multipleChoice: {}, dragDrop: {}, fillBlanks: {} };
    localStorage.removeItem('practiceAnswers');

    // Reload page
    window.location.reload();
}

// ====================================
// EXPORT FOR USE IN HTML
// ====================================
if (typeof window !== 'undefined') {
    window.saveAnswer = saveAnswer;
    window.checkAllAnswers = checkAllAnswers;
    window.retryPractice = retryPractice;
    window.dragStart = dragStart;
    window.allowDrop = allowDrop;
    window.drop = drop;
    window.removeWord = removeWord;
    window.resetDragDrop = resetDragDrop;
    window.checkDragDrop = checkDragDrop;
}
