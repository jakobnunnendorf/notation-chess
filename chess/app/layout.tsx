import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Notation chess",
  description: "Play chess offline",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col justify-center items-center w-screen bg-slate-50 h-screen text-black p-24">
        <h1 className="text-4xl">Chess app</h1>
        <div className="h-96 aspect-square">{children}</div>
      </body>
    </html>
  );
}
