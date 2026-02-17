'use client';

import { useState, useEffect, useCallback } from "react";
import { createClient } from '@/utils/supabase/client';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Plus, Trash2 } from 'lucide-react';

type Measurement = {
    id: string;
    date: string;
    weight: number;
    body_fat: number | null;
    chest: number | null;
    waist: number | null;
    arm_right: number | null;
    thigh_right: number | null;
    calf_right: number | null;
};

export default function HistoryPage() {
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newEntry, setNewEntry] = useState<Partial<Measurement>>({
        date: new Date().toISOString().split('T')[0],
        weight: undefined
    });

    const supabase = createClient();

    const fetchHistory = useCallback(async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
            .from('measurements')
            .select('*')
            .order('date', { ascending: true });

        if (data && data.length > 0) {
            setMeasurements(data);
        } else {
            // Mock data if empty
            setMeasurements([
                { id: '1', date: '2025-01-01', weight: 80, body_fat: 20, chest: 100, waist: 90, arm_right: 35, thigh_right: 60, calf_right: 40 },
                { id: '2', date: '2025-02-01', weight: 78, body_fat: 19, chest: 101, waist: 88, arm_right: 35.5, thigh_right: 61, calf_right: 40 },
                { id: '3', date: '2025-03-01', weight: 76, body_fat: 17, chest: 102, waist: 86, arm_right: 36, thigh_right: 62, calf_right: 41 },
            ]);
        }
        setLoading(false);
    }, [supabase]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const handleAddEntry = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEntry.date || !newEntry.weight) return;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('measurements')
            .insert({
                user_id: user.id,
                ...newEntry
            });

        if (error) {
            alert('Erro ao salvar medida.');
            console.error(error);
        } else {
            setShowForm(false);
            setNewEntry({ date: new Date().toISOString().split('T')[0], weight: undefined });
            fetchHistory();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Deseja excluir este registro?')) return;

        // Check if it's a mock id
        if (id.length < 5) {
            setMeasurements(measurements.filter(m => m.id !== id));
            return;
        }

        const { error } = await supabase
            .from('measurements')
            .delete()
            .eq('id', id);

        if (!error) {
            setMeasurements(measurements.filter(m => m.id !== id));
        }
    };

    if (loading) return <div className="p-8 text-gray-500">Carregando histórico...</div>;

    return (
        <div className="space-y-8 pb-20">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white">Evolução</h1>
                    <p className="text-gray-400 mt-1">Acompanhe seu progresso físico.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg transition-all"
                >
                    <Plus className="w-4 h-4" /> Nova Medida
                </button>
            </div>

            {/* Input Form */}
            {showForm && (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 animate-in slide-in-from-top-4 duration-300">
                    <h3 className="text-lg font-bold text-white mb-4">Adicionar Registro</h3>
                    <form onSubmit={handleAddEntry} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Data</label>
                            <input
                                type="date"
                                required
                                value={newEntry.date}
                                onChange={e => setNewEntry({ ...newEntry, date: e.target.value })}
                                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Peso (kg)</label>
                            <input
                                type="number"
                                step="0.1"
                                required
                                placeholder="0.0"
                                value={newEntry.weight || ''}
                                onChange={e => setNewEntry({ ...newEntry, weight: parseFloat(e.target.value) })}
                                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Gordura (%)</label>
                            <input
                                type="number"
                                step="0.1"
                                placeholder="0.0"
                                value={newEntry.body_fat || ''}
                                onChange={e => setNewEntry({ ...newEntry, body_fat: parseFloat(e.target.value) })}
                                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-white"
                            />
                        </div>

                        {/* More fields could be added here later */}

                        <div className="md:col-span-3 flex justify-end gap-3 mt-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="text-gray-400 hover:text-white px-4 py-2"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg"
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Evolution Chart */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Gráfico de Peso (kg)</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={measurements} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid stroke="#374151" strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="date"
                                stroke="#9CA3AF"
                                tickFormatter={(str) => new Date(str).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} domain={['dataMin - 2', 'dataMax + 2']} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                                formatter={(value: number | undefined) => [`${value} kg`, 'Peso']}
                                labelFormatter={(label) => new Date(label).toLocaleDateString('pt-BR')}
                            />
                            <Line
                                type="monotone"
                                dataKey="weight"
                                stroke="#2563EB"
                                strokeWidth={3}
                                dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, fill: '#fff' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Detailed History Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                    <h3 className="text-lg font-bold text-white">Histórico Detalhado</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-gray-950 text-gray-200 uppercase font-bold text-xs">
                            <tr>
                                <th className="px-6 py-4">Data</th>
                                <th className="px-6 py-4">Peso</th>
                                <th className="px-6 py-4">BF %</th>
                                <th className="px-6 py-4">Cintura</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {measurements.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">
                                        {new Date(item.date).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-6 py-4">{item.weight} kg</td>
                                    <td className="px-6 py-4">{item.body_fat ? `${item.body_fat}%` : '-'}</td>
                                    <td className="px-6 py-4">{item.waist ? `${item.waist} cm` : '-'}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-gray-600 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {measurements.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-600">
                                        Nenhum registro encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
