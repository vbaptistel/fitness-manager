'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { createClient } from '@/utils/supabase/client';

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

type TimeSlot = {
    id: string;
    time: string;
    available: boolean;
};

// Helper functions can be moved here or kept simple


export default function SchedulePage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const supabase = createClient();

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleDateClick = (day: number) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        // Only allow future dates
        if (newDate < new Date(new Date().setHours(0, 0, 0, 0))) return;

        setSelectedDate(newDate);
        setSelectedSlot(null);
    };

    const [occupiedSlots, setOccupiedSlots] = useState<string[]>([]);

    useEffect(() => {
        const fetchOccupiedSlots = async (date: Date) => {
            if (!date) return;

            // Format date for query: start of day to end of day in UTC
            const start = new Date(date);
            start.setHours(0, 0, 0, 0);
            const end = new Date(date);
            end.setHours(23, 59, 59, 999);

            const { data } = await supabase
                .from('appointments')
                .select('start_time')
                .gte('start_time', start.toISOString())
                .lte('start_time', end.toISOString());

            if (data) {
                setOccupiedSlots(data.map(d => new Date(d.start_time).toISOString()));
            }
        };

        if (selectedDate) {
            fetchOccupiedSlots(selectedDate);
        }
    }, [selectedDate, supabase]);

    const generateSlots = (date: Date): TimeSlot[] => {
        const slots: TimeSlot[] = [];
        const startHour = 8;
        const endHour = 18;

        // Simple logic: if a slot exists in occupiedSlots (matched by hour), mark unavailable
        // Note: In production compare ISO strings carefully or use range overlaps

        for (let h = startHour; h < endHour; h++) {
            const slotDate = new Date(date);
            slotDate.setHours(h, 0, 0, 0);
            const iso = slotDate.toISOString();

            // Check if any appointment starts at this time
            // This is a naive check (exact start time match)
            // Real implementation should check ranges
            const isOccupied = occupiedSlots.some(occ => {
                const occDate = new Date(occ);
                return occDate.getHours() === h;
            });

            slots.push({
                id: iso,
                time: `${h}:00`,
                available: !isOccupied && Math.random() > 0.1 // Random chance of "busy" too for realism
            });
        }
        return slots;
    };

    const handleBooking = async () => {
        if (!selectedDate || !selectedSlot) return;

        setLoading(true);

        // Get current user
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert('Erro: Usuário não autenticado');
            setLoading(false);
            return;
        }

        const startTime = new Date(selectedSlot.id);
        const endTime = new Date(startTime);
        endTime.setHours(startTime.getHours() + 1); // 1 hour duration

        const { error } = await supabase.from('appointments').insert({
            user_id: user.id,
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            status: 'scheduled'
        });

        setLoading(false);

        if (error) {
            console.error(error);
            alert('Erro ao agendar. Tente novamente.');
        } else {
            setSuccess(true);
        }
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
        const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
        const days = [];

        // Empty cells for days before start of month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            const isToday = today.toDateString() === date.toDateString();
            const isPast = date < today;

            days.push(
                <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    disabled={isPast}
                    className={clsx(
                        'h-10 w-10 text-sm font-medium rounded-full transition-all flex items-center justify-center',
                        isSelected && 'bg-brand-600 text-white shadow-lg shadow-brand-500/30',
                        !isSelected && !isPast && 'text-gray-300 hover:bg-gray-800',
                        !isSelected && isPast && 'text-gray-600 cursor-not-allowed',
                        isToday && !isSelected && 'border border-brand-500 text-brand-500'
                    )}
                >
                    {day}
                </button>
            );
        }
        return days;
    };

    if (success) {
        return (
            <div className="max-w-md mx-auto mt-20 text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-white">Agendamento Confirmado!</h2>
                <p className="text-gray-400">
                    {selectedDate?.toLocaleDateString('pt-BR')} às {selectedSlot?.time}
                </p>
                <button
                    onClick={() => {
                        setSuccess(false);
                        setSelectedSlot(null);
                        setSelectedDate(null);
                    }}
                    className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                    Agendar Outro
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Agendar Consulta</h1>
                <p className="text-gray-400 mt-1">Selecione o melhor dia e horário para seu atendimento.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Calendar Section */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-lg font-semibold text-white">
                            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h2>
                        <button onClick={handleNextMonth} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-y-2 justify-items-center mb-2">
                        {DAYS.map(day => (
                            <span key={day} className="text-xs font-medium text-gray-500 uppercase">{day}</span>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-y-2 justify-items-center">
                        {renderCalendar()}
                    </div>
                </div>

                {/* Time Slots Section */}
                <div className="space-y-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 min-h-[400px]">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-brand-500" />
                            Horários Disponíveis
                            {selectedDate && <span className="text-sm font-normal text-gray-400 ml-2">({selectedDate.toLocaleDateString('pt-BR')})</span>}
                        </h3>

                        {!selectedDate ? (
                            <div className="h-40 flex items-center justify-center text-gray-500 text-sm">
                                Selecione uma data para ver os horários
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-3">
                                {generateSlots(selectedDate).map((slot) => (
                                    <button
                                        key={slot.id}
                                        disabled={!slot.available}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={clsx(
                                            'py-2 px-3 text-sm font-medium rounded-lg border transition-all',
                                            selectedSlot?.id === slot.id
                                                ? 'bg-brand-600 border-brand-600 text-white'
                                                : slot.available
                                                    ? 'border-gray-700 text-gray-300 hover:border-brand-500 hover:text-brand-500'
                                                    : 'border-gray-800 text-gray-700 cursor-not-allowed bg-gray-900/50'
                                        )}
                                    >
                                        {slot.time}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        disabled={!selectedDate || !selectedSlot || loading}
                        onClick={handleBooking}
                        className={clsx(
                            "w-full py-4 rounded-xl text-white font-bold text-lg transition-all shadow-lg",
                            (!selectedDate || !selectedSlot || loading)
                                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                                : "bg-brand-600 hover:bg-brand-700 shadow-brand-500/20 active:scale-[0.98]"
                        )}
                    >
                        {loading ? 'Confirmando...' : 'Confirmar Agendamento'}
                    </button>
                </div>
            </div>
        </div>
    );
}
