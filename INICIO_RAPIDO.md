# 🚀 Inicio Rápido - Sistema IA de Comunicación

## ¿Qué es este proyecto?

Un sistema completo de herramientas de inteligencia artificial para mejorar habilidades de comunicación, con 6 módulos principales:

1. **Generador de Quiz** - Crea cuestionarios personalizados
2. **Generador de Resúmenes** - Resume textos largos automáticamente
3. **Generador de Informes** - Genera informes académicos detallados
4. **Sistema de Retroalimentación** - Evalúa respuestas con comentarios constructivos
5. **Recomendaciones** - Proporciona recursos personalizados de aprendizaje
6. **Evaluación de Quiz** - Califica quizzes con feedback detallado

## 📋 Requisitos Previos

- Python 3.11+
- Cuenta de Google (para API de Gemini)
- Cuenta de GitHub (para despliegue)
- Cuenta de Render (gratuita)

## ⚡ Instalación Rápida (Local)

```bash
# 1. Navega al proyecto
cd c:\Users\anton\Desktop\Projects\sistema-ia

# 2. Crea entorno virtual
python -m venv venv
venv\Scripts\activate

# 3. Instala dependencias
pip install -r requirements.txt

# 4. Configura tu API key
# Edita el archivo .env y agrega tu GEMINI_API_KEY

# 5. Ejecuta
python app.py

# 6. Abre en navegador
# http://localhost:5000
```

## 🔑 Obtener API Key de Gemini (2 minutos)

1. Ve a: https://makersuite.google.com/app/apikey
2. Inicia sesión con Google
3. Click en "Create API Key"
4. Copia la key
5. Pégala en el archivo `.env`:
   ```
   GEMINI_API_KEY=tu_key_aqui
   ```

## 🌐 Despliegue en Render (5 minutos)

### Opción Rápida:

```bash
# 1. Sube a GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/sistema-ia.git
git push -u origin main

# 2. Ve a Render
# https://dashboard.render.com/

# 3. New → Blueprint
# Conecta tu repo de GitHub

# 4. Agrega variable de entorno
# GEMINI_API_KEY = tu_api_key

# 5. Click "Apply"
# ¡Listo! Tu app estará en: https://tu-app.onrender.com
```

## 📁 Estructura del Proyecto

```
sistema-ia/
├── app.py                    # Backend Flask + API endpoints
├── requirements.txt          # Dependencias Python
├── render.yaml              # Config para Render
├── Procfile                 # Comando de inicio
├── .env                     # Variables de entorno (LOCAL)
├── README.md                # Documentación completa
├── DEPLOYMENT.md            # Guía detallada de despliegue
├── TEST_LOCAL.md            # Guía de pruebas locales
└── static/
    ├── index.html           # UI principal
    ├── styles.css           # Estilos modernos
    └── script.js            # Lógica frontend
```

## 🎯 Endpoints de API

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/generate-quiz` | POST | Genera quiz personalizado |
| `/api/generate-summary` | POST | Crea resumen de texto |
| `/api/generate-report` | POST | Genera informe académico |
| `/api/feedback` | POST | Proporciona retroalimentación |
| `/api/recommendations` | POST | Genera recomendaciones |
| `/api/evaluate-quiz` | POST | Evalúa quiz completado |

## 🧪 Prueba Rápida

Una vez ejecutando localmente, prueba cada herramienta:

1. **Quiz**: Tema "Comunicación", 5 preguntas
2. **Resumen**: Pega un texto largo y genera resumen
3. **Informe**: Tema "Análisis literario"
4. **Feedback**: Responde las preguntas de ejemplo
5. **Recomendaciones**: Describe tus dificultades
6. **Evaluación**: Completa el quiz de ejemplo

## 🛠️ Tecnologías Utilizadas

- **Backend**: Flask (Python)
- **IA**: Google Gemini AI (gemini-pro)
- **Frontend**: HTML5 + CSS3 + JavaScript
- **Deployment**: Render (Web Service)
- **Version Control**: Git + GitHub

## 📚 Documentación Adicional

- [README.md](README.md) - Documentación completa del proyecto
- [DEPLOYMENT.md](DEPLOYMENT.md) - Guía paso a paso de despliegue
- [TEST_LOCAL.md](TEST_LOCAL.md) - Cómo probar localmente

## ⚠️ Importante

1. **NO subas tu `.env` a GitHub** (ya está en `.gitignore`)
2. Usa variables de entorno en Render para la API key
3. El plan free de Render se duerme después de 15 min sin uso
4. La API de Gemini tiene límites en el plan gratuito

## 🐛 Problemas Comunes

| Problema | Solución |
|----------|----------|
| Error: Module not found | `pip install -r requirements.txt` |
| API key not configured | Verifica `.env` o variables de Render |
| Port already in use | Cambia `PORT` en `.env` |
| App no carga en Render | Revisa logs en dashboard de Render |

## 🎨 Características del UI

- ✨ Diseño moderno y responsive
- 🎨 Gradientes y animaciones suaves
- 📱 Compatible con móviles
- 🌙 Interfaz limpia y profesional
- 💾 Exportación de resultados (PDF/TXT)

## 📊 Funcionalidades de IA

- Generación de contenido personalizado
- Evaluación inteligente de respuestas
- Recomendaciones adaptativas
- Análisis y retroalimentación constructiva
- Múltiples formatos de salida

## 🚀 Siguiente Nivel

Ideas para expandir el proyecto:

- [ ] Agregar autenticación de usuarios
- [ ] Guardar historial de quizzes
- [ ] Soporte para más idiomas
- [ ] Exportación real a PDF (no solo TXT)
- [ ] Dashboard con estadísticas
- [ ] Integración con Google Classroom
- [ ] Chat IA para tutorías personalizadas
- [ ] Generación de flashcards
- [ ] Gamificación con puntos y logros

## 💡 Tips Pro

1. **Desarrollo**: Usa el modo debug de Flask para hot-reload
2. **Testing**: Prueba todos los endpoints antes de desplegar
3. **Monitoreo**: Revisa los logs en Render regularmente
4. **Optimización**: Cachea respuestas frecuentes para ahorrar API calls
5. **UX**: Agrega loading states para mejor experiencia

## 📞 Soporte

¿Problemas? Revisa:
1. Esta guía de inicio rápido
2. La documentación completa en README.md
3. La guía de pruebas en TEST_LOCAL.md
4. Los logs de la aplicación

## 📄 Licencia

Proyecto educativo - Libre para usar y modificar

---

**Desarrollado con ❤️ usando Flask y Gemini AI**

¡Ahora estás listo para usar el Sistema IA de Comunicación! 🎉
