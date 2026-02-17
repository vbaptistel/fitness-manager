'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Loader2, Mail, Lock, User, Phone, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const supabase = createClient();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // 1. Create Auth User
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    phone: whatsapp,
                },
            },
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        setSuccess(true);
        setLoading(false);
        // In a real app, we might wait for email confirmation or auto-login
    };

    if (success) {
        return (
            <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-brand-900/30 mb-6">
                    <CheckCircle2 className="h-8 w-8 text-brand-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Conta Criada!</h3>
                <p className="text-gray-400 mb-6 text-sm">
                    Verifique seu email ({email}) para confirmar seu cadastro e acessar a plataforma.
                </p>
                <Link
                    href="/login"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-lg text-white bg-brand-600 hover:bg-brand-500 w-full transition-colors uppercase"
                >
                    Ir para Login
                </Link>
            </div>
        );
    }

    return (
        <>
            <form className="space-y-4" onSubmit={handleSignup}>
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        Nome Completo
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="bg-gray-950 block w-full pl-10 sm:text-sm border-gray-700 rounded-lg focus:ring-brand-500 focus:border-brand-500 text-white placeholder-gray-500 py-2.5 transition-colors"
                            placeholder="Seu nome"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                        WhatsApp
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                            className="bg-gray-950 block w-full pl-10 sm:text-sm border-gray-700 rounded-lg focus:ring-brand-500 focus:border-brand-500 text-white placeholder-gray-500 py-2.5 transition-colors"
                            placeholder="(11) 99999-9999"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Email
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-950 block w-full pl-10 sm:text-sm border-gray-700 rounded-lg focus:ring-brand-500 focus:border-brand-500 text-white placeholder-gray-500 py-2.5 transition-colors"
                            placeholder="seu@email.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                        Senha
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-950 block w-full pl-10 sm:text-sm border-gray-700 rounded-lg focus:ring-brand-500 focus:border-brand-500 text-white placeholder-gray-500 py-2.5 transition-colors"
                            placeholder="Mínimo 6 caracteres"
                            minLength={6}
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-brand-600 hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-wide"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Criar Conta'}
                    </button>
                </div>
            </form>

            <div className="mt-6">
                <div className="text-center text-sm">
                    <span className="text-gray-500">Já tem uma conta? </span>
                    <Link href="/login" className="font-medium text-brand-500 hover:text-brand-400">
                        Fazer Login
                    </Link>
                </div>
            </div>
        </>
    );
}
