'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Dumbbell, History, Calendar } from 'lucide-react';

type Profile = {
    id: string;
    full_name: string | null;
    phone: string | null;
    goals: string | null;
    height_cm: number | null;
    weight_kg: number | null;
    gender: string | null;
    birth_date: string | null;
    created_at: string;
    status: 'active' | 'inactive';
};

export default function ClientDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const [client, setClient] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    const fetchClientDetails = async () => {
        if (!id) return;

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching client details:', error);
            // router.push('/admin/clients'); // Optional redirect on error
        } else {
            setClient(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchClientDetails();
    }, [id, router, supabase]);

    const handleToggleStatus = async () => {
        if (!client) return;
        const newStatus = client.status === 'active' ? 'inactive' : 'active';

        const { error } = await supabase
            .from('profiles')
            .update({ status: newStatus })
            .eq('id', client.id);

        if (error) {
            alert('Erro ao atualizar status.');
            console.error(error);
        } else {
            setClient({ ...client, status: newStatus });
        }
    };

    if (!client) {
        return <div className="p-8 text-center text-gray-400">Aluno não encontrado.</div>;
    }

    return (
        <div className="space-y-6">
            <button
                onClick={() => router.back()}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
            </button>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-white">{client.full_name || 'Aluno sem nome'}</h1>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${client.status === 'active'
                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                : 'bg-red-500/10 text-red-500 border-red-500/20'
                            }`}>
                            {client.status === 'active' ? 'Ativo' : 'Inativo'}
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">Cadastrado em {new Date(client.created_at).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleToggleStatus}
                        className={`px-4 py-2 rounded-md font-semibold transition-colors flex items-center border ${client.status === 'active'
                                ? 'border-red-500 text-red-500 hover:bg-red-500/10'
                                : 'border-green-500 text-green-500 hover:bg-green-500/10'
                            }`}
                    >
                        {client.status === 'active' ? 'Desativar Aluno' : 'Ativar Aluno'}
                    </button>
                    <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-md font-semibold transition-colors flex items-center">
                        <Dumbbell className="w-4 h-4 mr-2" />
                        Criar Treino
                    </button>
                    {/* Add more actions here */}
                </div>
            </div>

            {/* Profile Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Physical Info */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                    <h3 className="text-lg font-medium text-white mb-4 border-b border-gray-800 pb-2">Dados Físicos</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Altura:</span>
                            <span className="text-white">{client.height_cm ? `${client.height_cm} cm` : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Peso Atual:</span>
                            <span className="text-white">{client.weight_kg ? `${client.weight_kg} kg` : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Gênero:</span>
                            <span className="text-white">{client.gender === 'M' ? 'Masculino' : client.gender === 'F' ? 'Feminino' : client.gender || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Nascimento:</span>
                            <span className="text-white">{client.birth_date ? new Date(client.birth_date).toLocaleDateString('pt-BR') : '-'}</span>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                    <h3 className="text-lg font-medium text-white mb-4 border-b border-gray-800 pb-2">Contato & Objetivo</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between flex-wrap gap-2">
                            <span className="text-gray-400">Telefone:</span>
                            <span className="text-white">{client.phone || '-'}</span>
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                            <span className="text-gray-400">Objetivo Principal:</span>
                            <p className="text-white bg-gray-950 p-2 rounded border border-gray-800 min-h-[60px]">
                                {client.goals || 'Nenhum objetivo definido.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                    <h3 className="text-lg font-medium text-white mb-4 border-b border-gray-800 pb-2">Acesso Rápido</h3>
                    <div className="space-y-3">
                        <Link
                            href={`/admin/clients/${id}/history`}
                            className="flex items-center justify-between p-3 rounded bg-gray-950 hover:bg-gray-800 transition-colors border border-gray-800 group"
                        >
                            <span className="text-gray-300 group-hover:text-white flex items-center">
                                <History className="w-4 h-4 mr-2" />
                                Ver Histórico/Evolução
                            </span>
                        </Link>
                        <Link
                            href={`/admin/clients/${id}/workouts`}
                            className="flex items-center justify-between p-3 rounded bg-gray-950 hover:bg-gray-800 transition-colors border border-gray-800 group"
                        >
                            <span className="text-gray-300 group-hover:text-white flex items-center">
                                <Dumbbell className="w-4 h-4 mr-2" />
                                Ver Treinos
                            </span>
                        </Link>
                        <Link
                            href={`/admin/clients/${id}/schedule`}
                            className="flex items-center justify-between p-3 rounded bg-gray-950 hover:bg-gray-800 transition-colors border border-gray-800 group"
                        >
                            <span className="text-gray-300 group-hover:text-white flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                Ver Agendamentos
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Recent Activity or Notes could go here */}
        </div>
    );
}