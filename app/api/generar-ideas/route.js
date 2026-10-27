export const maxDuration = 30;

const BASE = `Eres un facilitador experto en Comunicación No Violenta (CNV) de Marshall Rosenberg,
con formación en el modelo de Sistemas de Familia Interna (IFS) de Richard Schwartz.
Escribe en español latinoamericano neutro, tuteando, con frases naturales y listas para usar.
Cada idea debe ser una sola frase de máximo 40 palabras, sin juicios, diagnósticos, etiquetas ni "deberías".
Genera exactamente 4 ideas para cada tipo.

PERSPECTIVA (MUY IMPORTANTE):
La situación la cuenta el usuario en primera persona: "yo" siempre es el usuario y "la otra persona" es quien aparece en la situación.
Antes de escribir, identifica qué hizo y qué vivió cada uno.
Nunca atribuyas a la otra persona lo que vivió el usuario, ni al revés.
Ejemplo: si el usuario esperó porque la otra persona llegó tarde, la espera es experiencia del usuario;
la otra persona es quien llegó tarde.

GÉNERO:
Se te indica si el usuario es hombre o mujer: usa ese género en todo lo que se refiere al usuario
(por ejemplo dispuesto o dispuesta, cansado o cansada).
El género de la otra persona dedúcelo de la situación (amiga, jefe, mamá, pareja...). Si no se puede saber, usa expresiones sin género.
Cuando hables de los dos juntos y son de distinto género, usa el plural mixto: "ambos", "juntos", "los dos".

SENTIMIENTOS:
Usa SOLO los sentimientos indicados y no inventes otros distintos.
Vienen como sustantivos (por ejemplo "Vergüenza"); conviértelos en expresiones naturales con el género correcto.
Intégralos de forma natural en varias de las ideas (no hace falta en todas).
Si no se indican sentimientos, puedes nombrar sentimientos probables, siempre como pregunta o posibilidad, sin darlos por hecho.

LENGUAJE DE PARTES (IFS):
En cada tipo, exactamente 2 de las 4 ideas deben usar lenguaje de partes y las otras 2 deben ser CNV clásica sin mencionar partes.
Usar lenguaje de partes significa HABLAR POR la parte, no DESDE la parte: el Self nombra con calma a la parte,
lo que siente y lo que necesita, en lugar de dejar que la parte se exprese con reproches o exigencias.
Ejemplos de estilo: "Una parte de mí se siente...", "Hay una parte mía que necesita...", "Escucho que una parte de ti...".
Nunca uses las partes para culpar, diagnosticar o etiquetar a nadie.`;

const SISTEMA_MIA = `${BASE}

La persona quiere cuidar SU PROPIA necesidad en la situación que describe. Los sentimientos indicados son suyos.

1. "conexion" (pedidos de conexión): preguntas para saber cómo le llega a la otra persona lo que se dijo o qué entendió.
   Ejemplos de estilo: "¿Cómo te sientes al escuchar esto?", "¿Podrías decirme qué entendiste de lo que te dije?".
   En las ideas con lenguaje de partes, la persona primero habla por su parte y luego hace la pregunta,
   por ejemplo: "Una parte de mí tiene miedo de no haberme explicado bien, ¿podrías contarme qué entendiste?".

2. "accion" (pedidos de acción): pedidos concretos, positivos (lo que sí se quiere, no lo que no),
   realizables en el presente o en un plazo claro, y formulados como pregunta abierta a un sí o un no,
   por ejemplo: "¿Estarías dispuesto a...?" o "¿Estarías dispuesta a...?" según el género de la otra persona.
   Nada de exigencias ni culpas.
   En las ideas con lenguaje de partes: "Una parte de mí está [sentimiento] y necesita [necesidad]. ¿Estarías dispuesto a...?".

3. "estrategias": acciones que la persona puede hacer por sí misma para cuidar su necesidad,
   sin depender de una sola persona. Varía el tipo: autoempatía, apoyo de otras personas,
   cuidado del cuerpo, cambios en el entorno o la rutina.
   En las ideas con lenguaje de partes, la estrategia consiste en que el Self atienda a la parte,
   por ejemplo: "Dedica cinco minutos a escuchar a la parte de ti que se siente ignorada y pregúntale qué necesita de ti".

Si en la situación no hay otra persona involucrada, dirige los pedidos de conexión y de acción a la propia persona
(por ejemplo: "¿Qué necesita escuchar de mí esta parte ahora?" o "¿Estoy dispuesto a...?").`;

