import { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

const DocsTOC = () => {
    const { theme } = useTheme();
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        // Extract headings from the page
        const extractHeadings = () => {
            const elements = document.querySelectorAll('h2, h3');
            const headingData = Array.from(elements).map((element) => ({
                id: element.id,
                text: element.textContent,
                level: parseInt(element.tagName.charAt(1))
            }));
            setHeadings(headingData);
        };

        // Wait for content to render
        setTimeout(extractHeadings, 100);

        // Intersection Observer for active section
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -80% 0px' }
        );

        const elements = document.querySelectorAll('h2, h3');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const scrollToHeading = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (headings.length === 0) return null;

    return (
        <aside className="hidden xl:block sticky top-32 w-60 h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="p-4">
                <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
                    On this page
                </h4>
                <nav className="space-y-1">
                    {headings.map((heading) => (
                        <button
                            key={heading.id}
                            onClick={() => scrollToHeading(heading.id)}
                            className={`
                block w-full text-left text-sm py-1 transition-colors
                ${heading.level === 3 ? 'pl-4' : ''}
                ${activeId === heading.id
                                    ? 'text-primary-400 font-medium'
                                    : (theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
                                }
              `}
                        >
                            {heading.text}
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default DocsTOC;
