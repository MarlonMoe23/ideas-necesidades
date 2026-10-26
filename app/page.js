'use client';

import { useState } from "react";
import { necesidades } from "../lib/necesidades";

function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const SECCIONES = {
  mia: [
    {
      clave: "conexion",
      titulo: "Pedidos de conexión",
      icono: "🤝",
      descripcion: "Para saber cómo le llega a la otra persona lo que dices.",
    },
    {
      clave: "accion",
      titulo: "Pedidos de acción",
      icono: "🎯",
      descripcion: "Acciones concretas, positivas y realizables que puedes pedir.",
    },
    {
      clave: "estrategias",
      titulo: "Estrategias",
      icono: "🌱",
      descripcion: "Cosas que puedes hacer tú para cuidar tu necesidad.",
    },
  ],
  otra: [
    {
      clave: "conexion",
      titulo: "Pedidos de conexión",
      icono: "🤝",
      descripcion: "Preguntas empáticas para verificar si adivinaste su necesidad.",
    },
    {
      clave: "accion",
      titulo: "Pedidos de acción",
      icono: "🎯",
      descripcion: "Ofrecimientos concretos para apoyar su necesidad.",
    },
    {
      clave: "estrategias",
      titulo: "Estrategias",
      icono: "🌱",
      descripcion: "Lo que puedes hacer tú para contribuir a su necesidad sin descuidarte.",
    },
  ],
};

