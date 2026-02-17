export default function AdminClientsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Gerenciar Alunos</h1>
                    <p className="text-gray-400">Visualize e gerencie seus alunos.</p>
                </div>
                <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-md font-semibold transition-colors">
                    Novo Aluno
                </button>
            </div>

            {/* Filters/Search Placeholder */}
            <div className="flex gap-4">
                <input 
                    type="text" 
                    placeholder="Buscar aluno..." 
                    className="bg-gray-900 border border-gray-800 text-white rounded-md px-4 py-2 w-full max-w-md focus:ring-2 focus:ring-brand-500 outline-none"
                />
            </div>

            {/* Clients List */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-gray-950 text-gray-200 uppercase font-medium">
                        <tr>
                            <th className="px-6 py-4">Nome</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Plano</th>
                            <th className="px-6 py-4">Último Treino</th>
                            <th className="px-6 py-4">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        <tr className="hover:bg-gray-800/50 transition-colors">
                            <td className="px-6 py-4 text-white font-medium">Vinicius Baptistel</td>
                            <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">Ativo</span></td>
                            <td className="px-6 py-4">Mensal</td>
                            <td className="px-6 py-4">Hoje, 10:00</td>
                            <td className="px-6 py-4 text-brand-500 hover:underline cursor-pointer">Editar</td>
                        </tr>
                        {/* More rows... */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}