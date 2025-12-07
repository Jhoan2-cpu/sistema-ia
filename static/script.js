// API Base URL
const API_BASE = window.location.origin;

// Modal Management
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Update quiz question count
function updateQuizCount(value) {
    document.getElementById('quizQuestionCount').textContent = value;
}

// Update character count for summary
document.getElementById('summaryText')?.addEventListener('input', function() {
    document.getElementById('summaryCharCount').textContent = this.value.length;
});

// Generador de Quiz
async function generateQuiz() {
    const topic = document.getElementById('quizTopic').value;
    const numQuestions = document.getElementById('quizQuestions').value;
    const btn = document.getElementById('generateQuizBtn');
    const resultDiv = document.getElementById('quizResult');

    if (!topic.trim()) {
        alert('Por favor ingresa un tema para el quiz');
        return;
    }

    btn.disabled = true;
    btn.classList.add('loading');
    btn.innerHTML = '<span class="btn-icon">⏳</span> Generando...';

    try {
        const response = await fetch(`${API_BASE}/api/generate-quiz`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic, num_questions: parseInt(numQuestions) })
        });

        const data = await response.json();

        if (data.success) {
            displayQuizResult(data.quiz, data.formatted_text);
            resultDiv.style.display = 'block';
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error al generar el quiz: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.classList.remove('loading');
        btn.innerHTML = '<span class="btn-icon">✨</span> Generar Quiz';
    }
}

function displayQuizResult(quiz, formattedText) {
    const resultDiv = document.getElementById('quizResult');

    resultDiv.innerHTML = `
        <div class="result-header">
            <h3>Quiz Generado</h3>
            <div class="download-buttons">
                <button class="btn-download" onclick="downloadQuiz('pdf')">📥 PDF</button>
                <button class="btn-download" onclick="downloadQuiz('txt')">📥 TXT</button>
            </div>
        </div>
        <div class="result-content">
            ${formatMarkdown(formattedText)}
        </div>
    `;

    // Store quiz data for download
    window.currentQuiz = { quiz, formattedText };
}

function downloadQuiz(format) {
    const data = window.currentQuiz;
    if (!data) return;

    const content = data.formattedText;
    const fileName = `quiz_${data.quiz.topic}_${new Date().toISOString().split('T')[0]}`;

    if (format === 'pdf') {
        generatePDF(content, fileName);
    } else {
        // Download as TXT
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Generador de Resúmenes
async function generateSummary() {
    const text = document.getElementById('summaryText').value;
    const summaryType = document.getElementById('summaryType').value;
    const btn = document.getElementById('generateSummaryBtn');
    const resultDiv = document.getElementById('summaryResult');

    if (text.length < 100) {
        alert('El texto debe tener al menos 100 caracteres');
        return;
    }

    btn.disabled = true;
    btn.classList.add('loading');
    btn.innerHTML = '<span class="btn-icon">⏳</span> Generando...';

    try {
        const response = await fetch(`${API_BASE}/api/generate-summary`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, summary_type: summaryType })
        });

        const data = await response.json();

        if (data.success) {
            displaySummaryResult(data);
            resultDiv.style.display = 'block';
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error al generar el resumen: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.classList.remove('loading');
        btn.innerHTML = '<span class="btn-icon">📄</span> Generar Resumen';
    }
}

function displaySummaryResult(data) {
    const resultDiv = document.getElementById('summaryResult');

    resultDiv.innerHTML = `
        <div class="result-header">
            <h3>Resumen Generado</h3>
            <div class="download-buttons">
                <button class="btn-download" onclick="downloadSummary('pdf')">📥 PDF</button>
                <button class="btn-download" onclick="downloadSummary('txt')">📥 TXT</button>
            </div>
        </div>
        <div class="result-content">
            ${formatMarkdown(data.summary)}
        </div>
        <div style="margin-top: 1rem; color: var(--text-light); font-size: 0.9rem;">
            <strong>Texto original:</strong> ${data.original_length} caracteres |
            <strong>Resumen:</strong> ${data.summary_length} caracteres
        </div>
    `;

    window.currentSummary = data.summary;
}

