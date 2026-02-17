'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

type Profile = {
    id: string;
    full_name: string | null;
    phone: string | null;
    goals: string | null;
    created_at: string;
};

export default function AdminClientsPage() {
    const [clients, setClients] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const supabase = createClient();

    useEffect(() => {
        const fetchClients = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('full_name', { ascending: true });
            
            if (error) {
                console.error('Error fetching clients:', error);
            } else {
                setClients(data || []);
            }
            setLoading(false);
        };

        fetchClients();
    }, []);

    const filteredClients = clients.filter(client => 
        client.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone?.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Gerenciar Alunos</h1>
                    <p className="text-gray-400">Visualize e gerencie seus alunos.</p>
                </div>
                {/* 
                <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-md font-semibold transition-colors">
                    Novo Aluno
                </button>
                */}
            </div>

            {/* Filters/Search */}
            <div className="flex gap-4">
                <input 
                    type="text" 
                    placeholder="Buscar aluno por nome ou telefone..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-900 border border-gray-800 text-white rounded-md px-4 py-2 w-full max-w-md focus:ring-2 focus:ring-brand-500 outline-none"
                    disabled={loading}
                />
            </div>

            {/* Clients List */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-400">Carregando alunos...</div>
                ) : filteredClients.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">Nenhum aluno encontrado.</div>
                ) : (
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-gray-950 text-gray-200 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Nome</th>
                                <th className="px-6 py-4">Telefone</th>
                                <th className="px-6 py-4">Objetivo</th>
                                <th className="px-6 py-4">Cadastro</th>
                                <th className="px-6 py-4">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filteredClients.map((client) => (
                                <tr key={client.id} className="hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 text-white font-medium">
                                        {client.full_name || 'Sem nome'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {client.phone || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {client.goals || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(client.created_at).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link 
                                            href={`/admin/clients/${client.id}`}
                                            className="text-brand-500 hover:text-brand-400 hover:underline font-medium"
                                        >
                                            Ver Detalhes
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}