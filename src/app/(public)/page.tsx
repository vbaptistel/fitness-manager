import { Activity, ArrowRight, Building2, ChevronDown, Dumbbell, Eye, Monitor, Ruler, ScanLine, TreePine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-brand-bg text-brand-text font-sans selection:bg-brand-primary selection:text-white">

            {/* HERO SECTION */}
            <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #020617 0%, #0a1a3a 20%, #0f3577 45%, #1e3a8a 60%, #1a3070 75%, #0a1628 100%)' }}>
                {/* Radial glow behind person */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_65%_60%,rgba(37,99,235,0.35)_0%,rgba(30,58,138,0.15)_40%,transparent_70%)] hidden lg:block" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_80%,rgba(37,99,235,0.25)_0%,transparent_60%)] lg:hidden" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_60%_55%,rgba(59,130,246,0.2)_0%,transparent_60%)] hidden lg:block" />

                <div className="container-custom relative z-10 pt-24 pb-0 sm:pt-28 lg:pt-20 lg:pb-0">
                    <div className="lg:grid lg:grid-cols-[5fr_7fr] lg:gap-12 lg:items-end">
                        {/* Texto */}
                        <div className="space-y-4 sm:space-y-6 animate-fade-in-up lg:pt-16 xl:pt-24 lg:pb-16 text-center lg:text-left flex flex-col items-center lg:items-start">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm font-medium text-white backdrop-blur-sm">
                                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white"></span>
                                </span>
                                VAGAS LIMITADAS
                            </div>

                            <h1 className="text-[2.5rem] font-bold uppercase leading-[0.9] tracking-tighter sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl text-white">
                                MAIS FORTE <br />
                                A CADA DIA <br />
                                COMIGO
                            </h1>

                            <p className="max-w-md mx-auto lg:mx-0 text-sm text-white/60 sm:text-base lg:text-lg font-light tracking-wide leading-relaxed">
                                Treinamento personalizado projetado para ajudar você a construir força, manter a consistência e alcançar resultados duradouros.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-1 sm:pt-2">
                                <Link
                                    href="https://wa.me/5511999999999"
                                    className="group inline-flex items-center justify-center rounded-full bg-brand-accent px-6 py-3 text-sm sm:px-8 sm:py-4 sm:text-base font-bold text-black transition-all hover:bg-yellow-300 hover:scale-105 hover:shadow-lg"
                                >
                                    COMECE AGORA <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>

                        {/* Imagem */}
                        <div className="relative mt-6 sm:mt-10 lg:mt-0 flex justify-center">
                            {/* "500+ Alunos" floating badge - desktop only */}
                            <div className="absolute top-8 right-0 z-20 hidden lg:flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 shadow-lg">
                                <div className="flex -space-x-2">
                                    <div className="h-9 w-9 rounded-full bg-linear-to-br from-blue-300 to-blue-500 border-2 border-white/40 flex items-center justify-center text-xs font-bold text-white">A</div>
                                    <div className="h-9 w-9 rounded-full bg-linear-to-br from-blue-400 to-blue-600 border-2 border-white/40 flex items-center justify-center text-xs font-bold text-white">B</div>
                                    <div className="h-9 w-9 rounded-full bg-linear-to-br from-blue-500 to-blue-700 border-2 border-white/40 flex items-center justify-center text-xs font-bold text-white">C</div>
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-white">500+ Alunos</span>
                            </div>

                            {/* "1000+ Sessões" floating badge */}
                            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 sm:px-6 sm:py-3 shadow-lg">
                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white whitespace-nowrap">1000+ Sessões Concluídas</span>
                            </div>

                            <Image
                                src="/flavio-pose.png"
                                alt="Flávio Di Giovanni"
                                width={600}
                                height={750}
                                className="object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.3)] w-[75%] max-w-[320px] sm:max-w-[400px] lg:w-full lg:max-w-none"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="sobre" className="bg-black py-16 sm:py-24 relative overflow-hidden">
                <div className="container-custom relative z-10">
                    {/* Top row: image + intro text */}
                    <div className="grid gap-10 sm:gap-16 lg:grid-cols-2 lg:items-center">
                        <div className="relative flex justify-center lg:justify-start">
                            <div className="relative aspect-[3/4] w-full max-w-xs sm:max-w-md overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 group">
                                <div className="absolute inset-0 bg-brand-primary/20 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                                <div className="absolute -inset-4 border-2 border-brand-primary/30 z-20 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
                                <Image
                                    src="/flavio-certificados.jpg"
                                    alt="Flávio Di Giovanni"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-6 sm:mb-8 text-3xl text-center lg:text-left font-bold uppercase leading-none tracking-tighter text-white sm:text-5xl lg:text-7xl">
                                Mais de 20 anos <br />
                                <span className="text-brand-primary">transformando</span> <br />
                                vidas.
                            </h2>

                            <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed mb-6">
                                Bem-vindo a uma jornada de saúde e bem-estar guiada por mais de duas décadas de expertise. Como profissional, minha trajetória é marcada por uma sólida formação acadêmica e uma paixão incessante por transformar vidas.
                            </p>
                            <p className="text-lg text-gray-400 font-light leading-relaxed">
                                Minha abordagem adaptativa garante que todos possam acessar os benefícios de um estilo de vida ativo — com ciência, dedicação e acompanhamento personalizado.
                            </p>

                            <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6 border-t border-white/10 pt-6 sm:pt-8">
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-brand-primary mb-1 sm:mb-2">20+</h3>
                                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500">Anos de<br />Experiência</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-brand-primary mb-1 sm:mb-2">500+</h3>
                                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500">Alunos<br />Satisfeitos</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-brand-primary mb-1 sm:mb-2">1000+</h3>
                                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500">Sessões<br />Concluídas</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom row: where I work cards */}
                    <div className="mt-12 sm:mt-20">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 sm:mb-6">Onde atuo</p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all">
                                <Dumbbell className="h-6 w-6 text-brand-primary mb-3" />
                                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">Academias</h4>
                                <p className="text-xs text-gray-500">Treinos presenciais com acompanhamento completo</p>
                            </div>
                            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all">
                                <Building2 className="h-6 w-6 text-brand-primary mb-3" />
                                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">Empresas</h4>
                                <p className="text-xs text-gray-500">Programas de saúde e qualidade de vida corporativa</p>
                            </div>
                            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all">
                                <TreePine className="h-6 w-6 text-brand-primary mb-3" />
                                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">Ar Livre</h4>
                                <p className="text-xs text-gray-500">Treinamento funcional em espaços ao ar livre</p>
                            </div>
                            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all">
                                <Monitor className="h-6 w-6 text-brand-primary mb-3" />
                                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">Online</h4>
                                <p className="text-xs text-gray-500">Consultoria virtual para qualquer lugar do mundo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BODYGEE / TECHNOLOGY SECTION */}
            <section id="tecnologia" className="bg-neutral-950 py-16 sm:py-32 relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-150 h-150 bg-brand-primary/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="container-custom relative z-10 text-center lg:text-left">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
                        <ScanLine className="h-4 w-4" />
                        TECNOLOGIA EXCLUSIVA
                    </div>

                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center text-left">
                        <div>
                            <h2 className="mb-6 sm:mb-8 text-3xl text-center lg:text-left font-bold uppercase tracking-tighter text-white sm:text-5xl lg:text-7xl">
                                ESCANEAMENTO <br />
                                <span className="text-brand-primary">CORPORAL 3D</span>
                            </h2>

                            <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed mb-6 sm:mb-8 max-w-lg">
                                Utilizamos o <strong className="text-white font-semibold">Bodygee</strong>, líder europeu em escaneamento 3D, para acompanhar sua evolução com precisão científica. Esqueça fitas métricas e fotos — visualize sua transformação em um avatar 3D fotorrealista.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:border-brand-primary/50 transition-colors">
                                    <Activity className="h-6 w-6 text-brand-primary mb-3" />
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">Composição Corporal</h4>
                                    <p className="text-xs text-gray-500">Gordura corporal, IMC, RCQ e TMR com métodos cientificamente comprovados</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:border-brand-primary/50 transition-colors">
                                    <Eye className="h-6 w-6 text-brand-primary mb-3" />
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">Avatar 3D Realista</h4>
                                    <p className="text-xs text-gray-500">Mais de 100.000 pontos de dados geram seu avatar fotorrealista</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:border-brand-primary/50 transition-colors">
                                    <Ruler className="h-6 w-6 text-brand-primary mb-3" />
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">Precisão de 0,5cm</h4>
                                    <p className="text-xs text-gray-500">Monitoramento visual e numérico com altíssima precisão</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:border-brand-primary/50 transition-colors">
                                    <ScanLine className="h-6 w-6 text-brand-primary mb-3" />
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">Rápido e Seguro</h4>
                                    <p className="text-xs text-gray-500">Escaneamento não invasivo em segundos com sensores de profundidade</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                <Link
                                    href="https://wa.me/5511999999999"
                                    className="inline-flex items-center justify-center rounded-full bg-brand-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-500 hover:scale-105 hover:shadow-lg hover:shadow-brand-primary/30"
                                >
                                    AGENDAR MEU SCAN <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                                <a
                                    href="https://www.bodygee.com/br/fitness"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-primary transition-colors font-medium"
                                >
                                    Saiba mais sobre o Bodygee <ArrowRight className="h-3 w-3" />
                                </a>
                            </div>
                        </div>

                        {/* Right side — Visual with Bodygee images */}
                        <div className="relative flex flex-col gap-6">
                            {/* Main scan image */}
                            <div className="relative overflow-hidden rounded-3xl border border-white/10 group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                                <Image
                                    src="/bodygee-scan.webp"
                                    alt="Escaneamento corporal 3D com Bodygee"
                                    width={600}
                                    height={400}
                                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute bottom-4 left-4 z-20">
                                    <p className="text-xs text-gray-400 uppercase tracking-widest">Powered by</p>
                                    <p className="text-lg font-bold text-white tracking-wider">BODYGEE</p>
                                </div>
                            </div>

                            {/* Bottom row — 3 smaller images */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-square group">
                                    <Image
                                        src="/bodygee-app.webp"
                                        alt="Aplicativo Bodygee para acompanhamento"
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                    <div className="absolute bottom-2 left-2 right-2 z-10">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-white">App Cliente</p>
                                    </div>
                                </div>
                                <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-square group">
                                    <Image
                                        src="/bodygee-body-scan.webp"
                                        alt="Avatar 3D fotorrealista gerado pelo Bodygee"
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                    <div className="absolute bottom-2 left-2 right-2 z-10">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-white">Avatar 3D</p>
                                    </div>
                                </div>
                                <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-square group">
                                    <Image
                                        src="/bodygee-ipad.webp"
                                        alt="Dashboard de análise corporal no iPad"
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                    <div className="absolute bottom-2 left-2 right-2 z-10">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-white">Dashboard</p>
                                    </div>
                                </div>
                            </div>

                            {/* App callout */}
                            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10">
                                    <Image
                                        src="/bodygee-app.webp"
                                        alt="Aplicativo Bodygee para acompanhamento"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white uppercase tracking-wide">App do Cliente</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Acompanhe seu progresso em 3D pelo celular, a qualquer hora</p>
                                </div>
                            </div>

                            {/* Stats bar */}
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-2xl font-bold text-brand-primary">500k+</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Scans realizados</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-brand-primary">0,5cm</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Precisão</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-brand-primary">100k+</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Pontos de dados</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PLANS SECTION */}
            <section id="planos" className="bg-neutral-950 py-16 sm:py-32 relative">
                <div className="container-custom relative z-10">
                    <div className="mb-12 sm:mb-20 text-center">
                        <h2 className="text-3xl font-bold uppercase tracking-tighter sm:text-5xl lg:text-7xl">
                            PLANOS FEITOS <br /> PARA <span className="text-brand-primary">SEUS OBJETIVOS</span>
                        </h2>
                    </div>

                    <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
                        {/* PLAN 1 */}
                        <div className="group relative flex flex-col rounded-3xl border border-white/10 bg-black p-8 transition-all hover:-translate-y-2 hover:border-brand-primary">
                            <div className="mb-4 text-brand-primary font-bold tracking-widest uppercase text-sm">Iniciante</div>
                            <h3 className="mb-6 text-4xl font-bold uppercase tracking-tight text-white group-hover:text-brand-primary transition-colors">STARTER PLAN</h3>
                            <div className="mb-8 flex items-baseline gap-1">
                                <span className="text-4xl font-bold">R$150</span>
                                <span className="text-sm text-gray-500">/mês</span>
                            </div>

                            <ul className="mb-12 space-y-4 flex-1">
                                {['Treino Mensal', 'Acesso ao App', 'Suporte Básico', 'Análise de Execução'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                                        <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link href="#" className="block w-full rounded-full border border-white/20 bg-transparent py-4 text-center text-sm font-bold uppercase hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all tracking-widest">
                                ESCOLHER PLANO
                            </Link>
                        </div>

                        {/* PLAN 2 - FEATURED */}
                        <div className="group relative flex flex-col rounded-3xl border-2 border-brand-primary bg-brand-primary/5 p-8 lg:-mt-8 lg:mb-8 transition-all hover:bg-brand-primary/10">
                            <div className="absolute top-0 right-0 rounded-bl-2xl rounded-tr-3xl bg-brand-primary text-white text-xs font-bold px-4 py-1.5 uppercase tracking-widest">
                                Recomendado
                            </div>
                            <div className="mb-4 text-brand-primary font-bold tracking-widest uppercase text-sm">Intermediário</div>
                            <h3 className="mb-6 text-4xl font-bold uppercase tracking-tight text-white">PRO PLAN</h3>
                            <div className="mb-8 flex items-baseline gap-1">
                                <span className="text-5xl font-bold text-brand-primary">R$250</span>
                                <span className="text-sm text-gray-500">/mês</span>
                            </div>

                            <ul className="mb-12 space-y-4 flex-1">
                                {['Treino Quinzenal', 'Feedback de Vídeo', 'Suporte WhatsApp', 'Guia Nutricional', 'Ajustes de Carga'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-white font-medium">
                                        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link href="#" className="block w-full rounded-full bg-brand-primary py-4 text-center text-sm font-bold uppercase text-white hover:bg-blue-500 transition-all tracking-widest shadow-lg shadow-brand-primary/25">
                                COMEÇAR AGORA
                            </Link>
                        </div>

                        {/* PLAN 3 */}
                        <div className="group relative flex flex-col rounded-3xl border border-white/10 bg-black p-8 transition-all hover:-translate-y-2 hover:border-brand-primary">
                            <div className="mb-4 text-brand-primary font-bold tracking-widest uppercase text-sm">Avançado</div>
                            <h3 className="mb-6 text-4xl font-bold uppercase tracking-tight text-white group-hover:text-brand-primary transition-colors">MAX PLAN</h3>
                            <div className="mb-8 flex items-baseline gap-1">
                                <span className="text-4xl font-bold">R$400</span>
                                <span className="text-sm text-gray-500">/mês</span>
                            </div>

                            <ul className="mb-12 space-y-4 flex-1">
                                {['Personalização Total', 'Periodização Anual', 'Calls Mensais', 'Suporte VIP 24/7', 'Protocolos Avançados'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                                        <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link href="#" className="block w-full rounded-full border border-white/20 bg-transparent py-4 text-center text-sm font-bold uppercase hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all tracking-widest">
                                FALAR COMIGO
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section id="testimonials" className="bg-brand-primary py-16 sm:py-32 text-white relative">
                <div className="container-custom flex flex-col items-center justify-center text-center">
                    <div className="mb-12">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-black/20 text-6xl font-serif leading-none italic">&ldquo;</div>
                    </div>

                    <div className="grid gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto text-left">
                        {[
                            { quote: "O treino do Flávio me levou além dos meus limites. Me sinto mais forte, saudável e confiante do que nunca!", name: "Jessica Moreira", role: "Aluna de Hipertrofia", initial: "J" },
                            { quote: "Em 6 meses perdi 18kg e ganhei massa muscular. A metodologia do Flávio é simplesmente diferente de tudo que já tentei.", name: "Ricardo Almeida", role: "Aluno de Emagrecimento", initial: "R" },
                            { quote: "Depois dos 50 anos achei que seria impossível voltar a treinar. O Flávio adaptou tudo para mim e hoje me sinto 20 anos mais jovem.", name: "Marta Fernandes", role: "Aluna de Qualidade de Vida", initial: "M" },
                            { quote: "O acompanhamento online é incrível. Mesmo morando fora do Brasil, consigo manter a consistência com os treinos e feedbacks semanais.", name: "Bruno Costa", role: "Aluno Online", initial: "B" },
                            { quote: "O escaneamento 3D do Bodygee foi um divisor de águas. Ver minha evolução no avatar me motiva muito mais do que qualquer foto.", name: "Camila Santos", role: "Aluna de Recomposição", initial: "C" },
                            { quote: "Contratei o Flávio para o programa corporativo da minha empresa. A produtividade e o bem-estar da equipe melhoraram visivelmente.", name: "André Peixoto", role: "Programa Corporativo", initial: "A" },
                        ].map((t) => (
                            <figure key={t.name} className="flex flex-col justify-between rounded-3xl bg-white/10 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/15 transition-colors">
                                <blockquote className="text-base font-medium leading-relaxed mb-8 opacity-95">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>
                                <figcaption className="flex items-center gap-3">
                                    <div className="h-11 w-11 shrink-0 rounded-full bg-black/30 border border-white/20 flex items-center justify-center text-sm font-bold">{t.initial}</div>
                                    <div>
                                        <div className="text-sm font-bold uppercase tracking-wider">{t.name}</div>
                                        <div className="text-xs opacity-70 uppercase tracking-widest">{t.role}</div>
                                    </div>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section id="faq" className="bg-brand-bg py-16 sm:py-32">
                <div className="container-custom">
                    <h2 className="text-4xl sm:text-6xl font-bold uppercase tracking-tighter text-white mb-10 sm:mb-20 text-center lg:text-left">FAQ</h2>

                    <div className="grid lg:grid-cols-2 gap-10 sm:gap-16">
                        <div>
                            <p className="text-xl text-gray-400 mb-8 max-w-md">
                                Dúvidas comuns sobre como funciona a consultoria, pagamentos e suporte.
                            </p>
                            <Link href="https://wa.me/5519971001900" target="__blank" className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors">
                                Fale Comigo <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="divide-y divide-white/10 border-t border-white/10">
                            {/* FAQ Items */}
                            <div className="group py-6">
                                <h3 className="flex items-center justify-between text-xl font-bold uppercase text-white cursor-pointer group-hover:text-brand-primary transition-colors">
                                    <span className="text-sm sm:text-xl">1. POSSO CANCELAR A QUALQUER MOMENTO?</span>
                                    <ChevronDown className="h-5 w-5 text-gray-500 transition-transform group-hover:rotate-180" />
                                </h3>
                                <p className="mt-4 text-gray-400 hidden group-hover:block animate-fade-in">
                                    Sim, nossos planos mensais não possuem fidelidade. Para planos trimestrais, consulte as condições.
                                </p>
                            </div>

                            <div className="group py-6">
                                <h3 className="flex items-center justify-between text-xl font-bold uppercase text-white cursor-pointer group-hover:text-brand-primary transition-colors">
                                    <span className="text-sm sm:text-xl">2. QUANTO TEMPO DURAM AS SESSÕES?</span>
                                    <ChevronDown className="h-5 w-5 text-gray-500 transition-transform group-hover:rotate-180" />
                                </h3>
                            </div>

                            <div className="group py-6">
                                <h3 className="flex items-center justify-between text-xl font-bold uppercase text-white cursor-pointer group-hover:text-brand-primary transition-colors">
                                    <span className="text-sm sm:text-xl">3. PRECISO DE EQUIPAMENTOS?</span>
                                    <ChevronDown className="h-5 w-5 text-gray-500 transition-transform group-hover:rotate-180" />
                                </h3>
                            </div>

                            <div className="group py-6">
                                <h3 className="flex items-center justify-between text-xl font-bold uppercase text-white cursor-pointer group-hover:text-brand-primary transition-colors">
                                    <span className="text-sm sm:text-xl">4. COMO ACOMPANHO MEU PROGRESSO?</span>
                                    <ChevronDown className="h-5 w-5 text-gray-500 transition-transform group-hover:rotate-180" />
                                </h3>
                            </div>
                            <div className="group py-6">
                                <h3 className="flex items-center justify-between text-xl font-bold uppercase text-white cursor-pointer group-hover:text-brand-primary transition-colors">
                                    <span className="text-sm sm:text-xl">5. A CONSULTORIA É APENAS ONLINE?</span>
                                    <ChevronDown className="h-5 w-5 text-gray-500 transition-transform group-hover:rotate-180" />
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}

        </main>
    );
}
