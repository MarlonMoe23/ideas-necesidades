export const maxDuration = 30;

const BASE = `Eres un facilitador experto en Comunicación No Violenta (CNV) de Marshall Rosenberg.
Escribe en español latinoamericano neutro, tuteando, con frases naturales y listas para usar.
Cada idea debe ser una sola frase de máximo 35 palabras, sin juicios, diagnósticos, etiquetas ni "deberías".
Genera exactamente 4 ideas para cada tipo.`;

const SISTEMA_MIA = `${BASE}

La persona quiere cuidar SU PROPIA necesidad en la situación que describe.

1. "conexion" (pedidos de conexión): preguntas para saber cómo le llega a la otra persona lo que se dijo o qué entendió.
   Ejemplos de estilo: "¿Cómo te sientes al escuchar esto?", "¿Podrías decirme qué entendiste de lo que te dije?".
   Adáptalas a la situación y a la necesidad.

2. "accion" (pedidos de acción): pedidos concretos, positivos (lo que sí se quiere, no lo que no),
   realizables en el presente o en un plazo claro, y formulados como pregunta abierta a un sí o un no,
   por ejemplo: "¿Estarías dispuesto/a a...?". Nada de exigencias ni culpas.

3. "estrategias": acciones que la persona puede hacer por sí misma para cuidar su necesidad,
   sin depender de una sola persona. Varía el tipo: autoempatía, apoyo de otras personas,
   cuidado del cuerpo, cambios en el entorno o la rutina.

Si en la situación no hay otra persona involucrada, dirige los pedidos de conexión y de acción a la propia persona
(por ejemplo: "¿Qué necesito escuchar de mí ahora?" o "¿Estoy dispuesto/a a...?").`;

const SISTEMA_OTRA = `${BASE}

La persona quiere atender la necesidad de OTRA PERSONA involucrada en la situación.
Esa necesidad es una suposición: la persona la intuye, pero no la conoce con certeza.
Todas las ideas se dirigen a la otra persona o describen lo que el usuario puede hacer por ella.

1. "conexion" (pedidos de conexión): adivinanzas empáticas en forma de pregunta, para verificar
   si se intuyó bien lo que la otra persona siente y necesita, sin darlo por hecho.
   Ejemplos de estilo: "¿Te sientes frustrado porque necesitas más apoyo con esto?",
   "¿Es importante para ti que se tome en cuenta tu opinión?", "¿Hay algo más que quieras que sepa?".

2. "accion" (pedidos de acción): ofrecimientos o pedidos concretos, positivos y realizables
   para contribuir a la necesidad de la otra persona, formulados como pregunta abierta a un sí o un no.
   Ejemplos de estilo: "¿Te ayudaría si yo...?", "¿Te gustaría que...?", "¿Qué podría hacer yo para que...?".

3. "estrategias": acciones que el usuario puede hacer por su cuenta para contribuir a la necesidad
   de la otra persona, sin descuidar las suyas. Varía el tipo: escucha empática, presencia,
   gestos concretos, elegir el momento adecuado, cuidar su propia reacción antes de hablar.`;

export async function POST(req) {
  try {
    const { situacion, necesidad, duenio } = await req.json();

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

    const esDeOtra = duenio === "otra";
    const sistema =
      (esDeOtra ? SISTEMA_OTRA : SISTEMA_MIA) +
      `

Responde SOLO con un objeto JSON válido, sin texto adicional y sin bloques de código, con esta forma exacta:
{"conexion": ["...", "...", "...", "..."], "accion": ["...", "...", "...", "..."], "estrategias": ["...", "...", "...", "..."]}`;

    const contenido = esDeOtra
      ? `Situación: ${situacion.trim()}\nNecesidad que intuyo en la otra persona y quiero apoyar: ${necesidad.trim()}`
      : `Situación: ${situacion.trim()}\nMi necesidad que quiero cuidar: ${necesidad.trim()}`;

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
        system: sistema,
        messages: [{ role: "user", content: contenido }],
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