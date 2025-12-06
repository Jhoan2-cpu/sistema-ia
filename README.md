# Sistema IA de Comunicación

Sistema de herramientas de inteligencia artificial para mejorar habilidades de comunicación, powered by Gemini AI.

## Características

Este sistema incluye 6 herramientas principales:

### 1. Generador de Quiz
- Crea cuestionarios personalizados con diferentes tipos de preguntas
- Soporta preguntas de opción múltiple, respuesta abierta y verdadero/falso
- Configurable de 1 a 20 preguntas
- Exportación en PDF y TXT

### 2. Generador de Resúmenes
- Crea resúmenes efectivos de textos largos
- Tipos: Académico, Ejecutivo y Simple
- Exportación en PDF y Word
- Mínimo 100 caracteres de texto

### 3. Generador de Informes
- Genera informes detallados y personalizados
- Tipos: Análisis Textual, Comparativo y Crítico
- Formato académico profesional
- Exportación disponible

### 4. Sistema de Retroalimentación
- Recibe comentarios constructivos sobre tus respuestas
- Evaluaciones detalladas con puntuación
- Sugerencias de mejora personalizadas
- Análisis de fortalezas y áreas de mejora

### 5. Recomendaciones
- Recursos personalizados según tu nivel
- Ejercicios prácticos específicos
- Estrategias de aprendizaje
- Objetivos de corto plazo

### 6. Evaluación de Quiz
- Completa cuestionarios interactivos
- Evaluaciones automáticas con puntajes detallados
- Feedback por pregunta
- Nivel de desempeño

## Tecnologías

- **Backend:** Flask (Python)
- **IA:** Google Gemini AI
- **Frontend:** HTML5, CSS3, JavaScript
- **Deployment:** Render

## Instalación Local

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd sistema-ia
```

2. Crea un entorno virtual:
```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
```

3. Instala las dependencias:
```bash
pip install -r requirements.txt
```

4. Configura las variables de entorno:
```bash
cp .env.example .env
```

Edita `.env` y agrega tu API key de Gemini:
```
GEMINI_API_KEY=tu_api_key_aqui
PORT=5000
```

5. Ejecuta la aplicación:
```bash
python app.py
```

La aplicación estará disponible en `http://localhost:5000`

## Despliegue en Render

### Opción 1: Usando render.yaml (Blueprint)

1. Haz push de tu código a GitHub
2. Ve a [Render Dashboard](https://dashboard.render.com/)
3. Click en "New" → "Blueprint"
4. Conecta tu repositorio
5. Render detectará automáticamente el archivo `render.yaml`
6. Configura la variable de entorno `GEMINI_API_KEY` en el dashboard
7. Click en "Apply" para desplegar

### Opción 2: Despliegue Manual

1. Haz push de tu código a GitHub
2. Ve a [Render Dashboard](https://dashboard.render.com/)
3. Click en "New" → "Web Service"
4. Conecta tu repositorio
5. Configura:
   - **Name:** sistema-ia-comunicacion
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
   - **Plan:** Free
6. Agrega la variable de entorno:
   - **Key:** GEMINI_API_KEY
   - **Value:** tu_api_key_de_gemini
7. Click en "Create Web Service"

## Obtener API Key de Gemini

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Click en "Create API Key"
4. Copia la API key y úsala en tu archivo `.env` o en las variables de entorno de Render

## Estructura del Proyecto

```
sistema-ia/
├── app.py                 # Aplicación Flask principal
├── requirements.txt       # Dependencias Python
├── runtime.txt           # Versión de Python
├── Procfile              # Comando de inicio para Render
├── render.yaml           # Configuración de Blueprint
├── .env.example          # Ejemplo de variables de entorno
├── .gitignore           # Archivos ignorados por Git
├── README.md            # Este archivo
└── static/              # Archivos frontend
    ├── index.html       # Página principal
    ├── styles.css       # Estilos
    └── script.js        # Lógica JavaScript
```

## API Endpoints

- `POST /api/generate-quiz` - Genera un quiz personalizado
- `POST /api/generate-summary` - Genera un resumen de texto
- `POST /api/generate-report` - Genera un informe detallado
- `POST /api/feedback` - Proporciona retroalimentación
- `POST /api/recommendations` - Genera recomendaciones personalizadas
- `POST /api/evaluate-quiz` - Evalúa un quiz completado

## Uso

1. Abre la aplicación en tu navegador
2. Selecciona una de las 6 herramientas disponibles
3. Completa el formulario según la herramienta
4. Click en el botón para generar el resultado
5. Descarga el resultado en PDF o TXT si está disponible

## Características Técnicas

- Interfaz responsive y moderna
- Integración completa con Gemini AI
- Soporte para múltiples tipos de análisis
- Exportación de resultados
- Sistema de retroalimentación inteligente
- Recomendaciones personalizadas

## Troubleshooting

### Error: API Key no configurada
- Asegúrate de haber configurado `GEMINI_API_KEY` en tu archivo `.env` o en las variables de entorno de Render

### Error: Módulo no encontrado
- Ejecuta `pip install -r requirements.txt` para instalar todas las dependencias

### La aplicación no inicia en Render
- Verifica que el comando de inicio sea `gunicorn app:app`
- Revisa los logs en el dashboard de Render

## Licencia

Este proyecto está desarrollado como herramienta educativa.

## Autor

Sistema IA de Comunicación - Powered by Gemini AI

## Soporte

Para reportar problemas o sugerencias, crea un issue en el repositorio.
