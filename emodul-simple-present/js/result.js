// ====================================
// RESULT JavaScript - Display Quiz Results
// ====================================

document.addEventListener('DOMContentLoaded', function () {
    displayResults();
    displayProgressSummary();
});

// ====================================
// DISPLAY RESULTS
// ====================================
function displayResults() {
    // Get quiz results from localStorage
    const resultsData = localStorage.getItem('quizResults');

    if (!resultsData) {
        // No results found, redirect to quiz
        alert('Tidak ada hasil quiz. Silakan kerjakan quiz terlebih dahulu.');
        window.location.href = 'quiz.html';
        return;
    }

    const results = JSON.parse(resultsData);

    // Display score
    displayScore(results.score);

    // Display details
    document.getElementById('scoreValue').textContent = results.score;
    document.getElementById('correctAnswers').textContent = results.correct;
    document.getElementById('wrongAnswers').textContent = results.wrong;
    document.getElementById('percentage').textContent = results.score + '%';

    // Animate progress circle
    animateCircle(results.score);

    // Display message based on score
    displayMessage(results.score);
}

// ====================================
// DISPLAY SCORE WITH ANIMATION
// ====================================
function displayScore(finalScore) {
    const scoreElement = document.getElementById('scoreValue');
    let currentScore = 0;
    const increment = finalScore / 50; // 50 steps

    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= finalScore) {
            currentScore = finalScore;
            clearInterval(timer);
        }
        scoreElement.textContent = Math.round(currentScore);
    }, 20);
}

// ====================================
// ANIMATE CIRCLE PROGRESS
// ====================================
function animateCircle(percentage) {
    const circle = document.getElementById('progressCircle');
    const circumference = 2 * Math.PI * 90; // radius = 90
    const offset = circumference - (percentage / 100) * circumference;

    // Set initial state
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    // Animate
    setTimeout(() => {
        circle.style.transition = 'stroke-dashoffset 1.5s ease-out';
        circle.style.strokeDashoffset = offset;
    }, 100);
}

// ====================================
// DISPLAY MESSAGE BASED ON SCORE
// ====================================
function displayMessage(score) {
    const messageDiv = document.getElementById('resultMessage');
    const titleElement = document.getElementById('resultTitle');
    const subtitleElement = document.getElementById('resultSubtitle');

    let message = '';
    let title = '';
    let subtitle = '';

    if (score >= 90) {
        title = '🌟 Excellent! Luar Biasa!';
        subtitle = 'Kamu menguasai Simple Present Tense dengan sangat baik!';
        message = `
      <div class="card result-excellent">
        <div class="card-body">
          <h3>🎉 Selamat!</h3>
          <p>
            Skor kamu <strong>${score}/100</strong> menunjukkan pemahaman yang sangat baik tentang Simple Present Tense. 
            Kamu sudah siap untuk melanjutkan ke materi tenses berikutnya!
          </p>
          <div class="achievement-badge">
            <div class="badge-icon">🏆</div>
            <div class="badge-text">
              <h4>Achievement Unlocked!</h4>
              <p>Simple Present Master</p>
            </div>
          </div>
        </div>
      </div>
    `;
    } else if (score >= 70) {
        title = '👍 Good Job! Bagus Sekali!';
        subtitle = 'Kamu memiliki pemahaman yang baik tentang Simple Present Tense';
        message = `
      <div class="card result-good">
        <div class="card-body">
          <h3>✅ Berhasil!</h3>
          <p>
            Skor kamu <strong>${score}/100</strong> menunjukkan pemahaman yang cukup baik. 
            Dengan sedikit review tambahan, kamu akan menguasai Simple Present Tense sepenuhnya!
          </p>
          <div class="tips-box">
            <h4>💡 Tips untuk Meningkatkan:</h4>
            <ul>
              <li>Review kembali bagian verb forms (s/es rules)</li>
              <li>Perhatikan penggunaan do/does dalam kalimat negatif dan tanya</li>
              <li>Latih lebih banyak contoh kalimat</li>
            </ul>
          </div>
        </div>
      </div>
    `;
    } else if (score >= 50) {
        title = '📚 Keep Learning!';
        subtitle = 'Masih ada beberapa konsep yang perlu dipelajari lebih dalam';
        message = `
      <div class="card result-keep-learning">
        <div class="card-body">
          <h3>💪 Tetap Semangat!</h3>
          <p>
            Skor kamu <strong>${score}/100</strong>. Jangan berkecil hati! Belajar bahasa butuh proses dan latihan. 
            Mari kita review materinya sekali lagi.
          </p>
          <div class="recommendation-box">
            <h4>📖 Rekomendasi:</h4>
            <ul>
              <li>Baca ulang halaman <a href="material.html">Materi</a> dengan lebih teliti</li>
              <li>Fokus pada rumus Simple Present (Positive, Negative, Interrogative)</li>
              <li>Ulangi <a href="practice.html">Latihan</a> untuk memperkuat pemahaman</li>
              <li>Coba quiz lagi setelah review materi</li>
            </ul>
          </div>
        </div>
      </div>
    `;
    } else {
        title = '💪 Don\'t Give Up!';
        subtitle = 'Belajar adalah proses, mari kita coba lagi';
        message = `
      <div class="card result-try-again">
        <div class="card-body">
          <h3>🎯 Ayo Coba Lagi!</h3>
          <p>
            Skor kamu <strong>${score}/100</strong>. Tidak apa-apa! Setiap orang belajar dengan kecepatan berbeda. 
            Yang penting adalah kamu tidak menyerah dan terus belajar.
          </p>
          <div class="study-plan">
            <h4>📝 Rencana Belajar:</h4>
            <ol>
              <li><strong>Pelajari materi dari awal</strong> - Mulai dari pengertian, rumus, fungsi</li>
              <li><strong>Catat poin-poin penting</strong> - Buat catatan sendiri untuk membantu mengingat</li>
              <li><strong>Kerjakan latihan bertahap</strong> - Jangan terburu-buru, pahami setiap soal</li>
              <li><strong>Ulangi quiz</strong> - Setelah merasa lebih siap, coba quiz lagi</li>
            </ol>
          </div>
          <div class="alert alert-info mt-lg">
            💡 <strong>Ingat:</strong> Kesalahan adalah bagian dari proses belajar. Terus berlatih!
          </div>
        </div>
      </div>
    `;
    }

    titleElement.textContent = title;
    subtitleElement.textContent = subtitle;
    messageDiv.innerHTML = message;
}

