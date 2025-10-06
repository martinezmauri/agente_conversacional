import React from "react";

interface Resumen {
  total_comentarios: number;
  positivos: number;
  neutros: number;
  negativos: number;
  calificacion_promedio: number;
}
export const ResumenCard = ({ resumen }: { resumen: Resumen }) => {
  if (!resumen) return null;
  return (
    <div className="bg-[#e8f7f3] p-5 rounded-2xl shadow-md">
      <h3 className="text-xl font-semibold mb-3 text-[#00675b]">
        📈 Resumen general
      </h3>

      <p className="text-lg text-[#004d40]">
        Total de comentarios: <strong>{resumen.total_comentarios}</strong>
      </p>
      <p className="text-lg text-[#004d40] mb-4">
        Calificación promedio:{" "}
        <strong>{resumen.calificacion_promedio.toFixed(1)} / 5</strong>
      </p>

      <div className="flex justify-around text-center">
        <div className="px-3 py-2 border-2 border-[#00af87] text-[#00675b] rounded-full font-medium w-24">
          👍 {resumen.positivos}%
        </div>
        <div className="px-3 py-2 border-2 border-[#ffcc00] text-[#8a6d00] rounded-full font-medium w-24">
          😐 {resumen.neutros}%
        </div>
        <div className="px-3 py-2 border-2 border-[#e53935] text-[#b71c1c] rounded-full font-medium w-24">
          👎 {resumen.negativos}%
        </div>
      </div>
    </div>
  );
};
