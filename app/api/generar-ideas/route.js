export const maxDuration = 30;

const SISTEMA = `Eres un facilitador experto en Comunicación No Violenta (CNV) de Marshall Rosenberg.
Tu tarea es ayudar a una persona a cuidar una necesidad concreta en una situación concreta.
Escribe en español latinoamericano neutro, tuteando, con frases naturales y listas para usar.

Genera exactamente 4 ideas para cada tipo:

1. "conexion" (pedidos de conexión): preguntas para saber cómo le llega a la otra persona lo que se dijo o qué entendió.
   Ejemplos de estilo: "¿Cómo te sientes al escuchar esto?", "¿Podrías decirme qué entendiste de lo que te dije?".
   Adáptalas a la situación y a la necesidad.

2. "accion" (pedidos de acción): pedidos concretos, positivos (lo que sí se quiere, no lo que no),
   realizables en el presente o en un plazo claro, y formulados como pregunta abierta a un sí o un no,
   por ejemplo: "¿Estarías dispuesto/a a...?". Nada de exigencias, culpas ni "deberías".

3. "estrategias": acciones que la persona puede hacer por sí misma para cuidar la necesidad,
   sin depender de una sola persona. Varía el tipo: autoempatía, apoyo de otras personas,
   cuidado del cuerpo, cambios en el entorno o la rutina.

Si en la situación no hay otra persona involucrada, dirige los pedidos de conexión y de acción a la propia persona
(por ejemplo: "¿Qué necesito escuchar de mí ahora?" o "¿Estoy dispuesto/a a...?").

Cada idea debe ser una sola frase de máximo 35 palabras, sin juicios, diagnósticos ni etiquetas.

Responde SOLO con un objeto JSON válido, sin texto adicional y sin bloques de código, con esta forma exacta:
{"conexion": ["...", "...", "...", "..."], "accion": ["...", "...", "...", "..."], "estrategias": ["...", "...", "...", "..."]}`;

export async function POST(req) {
  try {
    const { situacion, necesidad } = await req.json();

    if (!situacion?.trim() || !necesidad?.trim()) {
      return Response.json({ error: "Faltan la situación o la necesidad." }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Falta configurar ANTHROPIC_API_KEY en Vercel." },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-5-5",
        max_tokens: 2000,
        system: SISTEMA,
        messages: [
          {
            role: "user",
            content: `Situación: ${situacion.trim()}\nNecesidad que quiero cuidar: ${necesidad.trim()}`,
          },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error de Anthropic:", data);
      return Response.json(
        { error: data?.error?.message || "La IA no respondió correctamente." },
        { status: 500 }
      );
    }

    const texto = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    const inicio = texto.indexOf("{");
    const fin = texto.lastIndexOf("}");
    const ideas = JSON.parse(texto.slice(inicio, fin + 1));

    return Response.json({
      conexion: ideas.conexion || [],
      accion: ideas.accion || [],
      estrategias: ideas.estrategias || [],
    });
  } catch (e) {
    console.error("Error al generar ideas:", e);
    return Response.json(
      { error: "No se pudieron generar las ideas. Intenta de nuevo." },
      { status: 500 }
    );
  }
}