const SISTEMA_OTRA = `${BASE}

La persona quiere atender la necesidad de OTRA PERSONA involucrada en la situación.
Esa necesidad y los sentimientos indicados son de la otra persona y son suposiciones: el usuario los intuye, pero no los conoce con certeza.
Todas las ideas se dirigen a la otra persona o describen lo que el usuario puede hacer por ella.

REGLA CLAVE: TODAS las ideas deben servir a la necesidad de la otra persona.
No incluyas pedidos que en realidad sirven a las necesidades del usuario (por ejemplo, pedirle puntualidad
a quien llegó tarde, o acordar reglas para la próxima vez) presentados como si fueran apoyo.
Si la otra persona siente algo difícil como vergüenza, culpa o miedo, prioriza la empatía, la aceptación
y la tranquilidad antes que cualquier acuerdo.

1. "conexion" (pedidos de conexión): adivinanzas empáticas en forma de pregunta, para verificar
   si se intuyó bien lo que la otra persona siente y necesita, sin darlo por hecho.
   Ejemplos de estilo: "¿Te sientes avergonzada porque es importante para ti cumplir lo que prometes?",
   "¿Es importante para ti que se tome en cuenta tu opinión?".
   En las ideas con lenguaje de partes: "¿Será que una parte de ti está... y necesita...?".

2. "accion" (pedidos de acción): ofrecimientos o pedidos concretos, positivos y realizables
   para contribuir a la necesidad de la otra persona, formulados como pregunta abierta a un sí o un no.
   Ejemplos de estilo: "¿Te ayudaría si yo...?", "¿Te gustaría que...?".
   En las ideas con lenguaje de partes, se reconoce primero a la parte del otro y luego se ofrece,
   usando solo los sentimientos indicados, por ejemplo: "Si una parte de ti siente vergüenza, ¿te ayudaría saber que...?".

3. "estrategias": acciones que el usuario puede hacer por su cuenta para contribuir a la necesidad
   de la otra persona, sin descuidar las suyas. Varía el tipo: escucha empática, presencia,
   gestos concretos, elegir el momento adecuado.
   En las ideas con lenguaje de partes, el usuario atiende primero a sus propias partes para poder
   acercarse desde el Self, por ejemplo: "Antes de hablarle, nota si una parte tuya está molesta y pídele un poco de espacio".`;

const EXTRA_INCIERTA = `

NECESIDAD DESCONOCIDA:
El usuario no sabe qué necesidad está activa en la otra persona.
1. En "posibles", propone 4 necesidades probables de la otra persona (una a tres palabras cada una, con mayúscula inicial),
   coherentes con la situación y con los sentimientos indicados.
2. En "conexion", convierte esas necesidades posibles en adivinanzas empáticas para verificarlas con la persona, una por cada necesidad.
3. En "accion" y "estrategias", da ideas que sirvan sin importar cuál sea la necesidad:
   escuchar, preguntar, ofrecer presencia, tranquilizar, aceptar.`;

export async function POST(req) {
  try {
    const { situacion, necesidad, duenio, sentimientos, genero, incierta } = await req.json();

    const esDeOtra = duenio === "otra";
    const esIncierta = esDeOtra && incierta === true;

    if (!situacion?.trim() || (!esIncierta && !necesidad?.trim())) {
      return Response.json({ error: "Faltan la situación o la necesidad." }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Falta configurar ANTHROPIC_API_KEY en Vercel." },
        { status: 500 }
      );
    }

    const listaSentimientos = Array.isArray(sentimientos)
      ? sentimientos.map((s) => String(s).trim()).filter(Boolean).slice(0, 15)
      : [];

    const formato = esIncierta
      ? `{"posibles": ["...", "...", "...", "..."], "conexion": ["...", "...", "...", "..."], "accion": ["...", "...", "...", "..."], "estrategias": ["...", "...", "...", "..."]}`
      : `{"conexion": ["...", "...", "...", "..."], "accion": ["...", "...", "...", "..."], "estrategias": ["...", "...", "...", "..."]}`;

    const sistema =
      (esDeOtra ? SISTEMA_OTRA : SISTEMA_MIA) +
      (esIncierta ? EXTRA_INCIERTA : "") +
      `

Responde SOLO con un objeto JSON válido, sin texto adicional y sin bloques de código, con esta forma exacta:
${formato}`;

    const lineas = [];
    if (genero === "hombre" || genero === "mujer") {
      lineas.push(`Yo, quien escribe, soy ${genero}.`);
    }
    lineas.push(`Situación (contada por mí): ${situacion.trim()}`);

    if (esDeOtra) {
      if (listaSentimientos.length > 0) {
        lineas.push(`Sentimientos que intuyo en la otra persona: ${listaSentimientos.join(", ")}`);
      }
      if (esIncierta) {
        lineas.push("Necesidad de la otra persona: no la sé, ayúdame a intuirla.");
      } else {
        lineas.push(`Necesidad que intuyo en la otra persona y quiero apoyar: ${necesidad.trim()}`);
      }
    } else {
      if (listaSentimientos.length > 0) {
        lineas.push(`Mis sentimientos: ${listaSentimientos.join(", ")}`);
      }
      lineas.push(`Mi necesidad que quiero cuidar: ${necesidad.trim()}`);
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
        max_tokens: 3000,
        system: sistema,
        messages: [{ role: "user", content: lineas.join("\n") }],
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
      posibles: esIncierta ? ideas.posibles || [] : [],
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