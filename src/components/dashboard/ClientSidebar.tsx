'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Calendar,
    Dumbbell,
    History,
    LogOut,
    User
} from "lucide-react";
import { clsx } from 'clsx';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const navigation = [
    { name: 'Visão Geral', href: '/client', icon: LayoutDashboard },
    { name: 'Agendar', href: '/client/schedule', icon: Calendar },
    { name: 'Meus Treinos', href: '/client/workouts', icon: Dumbbell },
    { name: 'Evolução', href: '/client/history', icon: History },
    { name: 'Perfil', href: '/client/profile', icon: User },
];

export default function ClientSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-gray-900 border-r border-gray-800">
            {/* Logo */}
            <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-800">
                <Link href="/" className="text-xl font-bold tracking-tighter uppercase text-white">
                    <span className="text-brand-500">Flávio</span> Fit
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex flex-1 flex-col px-4 py-8 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                isActive
                                    ? 'bg-brand-600 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                'group flex items-center gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 transition-all'
                            )}
                        >
                            <item.icon className={clsx(isActive ? 'text-white' : 'text-gray-400 group-hover:text-white', 'h-5 w-5 shrink-0')} aria-hidden="true" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Profile/Logout */}
            <div className="border-t border-gray-800 p-4">
                <button
                    onClick={handleLogout}
                    className="group flex w-full items-center gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all"
                >
                    <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
                    Sair
                </button>
            </div>
        </aside>
    );
}
