import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
/* 
FALTA:
-Ofrecer opciones de profundización (Esta funcionando, falta implementar en el front y seguir testeando)
-Sistema de fallback a respuestas genéricas (Lo genero claude, pero necesito que sea un objeto para manejar en front.)
-1. Sistema optimizado y testing (Consultar por tiempos de respuesta, sobre todo en Nodos de Google Sheets)
-Vídeo final con Synthesia (60 segundos)
-Documentación técnica completa
-Propuesta de valor empresarial
-Casos de prueba.
*/