function downloadSummary(format) {
    if (!window.currentSummary) return;

    const fileName = `resumen_${new Date().toISOString().split('T')[0]}`;

    if (format === 'pdf') {
        generatePDF(window.currentSummary, fileName);
    } else {
        const blob = new Blob([window.currentSummary], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Generador de Informes
async function generateReport() {
    const topic = document.getElementById('reportTopic').value;
    const reportType = document.getElementById('reportType').value;
    const description = document.getElementById('reportDescription').value;
    const dataSources = document.getElementById('reportData').value;
    const btn = document.getElementById('generateReportBtn');
    const resultDiv = document.getElementById('reportResult');

    if (!topic.trim() || !description.trim()) {
        alert('Por favor completa el tema y la descripción del informe');
        return;
    }

    btn.disabled = true;
    btn.classList.add('loading');
    btn.innerHTML = '<span class="btn-icon">⏳</span> Generando...';

    try {
        const response = await fetch(`${API_BASE}/api/generate-report`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic, report_type: reportType, description, data_sources: dataSources })
        });

        const data = await response.json();

        if (data.success) {
            displayReportResult(data);
            resultDiv.style.display = 'block';
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error al generar el informe: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.classList.remove('loading');
        btn.innerHTML = '<span class="btn-icon">📊</span> Generar Informe';
    }
}

function displayReportResult(data) {
    const resultDiv = document.getElementById('reportResult');

    resultDiv.innerHTML = `
        <div class="result-header">
            <h3>Informe Generado</h3>
            <div class="download-buttons">
                <button class="btn-download" onclick="downloadReport('pdf')">📥 PDF</button>
                <button class="btn-download" onclick="downloadReport('txt')">📥 TXT</button>
            </div>
        </div>
        <div class="result-content">
            ${formatMarkdown(data.report)}
        </div>
    `;

    window.currentReport = data.report;
}

function downloadReport(format) {
    if (!window.currentReport) return;

    const fileName = `informe_${new Date().toISOString().split('T')[0]}`;

    if (format === 'pdf') {
        generatePDF(window.currentReport, fileName);
    } else {
        const blob = new Blob([window.currentReport], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Sistema de Retroalimentación
let feedbackQuestionCount = 1;

function addFeedbackQuestion() {
    feedbackQuestionCount++;
    const container = document.getElementById('feedbackAnswers');

    const itemDiv = document.createElement('div');
    itemDiv.className = 'feedback-item-container';
    itemDiv.innerHTML = `
        <div class="form-group">
            <label>Pregunta</label>
            <textarea class="feedback-question" rows="2" placeholder="Ingresa la pregunta que fue respondida..."></textarea>
        </div>
        <div class="form-group">
            <label>Respuesta del Estudiante</label>
            <textarea class="feedback-answer" rows="3" placeholder="Ingresa la respuesta que necesita ser evaluada..."></textarea>
        </div>
    `;

    container.appendChild(itemDiv);
}

async function generateFeedback() {
    const containers = document.querySelectorAll('.feedback-item-container');
    const answers = [];

    containers.forEach((container, index) => {
        const questionEl = container.querySelector('.feedback-question');
        const answerEl = container.querySelector('.feedback-answer');

        const question = questionEl ? questionEl.value.trim() : '';
        const answer = answerEl ? answerEl.value.trim() : '';

        if (question && answer) {
            answers.push({
                question_number: index + 1,
                question: question,
                answer: answer
            });
        }
    });

    if (answers.length === 0) {
        alert('Por favor ingresa al menos una pregunta y su respuesta');
        return;
    }

    const btn = document.getElementById('generateFeedbackBtn');
    const resultDiv = document.getElementById('feedbackResult');

    btn.disabled = true;
    btn.classList.add('loading');
    btn.innerHTML = '<span class="btn-icon">⏳</span> Generando...';

    try {
        const response = await fetch(`${API_BASE}/api/feedback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers })
        });

        const data = await response.json();

        if (data.success) {
            displayFeedbackResult(data.feedback);
            resultDiv.style.display = 'block';
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error al generar retroalimentación: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.classList.remove('loading');
        btn.innerHTML = '<span class="btn-icon">💬</span> Obtener Retroalimentación';
    }
}

function displayFeedbackResult(feedback) {
    const resultDiv = document.getElementById('feedbackResult');

    let html = '<div class="result-header"><h3>Retroalimentación Detallada</h3></div>';

    // Individual feedback
    feedback.individual_feedback?.forEach(item => {
        const scoreClass = item.score >= 80 ? 'excellent' : item.score >= 60 ? 'good' : 'needs-improvement';
        html += `
            <div class="feedback-item">
                <div class="feedback-score ${scoreClass}">Pregunta ${item.question_number}: ${item.score}/100</div>
                <p><strong>Evaluación:</strong> ${item.evaluation}</p>
                <p><strong>Comentarios:</strong> ${item.comments}</p>
                <p><strong>Sugerencias:</strong> ${item.suggestions}</p>
            </div>
        `;
    });

    // Overall feedback
    if (feedback.overall) {
        const overall = feedback.overall;
        html += `
            <div class="feedback-item" style="border-left: 4px solid var(--success-color); margin-top: 1.5rem;">
                <h4>Resumen General</h4>
                <div class="feedback-score excellent">Puntuación Total: ${overall.total_score}/100</div>
                <p><strong>Fortalezas:</strong></p>
                <ul>
                    ${overall.strengths?.map(s => `<li>${s}</li>`).join('') || ''}
                </ul>
                <p><strong>Áreas de mejora:</strong></p>
                <ul>
                    ${overall.areas_to_improve?.map(a => `<li>${a}</li>`).join('') || ''}
                </ul>
                <p><strong>Recomendaciones:</strong></p>
                <ul>
                    ${overall.recommendations?.map(r => `<li>${r}</li>`).join('') || ''}
                </ul>
            </div>
        `;
    }

    resultDiv.innerHTML = html;
}

// Recomendaciones
async function generateRecommendations() {
    const level = document.getElementById('userLevel').value;
    const difficulties = document.getElementById('userDifficulties').value;
    const interests = document.getElementById('userInterests').value;
    const btn = document.getElementById('generateRecommendationsBtn');
    const resultDiv = document.getElementById('recommendationsResult');

    if (!difficulties.trim()) {
        alert('Por favor describe tus dificultades');
        return;
    }

    btn.disabled = true;
    btn.classList.add('loading');
    btn.innerHTML = '<span class="btn-icon">⏳</span> Generando...';

    try {
        const response = await fetch(`${API_BASE}/api/recommendations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ level, difficulties, interests })
        });

        const data = await response.json();

        if (data.success) {
            displayRecommendationsResult(data.recommendations);
            resultDiv.style.display = 'block';
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error al generar recomendaciones: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.classList.remove('loading');
        btn.innerHTML = '<span class="btn-icon">💡</span> Obtener Recomendaciones';
    }
}

function displayRecommendationsResult(recommendations) {
    const resultDiv = document.getElementById('recommendationsResult');

    let html = '<div class="result-header"><h3>Recomendaciones Personalizadas</h3></div>';

    // Resources
    if (recommendations.resources?.length > 0) {
        html += '<div class="recommendation-section"><h4>📚 Recursos Recomendados</h4>';
        recommendations.resources.forEach(resource => {
            html += `
                <div class="resource-item">
                    <span class="resource-type">${resource.type}</span>
                    <h5>${resource.title}</h5>
                    <p>${resource.description}</p>
                    <p><strong>Relevancia:</strong> ${resource.relevance}</p>
                </div>
            `;
        });
        html += '</div>';
    }

    // Exercises
    if (recommendations.exercises?.length > 0) {
        html += '<div class="recommendation-section"><h4>✏️ Ejercicios Prácticos</h4>';
        recommendations.exercises.forEach(exercise => {
            html += `
                <div class="exercise-item">
                    <h5>${exercise.title}</h5>
                    <p>${exercise.description}</p>
                    <p><strong>Dificultad:</strong> ${exercise.difficulty} | <strong>Tiempo estimado:</strong> ${exercise.estimated_time}</p>
                </div>
            `;
        });
        html += '</div>';
    }

    // Strategies
    if (recommendations.strategies?.length > 0) {
        html += '<div class="recommendation-section"><h4>💡 Estrategias de Aprendizaje</h4><ul>';
        recommendations.strategies.forEach(strategy => {
            html += `<li>${strategy}</li>`;
        });
        html += '</ul></div>';
    }

    // Topics to reinforce
    if (recommendations.topics_to_reinforce?.length > 0) {
        html += '<div class="recommendation-section"><h4>🎯 Temas a Reforzar</h4><ul>';
        recommendations.topics_to_reinforce.forEach(topic => {
            html += `<li>${topic}</li>`;
        });
        html += '</ul></div>';
    }

    // Short term goals
    if (recommendations.short_term_goals?.length > 0) {
        html += '<div class="recommendation-section"><h4>🚀 Objetivos de Corto Plazo</h4><ul>';
        recommendations.short_term_goals.forEach(goal => {
            html += `<li>${goal}</li>`;
        });
        html += '</ul></div>';
    }

    resultDiv.innerHTML = html;
}

// Evaluación de Quiz
async function evaluateQuiz() {
    const quiz = {
        topic: "Comunicación",
        questions: [
            {
                number: 1,
                type: "multiple_choice",
                question: "¿Cuál es la idea principal del siguiente párrafo?",
                correct_answer: "B"
            },
            {
                number: 2,
                type: "open_ended",
                question: "Escribe un párrafo explicando la importancia de la retroalimentación en el proceso comunicativo."
            },
            {
                number: 3,
                type: "true_false",
                question: "Verdadero o Falso: La comunicación no verbal representa más del 50% del mensaje total.",
                correct_answer: "true"
            }
        ]
    };

    const userAnswers = [];

    // Get Q1 answer
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    if (q1Answer) {
        userAnswers.push({ question_number: 1, answer: q1Answer.value });
    }

    // Get Q2 answer
    const q2Answer = document.querySelectorAll('.eval-answer')[0]?.value;
    if (q2Answer?.trim()) {
        userAnswers.push({ question_number: 2, answer: q2Answer.trim() });
    }

    // Get Q3 answer
    const q3Answer = document.querySelector('input[name="q3"]:checked');
    if (q3Answer) {
        userAnswers.push({ question_number: 3, answer: q3Answer.value });
    }

    if (userAnswers.length === 0) {
        alert('Por favor responde al menos una pregunta');
        return;
    }

    const btn = document.getElementById('evaluateQuizBtn');
    const resultDiv = document.getElementById('evaluationResult');

    btn.disabled = true;
    btn.classList.add('loading');
    btn.innerHTML = '<span class="btn-icon">⏳</span> Evaluando...';

    try {
        const response = await fetch(`${API_BASE}/api/evaluate-quiz`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quiz, user_answers: userAnswers })
        });

        const data = await response.json();

        if (data.success) {
            displayEvaluationResult(data.evaluation);
            resultDiv.style.display = 'block';
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error al evaluar el quiz: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.classList.remove('loading');
        btn.innerHTML = '<span class="btn-icon">📋</span> Evaluar Quiz';
    }
}

