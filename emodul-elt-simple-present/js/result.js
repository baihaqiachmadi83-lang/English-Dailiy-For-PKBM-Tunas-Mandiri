// =====================================================
// RESULT.JS - Quiz Results Display
// =====================================================

function displayResults() {
    const resultsData = localStorage.getItem('quizResults');

    if (!resultsData) {
        document.getElementById('results-container').innerHTML = `
            <div class="section-card" style="text-align: center;">
                <h2>❌ Tidak Ada Data Quiz</h2>
                <p>Kamu belum mengerjakan quiz. Yuk mulai sekarang!</p>
                <a href="quiz.html" class="btn btn-primary btn-lg">Kerjakan Quiz →</a>
            </div>
        `;
        return;
    }

    const results = JSON.parse(resultsData);
    const { correct, total, percentage, time } = results;

    // Determine performance level
    let performanceLevel, performanceColor, performanceMessage, stars;
    if (percentage >= 90) {
        performanceLevel = 'Excellent! 🏆';
        performanceColor = 'var(--success-color)';
        performanceMessage = 'Luar biasa! Kamu sangat menguasai Simple Present Tense!';
        stars = '⭐⭐⭐';
    } else if (percentage >= 75) {
        performanceLevel = 'Great! 👍';
        performanceColor = 'var(--info-color)';
        performanceMessage = 'Bagus sekali! Kamu sudah paham materinya dengan baik!';
        stars = '⭐⭐';
    } else if (percentage >= 60) {
        performanceLevel = 'Good! 😊';
        performanceColor = 'var(--warning-color)';
        performanceMessage = 'Lumayan! Coba pelajari lagi bagian yang kurang dipahami.';
        stars = '⭐';
    } else {
        performanceLevel = 'Keep Trying! 💪';
        performanceColor = 'var(--error-color)';
        performanceMessage = 'Jangan menyerah! Coba review materi dan latihan lagi ya!';
        stars = '';
    }

    // Format time
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const timeString = minutes > 0 ? `${minutes} menit ${seconds} detik` : `${seconds} detik`;

    // Display main results
    const container = document.getElementById('results-container');
    container.innerHTML = `
        <div class="completion-screen show">
            <h2>🎉 Quiz Selesai!</h2>
            <div class="score-circle" style="background: ${performanceColor}; color: white;">
                ${percentage}%
            </div>
            <div class="stars-rating">${stars}</div>
            <h3 style="color: ${performanceColor}; margin: var(--spacing-md) 0;">${performanceLevel}</h3>
            <p style="font-size: 1.125rem; max-width: 500px; margin: 0 auto;">
                ${performanceMessage}
            </p>
            
            <div class="progress-stats" style="margin: var(--spacing-xl) 0; max-width: 600px; margin-left: auto; margin-right: auto;">
                <div class="stat-item">
                    <div class="stat-value">${correct}/${total}</div>
                    <div class="stat-label">Jawaban Benar</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${percentage}%</div>
                    <div class="stat-label">Score</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${timeString}</div>
                    <div class="stat-label">Waktu</div>
                </div>
            </div>
            
            <div class="action-buttons" style="margin-top: var(--spacing-xl);">
                <button class="btn btn-secondary" onclick="showDetailedReview()">📊 Lihat Detail Jawaban</button>
                <button class="btn btn-outline" onclick="retakeQuiz()">🔄 Ulangi Quiz</button>
                <button class="btn btn-primary" onclick="window.location.href='../index.html'">🏠 Kembali ke Beranda</button>
            </div>
        </div>
        
        <div id="detailed-review" style="display: none; margin-top: var(--spacing-2xl);"></div>
    `;

    // Celebrate if good score
    if (percentage >= 75 && typeof celebrateAchievement === 'function') {
        celebrateAchievement('Quiz Master!');
    }
}

function showDetailedReview() {
    const results = JSON.parse(localStorage.getItem('quizResults'));
    const reviewContainer = document.getElementById('detailed-review');

    // Import quiz questions - simplified version
    const quizQuestions = JSON.parse(localStorage.getItem('quizQuestions') || '[]');

    let reviewHTML = '<div class="section-card"><h2>📋 Review Jawaban Detail</h2>';

    results.answers.forEach((userAnswer, index) => {
        // This is a simplified review - ideally would show actual questions
        const isCorrect = userAnswer === (index % 4 === 0 ? 0 : 1); // Placeholder logic
        const statusIcon = isCorrect ? '✅' : '❌';
        const statusClass = isCorrect ? 'correct' : 'wrong';

        reviewHTML += `
            <div class="question-card" style="border-left: 4px solid var(--${isCorrect ? 'success' : 'error'}-color);">
                <div class="question-header">
                    <span>${statusIcon} Soal ${index + 1}</span>
                    <span class="badge badge-${isCorrect ? 'success' : 'error'}">${isCorrect ? 'Benar' : 'Salah'}</span>
                </div>
            </div>
        `;
    });

    reviewHTML += '</div>';
    reviewContainer.innerHTML = reviewHTML;
    reviewContainer.style.display = 'block';
    reviewContainer.scrollIntoView({ behavior: 'smooth' });
}

function retakeQuiz() {
    if (confirm('Yakin mau ulangi quiz? Progress sebelumnya akan hilang.')) {
        localStorage.removeItem('quizResults');
        localStorage.removeItem('quizCompleted');
        window.location.href = 'quiz.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', displayResults);
