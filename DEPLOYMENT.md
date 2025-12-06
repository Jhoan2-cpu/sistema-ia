# Guía de Despliegue en Render

## Pasos para Desplegar en Render

### 1. Preparación del Código

Primero, asegúrate de tener todos los archivos necesarios:
```
sistema-ia/
├── app.py
├── requirements.txt
├── runtime.txt
├── Procfile
├── render.yaml
├── .gitignore
├── README.md
└── static/
    ├── index.html
    ├── styles.css
    └── script.js
```

### 2. Obtener API Key de Gemini

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Click en "Get API Key" o "Create API Key"
4. Copia la API key (la necesitarás más adelante)

### 3. Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com) y crea un nuevo repositorio
2. Inicializa Git en tu proyecto local:

```bash
cd c:\Users\anton\Desktop\Projects\sistema-ia
git init
git add .
git commit -m "Initial commit: Sistema IA de Comunicación"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/sistema-ia.git
git push -u origin main
```

### 4. Desplegar en Render (Método Blueprint - RECOMENDADO)

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Si no tienes cuenta, créala (es gratis)
3. Click en "New +" → "Blueprint"
4. Conecta tu repositorio de GitHub:
   - Autoriza a Render para acceder a GitHub
   - Selecciona el repositorio `sistema-ia`
5. Render detectará automáticamente el archivo `render.yaml`
6. En la configuración, agrega la variable de entorno:
   - Click en "Environment" o "Advanced"
   - Agrega: `GEMINI_API_KEY` = `tu_api_key_aqui`
7. Click en "Apply" para iniciar el despliegue
8. Espera 3-5 minutos mientras Render despliega tu aplicación

### 5. Desplegar en Render (Método Manual)

Si prefieres el método manual:

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Click en "New +" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configura el servicio:
   - **Name:** `sistema-ia-comunicacion`
   - **Environment:** `Python 3`
   - **Region:** `Oregon (US West)` o el que prefieras
   - **Branch:** `main`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
   - **Instance Type:** `Free`
5. Click en "Advanced" y agrega variables de entorno:
   - **GEMINI_API_KEY:** tu_api_key_de_gemini
   - **PYTHON_VERSION:** 3.11.0
6. Click en "Create Web Service"
7. Espera a que termine el despliegue

### 6. Verificar el Despliegue

Una vez desplegado:

1. Render te dará una URL como: `https://sistema-ia-comunicacion.onrender.com`
2. Abre la URL en tu navegador
3. Deberías ver la página principal del Sistema IA de Comunicación
4. Prueba cada una de las 6 herramientas:
   - ✓ Generador de Quiz
   - ✓ Generador de Resúmenes
   - ✓ Generador de Informes
   - ✓ Sistema de Retroalimentación
   - ✓ Recomendaciones
   - ✓ Evaluación de Quiz

### 7. Solución de Problemas

#### La aplicación no carga
- Revisa los logs en el dashboard de Render
- Verifica que la API key de Gemini esté configurada correctamente
- Asegúrate de que todos los archivos estén en el repositorio

#### Error "API Key not configured"
- Ve a "Environment" en Render
- Verifica que `GEMINI_API_KEY` esté configurada
- Reinicia el servicio

#### Error de compilación
- Verifica que `requirements.txt` esté presente
- Asegúrate de que `runtime.txt` tenga la versión correcta de Python
- Revisa los logs de compilación para más detalles

### 8. Actualizar la Aplicación

Para actualizar tu aplicación después del despliegue inicial:

```bash
# Haz cambios en tu código
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

Render automáticamente detectará los cambios y re-desplegará la aplicación.

### 9. Configuración de Dominio Personalizado (Opcional)

1. En el dashboard de Render, ve a tu servicio
2. Click en "Settings" → "Custom Domain"
3. Agrega tu dominio personalizado
4. Sigue las instrucciones para configurar los registros DNS

### 10. Monitoreo

Render proporciona:
- **Logs en tiempo real:** Para debugging
- **Métricas:** CPU, memoria, ancho de banda
- **Alertas:** Notificaciones de errores
- **Health checks:** Verificación automática del servicio

## Notas Importantes

- **Plan Free de Render:**
  - El servicio se duerme después de 15 minutos de inactividad
  - La primera petición después de dormir puede tardar 30-60 segundos
  - Límite de 750 horas/mes (suficiente para un proyecto personal)

- **API de Gemini:**
  - El plan gratuito tiene límites de uso
  - Revisa las cuotas en [Google AI Studio](https://makersuite.google.com/)

- **Seguridad:**
  - NUNCA hagas commit de tu `.env` con la API key real
  - Usa variables de entorno en Render
  - El archivo `.gitignore` ya está configurado para ignorar `.env`

## Recursos Adicionales

- [Documentación de Render](https://render.com/docs)
- [Documentación de Flask](https://flask.palletsprojects.com/)
- [Documentación de Gemini API](https://ai.google.dev/docs)

## Soporte

Si tienes problemas con el despliegue:
1. Revisa esta guía paso a paso
2. Consulta los logs en Render
3. Verifica que todos los archivos estén presentes
4. Asegúrate de que la API key de Gemini sea válida

¡Tu aplicación debería estar lista para usar! 🚀