function displayEvaluationResult(evaluation) {
    const resultDiv = document.getElementById('evaluationResult');

    let html = '<div class="result-header"><h3>Resultados de la Evaluación</h3></div>';

    // Summary
    if (evaluation.summary) {
        const summary = evaluation.summary;
        const scoreClass = summary.total_score >= 80 ? 'excellent' : summary.total_score >= 60 ? 'good' : 'needs-improvement';

        html += `
            <div class="feedback-item" style="border-left: 4px solid var(--success-color);">
                <div class="feedback-score ${scoreClass}">Puntuación Total: ${summary.total_score}/100</div>
                <p><strong>Respuestas correctas:</strong> ${summary.correct_count} de ${summary.total_questions}</p>
                <p><strong>Nivel de desempeño:</strong> ${summary.performance_level}</p>
                <p><strong>Comentario general:</strong> ${summary.general_feedback}</p>
            </div>
        `;
    }

    // Individual evaluations
    if (evaluation.evaluations?.length > 0) {
        html += '<h4 style="margin-top: 1.5rem;">Evaluación por Pregunta</h4>';
        evaluation.evaluations.forEach(item => {
            const scoreClass = item.score >= 80 ? 'excellent' : item.score >= 60 ? 'good' : 'needs-improvement';
            const statusIcon = item.correct ? '✓' : '✗';

            html += `
                <div class="feedback-item">
                    <div class="feedback-score ${scoreClass}">${statusIcon} Pregunta ${item.question_number}: ${item.score}/100</div>
                    <p><strong>Feedback:</strong> ${item.feedback}</p>
                    ${!item.correct ? `<p><strong>Respuesta correcta:</strong> ${item.correct_answer}</p>` : ''}
                </div>
            `;
        });
    }

    resultDiv.innerHTML = html;
}

