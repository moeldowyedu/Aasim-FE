import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ChevronRight } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import DocsNav from './components/DocsNav';
import DocsTOC from './components/DocsTOC';
import { useTheme } from '../../contexts/ThemeContext';

// Import content pages
import Introduction from './content/GettingStarted/Introduction';
import Installation from './content/GettingStarted/Installation';
import QuickStart from './content/GettingStarted/QuickStart';
import AIEngines from './content/Features/AIEngines';

const DocsPage = () => {
    const { section = 'getting-started', page = 'introduction' } = useParams();
    const navigate = useNavigate();
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { theme } = useTheme();

    // Content mapping
    const contentMap = {
        'getting-started': {
            'introduction': Introduction,
            'installation': Installation,
            'quick-start': QuickStart,
        },
        'features': {
            'ai-engines': AIEngines,
        }
    };

    // Get current page component
    const CurrentPageComponent = contentMap[section]?.[page] || Introduction;

    return (
        <MainLayout showSidebar={false} theme={theme}>
            <div className={`min-h-screen pt-28 ${theme === 'dark' ? 'bg-[#0B0E14] text-white' : 'bg-slate-50 text-slate-900'}`}>
                {/* Top Bar - Now scrolls with content */}
                <div className={`border-b transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1a1f2e] border-white/10' : 'bg-white border-slate-200'
                    }`}>
                    <div className="max-w-[1800px] mx-auto px-6 py-4">
                        {/* Logo & Title */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setMobileNavOpen(!mobileNavOpen)}
                                    className={`lg:hidden hover:opacity-80 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                                >
                                    {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">
                                    OBSOLIO Docs
                                </h1>
                            </div>

                            {/* Search Bar */}
                            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                                <div className="relative w-full">
                                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`} />
                                    <input
                                        type="text"
                                        placeholder="Search documentation..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${theme === 'dark'
                                                ? 'bg-white/5 border border-white/10 text-white'
                                                : 'bg-slate-100 border border-slate-200 text-slate-900'
                                            }`}
                                    />
                                </div>
                            </div>

                            {/* Version Selector */}
                            <div className={`hidden sm:block text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                                v1.0
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="max-w-[1800px] mx-auto px-6 py-8">
                    <div className="flex gap-8">
                        {/* Left Sidebar - Navigation */}
                        <DocsNav
                            currentSection={section}
                            currentPage={page}
                            mobileOpen={mobileNavOpen}
                            onNavigate={() => setMobileNavOpen(false)}
                        />

                        {/* Center - Main Content */}
                        <main className="flex-1 min-w-0 max-w-4xl">
                            <div className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : 'prose-slate'}`}>
                                <CurrentPageComponent />
                            </div>
                        </main>

                        {/* Right Sidebar - Table of Contents */}
                        <DocsTOC />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default DocsPage;
