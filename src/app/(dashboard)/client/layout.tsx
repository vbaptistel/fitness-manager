import ClientSidebar from '@/components/dashboard/ClientSidebar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-950 flex transition-colors">
            <ClientSidebar />
            <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto h-screen">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
