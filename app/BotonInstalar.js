'use client';

import { useEffect, useState } from "react";

export default function BotonInstalar() {
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const capturar = (e) => {
      e.preventDefault();
      setEvento(e);
    };
    const instalada = () => setEvento(null);

    window.addEventListener("beforeinstallprompt", capturar);
    window.addEventListener("appinstalled", instalada);
    return () => {
      window.removeEventListener("beforeinstallprompt", capturar);
      window.removeEventListener("appinstalled", instalada);
    };
  }, []);

  if (!evento) return null;

  const instalar = async () => {
    evento.prompt();
    await evento.userChoice;
    setEvento(null);
  };

  return (
    <button className="boton-instalar" onClick={instalar}>
      📲 Instalar app
    </button>
  );
}