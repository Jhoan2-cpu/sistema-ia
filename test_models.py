"""
Script para listar los modelos disponibles de Gemini con tu API key
"""
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

print("=" * 60)
print("MODELOS DISPONIBLES DE GEMINI")
print("=" * 60)

try:
    for model in genai.list_models():
        if 'generateContent' in model.supported_generation_methods:
            print(f"\n✅ Modelo: {model.name}")
            print(f"   Display Name: {model.display_name}")
            print(f"   Descripción: {model.description[:100] if model.description else 'N/A'}...")
            print(f"   Métodos soportados: {model.supported_generation_methods}")
except Exception as e:
    print(f"\n❌ Error al listar modelos: {e}")
    print("\nIntentando con modelos comunes...")

    common_models = [
        'gemini-pro',
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-2.0-flash-exp',
        'models/gemini-pro',
        'models/gemini-1.5-flash',
    ]

    for model_name in common_models:
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content("Di 'hola'")
            print(f"✅ {model_name} - FUNCIONA")
        except Exception as e:
            print(f"❌ {model_name} - Error: {str(e)[:50]}")

print("\n" + "=" * 60)
