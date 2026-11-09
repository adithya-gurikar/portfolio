import type { Metadata } from "next";
import { Space_Grotesk, Archivo_Black, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const archivo = Archivo_Black({ variable: "--font-archivo", subsets: ["latin"], weight: "400" });
const syne = Syne({ variable: "--font-syne", subsets: ["latin"], weight: ["500", "700", "800"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adithya Shashikumaar Gurikar — Portfolio",
  description: "Adithya Shashikumaar Gurikar: data engineer and MS Computer Science student at UIUC, building GenAI products, ETL pipelines and distributed systems.",
};

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${grotesk.variable} ${archivo.variable} ${jetbrains.variable} ${syne.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
