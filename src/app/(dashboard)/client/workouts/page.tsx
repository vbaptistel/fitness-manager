'use client';

import Link from "next/link";
import { Dumbbell, ChevronRight, Clock, CalendarDays } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

// Types
type TrainingPlan = {
    id: string;
    name: string;
    description: string;
    active: boolean;
    workouts: Workout[];
};

type Workout = {
    id: string;
    name: string;
    description: string;
    count_exercises: number; // We'll compute this or fetch it
};

export default function WorkoutsPage() {
    const [plans, setPlans] = useState<TrainingPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Fetch plans
            const { data: plansData } = await supabase
                .from('training_plans')
                .select('*')
                .eq('user_id', user.id)
                .eq('active', true);

            if (!plansData || plansData.length === 0) {
                // Fallback to mock data if empty (for demo)
                setPlans([
                    {
                        id: 'mock-1',
                        name: "Hipertrofia - Mesociclo 1",
                        description: "Foco em força base e volume moderado.",
                        active: true,
                        workouts: [
                            { id: 'w-1', name: "Treino A - Perna (Foco Quadríceps)", description: "Agachamento pesado primeiro", count_exercises: 6 },
                            { id: 'w-2', name: "Treino B - Empurrar (Peito/Ombro/Tríceps)", description: "Foco na porção superior", count_exercises: 7 },
                            { id: 'w-3', name: "Treino C - Puxar (Costas/Bíceps)", description: "Controle da escápula", count_exercises: 6 },
                        ]
                    }
                ]);
                setLoading(false);
                return;
            }

            // For each plan, fetch workouts
            const plansWithWorkouts = await Promise.all(plansData.map(async (plan) => {
                const { data: workoutsData } = await supabase
                    .from('workouts')
                    .select('*, workout_exercises(count)')
                    .eq('plan_id', plan.id);

                return {
                    ...plan,
                    workouts: workoutsData?.map(w => ({
                        ...w,
                        count_exercises: w.workout_exercises[0]?.count || 0
                    })) || []
                };
            }));

            setPlans(plansWithWorkouts);
            setLoading(false);
        };

        fetchWorkouts();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Meus Treinos</h1>
                <p className="text-gray-400 mt-1">Acesse seus planos e rotinas de exercícios.</p>
            </div>

            {loading ? (
                <div className="text-gray-500">Carregando treinos...</div>
            ) : plans.length === 0 ? (
                <div className="p-12 border border-dashed border-gray-800 rounded-xl text-center">
                    <Dumbbell className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">Nenhum treino encontrado</h3>
                    <p className="text-gray-500 mt-2">Seu treinador ainda não atribuiu um plano para você.</p>
                </div>
            ) : (
                <div className="space-y-10">
                    {plans.map(plan => (
                        <div key={plan.id} className="space-y-4">
                            <div className="flex items-end justify-between border-b border-gray-800 pb-2">
                                <div>
                                    <span className="text-xs font-bold text-brand-500 uppercase tracking-wider bg-brand-500/10 px-2 py-1 rounded">
                                        Plano Ativo
                                    </span>
                                    <h2 className="text-2xl font-bold text-white mt-3">{plan.name}</h2>
                                    <p className="text-gray-400 text-sm max-w-2xl">{plan.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {plan.workouts.map(workout => (
                                    <Link
                                        key={workout.id}
                                        href={`/client/workouts/${workout.id}`}
                                        className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-brand-500/50 transition-all hover:bg-gray-800"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-gray-950 rounded-lg group-hover:bg-gray-900 transition-colors">
                                                <Dumbbell className="w-6 h-6 text-brand-500" />
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-brand-500 transition-colors" />
                                        </div>

                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">{workout.name}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{workout.description}</p>

                                        <div className="flex items-center gap-4 text-xs text-gray-400 font-medium border-t border-gray-800 pt-4 mt-auto">
                                            <div className="flex items-center gap-1">
                                                <CalendarDays className="w-4 h-4" />
                                                <span>Flexível</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>~60 min</span>
                                            </div>
                                            <div className="ml-auto bg-gray-800 px-2 py-1 rounded text-gray-300">
                                                {workout.count_exercises} exercícios
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