export default function Home() {
  const [situacion, setSituacion] = useState("");
  const [necesidad, setNecesidad] = useState("");
  const [duenio, setDuenio] = useState("mia"); // "mia" o "otra"
  const [ideas, setIdeas] = useState(null);
  const [duenioConsultado, setDuenioConsultado] = useState("mia");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");

  // Filtra la lista según lo que se escribe en el campo de necesidad
  const filtro = normalizar(necesidad);
  const categoriasFiltradas = necesidades
    .map((c) => ({
      ...c,
      items: filtro ? c.items.filter((i) => normalizar(i).includes(filtro)) : c.items,
    }))
    .filter((c) => c.items.length > 0);

  const esDeLaLista = necesidades.some((c) =>
    c.items.some((i) => normalizar(i) === filtro)
  );

  const mostrarAviso = (texto) => {
    setAviso(texto);
    setTimeout(() => setAviso(""), 2000);
  };

  const generar = async () => {
    setError("");
    if (!situacion.trim()) {
      setError("Escribe brevemente la situación.");
      return;
    }
    if (!necesidad.trim()) {
      setError("Elige o escribe una necesidad.");
      return;
    }
    setCargando(true);
    setIdeas(null);
    try {
      const res = await fetch("/api/generar-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          situacion: situacion.trim(),
          necesidad: necesidad.trim(),
          duenio,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error desconocido");
      setIdeas(data);
      setDuenioConsultado(duenio);
      setTimeout(() => {
        document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (e) {
      setError(e.message || "No se pudieron generar las ideas. Intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  const tituloResultado = () =>
    duenioConsultado === "mia"
      ? `Ideas para cuidar mi necesidad de ${necesidad.trim()}`
      : `Ideas para apoyar la necesidad de ${necesidad.trim()} de la otra persona`;

  const textoCompleto = () => {
    if (!ideas) return "";
    const bloque = (titulo, lista) =>
      `*${titulo}:*\n${(lista || []).map((i) => `• ${i}`).join("\n")}`;
    return [
      `*${tituloResultado()}*`,
      `*Situación:* ${situacion.trim()}`,
      bloque("Pedidos de conexión", ideas.conexion),
      bloque("Pedidos de acción", ideas.accion),
      bloque("Estrategias", ideas.estrategias),
    ].join("\n\n");
  };

  const copiar = async (texto, mensaje = "Copiado") => {
    try {
      await navigator.clipboard.writeText(texto);
      mostrarAviso(mensaje);
    } catch {
      mostrarAviso("No se pudo copiar");
    }
  };

  const compartirWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(textoCompleto())}`, "_blank");
  };

  const nuevaConsulta = () => {
    setSituacion("");
    setNecesidad("");
    setDuenio("mia");
    setIdeas(null);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="contenedor">
      <header className="encabezado">
        <h1>Cuidar mis Necesidades</h1>
        <p>Ideas para pedir y actuar desde la Comunicación No Violenta</p>
      </header>

      {/* Situación */}
      <section className="tarjeta">
        <h2>1. La situación</h2>
        <p className="ayuda">Describe en pocas palabras qué está pasando.</p>
        <textarea
          value={situacion}
          onChange={(e) => setSituacion(e.target.value)}
          placeholder="Ejemplo: Mi pareja revisa el celular mientras le hablo de mi día..."
        />
      </section>

      {/* Necesidad */}
      <section className="tarjeta">
        <h2>2. La necesidad</h2>

        <p className="ayuda">¿De quién es la necesidad que quieres atender?</p>
        <div className="selector">
          <button
            className={`opcion ${duenio === "mia" ? "activa" : ""}`}
            onClick={() => setDuenio("mia")}
          >
            🙋 Mía
          </button>
          <button
            className={`opcion ${duenio === "otra" ? "activa" : ""}`}
            onClick={() => setDuenio("otra")}
          >
            👤 De la otra persona
          </button>
        </div>

        <p className="ayuda">
          {duenio === "mia"
            ? "Elige tu necesidad de la lista o escríbela tú mismo."
            : "Elige la necesidad que intuyes en la otra persona o escríbela."}
        </p>

        <div className="campo-envoltura">
          <input
            className="campo"
            type="text"
            value={necesidad}
            onChange={(e) => setNecesidad(e.target.value)}
            placeholder="Busca o escribe una necesidad..."
          />
          {necesidad && (
            <button className="limpiar" onClick={() => setNecesidad("")} aria-label="Borrar">
              ×
            </button>
          )}
        </div>

        {necesidad.trim() && !esDeLaLista && (
          <p className="nota">
            Se usará la necesidad que escribiste: <strong>{necesidad.trim()}</strong>
          </p>
        )}

        <div className="lista-necesidades">
          {categoriasFiltradas.map((c) => (
            <div key={c.categoria} className="categoria">
              <h3>{c.categoria}</h3>
              <div className="chips">
                {c.items.map((item) => (
                  <button
                    key={item}
                    className={`chip ${normalizar(item) === filtro ? "activo" : ""}`}
                    onClick={() => setNecesidad(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Botón IA */}
      <button className="boton-ia" onClick={generar} disabled={cargando}>
        {cargando ? (
          <span className="pulso">Generando ideas...</span>
        ) : ideas ? (
          "✨ Generar otras ideas"
        ) : (
          "✨ Generar ideas con IA"
        )}
      </button>
      {error && <p className="error">{error}</p>}

      {/* Resultados */}
      {ideas && (
        <div id="resultados" style={{ marginTop: 20 }}>
          <p className="resumen-consulta">
            <strong>{tituloResultado()}</strong>
          </p>

          {SECCIONES[duenioConsultado].map((s) => (
            <section key={s.clave} className="tarjeta seccion">
              <h2>
                <span>{s.icono}</span> {s.titulo}
              </h2>
              <p className="ayuda">{s.descripcion}</p>
              {(ideas[s.clave] || []).map((idea, i) => (
                <div key={i} className="idea" onClick={() => copiar(idea, "Idea copiada")}>
                  {idea}
                </div>
              ))}
              <p className="toque">Toca una idea para copiarla.</p>
            </section>
          ))}

          <div className="botones">
            <button className="boton azul" onClick={() => copiar(textoCompleto(), "Todo copiado")}>
              📋 Copiar todo
            </button>
            <button className="boton verde" onClick={compartirWhatsApp}>
              💬 Compartir por WhatsApp
            </button>
            <button className="boton gris" onClick={nuevaConsulta}>
              Nueva consulta
            </button>
          </div>
        </div>
      )}

      <footer className="pie">Comunicación No Violenta - Marshall Rosenberg</footer>

      {aviso && <div className="aviso">{aviso}</div>}
    </main>
  );
}