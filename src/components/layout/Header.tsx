"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Sobre", href: "#sobre" },
        { name: "Tecnologia", href: "#tecnologia" },
        { name: "Protocolo", href: "#protocolo" },
        { name: "Planos", href: "#planos" },
        { name: "Depoimentos", href: "#testimonials" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "py-3"
                : "py-5"
                }`}
        >
            <div className="container-custom flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                    <Image
                        src="/flavio-logo.png"
                        alt="Flávio Di Giovanni"
                        width={120}
                        height={60}
                        className="h-14 w-auto"
                    />
                </Link>

                {/* Desktop Nav - Centered in black pill */}
                <nav className="hidden md:flex items-center gap-10 rounded-full bg-black/90 backdrop-blur-md px-10 py-3.5 border border-white/5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-xs font-medium uppercase tracking-[0.15em] text-gray-300 hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* CTA - Right */}
                <div className="hidden md:block">
                    <Link
                        href="/login"
                        className="px-7 py-2.5 rounded-full border border-white/30 text-white/80 text-xs font-medium uppercase tracking-[0.15em] transition-all hover:bg-white/10 hover:border-white/50 hover:text-white"
                    >
                        Área do Aluno
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-semibold uppercase tracking-widest text-gray-300 hover:text-brand-primary transition-colors py-1"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/login"
                        className="w-full text-center py-3 rounded-full border border-brand-primary text-brand-primary font-semibold uppercase text-sm tracking-wider hover:bg-brand-primary hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Contato
                    </Link>
                </div>
            )}
        </header>
    );
}
