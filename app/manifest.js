export default function manifest() {
  return {
    name: "Cuidar mis Necesidades",
    short_name: "Necesidades",
    description: "Ideas con IA para cuidar necesidades desde la Comunicación No Violenta",
    start_url: "/",
    display: "standalone",
    background_color: "#f1f5f9",
    theme_color: "#7c3aed",
    lang: "es",
    icons: [
      { src: "/icono?s=192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icono?s=512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icono?s=512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}