import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header
        className={`sticky top-0 w-full z-50 transition-all duration-100 ease-in-out overflow-hidden bg-secondary`}
      >
        <Navbar />
      </header>
      <main className="min-h-screen bg-slate-100 flex flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}
