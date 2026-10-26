import "./globals.css";

export const metadata = {
  title: "Cuidar mis Necesidades",
  description: "Ideas con IA para cuidar necesidades desde la Comunicación No Violenta",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}