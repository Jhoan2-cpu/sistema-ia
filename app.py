from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv
import json
import re

load_dotenv()

app = Flask(__name__, static_folder='static')
CORS(app)

# Configure Gemini AI
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-pro')

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

@app.route('/api/generate-quiz', methods=['POST'])
def generate_quiz():
    """Genera un cuestionario personalizado con diferentes tipos de preguntas"""
    try:
        data = request.json
        topic = data.get('topic', 'Comunicación')
        num_questions = data.get('num_questions', 5)

        prompt = f"""Genera un cuestionario de {num_questions} preguntas sobre "{topic}" enfocado en el área de Comunicación.

Distribuye los tipos de preguntas de la siguiente manera:
- 40% opción múltiple (4 opciones cada una)
- 30% respuesta abierta
- 30% verdadero/falso

Devuelve el resultado en formato JSON con la siguiente estructura:
{{
    "topic": "{topic}",
    "total_questions": {num_questions},
    "questions": [
        {{
            "number": 1,
            "type": "multiple_choice|open_ended|true_false",
            "question": "texto de la pregunta",
            "options": ["opción 1", "opción 2", "opción 3", "opción 4"] (solo para multiple_choice),
            "correct_answer": "respuesta correcta",
            "explanation": "explicación breve"
        }}
    ]
}}

Asegúrate de que las preguntas sean de nivel universitario y relacionadas con la comunicación."""

        response = model.generate_content(prompt)
        result_text = response.text

        # Extract JSON from markdown code blocks if present
        json_match = re.search(r'```(?:json)?\s*(.*?)\s*```', result_text, re.DOTALL)
        if json_match:
            result_text = json_match.group(1)

        quiz_data = json.loads(result_text)

        return jsonify({
            'success': True,
            'quiz': quiz_data,
            'formatted_text': format_quiz_display(quiz_data)
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/generate-summary', methods=['POST'])
def generate_summary():
    """Genera resúmenes efectivos de textos largos"""
    try:
        data = request.json
        text = data.get('text', '')
        summary_type = data.get('summary_type', 'academic')

        if len(text) < 100:
            return jsonify({'success': False, 'error': 'El texto debe tener al menos 100 caracteres'}), 400

        summary_types = {
            'academic': 'académico con estructura formal',
            'executive': 'ejecutivo con puntos clave',
            'simple': 'simple y fácil de entender'
        }

        prompt = f"""Crea un resumen {summary_types.get(summary_type, 'académico')} del siguiente texto:

{text}

El resumen debe:
- Ser claro y conciso
- Mantener las ideas principales
- Usar formato profesional
- Incluir estructura con secciones si es académico
- Ser apropiado para el área de Comunicación

Presenta el resumen en formato markdown con secciones bien definidas."""

        response = model.generate_content(prompt)
        summary = response.text

        return jsonify({
            'success': True,
            'summary': summary,
            'original_length': len(text),
            'summary_length': len(summary)
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/generate-report', methods=['POST'])
def generate_report():
    """Genera informes detallados y personalizados con análisis profesional"""
    try:
        data = request.json
        topic = data.get('topic', '')
        report_type = data.get('report_type', 'textual')
        description = data.get('description', '')
        data_sources = data.get('data_sources', '')

        report_types = {
            'textual': 'Análisis Textual',
            'comparative': 'Análisis Comparativo',
            'critical': 'Análisis Crítico'
        }

        prompt = f"""Genera un informe profesional detallado sobre: {topic}

Tipo de informe: {report_types.get(report_type, 'Análisis Textual')}
Descripción y objetivos: {description}
Datos/Fuentes: {data_sources if data_sources else 'No especificados'}

El informe debe incluir:
1. Introducción: Contexto y objetivos
2. Desarrollo: Análisis detallado con subtemas
3. Conclusiones: Hallazgos principales
4. Referencias (si aplica)

Usa formato académico profesional con:
- Estructura clara en markdown
- Secciones y subsecciones
- Lenguaje formal y técnico apropiado para Comunicación
- Análisis profundo y fundamentado

Genera un informe completo y bien estructurado."""

        response = model.generate_content(prompt)
        report = response.text

        return jsonify({
            'success': True,
            'report': report
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/feedback', methods=['POST'])
def generate_feedback():
    """Recibe respuestas y genera comentarios constructivos y evaluaciones detalladas"""
    try:
        data = request.json
        answers = data.get('answers', [])

        if not answers:
            return jsonify({'success': False, 'error': 'No se proporcionaron respuestas'}), 400

        prompt = f"""Como experto en Comunicación, evalúa las siguientes respuestas y proporciona retroalimentación constructiva:

{json.dumps(answers, indent=2, ensure_ascii=False)}

Para cada respuesta proporciona:
1. Evaluación de la respuesta (correcta, parcialmente correcta, incorrecta)
2. Comentarios constructivos específicos
3. Sugerencias de mejora
4. Puntuación (0-100)

Luego proporciona:
- Puntuación total
- Fortalezas generales
- Áreas de mejora
- Recomendaciones personalizadas

Devuelve el resultado en formato JSON:
{{
    "individual_feedback": [
        {{
            "question_number": 1,
            "evaluation": "correcta|parcial|incorrecta",
            "score": 0-100,
            "comments": "comentarios específicos",
            "suggestions": "sugerencias"
        }}
    ],
    "overall": {{
        "total_score": 0-100,
        "strengths": ["fortaleza 1", "fortaleza 2"],
        "areas_to_improve": ["área 1", "área 2"],
        "recommendations": ["recomendación 1", "recomendación 2"]
    }}
}}"""

        response = model.generate_content(prompt)
        result_text = response.text

        # Extract JSON from markdown code blocks if present
        json_match = re.search(r'```(?:json)?\s*(.*?)\s*```', result_text, re.DOTALL)
        if json_match:
            result_text = json_match.group(1)

        feedback_data = json.loads(result_text)

        return jsonify({
            'success': True,
            'feedback': feedback_data
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/recommendations', methods=['POST'])
def generate_recommendations():
    """Obtén recursos personalizados según tu nivel y dificultades específicas"""
    try:
        data = request.json
        level = data.get('level', 'intermediate')
        difficulties = data.get('difficulties', '')
        interests = data.get('interests', '')

        levels = {
            'beginner': 'principiante',
            'intermediate': 'intermedio',
            'advanced': 'avanzado'
        }

        prompt = f"""Como asistente educativo en Comunicación, genera recomendaciones personalizadas:

Nivel del estudiante: {levels.get(level, 'intermedio')}
Dificultades específicas: {difficulties}
Intereses: {interests}

Proporciona recomendaciones en las siguientes categorías:
1. Recursos de estudio (libros, artículos, videos)
2. Ejercicios prácticos específicos
3. Estrategias de aprendizaje
4. Temas a reforzar
5. Objetivos de corto plazo

Devuelve el resultado en formato JSON:
{{
    "resources": [
        {{
            "type": "libro|artículo|video|curso",
            "title": "título",
            "description": "descripción breve",
            "relevance": "por qué es relevante"
        }}
    ],
    "exercises": [
        {{
            "title": "título del ejercicio",
            "description": "descripción",
            "difficulty": "fácil|medio|difícil",
            "estimated_time": "tiempo estimado"
        }}
    ],
    "strategies": ["estrategia 1", "estrategia 2"],
    "topics_to_reinforce": ["tema 1", "tema 2"],
    "short_term_goals": ["objetivo 1", "objetivo 2"]
}}"""

        response = model.generate_content(prompt)
        result_text = response.text

        # Extract JSON from markdown code blocks if present
        json_match = re.search(r'```(?:json)?\s*(.*?)\s*```', result_text, re.DOTALL)
        if json_match:
            result_text = json_match.group(1)

        recommendations_data = json.loads(result_text)

        return jsonify({
            'success': True,
            'recommendations': recommendations_data
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/evaluate-quiz', methods=['POST'])
def evaluate_quiz():
    """Evalúa un quiz completado y proporciona puntuación detallada"""
    try:
        data = request.json
        quiz = data.get('quiz', {})
        user_answers = data.get('user_answers', [])

        if not quiz or not user_answers:
            return jsonify({'success': False, 'error': 'Datos incompletos'}), 400

        prompt = f"""Evalúa las siguientes respuestas del quiz sobre "{quiz.get('topic', 'Comunicación')}":

PREGUNTAS Y RESPUESTAS CORRECTAS:
{json.dumps(quiz.get('questions', []), indent=2, ensure_ascii=False)}

RESPUESTAS DEL USUARIO:
{json.dumps(user_answers, indent=2, ensure_ascii=False)}

Evalúa cada respuesta y proporciona:
1. Puntuación por pregunta
2. Feedback específico
3. Puntuación total
4. Nivel de desempeño

Devuelve el resultado en formato JSON:
{{
    "evaluations": [
        {{
            "question_number": 1,
            "correct": true|false,
            "score": 0-100,
            "feedback": "feedback específico",
            "correct_answer": "respuesta correcta"
        }}
    ],
    "summary": {{
        "total_score": 0-100,
        "correct_count": 0,
        "total_questions": 0,
        "performance_level": "excelente|bueno|regular|necesita mejorar",
        "general_feedback": "comentarios generales"
    }}
}}"""

        response = model.generate_content(prompt)
        result_text = response.text

        # Extract JSON from markdown code blocks if present
        json_match = re.search(r'```(?:json)?\s*(.*?)\s*```', result_text, re.DOTALL)
        if json_match:
            result_text = json_match.group(1)

        evaluation_data = json.loads(result_text)

        return jsonify({
            'success': True,
            'evaluation': evaluation_data
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def format_quiz_display(quiz_data):
    """Formatea el quiz para mostrar en la interfaz"""
    formatted = f"**Cuestionario de {quiz_data.get('topic', 'Comunicación')}**\n\n"
    formatted += f"**Nota sobre la distribución de preguntas:**\n"
    formatted += f"Con un total de {quiz_data.get('total_questions', 0)} preguntas, se ha distribuido:\n"

    questions = quiz_data.get('questions', [])
    mc_count = sum(1 for q in questions if q.get('type') == 'multiple_choice')
    oe_count = sum(1 for q in questions if q.get('type') == 'open_ended')
    tf_count = sum(1 for q in questions if q.get('type') == 'true_false')

    formatted += f"- {mc_count} preguntas de Opción Múltiple\n"
    formatted += f"- {oe_count} preguntas de Respuesta Abierta\n"
    formatted += f"- {tf_count} preguntas de Verdadero/Falso\n\n"
    formatted += "---\n\n"

    for q in questions:
        formatted += f"**Pregunta {q.get('number')}** - "
        if q.get('type') == 'multiple_choice':
            formatted += "Opción Múltiple\n\n"
        elif q.get('type') == 'open_ended':
            formatted += "Respuesta Abierta\n\n"
        else:
            formatted += "Verdadero/Falso\n\n"

        formatted += f"{q.get('question', '')}\n\n"

        if q.get('options'):
            for i, option in enumerate(q.get('options', [])):
                formatted += f"{chr(65+i)}. {option}\n"
            formatted += "\n"

        formatted += "---\n\n"

    return formatted

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
