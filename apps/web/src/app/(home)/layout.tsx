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
        className={`fixed w-full z-50 transition-all duration-100 ease-in-out`}
      >
        <Navbar />
      </header>
      {children}
      <Footer />
    </>
  );
}
