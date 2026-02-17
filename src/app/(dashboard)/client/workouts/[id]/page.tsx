'use client';

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Clock, Info, CheckCircle } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

// Types
type WorkoutExercise = {
    id: string;
    exercise: {
        name: string;
        muscle_group: string;
        video_url?: string;
    };
    sets: number;
    reps: string;
    rpe: number;
    rest_time_seconds: number;
    notes?: string;
};

type WorkoutDetail = {
    id: string;
    name: string;
    description: string;
    exercises: WorkoutExercise[];
};

export default function WorkoutDetailPage() {
    const params = useParams();
    // const router = useRouter();
    const [workout, setWorkout] = useState<WorkoutDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [completedExercises, setCompletedExercises] = useState<string[]>([]);

    // Mock data fallback since we don't have inserted data yet
    // Moved inside useEffect to avoid dependency issues or wrapped in useMemo
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    const MOCK_WORKOUT: WorkoutDetail = {
        id: 'w-1',
        name: "Treino A - Perna (Foco Quadríceps)",
        description: "Agachamento pesado logo no início. Focar bem na cadência.",
        exercises: [
            {
                id: 'ex-1',
                exercise: { name: 'Agachamento Livre', muscle_group: 'legs' },
                sets: 4,
                reps: '6-8',
                rpe: 9,
                rest_time_seconds: 180,
                notes: 'Descer até quebrar a paralela.'
            },
            {
                id: 'ex-2',
                exercise: { name: 'Leg Press 45', muscle_group: 'legs' },
                sets: 3,
                reps: '10-12',
                rpe: 8,
                rest_time_seconds: 120
            },
            {
                id: 'ex-3',
                exercise: { name: 'Cadeira Extensora', muscle_group: 'legs' },
                sets: 3,
                reps: '15-20',
                rpe: 10,
                rest_time_seconds: 60,
                notes: 'Drop-set na última série.'
            },
            {
                id: 'ex-4',
                exercise: { name: 'Stiff c/ Halteres', muscle_group: 'legs' },
                sets: 3,
                reps: '10-12',
                rpe: 8,
                rest_time_seconds: 90
            },
            {
                id: 'ex-5',
                exercise: { name: 'Panturrilha Sentado', muscle_group: 'legs' },
                sets: 4,
                reps: '15-20',
                rpe: 9,
                rest_time_seconds: 60
            },
        ]
    };

    useEffect(() => {
        const fetchWorkout = async () => {
            if (!params.id) return;

            // If ID is mock, return mock
            if (params.id.toString().startsWith('w-')) {
                setWorkout(MOCK_WORKOUT);
                setLoading(false);
                return;
            }

            const supabase = createClient();
            const { data } = await supabase
                .from('workouts')
                .select(`
                    id,
                    name,
                    description,
                    workout_exercises (
                        id,
                        order_index,
                        sets,
                        reps,
                        rpe,
                        rest_time_seconds,
                        notes,
                        exercises (
                            name,
                            muscle_group,
                            video_url
                        )
                    )
                `)
                .eq('id', params.id)
                .single();

            if (data) {
                // Map supabase structure to our type
                const formatted: WorkoutDetail = {
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    exercises: data.workout_exercises
                        .sort((a: { order_index: number; }, b: { order_index: number; }) => a.order_index - b.order_index)
                        .map((we: any) => ({
                            id: we.id,
                            sets: we.sets,
                            reps: we.reps,
                            rpe: we.rpe,
                            rest_time_seconds: we.rest_time_seconds,
                            notes: we.notes,
                            exercise: {
                                name: we.exercises.name,
                                muscle_group: we.exercises.muscle_group,
                                video_url: we.exercises.video_url
                            }
                        }))
                };
                setWorkout(formatted);
            }
            setLoading(false);
        };

        fetchWorkout();
    }, [params.id]);

    const toggleExercise = (id: string) => {
        setCompletedExercises(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );
    };

    if (loading) return <div className="p-8 text-gray-500">Carregando treino...</div>;
    if (!workout) return <div className="p-8 text-gray-500">Treino não encontrado.</div>;

    const progress = Math.round((completedExercises.length / workout.exercises.length) * 100);

    return (
        <div className="max-w-3xl mx-auto pb-20">
            {/* Header */}
            <div className="mb-8">
                <Link href="/client/workouts" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para lista
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">{workout.name}</h1>
                        <p className="text-gray-400">{workout.description}</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 bg-gray-900 rounded-full h-2 w-full overflow-hidden">
                    <div
                        className="bg-brand-500 h-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-right text-xs text-brand-400 mt-2 font-medium">{progress}% Concluído</p>
            </div>

            {/* Exercises List */}
            <div className="space-y-4">
                {workout.exercises.map((item, index) => {
                    const isCompleted = completedExercises.includes(item.id);

                    return (
                        <div
                            key={item.id}
                            onClick={() => toggleExercise(item.id)}
                            className={clsx(
                                "group relative overflow-hidden rounded-xl border transition-all cursor-pointer select-none",
                                isCompleted
                                    ? "bg-brand-900/10 border-brand-500/50"
                                    : "bg-gray-900 border-gray-800 hover:border-gray-700"
                            )}
                        >
                            {/* Selection Indicator */}
                            <div className={clsx(
                                "absolute left-0 top-0 bottom-0 w-1 transition-colors",
                                isCompleted ? "bg-brand-500" : "bg-transparent group-hover:bg-gray-700"
                            )} />

                            <div className="p-5 pl-7 flex items-start gap-4">
                                {/* Check Circle */}
                                <div className="mt-1">
                                    {isCompleted ? (
                                        <CheckCircle className="w-6 h-6 text-brand-500 fill-brand-900/20" />
                                    ) : (
                                        <div className="w-6 h-6 rounded-full border-2 border-gray-700 group-hover:border-gray-500 transition-colors" />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className={clsx(
                                            "font-bold text-lg mb-1 transition-colors",
                                            isCompleted ? "text-brand-100 line-through decoration-brand-500/50" : "text-white"
                                        )}>
                                            {item.exercise.name}
                                        </h3>
                                        <span className="text-xs font-mono text-gray-500 bg-gray-950 px-2 py-1 rounded">
                                            #{index + 1}
                                        </span>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
                                        <div className="bg-gray-950/50 p-2 rounded-lg">
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Séries</p>
                                            <p className="text-lg font-mono font-medium text-white">{item.sets}</p>
                                        </div>
                                        <div className="bg-gray-950/50 p-2 rounded-lg">
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Reps</p>
                                            <p className="text-lg font-mono font-medium text-white">{item.reps}</p>
                                        </div>
                                        <div className="bg-gray-950/50 p-2 rounded-lg">
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">RPE</p>
                                            <p className="text-lg font-mono font-medium text-white">{item.rpe}</p>
                                        </div>
                                        <div className="bg-gray-950/50 p-2 rounded-lg flex flex-col justify-center">
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <Clock className="w-3 h-3" />
                                                <span className="text-sm font-bold">{item.rest_time_seconds}s</span>
                                            </div>
                                        </div>
                                    </div>

                                    {item.notes && (
                                        <div className="mt-3 flex items-start gap-2 text-sm text-yellow-500/80 bg-yellow-500/5 p-3 rounded-lg border border-yellow-500/10">
                                            <Info className="w-4 h-4 mt-0.5 shrink-0" />
                                            <p>{item.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Finish Button */}
            <div className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96">
                <button
                    disabled={progress < 100}
                    className={clsx(
                        "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl transition-all",
                        progress === 100
                            ? "bg-green-500 hover:bg-green-600 text-black shadow-green-500/20 translate-y-0"
                            : "bg-gray-800 text-gray-500 translate-y-20 opacity-0 pointer-events-none"
                    )}
                >
                    <CheckCircle className="w-5 h-5" />
                    Finalizar Treino
                </button>
            </div>
        </div>
    );
}
