import { Header } from "@/components/layout/Header";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen">
            <Header />
            <main>{children}</main>

            <footer className="bg-black py-12 sm:py-20 border-t border-white/10">
                <div className="container-custom flex flex-col items-center justify-between gap-8 sm:gap-12 md:flex-row">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <Image src="/flavio-logo.png" alt="Flávio Di Giovanni Logo" width={200} height={80} />
                        <p className="mt-2 text-sm text-gray-500 max-w-xs text-center md:text-left">
                            Transformando vidas através do movimento inteligente e da ciência aplicada.
                        </p>
                    </div>

                    <div className="flex flex-col md:items-end gap-6">
                        <div className="flex gap-6 text-sm font-medium text-gray-400">
                            <Link href="#sobre" className="hover:text-white transition-colors">Sobre</Link>
                            <Link href="#planos" className="hover:text-white transition-colors">Planos</Link>
                            <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
                        </div>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/flaviodigiovannipersonal" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://www.facebook.com/flaviopizzadigiovanni" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/flavio-di-giovanni-9b388546" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>

                    </div>
                    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Flávio Di Giovanni. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
