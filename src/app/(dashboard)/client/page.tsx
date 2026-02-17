import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Calendar as CalendarIcon, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Placeholder data - in a real app this comes from DB
    const nextAppointment = null;
    const currentPlan = "Hipertrofia - Fase 1";

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Olá, {user.user_metadata.full_name || 'Atleta'}</h1>
                <p className="text-gray-400 mt-1">Aqui está o resumo da sua semana.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Next Workout */}
                <div className="bg-gray-900 overflow-hidden rounded-2xl border border-gray-800 shadow-sm relative group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <DumbbellIcon className="w-24 h-24 text-brand-500" />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-brand-900/30 p-3 rounded-lg">
                                <DumbbellIcon className="h-6 w-6 text-brand-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-400">Plano Atual</p>
                                <p className="text-lg font-bold text-white">{currentPlan}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Link
                                href="/client/workouts"
                                className="text-brand-400 text-sm font-semibold hover:text-brand-300 flex items-center gap-1"
                            >
                                Ver Treino de Hoje <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Next Appointment */}
                <div className="bg-gray-900 overflow-hidden rounded-2xl border border-gray-800 shadow-sm">
                    <div className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-brand-900/30 p-3 rounded-lg">
                                <CalendarIcon className="h-6 w-6 text-brand-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-400">Próxima Consulta</p>
                                <p className="text-lg font-bold text-white">
                                    {nextAppointment ? '18/02 às 14:00' : 'Nenhuma agendada'}
                                </p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Link
                                href="/client/schedule"
                                className="text-brand-400 text-sm font-semibold hover:text-brand-300 flex items-center gap-1"
                            >
                                Agendar Nova <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

function DumbbellIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.4 14.4 9.6 9.6" />
            <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
            <path d="m21.5 21.5-1.4-1.4" />
            <path d="M3.9 3.9 2.5 2.5" />
            <path d="M5.343 2.515a2 2 0 1 1 2.829 2.828L10 3.5 12 5.5 10 7.5 3.5 14l-1.768-1.768a2 2 0 1 1 2.829-2.829z" />
        </svg>
    );
}
