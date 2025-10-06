import "./App.css";

function App() {
  return (
    <div className="max-w-[700px] mx-auto my-5 p-5 bg-[#f5f5f5] font-sans">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-[#00af87] text-white p-5 text-center">
          <h2 className="text-2xl font-semibold">📊 Agente TripAdvisor</h2>
          <p className="text-xl">
            Analizo qué dicen realmente de tu hotel o destino
          </p>
        </div>

        {/* CHAT */}
        <div className="h-[450px] overflow-y-auto p-5 bg-[#fafafa]">
          <div className="flex justify-start mb-4">
            <div className="max-w-[80%] bg-[#e8f7f3] text-lg text-[#00675b] px-4 py-3 rounded-[18px] leading-relaxed">
              Hola, soy el agente de análisis de reputación de MMI Analytics.
              Analizo menciones reales de TripAdvisor para hoteles y destinos
              canarios.
              <br />
              <br />
              <strong>¿Qué quieres analizar?</strong>
            </div>
          </div>
        </div>

        {/* INPUT AREA */}
        <div className="border-t border-gray-200 bg-white p-5">
          {/* OPCIONES */}
          <div className="flex flex-wrap gap-3 mb-4">
            <button className="bg-[#e8f7f3] text-[#00675b] border-2 border-[#b2dfdb] px-4 py-2 rounded-full text-sm cursor-pointer transition-all hover:bg-[#b2dfdb]">
              🏨 Mi hotel específico
            </button>
            <button className="bg-[#e8f7f3] text-[#00675b] border-2 border-[#b2dfdb] px-4 py-2 rounded-full text-sm cursor-pointer transition-all hover:bg-[#b2dfdb]">
              🏝️ Destino turístico
            </button>
            <button className="bg-[#e8f7f3] text-[#00675b] border-2 border-[#b2dfdb] px-4 py-2 rounded-full text-sm cursor-pointer transition-all hover:bg-[#b2dfdb]">
              ⚔️ Vs. competencia
            </button>
            <button className="bg-[#e8f7f3] text-[#00675b] border-2 border-[#b2dfdb] px-4 py-2 rounded-full text-sm cursor-pointer transition-all hover:bg-[#b2dfdb]">
              📍 Análisis de zona
            </button>
          </div>

          {/* INPUT + BOTÓN */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="O escribe tu consulta aquí..."
              className="flex-1 border-2 border-gray-300 rounded-full px-4 py-3 text-base outline-none focus:border-[#00af87] transition"
            />
            <button className="bg-[#00af87] text-white px-5 py-3 rounded-full text-base font-medium hover:bg-[#00897b] transition">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
