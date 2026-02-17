import Link from "next/link";
import Image from "next/image";
import { MoveLeft } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-900/20 rounded-full blur-[100px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[100px] translate-y-1/2" />
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 text-brand-500 hover:text-brand-400 mb-8 transition-colors group"
                >
                    <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Voltar para Home</span>
                </Link>

                <div className="flex justify-center">
                    <Image src="/flavio-logo.png" alt="Flávio Di Giovanni" width={200} height={64} />
                </div>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Acesse sua área exclusiva de treino e evolução.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-gray-900 py-8 px-4 shadow-2xl shadow-black sm:rounded-2xl sm:px-10 border border-gray-800">
                    {children}
                </div>
            </div>
        </div>
    );
}
