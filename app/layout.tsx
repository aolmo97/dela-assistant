// app/layout.tsx
import "regenerator-runtime/runtime"; // Importar regenerator-runtime
import "./globals.css"; // Importar estilos globales
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>{children}</body>
    </html>
  );
}
