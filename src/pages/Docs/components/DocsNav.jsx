import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

const DocsNav = ({ currentSection, currentPage, mobileOpen, onNavigate }) => {
    const { theme } = useTheme();
    const [expandedSections, setExpandedSections] = useState(['getting-started']);

    const toggleSection = (section) => {
        setExpandedSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const navSections = [
        {
            id: 'getting-started',
            title: 'Getting Started',
            pages: [
                { id: 'introduction', title: 'Introduction' },
                { id: 'installation', title: 'Installation' },
                { id: 'quick-start', title: 'Quick Start' },
                { id: 'configuration', title: 'Configuration' },
            ]
        },
        {
            id: 'features',
            title: 'Features',
            pages: [
                { id: 'ai-engines', title: 'AI Engines' },
                { id: 'hitl', title: 'Human-in-the-Loop' },
                { id: 'multi-tenant', title: 'Multi-Tenant' },
                { id: 'workflows', title: 'Workflows' },
            ]
        },
        {
            id: 'agentx',
            title: 'AgentX',
            pages: [
                { id: 'overview', title: 'Overview' },
                { id: 'creating-agents', title: 'Creating Agents' },
                { id: 'deployment', title: 'Deployment' },
                { id: 'marketplace', title: 'Marketplace' },
            ]
        },
        {
            id: 'api',
            title: 'API Reference',
            pages: [
                { id: 'authentication', title: 'Authentication' },
                { id: 'endpoints', title: 'Endpoints' },
                { id: 'webhooks', title: 'Webhooks' },
                { id: 'rate-limits', title: 'Rate Limits' },
            ]
        },
        {
            id: 'guides',
            title: 'Guides',
            pages: [
                { id: 'best-practices', title: 'Best Practices' },
                { id: 'troubleshooting', title: 'Troubleshooting' },
                { id: 'faqs', title: 'FAQs' },
            ]
        }
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onNavigate}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed lg:sticky top-24 left-0 h-[calc(100vh-6rem)] w-72 
          overflow-y-auto z-20
          transition-all duration-300 lg:translate-x-0 border-r
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          ${theme === 'dark'
                        ? 'bg-[#1a1f2e] border-white/10'
                        : 'bg-white border-slate-200'}
        `}
            >
                <nav className="p-4 space-y-1">
                    {navSections.map((section) => {
                        const isExpanded = expandedSections.includes(section.id);
                        const isCurrentSection = currentSection === section.id;

                        return (
                            <div key={section.id}>
                                {/* Section Header */}
                                <button
                                    onClick={() => toggleSection(section.id)}
                                    className={`
                    w-full flex items-center justify-between px-3 py-2 rounded-lg
                    text-sm font-semibold transition-colors
                    ${isCurrentSection
                                            ? 'text-primary-400 bg-primary-500/10'
                                            : (theme === 'dark'
                                                ? 'text-gray-300 hover:text-white hover:bg-white/5'
                                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50')
                                        }
                  `}
                                >
                                    <span>{section.title}</span>
                                    {isExpanded ? (
                                        <ChevronDown className="w-4 h-4" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4" />
                                    )}
                                </button>

                                {/* Section Pages */}
                                {isExpanded && (
                                    <div className={`ml-3 mt-1 space-y-0.5 border-l pl-3 ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                                        {section.pages.map((page) => {
                                            const isActive = currentSection === section.id && currentPage === page.id;

                                            return (
                                                <Link
                                                    key={page.id}
                                                    to={`/docs/${section.id}/${page.id}`}
                                                    onClick={onNavigate}
                                                    className={`
                            block px-3 py-1.5 rounded text-sm transition-colors
                            ${isActive
                                                            ? 'text-primary-400 bg-primary-500/10 font-medium'
                                                            : (theme === 'dark'
                                                                ? 'text-gray-400 hover:text-white hover:bg-white/5'
                                                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50')
                                                        }
                          `}
                                                >
                                                    {page.title}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};

export default DocsNav;
