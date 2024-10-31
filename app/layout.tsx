import { poppins, raleway } from "@/fonts/font";
import '@/styles/globals.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipeon",
  description: "Recipeon é um app de receitas para o seu dia a dia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${raleway.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
