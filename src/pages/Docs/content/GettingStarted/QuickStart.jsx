import { Link } from 'react-router-dom';
import { Rocket, Play, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const QuickStart = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 id="quick-start" className="text-4xl font-bold text-white mb-4">
                    Quick Start
                </h1>
                <p className="text-lg text-gray-400">
                    Deploy your first AI agent in under 5 minutes with this step-by-step guide.
                </p>
            </div>

            {/* Prerequisites */}
            <section>
                <h2 id="prerequisites" className="text-2xl font-bold text-white mb-4">
                    Prerequisites
                </h2>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <p className="text-sm text-yellow-300">
                        <strong>Before you begin:</strong> Make sure you've completed the <Link to="/docs/getting-started/installation" className="underline hover:text-yellow-200">installation</Link> process.
                    </p>
                </div>
            </section>

            {/* Step-by-Step Guide */}
            <section>
                <h2 id="deploy-your-first-agent" className="text-2xl font-bold text-white mb-6">
                    Deploy Your First Agent
                </h2>

                <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="relative pl-8 pb-8 border-l-2 border-primary-500/30">
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            1
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Create Your Account</h3>
                        <p className="text-gray-300 mb-4">
                            Sign up for a free OBSOLIO account to access the platform.
                        </p>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 border border-primary-500/40 text-primary-300 hover:bg-primary-500/30 rounded-lg transition-colors text-sm"
                        >
                            <Sparkles className="w-4 h-4" />
                            Start Free Trial
                        </Link>
                    </div>

                    {/* Step 2 */}
                    <div className="relative pl-8 pb-8 border-l-2 border-primary-500/30">
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            2
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Set Up Your Tenant</h3>
                        <p className="text-gray-300 mb-4">
                            Configure your organization's workspace with custom settings.
                        </p>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                                    <span>Enter your organization name</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                                    <span>Choose your industry sector</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                                    <span>Configure security settings</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative pl-8 pb-8 border-l-2 border-primary-500/30">
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            3
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Browse AgentX HUB</h3>
                        <p className="text-gray-300 mb-4">
                            Explore our marketplace of pre-built AI agents ready to deploy.
                        </p>
                        <Link
                            to="/agentx/hub"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-lg transition-colors text-sm"
                        >
                            <Rocket className="w-4 h-4" />
                            Visit AgentX HUB
                        </Link>
                    </div>

                    {/* Step 4 */}
                    <div className="relative pl-8 pb-8 border-l-2 border-primary-500/30">
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            4
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Deploy an Agent</h3>
                        <p className="text-gray-300 mb-4">
                            Select an agent and configure it for your use case.
                        </p>
                        <div className="bg-[#1a1f2e] border border-white/10 rounded-lg p-4">
                            <ol className="space-y-3 text-sm text-gray-300">
                                <li className="flex gap-3">
                                    <span className="text-primary-400 font-mono">1.</span>
                                    <span>Choose an agent from the marketplace</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-400 font-mono">2.</span>
                                    <span>Configure input/output settings</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-400 font-mono">3.</span>
                                    <span>Set up HITL approval workflow (optional)</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-400 font-mono">4.</span>
                                    <span>Click "Deploy" and start processing!</span>
                                </li>
                            </ol>
                        </div>
                    </div>

                    {/* Step 5 */}
                    <div className="relative pl-8">
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            5
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Monitor & Manage</h3>
                        <p className="text-gray-300 mb-4">
                            Track your agent's performance and manage approvals from your dashboard.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                                <h4 className="font-semibold text-white mb-2 text-sm">Real-time Analytics</h4>
                                <p className="text-xs text-gray-400">Monitor processing status and performance metrics</p>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                                <h4 className="font-semibold text-white mb-2 text-sm">HITL Approvals</h4>
                                <p className="text-xs text-gray-400">Review and approve AI-generated outputs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Example Use Case */}
            <section>
                <h2 id="example-use-case" className="text-2xl font-bold text-white mb-4">
                    Example Use Case
                </h2>
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
                    <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <Play className="w-5 h-5 text-purple-400" />
                        Video Analysis Agent
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm">
                        Deploy a video analysis agent to automatically extract insights from educational videos:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start gap-2">
                            <ArrowRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span>Upload lecture videos or provide YouTube links</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <ArrowRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span>AI extracts key concepts, timestamps, and summaries</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <ArrowRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span>Human reviewers approve or refine the analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <ArrowRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span>Export results for student learning materials</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Next Steps */}
            <section>
                <h2 id="whats-next" className="text-2xl font-bold text-white mb-4">
                    What's Next?
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    <Link
                        to="/docs/features/ai-engines"
                        className="group p-6 bg-white/5 border border-white/10 rounded-lg hover:border-primary-500/40 transition-all"
                    >
                        <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                            Explore AI Engines
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </h3>
                        <p className="text-sm text-gray-400">
                            Learn about our high-precision AI engines for different data types
                        </p>
                    </Link>
                    <Link
                        to="/docs/features/hitl"
                        className="group p-6 bg-white/5 border border-white/10 rounded-lg hover:border-primary-500/40 transition-all"
                    >
                        <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                            HITL System
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </h3>
                        <p className="text-sm text-gray-400">
                            Understand how Human-in-the-Loop oversight works
                        </p>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default QuickStart;