// Markdown formatter
function formatMarkdown(text) {
    // Simple markdown to HTML conversion
    let html = text;

    // Headers
    html = html.replace(/### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/## (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/# (.*$)/gim, '<h3>$1</h3>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Line breaks
    html = html.replace(/\n\n/gim, '</p><p>');
    html = html.replace(/\n/gim, '<br>');

    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');

    // Wrap in paragraph
    if (!html.startsWith('<')) {
        html = '<p>' + html + '</p>';
    }

    return html;
}

// Generate PDF function
function generatePDF(content, fileName) {
    console.log('generatePDF llamado con:', fileName);

    // Verificar que jsPDF esté disponible
    if (!window.jspdf) {
        console.error('jsPDF no está cargado');
        alert('Error: La biblioteca de PDF no está cargada. Descargando como TXT...');
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        console.log('jsPDF inicializado correctamente');

        // Configuración
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        const maxWidth = pageWidth - (margin * 2);
        let yPosition = margin;

        // Título
        doc.setFontSize(18);
        doc.setFont(undefined, 'bold');
        doc.text('Sistema IA de Comunicación', margin, yPosition);
        yPosition += 10;

        // Fecha
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, margin, yPosition);
        yPosition += 15;

        // Línea separadora
        doc.setLineWidth(0.5);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 10;

        // Contenido - limpiar markdown básico
        let cleanContent = content
            .replace(/\*\*/g, '')  // Remove bold markers
            .replace(/\*/g, '')    // Remove italic markers
            .replace(/###/g, '')   // Remove h3
            .replace(/##/g, '')    // Remove h2
            .replace(/#/g, '');    // Remove h1

        // Split content into lines
        doc.setFontSize(11);
        const lines = doc.splitTextToSize(cleanContent, maxWidth);

        // Add lines to PDF with page break support
        for (let i = 0; i < lines.length; i++) {
            if (yPosition > pageHeight - margin) {
                doc.addPage();
                yPosition = margin;
            }
            doc.text(lines[i], margin, yPosition);
            yPosition += 7;
        }

        // Footer
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(
                `Página ${i} de ${totalPages}`,
                pageWidth / 2,
                pageHeight - 10,
                { align: 'center' }
            );
            doc.text(
                'Powered by Gemini AI',
                pageWidth - margin,
                pageHeight - 10,
                { align: 'right' }
            );
        }

        // Save PDF
        doc.save(`${fileName}.pdf`);
    } catch (error) {
        console.error('Error generando PDF:', error);
        alert('Error al generar PDF. Descargando como TXT en su lugar...');
        // Fallback to TXT
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema IA de Comunicación inicializado - v1.1');
    console.log('jsPDF disponible:', !!window.jspdf);
});
