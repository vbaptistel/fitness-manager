export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Dashboard do Treinador</h1>
                <p className="text-gray-400">Bem-vindo de volta, Flávio.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Stats Cards Override */}
                <div className="rounded-lg bg-gray-900 p-6 border border-gray-800">
                    <h3 className="text-sm font-medium text-gray-400">Total de Alunos</h3>
                    <p className="mt-2 text-3xl font-bold text-brand-500">12</p>
                </div>
                <div className="rounded-lg bg-gray-900 p-6 border border-gray-800">
                    <h3 className="text-sm font-medium text-gray-400">Treinos Ativos</h3>
                    <p className="mt-2 text-3xl font-bold text-brand-500">8</p>
                </div>
                <div className="rounded-lg bg-gray-900 p-6 border border-gray-800">
                    <h3 className="text-sm font-medium text-gray-400">Aulas Hoje</h3>
                    <p className="mt-2 text-3xl font-bold text-brand-500">4</p>
                </div>
                <div className="rounded-lg bg-gray-900 p-6 border border-gray-800">
                    <h3 className="text-sm font-medium text-gray-400">Receita (Mês)</h3>
                    <p className="mt-2 text-3xl font-bold text-green-500">R$ 4.2k</p>
                </div>
            </div>

            {/* Recent Activity Section Placeholder */}
            <div className="rounded-lg bg-gray-900 border border-gray-800">
                <div className="p-6">
                    <h3 className="text-lg font-medium text-white">Atividades Recentes</h3>
                    <div className="mt-4 text-gray-400">
                        <p>Nenhuma atividade recente encontrada.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}