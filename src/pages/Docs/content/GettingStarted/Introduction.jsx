import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Introduction = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 id="introduction" className="text-4xl font-bold text-white mb-4">
                    Introduction
                </h1>
                <p className="text-lg text-gray-400">
                    Welcome to OBSOLIO - Your comprehensive platform for deploying high-precision AI agents with Human-in-the-Loop oversight.
                </p>
            </div>

            {/* What is OBSOLIO */}
            <section>
                <h2 id="what-is-obsolio" className="text-2xl font-bold text-white mb-4">
                    What is OBSOLIO?
                </h2>
                <p className="text-gray-300 mb-4">
                    OBSOLIO is a tenant-based dashboard platform designed for executing high-precision AI engines on various data types including Video, Audio, Images, Code, Files, and Databases. Our platform combines cutting-edge AI technology with human oversight to ensure accuracy and reliability.
                </p>
                <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-4">
                    <p className="text-sm text-primary-300">
                        <strong>Key Insight:</strong> OBSOLIO bridges the gap between fully automated AI and human expertise, providing the best of both worlds.
                    </p>
                </div>
            </section>

            {/* Key Features */}
            <section>
                <h2 id="key-features" className="text-2xl font-bold text-white mb-4">
                    Key Features
                </h2>
                <div className="grid gap-4">
                    {[
                        {
                            title: 'High-Precision AI Engines',
                            description: 'Process videos, audio, code, images, and more with state-of-the-art AI models'
                        },
                        {
                            title: 'Human-in-the-Loop (HITL)',
                            description: 'Ensure accuracy with human oversight and approval workflows'
                        },
                        {
                            title: 'Multi-Tenant Architecture',
                            description: 'Secure, isolated environments for different organizations'
                        },
                        {
                            title: 'AgentX Marketplace',
                            description: 'Deploy pre-built AI agents or create your own'
                        },
                        {
                            title: 'Workflow Builder',
                            description: 'Create complex AI workflows with visual tools'
                        },
                        {
                            title: 'Real-time Analytics',
                            description: 'Monitor performance and track results in real-time'
                        }
                    ].map((feature, index) => (
                        <div key={index} className="flex gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                                <p className="text-sm text-gray-400">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Use Cases */}
            <section>
                <h2 id="use-cases" className="text-2xl font-bold text-white mb-4">
                    Use Cases
                </h2>
                <p className="text-gray-300 mb-4">
                    OBSOLIO serves multiple industries and use cases:
                </p>
                <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                        <span className="text-primary-400 mt-1">•</span>
                        <span><strong>Education:</strong> Automated grading, content analysis, and student assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary-400 mt-1">•</span>
                        <span><strong>HR:</strong> Resume screening, interview analysis, and candidate evaluation</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary-400 mt-1">•</span>
                        <span><strong>Legal:</strong> Document review, contract analysis, and compliance checking</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary-400 mt-1">•</span>
                        <span><strong>Healthcare:</strong> Medical image analysis, patient data processing</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary-400 mt-1">•</span>
                        <span><strong>Technology:</strong> Code review, bug detection, and automated testing</span>
                    </li>
                </ul>
            </section>

            {/* Next Steps */}
            <section>
                <h2 id="next-steps" className="text-2xl font-bold text-white mb-4">
                    Next Steps
                </h2>
                <p className="text-gray-300 mb-6">
                    Ready to get started with OBSOLIO? Follow these guides:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                    <Link
                        to="/docs/getting-started/installation"
                        className="group p-6 bg-gradient-to-br from-primary-500/10 to-cyan-500/10 border border-primary-500/20 rounded-lg hover:border-primary-500/40 transition-all"
                    >
                        <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                            Installation
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </h3>
                        <p className="text-sm text-gray-400">
                            Set up OBSOLIO in your environment
                        </p>
                    </Link>
                    <Link
                        to="/docs/getting-started/quick-start"
                        className="group p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-all"
                    >
                        <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                            Quick Start
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </h3>
                        <p className="text-sm text-gray-400">
                            Deploy your first AI agent in minutes
                        </p>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Introduction;
