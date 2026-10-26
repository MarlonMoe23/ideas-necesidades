import "./globals.css";
import BotonInstalar from "./BotonInstalar";

export const metadata = {
  title: "Cuidar Necesidades",
  description: "Ideas con IA para cuidar necesidades desde la CNV, con lenguaje de partes",
  applicationName: "Cuidar Necesidades",
  appleWebApp: {
    capable: true,
    title: "Necesidades",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/icono?s=192",
    apple: "/icono?s=180",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7c3aed",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <BotonInstalar />
        {children}
      </body>
    </html>
  );
}