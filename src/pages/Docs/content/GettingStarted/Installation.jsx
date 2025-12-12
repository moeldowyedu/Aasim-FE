import { Link } from 'react-router-dom';
import { Terminal, Code, Zap, CheckCircle, Download, Copy } from 'lucide-react';
import { useState } from 'react';

const Installation = () => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 id="installation" className="text-4xl font-bold text-white mb-4">
                    Installation
                </h1>
                <p className="text-lg text-gray-400">
                    Get OBSOLIO up and running in your environment with our comprehensive installation guide.
                </p>
            </div>

            {/* System Requirements */}
            <section>
                <h2 id="system-requirements" className="text-2xl font-bold text-white mb-4">
                    System Requirements
                </h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-primary-400" />
                                Minimum Requirements
                            </h3>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>OS:</strong> Windows 10+, macOS 10.15+, Ubuntu 20.04+</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>RAM:</strong> 8GB minimum</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>Storage:</strong> 20GB available space</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>Node.js:</strong> v18.0 or higher</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-400" />
                                Recommended
                            </h3>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>RAM:</strong> 16GB or more</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>Storage:</strong> SSD with 50GB+ space</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>GPU:</strong> NVIDIA GPU for AI processing</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                    <span><strong>Network:</strong> High-speed internet connection</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Installation Methods */}
            <section>
                <h2 id="installation-methods" className="text-2xl font-bold text-white mb-4">
                    Installation Methods
                </h2>
                <p className="text-gray-300 mb-6">
                    Choose the installation method that best suits your needs:
                </p>

                {/* NPM Installation */}
                <div className="space-y-4">
                    <h3 id="npm-installation" className="text-xl font-semibold text-white">
                        NPM Installation (Recommended)
                    </h3>
                    <div className="bg-[#1a1f2e] border border-white/10 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                            <span className="text-sm text-gray-400 font-mono">Terminal</span>
                            <button
                                onClick={() => copyToClipboard('npm install -g obsolio-cli')}
                                className="flex items-center gap-2 text-xs text-primary-400 hover:text-primary-300 transition-colors"
                            >
                                {copied ? (
                                    <>
                                        <CheckCircle className="w-3 h-3" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3 h-3" />
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>
                        <pre className="p-4 overflow-x-auto">
                            <code className="text-sm text-gray-300 font-mono">
                                npm install -g obsolio-cli
                            </code>
                        </pre>
                    </div>
                </div>

                {/* Docker Installation */}
                <div className="space-y-4 mt-6">
                    <h3 id="docker-installation" className="text-xl font-semibold text-white">
                        Docker Installation
                    </h3>
                    <div className="bg-[#1a1f2e] border border-white/10 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                            <span className="text-sm text-gray-400 font-mono">Terminal</span>
                            <button
                                onClick={() => copyToClipboard('docker pull obsolio/platform:latest')}
                                className="flex items-center gap-2 text-xs text-primary-400 hover:text-primary-300 transition-colors"
                            >
                                <Copy className="w-3 h-3" />
                                Copy
                            </button>
                        </div>
                        <pre className="p-4 overflow-x-auto">
                            <code className="text-sm text-gray-300 font-mono">
                                {`docker pull obsolio/platform:latest
docker run -d -p 3000:3000 obsolio/platform:latest`}
                            </code>
                        </pre>
                    </div>
                </div>
            </section>

            {/* Setup Steps */}
            <section>
                <h2 id="setup-steps" className="text-2xl font-bold text-white mb-4">
                    Setup Steps
                </h2>
                <div className="space-y-4">
                    {[
                        {
                            step: 1,
                            title: 'Initialize OBSOLIO',
                            command: 'obsolio init',
                            description: 'Initialize a new OBSOLIO project in your directory'
                        },
                        {
                            step: 2,
                            title: 'Configure Environment',
                            command: 'obsolio config',
                            description: 'Set up your environment variables and API keys'
                        },
                        {
                            step: 3,
                            title: 'Start the Platform',
                            command: 'obsolio start',
                            description: 'Launch the OBSOLIO dashboard and services'
                        },
                        {
                            step: 4,
                            title: 'Verify Installation',
                            command: 'obsolio status',
                            description: 'Check that all services are running correctly'
                        }
                    ].map((item) => (
                        <div key={item.step} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary-500/20 border border-primary-500/40 rounded-full flex items-center justify-center text-primary-400 font-bold text-sm">
                                {item.step}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                                <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                                <code className="text-xs bg-black/30 px-2 py-1 rounded text-primary-300 font-mono">
                                    {item.command}
                                </code>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Next Steps */}
            <section>
                <h2 id="next-steps" className="text-2xl font-bold text-white mb-4">
                    Next Steps
                </h2>
                <div className="bg-gradient-to-br from-primary-500/10 to-cyan-500/10 border border-primary-500/20 rounded-lg p-6">
                    <p className="text-gray-300 mb-4">
                        Installation complete! Continue with our Quick Start guide to deploy your first AI agent.
                    </p>
                    <Link
                        to="/docs/getting-started/quick-start"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
                    >
                        Quick Start Guide
                        <Code className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Installation;
