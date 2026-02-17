import { Header } from "@/components/layout/Header";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen">
            <Header />
            <main>{children}</main>

            {/* Simple Footer for Public Layout */}
            <footer className="bg-gray-50 border-t border-gray-200 py-12">
                <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Flávio Di Giovanni. Todos os direitos reservados.</p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-brand-600">Instagram</a>
                        <a href="#" className="hover:text-brand-600">LinkedIn</a>
                        <a href="#" className="hover:text-brand-600">WhatsApp</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
