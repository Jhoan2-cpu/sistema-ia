# Guía de Prueba Local

## Antes de Empezar

Asegúrate de tener instalado:
- Python 3.11 o superior
- pip (gestor de paquetes de Python)

## Pasos para Probar Localmente

### 1. Configurar el Entorno

```bash
# Navega al directorio del proyecto
cd c:\Users\anton\Desktop\Projects\sistema-ia

# Crea un entorno virtual (recomendado)
python -m venv venv

# Activa el entorno virtual
# En Windows:
venv\Scripts\activate
# En Mac/Linux:
# source venv/bin/activate
```

### 2. Instalar Dependencias

```bash
pip install -r requirements.txt
```

### 3. Configurar API Key

1. Abre el archivo `.env` en un editor de texto
2. Reemplaza `your_gemini_api_key_here` con tu API key real de Gemini
3. Si no tienes una API key:
   - Ve a https://makersuite.google.com/app/apikey
   - Inicia sesión con Google
   - Click en "Create API Key"
   - Copia y pega la key en el archivo `.env`

Tu archivo `.env` debería verse así:
```
GEMINI_API_KEY=AIzaSyABcDeFg1234567890HiJkLmNoPqRsTuVwXyZ
PORT=5000
```

### 4. Ejecutar la Aplicación

```bash
python app.py
```

Deberías ver un mensaje como:
```
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment.
 * Running on http://0.0.0.0:5000
Press CTRL+C to quit
```

### 5. Probar en el Navegador

1. Abre tu navegador
2. Ve a: `http://localhost:5000`
3. Deberías ver la página principal del Sistema IA de Comunicación

### 6. Probar Cada Herramienta

#### A. Generador de Quiz
1. Click en "Generador de Quiz"
2. Ingresa un tema: "Comunicación efectiva"
3. Ajusta el número de preguntas (1-20)
4. Click en "Generar Quiz"
5. Verifica que se genere un quiz con preguntas variadas
6. Prueba descargar en PDF/TXT

#### B. Generador de Resúmenes
1. Click en "Generador de Resúmenes"
2. Ingresa un texto largo (mínimo 100 caracteres)
3. Selecciona el tipo de resumen
4. Click en "Generar Resumen"
5. Verifica que se genere un resumen coherente
6. Prueba descargar el resumen

#### C. Generador de Informes
1. Click en "Generador de Informes"
2. Ingresa un tema: "Análisis de medios de comunicación"
3. Selecciona el tipo de informe
4. Agrega descripción y objetivos
5. Click en "Generar Informe"
6. Verifica que se genere un informe estructurado

#### D. Sistema de Retroalimentación
1. Click en "Sistema de Retroalimentación"
2. Responde las preguntas de ejemplo
3. Opcionalmente agrega más preguntas
4. Click en "Obtener Retroalimentación"
5. Verifica que recibas evaluación detallada con puntuación

#### E. Recomendaciones
1. Click en "Recomendaciones"
2. Selecciona tu nivel
3. Describe tus dificultades
4. Agrega intereses
5. Click en "Obtener Recomendaciones"
6. Verifica que recibas recursos y ejercicios personalizados

#### F. Evaluación de Quiz
1. Click en "Evaluación de Quiz"
2. Responde las 3 preguntas de ejemplo
3. Click en "Evaluar Quiz"
4. Verifica que recibas puntuación y feedback detallado

### 7. Verificar la Consola

Durante las pruebas, revisa la consola donde ejecutaste `python app.py` para ver:
- Peticiones HTTP (POST /api/...)
- Posibles errores
- Estado de las respuestas (200, 500, etc.)

### 8. Pruebas de API Directas (Opcional)

Si quieres probar las APIs directamente, puedes usar herramientas como:

#### Usando cURL (Windows PowerShell):

```powershell
# Test Quiz Generation
Invoke-RestMethod -Uri "http://localhost:5000/api/generate-quiz" -Method Post -ContentType "application/json" -Body '{"topic":"Comunicación","num_questions":3}'

# Test Summary
Invoke-RestMethod -Uri "http://localhost:5000/api/generate-summary" -Method Post -ContentType "application/json" -Body '{"text":"La comunicación es esencial en la vida diaria. Permite intercambiar ideas, expresar emociones y construir relaciones. Es un proceso complejo que involucra emisor, receptor, mensaje y contexto.","summary_type":"academic"}'
```

#### Usando Python:

```python
import requests

# Test Quiz
response = requests.post('http://localhost:5000/api/generate-quiz', json={
    'topic': 'Comunicación',
    'num_questions': 3
})
print(response.json())
```

### 9. Solución de Problemas Comunes

#### Error: "ModuleNotFoundError"
```bash
# Asegúrate de haber instalado las dependencias
pip install -r requirements.txt
```

#### Error: "API key not configured"
```bash
# Verifica que el archivo .env existe y tiene la API key correcta
# Reinicia la aplicación después de editar .env
```

#### Error: "Address already in use"
```bash
# El puerto 5000 ya está en uso
# Cambia el puerto en .env a otro (ej: 5001)
# O detén el proceso que usa el puerto 5000
```

#### La aplicación se ejecuta pero no responde
```bash
# Verifica que la API key de Gemini sea válida
# Revisa los logs en la consola para errores
# Asegúrate de tener conexión a internet
```

#### Errores de CORS en el navegador
```bash
# Esto no debería ocurrir, pero si pasa:
# Verifica que flask-cors esté instalado
pip install flask-cors
```

### 10. Detener la Aplicación

Para detener el servidor Flask:
- Presiona `Ctrl+C` en la terminal

Para desactivar el entorno virtual:
```bash
deactivate
```

## Checklist de Pruebas

Antes de desplegar a producción, verifica:

- [ ] La aplicación inicia sin errores
- [ ] La página principal carga correctamente
- [ ] Generador de Quiz funciona y genera preguntas variadas
- [ ] Generador de Resúmenes crea resúmenes coherentes
- [ ] Generador de Informes produce informes estructurados
- [ ] Sistema de Retroalimentación evalúa correctamente
- [ ] Recomendaciones genera sugerencias personalizadas
- [ ] Evaluación de Quiz calcula puntuación correctamente
- [ ] Los modales abren y cierran correctamente
- [ ] Los botones de descarga funcionan
- [ ] No hay errores en la consola del navegador
- [ ] No hay errores en la consola de Flask

## Próximos Pasos

Una vez que hayas verificado que todo funciona localmente:

1. Sigue la guía en `DEPLOYMENT.md` para desplegar en Render
2. Asegúrate de hacer commit de tus cambios a Git (excepto `.env`)
3. Push a GitHub
4. Despliega en Render siguiendo los pasos

## Notas

- El archivo `.env` NO debe incluirse en Git (ya está en `.gitignore`)
- Siempre usa variables de entorno para información sensible
- La API de Gemini tiene límites de uso en el plan gratuito
- En desarrollo, Flask usa modo debug para hot-reload

¡Buena suerte con tus pruebas! 🚀