// ====================================
// DISPLAY PROGRESS SUMMARY
// ====================================
function displayProgressSummary() {
    // Get all progress data
    const materialCompleted = localStorage.getItem('materialCompleted') === 'true';
    const practiceScore = parseInt(localStorage.getItem('practiceScore')) || 0;
    const quizScore = parseInt(localStorage.getItem('quizScore')) || 0;

    // Update material status
    const materialStatus = document.getElementById('materialStatus');
    if (materialCompleted) {
        materialStatus.innerHTML = '✅ Selesai dipelajari';
        materialStatus.style.color = 'var(--success-color)';
    } else {
        materialStatus.innerHTML = '⏳ Belum selesai';
        materialStatus.style.color = 'var(--warning-color)';
    }

    // Update practice status
    const practiceStatus = document.getElementById('practiceStatus');
    if (practiceScore > 0) {
        practiceStatus.innerHTML = `✅ Skor: ${practiceScore}/100`;
        practiceStatus.style.color = 'var(--success-color)';
    } else {
        practiceStatus.innerHTML = '⏳ Belum dikerjakan';
        practiceStatus.style.color = 'var(--warning-color)';
    }

    // Quiz status always completed since we're on result page
    const quizStatus = document.getElementById('quizStatus');
    quizStatus.innerHTML = `✅ Skor: ${quizScore}/100`;
    quizStatus.style.color = 'var(--success-color)';

    // Calculate overall progress
    let completedCount = 0;
    const totalTasks = 3;

    if (materialCompleted) completedCount++;
    if (practiceScore > 0) completedCount++;
    if (quizScore > 0) completedCount++;

    const overallProgress = Math.round((completedCount / totalTasks) * 100);

    document.getElementById('overallPercent').textContent = overallProgress + '%';
    document.getElementById('overallProgressBar').style.width = overallProgress + '%';
}

// ====================================
// RETRY QUIZ
// ====================================
function retryQuiz() {
    const confirm = window.confirm('Apakah kamu yakin ingin mengulang quiz? Hasil sebelumnya akan dihapus.');
    if (confirm) {
        localStorage.removeItem('quizResults');
        window.location.href = 'quiz.html';
    }
}

// ====================================
// EXPORT FUNCTIONS
// ====================================
if (typeof window !== 'undefined') {
    window.retryQuiz = retryQuiz;
}
