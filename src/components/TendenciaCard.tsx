import React from "react";

interface ComentariosDestacados {
  mejor: string;
  peor: string;
}

interface Analisis {
  fortalezas: string[];
  recomendaciones: string[];
  comentarios_destacados: ComentariosDestacados;
  patrones_temporales: {
    tendencia: string;
  };
}

interface TendenciaCardProps {
  analisis: Analisis;
}

export const TendenciaCard: React.FC<TendenciaCardProps> = ({ analisis }) => {
  if (!analisis) return null;

  const tendencia =
    analisis?.patrones_temporales?.tendencia || "Datos insuficientes";

  // Color e ícono según la tendencia
  let bgColor = "bg-gray-50 border-gray-300";
  let emoji = "⚪";

  if (tendencia.includes("Mejora")) {
    bgColor = "bg-green-50 border-green-300";
    emoji = "📈";
  } else if (tendencia.includes("Empeoramiento")) {
    bgColor = "bg-red-50 border-red-300";
    emoji = "📉";
  } else if (tendencia.includes("Estable")) {
    bgColor = "bg-green-50 border-green-300";
    emoji = "✅";
  } else if (tendencia.includes("Variación")) {
    bgColor = "bg-yellow-50 border-yellow-300";
    emoji = "⚠️";
  }

  return (
    <div className={`${bgColor} border shadow-md rounded-2xl p-4`}>
      <h3 className="text-lg font-semibold mb-2">
        {emoji} Tendencia de comentarios
      </h3>
      <p className="text-sm mb-3 font-medium">{tendencia}</p>

      {analisis.fortalezas?.length > 0 && (
        <div className="mb-2">
          <h4 className="font-semibold mb-1 text-sm">Fortalezas principales</h4>
          <ul className="list-disc list-inside text-sm">
            {analisis.fortalezas.map((f, i) => (
              <li key={i}>✅ {f}</li>
            ))}
          </ul>
        </div>
      )}

      {analisis.recomendaciones?.length > 0 && (
        <div className="mb-2">
          <h4 className="font-semibold mb-1 text-sm">Recomendaciones</h4>
          <ul className="list-disc list-inside text-sm">
            {analisis.recomendaciones.map((r, i) => (
              <li key={i}>💡 {r}</li>
            ))}
          </ul>
        </div>
      )}

      {analisis.comentarios_destacados && (
        <div>
          <h4 className="font-semibold mb-1 text-sm">Comentarios destacados</h4>
          <p className="text-sm">
            ⭐ <strong>Mejor:</strong> “{analisis.comentarios_destacados.mejor}”
          </p>
          <p className="text-sm">
            👎 <strong>Peor:</strong> “{analisis.comentarios_destacados.peor}”
          </p>
        </div>
      )}
    </div>
  );
};
