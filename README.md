# 🤖 Chat Conversacional - Análisis de Comentarios

Aplicación web desarrollada con **React + Vite**, que implementa un **chat conversacional** conectado a flujos de automatización creados en **N8n**.  
El sistema permite analizar comentarios de hoteles y generar un resumen con tendencias y métricas, simulando un asistente inteligente.

---

## 🧱 Arquitectura General

La aplicación está compuesta por tres partes principales:

1. **Frontend (React + Vite)**  
   Interfaz conversacional desarrollada en React, con comunicación directa al webhook de N8n.

2. **Automatización (N8n)**  
   Los flujos de N8n procesan los mensajes del usuario, analizan comentarios y devuelven las respuestas estructuradas al frontend.

3. **Almacenamiento (Google Sheets)**  
   Registro de las conversaciones y resultados generados, con uso de nodos nativos de N8n.

---

En la carpeta `n8n-export/` se incluyen los **tres flujos principales de N8n** utilizados en este proyecto:

- `Agente_Conversacional.json` → flujo principal de conversación
- `API_Comentarios_Simulados.json` → generación de comentarios simulados
- `Analizar_Comentarios.json` → análisis y cálculo de métricas

---

## ⚙️ Requisitos Previos

Antes de comenzar, asegurate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Navegador moderno (Chrome, Edge, Firefox)

---

## 🚀 Instalación y Ejecución

1. **Clonar el repositorio**
   git clone https://github.com/usuario/chatbot-conversacional.git
   cd chatbot-conversacional
2. **Instalar dependecias**
   npm install
3. **Levantar el entorno de desarrollo**
   npm run dev
4. **Abrir la aplicacion en el navegador**
   Accede a la URL que muestra la consola (por defecto: http://localhost:5173).
