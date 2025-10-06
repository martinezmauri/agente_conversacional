import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import "./App.css";
import { ResumenCard } from "./components/ResumenCard";
import { TendenciaCard } from "./components/TendenciaCard";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface ApiResponse {
  success: boolean;
  sessionId: string;
  message: string;
  pasoActual: string;
}

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface Resumen {
  total_comentarios: number;
  positivos: number;
  neutros: number;
  negativos: number;
  calificacion_promedio: number;
}

interface ComentariosDestacados {
  mejor: string;
  peor: string;
}

interface PatronesTemporales {
  tendencia: string;
}

interface Analisis {
  resumen: Resumen;
  problemas_identificados: string[];
  fortalezas: string[];
  recomendaciones: string[];
  patrones_temporales: PatronesTemporales;
  comentarios_destacados: ComentariosDestacados;
}

interface ApiResponse {
  success: boolean;
  sessionId: string;
  message: string;
  pasoActual: string;
  analisis?: Analisis;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "👋 Hola, soy el agente de análisis de reputación de MMI Analytics. Analizo menciones reales de TripAdvisor para hoteles y destinos. ¿Qué quieres analizar?",
    },
  ]);

  const [input, setInput] = useState<string>("");
  const [sessionId, setSessionId] = useState<string | null>(
    localStorage.getItem("sessionId") || null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [pasoActual, setPasoActual] = useState<string>("TIPO");
  const [analisis, setAnalisis] = useState<Analisis | null>(null);

  const chatRef = useRef<HTMLDivElement | null>(null);
  const API_URL =
    "https://martinezmauri.app.n8n.cloud/webhook/9b0a2fbd-7c4c-412a-8104-d6a36ea59dee";

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (userMessage: string): Promise<void> => {
    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const body = sessionId
        ? { sessionId, message: userMessage }
        : { message: userMessage };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data: ApiResponse = await res.json();
      if (data?.success) {
        setPasoActual(data.pasoActual);

        if (!sessionId && data.sessionId) {
          setSessionId(data.sessionId);
          localStorage.setItem("sessionId", data.sessionId);
        }

        // 👉 Si el paso finaliza, no mostramos el texto formateado, solo las cards
        if (data.pasoActual === "FIN") {
          setAnalisis(data.analisis || null);
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "✅ Análisis completado. Mira los resultados abajo. ¿Quieres iniciar un nuevo análisis?",
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: data.message || "..." },
          ]);
        }
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Hubo un error al procesar tu mensaje." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage(input);
  };

  const getOptionsByStep = (): { label: string; value: string }[] => {
    switch (pasoActual) {
      case "TIPO":
        return [
          { label: "🏨 Mi hotel específico", value: "Hotel" },
          { label: "🏝️ Destino turístico", value: "Destino" },
          { label: "⚔️ Vs. competencia", value: "Competencia" },
        ];
      case "PERIODO":
        return [
          { label: "📅 Último mes", value: "Último mes" },
          { label: "📆 Últimos 3 meses", value: "Últimos 3 meses" },
          { label: "🗓️ Último año", value: "Último año" },
          { label: "🌞 Temporada alta", value: "Temporada alta" },
        ];
      case "ASPECTO":
        return [
          { label: "🧹 Limpieza", value: "Limpieza" },
          { label: "🍽️ Comida", value: "Comida" },
          { label: "👨‍💼 Personal", value: "Personal" },
          { label: "🏗️ Instalaciones", value: "Instalaciones" },
          { label: "⭐ General", value: "General" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="max-w-[700px] mx-auto my-5 p-5 bg-[#f5f5f5] font-sans">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
        <div className="bg-[#00af87] text-white p-5 text-center">
          <h2 className="text-2xl font-semibold">📊 Agente TripAdvisor</h2>
        </div>

        <div
          ref={chatRef}
          className="h-[400px] overflow-y-auto p-5 bg-[#fafafa]"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex mb-4 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-[18px] leading-relaxed whitespace-pre-wrap text-base ${
                  msg.sender === "user"
                    ? "bg-[#00af87] text-white"
                    : "bg-[#e8f7f3] text-[#00675b]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#e8f7f3] text-[#00675b] px-4 py-3 rounded-[18px] text-lg animate-pulse">
                Escribiendo...
              </div>
            </div>
          )}
        </div>

        {/* 👉 Mostrar cards sólo si hay análisis */}
        {pasoActual === "FIN" && analisis && (
          <div className="p-5 space-y-4">
            <ResumenCard resumen={analisis.resumen} />
            <TendenciaCard analisis={analisis} />
          </div>
        )}

        {/* INPUT */}
        <div className="border-t border-gray-200 bg-white p-5">
          {getOptionsByStep().length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4">
              {getOptionsByStep().map((opt, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(opt.value)}
                  className="bg-[#e8f7f3] text-[#00675b] border-2 border-[#b2dfdb] px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-[#b2dfdb]"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Escribe tu consulta..."
              className="flex-1 border-2 border-gray-300 rounded-full px-4 py-3 text-base outline-none focus:border-[#00af87]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={() => sendMessage(input)}
              className="bg-[#00af87] text-white px-5 py-3 rounded-full text-base font-medium hover:bg-[#00897b]"
            >
              {loading ? "..." : "Enviar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
