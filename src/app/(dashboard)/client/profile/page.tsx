'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { Save, User as UserIcon, Ruler, Weight, Calendar, Mail, Phone, Target } from 'lucide-react';
import { clsx } from 'clsx';

type Profile = {
    id: string;
    full_name: string | null;
    phone: string | null;
    birth_date: string | null;
    height_cm: number | null;
    weight_kg: number | null;
    gender: 'M' | 'F' | 'Other' | null;
    goals: string | null;
};

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string; } | null>(null);

    const supabase = createClient();

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error && error.code !== 'PGRST116') {
                    console.error('Error fetching profile:', error);
                }

                if (data) {
                    setProfile(data);
                } else {
                    // If no profile exists yet (migration applied after user creation), 
                    // we can init empty state based on auth metadata
                    setProfile({
                        id: user.id,
                        full_name: user.user_metadata.full_name || '',
                        phone: null,
                        birth_date: null,
                        height_cm: null,
                        weight_kg: null,
                        gender: null,
                        goals: null
                    });
                }
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !profile) return;

        setSaving(true);
        setMessage(null);

        const { error } = await supabase
            .from('profiles')
            .upsert({
                ...profile,
                updated_at: new Date().toISOString()
            });

        if (error) {
            console.error('Error updating profile:', error);
            setMessage({ type: 'error', text: 'Erro ao salvar perfil. Tente novamente.' });
        } else {
            setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });

            // Update auth metadata if name changed (optional but good for consistency)
            if (profile.full_name !== user.user_metadata.full_name) {
                await supabase.auth.updateUser({
                    data: { full_name: profile.full_name }
                });
            }
        }
        setSaving(false);
    };

    if (loading) {
        return <div className="p-8 text-gray-500">Carregando perfil...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Meu Perfil</h1>
                <p className="text-gray-400 mt-1">Gerencie suas informações pessoais e objetivos.</p>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Avatar & Main Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
                        <div className="w-24 h-24 bg-brand-900/50 rounded-full mx-auto flex items-center justify-center mb-4 border-2 border-brand-500/20">
                            <UserIcon className="w-10 h-10 text-brand-500" />
                        </div>
                        <h2 className="text-xl font-bold text-white">{profile?.full_name || 'Usuário'}</h2>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
                        <h3 className="font-semibold text-white mb-4">Resumo Físico</h3>

                        <div className="flex items-center justify-between p-3 bg-gray-950 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Weight className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-400 text-sm">Peso Atual</span>
                            </div>
                            <span className="text-white font-mono font-bold">{profile?.weight_kg || '-'} kg</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-950 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Ruler className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-400 text-sm">Altura</span>
                            </div>
                            <span className="text-white font-mono font-bold">{profile?.height_cm || '-'} cm</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-950 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Target className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-400 text-sm">IMC (Est.)</span>
                            </div>
                            <span className="text-white font-mono font-bold">
                                {profile?.weight_kg && profile?.height_cm
                                    ? (profile.weight_kg / ((profile.height_cm / 100) ** 2)).toFixed(1)
                                    : '-'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Edit Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-6">Informações Pessoais</h3>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Nome Completo</label>
                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                        <input
                                            type="text"
                                            value={profile?.full_name || ''}
                                            onChange={e => setProfile(prev => prev ? ({ ...prev, full_name: e.target.value }) : null)}
                                            className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
                                            placeholder="Seu nome"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                        <input
                                            type="email"
                                            value={user?.email || ''}
                                            disabled
                                            className="w-full bg-gray-950/50 border border-gray-800 rounded-lg py-2.5 pl-10 pr-4 text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Telefone / WhatsApp</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                        <input
                                            type="tel"
                                            value={profile?.phone || ''}
                                            onChange={e => setProfile(prev => prev ? ({ ...prev, phone: e.target.value }) : null)}
                                            className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
                                            placeholder="(11) 99999-9999"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Data de Nascimento</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                        <input
                                            type="date"
                                            value={profile?.birth_date || ''}
                                            onChange={e => setProfile(prev => prev ? ({ ...prev, birth_date: e.target.value }) : null)}
                                            className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-800">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Peso (kg)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={profile?.weight_kg || ''}
                                        onChange={e => setProfile(prev => prev ? ({ ...prev, weight_kg: parseFloat(e.target.value) || null }) : null)}
                                        className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2.5 px-4 text-white focus:ring-2 focus:ring-brand-500 outline-none"
                                        placeholder="0.0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Altura (cm)</label>
                                    <input
                                        type="number"
                                        value={profile?.height_cm || ''}
                                        onChange={e => setProfile(prev => prev ? ({ ...prev, height_cm: parseInt(e.target.value) || null }) : null)}
                                        className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2.5 px-4 text-white focus:ring-2 focus:ring-brand-500 outline-none"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Gênero</label>
                                    <select
                                        value={profile?.gender || ''}
                                        onChange={e => setProfile(prev => prev ? ({ ...prev, gender: e.target.value as any }) : null)}
                                        className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2.5 px-4 text-white focus:ring-2 focus:ring-brand-500 outline-none appearance-none"
                                    >
                                        <option value="">Selecione</option>
                                        <option value="M">Masculino</option>
                                        <option value="F">Feminino</option>
                                        <option value="Other">Outro</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-800">
                                <label className="block text-sm font-medium text-gray-400 mb-1">Objetivo Principal</label>
                                <textarea
                                    value={profile?.goals || ''}
                                    onChange={e => setProfile(prev => prev ? ({ ...prev, goals: e.target.value }) : null)}
                                    rows={3}
                                    className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2.5 px-4 text-white focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                                    placeholder="Ex: Ganhar massa muscular, perder gordura, melhorar condicionamento..."
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                            {message && (
                                <div className={clsx(
                                    "text-sm px-3 py-1 rounded-full",
                                    message.type === 'success' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                )}>
                                    {message.text}
                                </div>
                            )}
                            {!message && <div></div>} {/* Spacer */}

                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save className="w-4 h-4" />
                                {saving ? 'Salvando...' : 'Salvar Alterações'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
