import { Video, Mic, Code, FileText, Database, Globe, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const AIEngines = () => {
    const engines = [
        {
            icon: Video,
            name: 'Vision Engine',
            color: 'blue',
            description: 'Process and analyze video content with advanced computer vision',
            capabilities: [
                'Object detection and tracking',
                'Scene recognition',
                'Action detection',
                'Facial recognition',
                'OCR in videos'
            ]
        },
        {
            icon: Mic,
            name: 'Audio Engine',
            color: 'purple',
            description: 'Transcribe and analyze audio with high accuracy',
            capabilities: [
                'Speech-to-text transcription',
                'Speaker diarization',
                'Sentiment analysis',
                'Language detection',
                'Audio classification'
            ]
        },
        {
            icon: Code,
            name: 'Code Engine',
            color: 'green',
            description: 'Analyze, review, and generate code across multiple languages',
            capabilities: [
                'Code review and analysis',
                'Bug detection',
                'Code generation',
                'Documentation generation',
                'Security vulnerability scanning'
            ]
        },
        {
            icon: FileText,
            name: 'Document Engine',
            color: 'orange',
            description: 'Extract and process information from documents',
            capabilities: [
                'PDF text extraction',
                'Form data extraction',
                'Table recognition',
                'Document classification',
                'Multi-language support'
            ]
        },
        {
            icon: Database,
            name: 'Data Engine',
            color: 'cyan',
            description: 'Process and analyze structured and unstructured data',
            capabilities: [
                'Data cleaning and validation',
                'Pattern recognition',
                'Anomaly detection',
                'Predictive analytics',
                'Data transformation'
            ]
        },
        {
            icon: Globe,
            name: 'Web Engine',
            color: 'pink',
            description: 'Scrape, analyze, and monitor web content',
            capabilities: [
                'Web scraping',
                'Content extraction',
                'SEO analysis',
                'Change detection',
                'Automated testing'
            ]
        }
    ];

    const colorMap = {
        blue: 'from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-400',
        purple: 'from-purple-500/10 to-purple-600/10 border-purple-500/20 text-purple-400',
        green: 'from-green-500/10 to-green-600/10 border-green-500/20 text-green-400',
        orange: 'from-orange-500/10 to-orange-600/10 border-orange-500/20 text-orange-400',
        cyan: 'from-cyan-500/10 to-cyan-600/10 border-cyan-500/20 text-cyan-400',
        pink: 'from-pink-500/10 to-pink-600/10 border-pink-500/20 text-pink-400'
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 id="ai-engines" className="text-4xl font-bold text-white mb-4">
                    AI Engines
                </h1>
                <p className="text-lg text-gray-400">
                    OBSOLIO provides high-precision AI engines for processing various data types with state-of-the-art accuracy.
                </p>
            </div>

            {/* Overview */}
            <section>
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    Overview
                </h2>
                <p className="text-gray-300 mb-4">
                    Our AI engines are designed to handle diverse data processing tasks with exceptional precision. Each engine is optimized for specific data types and use cases, ensuring maximum accuracy and efficiency.
                </p>
                <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-4">
                    <p className="text-sm text-primary-300">
                        <strong>Key Advantage:</strong> All engines support Human-in-the-Loop (HITL) oversight, allowing you to maintain control and ensure quality.
                    </p>
                </div>
            </section>

            {/* Available Engines */}
            <section>
                <h2 id="available-engines" className="text-2xl font-bold text-white mb-6">
                    Available Engines
                </h2>
                <div className="grid gap-6">
                    {engines.map((engine, index) => {
                        const Icon = engine.icon;
                        return (
                            <div
                                key={index}
                                className={`bg-gradient-to-br ${colorMap[engine.color]} border rounded-lg p-6`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 bg-${engine.color}-500/20 rounded-lg`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 id={engine.name.toLowerCase().replace(' ', '-')} className="text-xl font-bold text-white mb-2">
                                            {engine.name}
                                        </h3>
                                        <p className="text-gray-300 mb-4">{engine.description}</p>
                                        <div>
                                            <h4 className="text-sm font-semibold text-white mb-2">Capabilities:</h4>
                                            <ul className="grid sm:grid-cols-2 gap-2">
                                                {engine.capabilities.map((capability, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                        <span>{capability}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* How It Works */}
            <section>
                <h2 id="how-it-works" className="text-2xl font-bold text-white mb-4">
                    How It Works
                </h2>
                <div className="space-y-4">
                    {[
                        {
                            step: 1,
                            title: 'Input Data',
                            description: 'Upload or connect your data source (files, URLs, databases, etc.)'
                        },
                        {
                            step: 2,
                            title: 'AI Processing',
                            description: 'The selected engine processes your data using advanced AI models'
                        },
                        {
                            step: 3,
                            title: 'HITL Review',
                            description: 'Human reviewers validate and approve the AI-generated results'
                        },
                        {
                            step: 4,
                            title: 'Output Delivery',
                            description: 'Receive processed results in your preferred format'
                        }
                    ].map((item) => (
                        <div key={item.step} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary-500/20 border border-primary-500/40 rounded-full flex items-center justify-center text-primary-400 font-bold text-sm">
                                {item.step}
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                                <p className="text-sm text-gray-400">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Performance */}
            <section>
                <h2 id="performance" className="text-2xl font-bold text-white mb-4">
                    Performance & Accuracy
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-lg text-center">
                        <div className="text-3xl font-bold text-primary-400 mb-2">99.5%</div>
                        <div className="text-sm text-gray-400">Average Accuracy</div>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-lg text-center">
                        <div className="text-3xl font-bold text-primary-400 mb-2">&lt;2s</div>
                        <div className="text-sm text-gray-400">Processing Time</div>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-lg text-center">
                        <div className="text-3xl font-bold text-primary-400 mb-2">24/7</div>
                        <div className="text-sm text-gray-400">Availability</div>
                    </div>
                </div>
            </section>

            {/* Next Steps */}
            <section>
                <h2 id="next-steps" className="text-2xl font-bold text-white mb-4">
                    Next Steps
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href="#"
                        className="group flex-1 p-6 bg-gradient-to-br from-primary-500/10 to-cyan-500/10 border border-primary-500/20 rounded-lg hover:border-primary-500/40 transition-all"
                    >
                        <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                            Try an Engine
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </h3>
                        <p className="text-sm text-gray-400">
                            Start processing data with our AI engines
                        </p>
                    </a>
                    <a
                        href="#"
                        className="group flex-1 p-6 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all"
                    >
                        <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                            API Documentation
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </h3>
                        <p className="text-sm text-gray-400">
                            Integrate engines via our REST API
                        </p>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default AIEngines;
