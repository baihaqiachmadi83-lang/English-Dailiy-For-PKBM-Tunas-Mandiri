// Drag & Drop additional functions for practice.js
// Add these questions after line 49 in practice.js

/*
TAMBAHKAN SETELAH multipleChoiceQuestions (line 49):

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
    hint: "She = goes (tambah 'es')"
  },
  {
    id: 13,
    words: ["do", "not", "They", "play", "football", "on", "weekdays"],
    correct: "They do not play football on weekdays",
    hint: "Subject + do not + Verb"
  },
  {
    id: 14,
    words: ["Does", "he", "like", "coffee", "?"],
    correct: "Does he like coffee?",
    hint: "Does + Subject + Verb?"
  },
  {
    id: 15,
    words: ["always", "The", "sun", "rises", "in", "the", "east"],
    correct: "The sun always rises in the east",
    hint: "Adverb biasanya sebelum verb"
  }
];

UBAH fillBlanksQuestions ID menjadi mulai dari 16:
- id: 11 → 16
- id: 12 → 17
- id: 13 → 18
- id: 14 → 19
- id: 15 → 20
- id: 16 → 21
- id: 17 → 22
- id: 18 → 23
- id: 19 → 24
- id: 20 → 25

UBAH userAnswers menjadi:
let userAnswers = {
  multipleChoice: {},
  dragDrop: {},
  fillBlanks: {}
};

UBAH stats.total menjadi:
let stats = {
  correct: 0,
  wrong: 0,
  total: 25
};

TAMBAHKAN di DOMContentLoaded setelah generateMultipleChoiceQuestions():
generateDragDropQuestions();

TAMBAHKAN fungsi ini di akhir file (sebelum exports):
*/

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

        // Shuffle words
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

// Drag and drop handlers
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

/*
TAMBAHKAN di exports (akhir file):
  window.dragStart = dragStart;
  window.allowDrop = allowDrop;
  window.drop = drop;
  window.removeWord = removeWord;
  window.resetDragDrop = resetDragDrop;
  window.checkDragDrop = checkDragDrop;

TAMBAHKAN di checkAllAnswers setelah check multiple choice:
  // Check drag drop
  dragDropQuestions.forEach(q => {
    const userAnswer = userAnswers.dragDrop[q.id];
    if (!userAnswer) stats.wrong++;
    else {
      const isCorrect = userAnswer.toLowerCase() === q.correct.toLowerCase();
      if (isCorrect) stats.correct++;
      else stats.wrong++;
    }
  });

UBAH di updateStatsDisplay:
  document.getElementById('totalAnswered').textContent = `${stats.correct + stats.wrong}/25`;
*/
