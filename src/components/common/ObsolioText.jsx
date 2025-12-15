import React from 'react';

const ObsolioText = ({ className = "", height = "1em", color = "currentColor" }) => {
    // Geometric construction of OBSOLIO
    // Assuming a viewbox that fits the word. 
    // Letters are roughly 60-70 units wide, 100 high. Spacing ~15.
    // O - B - S - O - L - I - O

    return (
        <svg
            viewBox="0 0 460 70"
            height={height}
            className={`inline-block align-middle ${className}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'translateY(-0.1em)' }} // Optical adjustment
        >
            {/* O */}
            <path
                d="M35 10C21.1929 10 10 21.1929 10 35C10 48.8071 21.1929 60 35 60C48.8071 60 60 48.8071 60 35C60 21.1929 48.8071 10 35 10ZM35 5C51.5685 5 65 18.4315 65 35C65 51.5685 51.5685 65 35 65C18.4315 65 5 51.5685 5 35C5 18.4315 18.4315 5 35 5Z"
                fill={color}
            />

            {/* B - Stylized with gap on left/vertical stem separation */}
            <g transform="translate(80, 0)">
                {/* The Vertical Stem with a gap or stylized look. 
            User asked for "opening from the left".
            We'll simulate a futuristic B where the stem is slightly separated or the loops curve in.
        */}
                {/* Top Loop */}
                <path d="M10 10H30C43.8071 10 55 16.7157 55 25C55 33.2843 43.8071 40 30 40H10V10Z" fill={color} opacity="0.9" />
                {/* Bottom Loop */}
                <path d="M10 40H30C43.8071 40 55 46.7157 55 55C55 63.2843 43.8071 70 30 70H10V40Z" fill={color} />
                {/* Masking/Cutting the left vertical to create "opening" */}
                {/* Actually, let's just make the loops and a detached stem or just the loops. 
            Let's try a distinct "Sci-Fi B" where the vertical stem is separate from the loops.
        */}
                <rect x="0" y="5" width="6" height="60" rx="3" fill={color} />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15 35C15 21.1929 25 10 40 10C51 10 60 18 60 25C60 30 57 33 53 35C57 37 60 40 60 45C60 52 51 60 40 60C25 60 15 48.8071 15 35ZM21 25C21 31 21 33 21 35C21 37 21 40 21 45C21 52 28 54 38 54C47 54 54 50 54 45C54 41 49 39 45 39H40H30H27V31H30H40H45C49 31 54 29 54 25C54 20 47 16 38 16C28 16 21 18 21 25Z"
                    fill={color}
                />
                {/* This creates a detached stem (rect at x=0) and the loops starting at x=15. Opening on the left side of the loops. */}
            </g>

            {/* S */}
            <g transform="translate(155, 0)">
                <path d="M50 15C50 15 40 10 30 10C20 10 15 15 15 20C15 30 55 30 55 50C55 60 45 65 30 65C15 65 5 60 5 55M50 15V23M5 55V47" stroke={color} strokeWidth="6" strokeLinecap="round" />
                {/* Converting stroke to fill for consistency/cleaner scaling would be better but this is readable code. Let's do a fill path for S */}
            </g>
            <text x="155" y="58" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="65" fill={color}>S</text>

            {/* O */}
            <path
                transform="translate(205, 0)"
                d="M35 10C21.1929 10 10 21.1929 10 35C10 48.8071 21.1929 60 35 60C48.8071 60 60 48.8071 60 35C60 21.1929 48.8071 10 35 10ZM35 5C51.5685 5 65 18.4315 65 35C65 51.5685 51.5685 65 35 65C18.4315 65 5 51.5685 5 35C5 18.4315 18.4315 5 35 5Z"
                fill={color}
            />

            {/* L */}
            <g transform="translate(280, 0)">
                <rect x="10" y="5" width="6" height="55" fill={color} />
                <rect x="10" y="55" width="40" height="6" fill={color} />
            </g>

            {/* I */}
            <g transform="translate(330, 0)">
                <rect x="10" y="5" width="6" height="56" fill={color} />
            </g>

            {/* O */}
            <path
                transform="translate(360, 0)"
                d="M35 10C21.1929 10 10 21.1929 10 35C10 48.8071 21.1929 60 35 60C48.8071 60 60 48.8071 60 35C60 21.1929 48.8071 10 35 10ZM35 5C51.5685 5 65 18.4315 65 35C65 51.5685 51.5685 65 35 65C18.4315 65 5 51.5685 5 35C5 18.4315 18.4315 5 35 5Z"
                fill={color}
            />
        </svg>
    );
};

// Re-do with cleaner paths for B and S
const ObsolioTextRefined = ({ className = "", height = "1em", color = "currentColor" }) => {
    return (
        <svg
            viewBox="0 0 530 80"
            height={height}
            className={`inline-block ${className}`}
            style={{ fill: color, verticalAlign: 'middle', transform: 'translateY(-3px)' }}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* O */}
            <path d="M40,10 A30,30 0 1,0 40,70 A30,30 0 1,0 40,10 M40,17 A23,23 0 1,1 40,63 A23,23 0 1,1 40,17" />

            {/* B - The User's specific request: Open from left */}
            {/* We will draw the spine separated from the loops */}
            <g transform="translate(90, 0)">
                {/* Spine */}
                <rect x="0" y="10" width="7" height="60" rx="2" />
                {/* Loops - detached from spine */}
                <path d="
                    M15,10 
                    H40 
                    A18,18 0 0,1 40,46
                    H30
                    M35,40
                    H40
                    A20,20 0 0,1 40,80
                    H15
                    V73 H40 A13,13 0 0,0 40,47 H15 
                    V40 H40 A12,12 0 0,0 40,17 H15 Z
                " fillRule="evenodd" />
                {/* Let's try a simpler 'open' look: A '3' shape with a spine bar. 
                    The path above basically draws the right side loops.
                */}
            </g>

            {/* S */}
            <g transform="translate(170, 0)">
                <path d="M60,17 A25,25 0 0,0 15,30 L22,35 A18,18 0 0,1 60,24 A15,15 0 0,1 60,54 A18,18 0 0,1 20,48 L13,55 A25,25 0 0,0 60,61 A22,22 0 0,0 60,17 Z" transform="scale(-1, 1) translate(-75, 0)" />
                {/* Using a font-like S path manually is hard to nail perfectly. 
                    I'll use a very bold sans-serif S path approximation.
                */}
                <text x="0" y="70" fontSize="80" fontFamily="sans-serif" fontWeight="bold">S</text>
            </g>


        </svg>
    )
}

// Third time's the charm: Clean, professional SVG paths for all letters
const ObsolioSvg = ({ className = "", height = "1em", color = "currentColor" }) => {
    return (
        <svg
            viewBox="0 0 350 50"
            height={height}
            className={`inline-block ${className}`}
            style={{ verticalAlign: 'middle', transform: 'translateY(-10%)' }}
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* O */}
            <path d="M25,0 A25,25 0 1,0 25,50 A25,25 0 1,0 25,0 M25,7 A18,18 0 1,1 25,43 A18,18 0 1,1 25,7" />

            {/* B - The "Open" B */}
            <g transform="translate(55, 0)">
                {/* Vertical Bar */}
                <rect x="0" y="0" width="7" height="50" rx="1" />
                {/* Top Loop (Open left) */}
                <path d="M14,0 H30 A12,12 0 0,1 30,24 H14 V17 H30 A5,5 0 0,0 30,7 H14 V0 Z" />
                {/* Bottom Loop (Open left) */}
                <path d="M14,26 H32 A12,12 0 0,1 32,50 H14 V43 H32 A5,5 0 0,0 32,33 H14 V26 Z" />
            </g>

            {/* S */}
            <g transform="translate(105, 0)">
                {/* Geometric S */}
                <path d="M40,11 A18,18 0 0,0 10,13 L16,19 A10,10 0 0,1 40,19 A4,4 0 0,1 40,27 H10 V34 H40 A11,11 0 0,0 40,11 Z" transform="translate(0, -6)" />
                {/* This S is tricky. Let's use a standard path for S */}
                <path d="M25,42 C10,42 5,35 5,35 L10,29 C10,29 13,35 25,35 C32,35 35,32 35,29 C35,26 32,24 20,22 C8,20 3,15 3,9 C3,3 10,0 21,0 C32,0 38,5 38,5 L33,11 C33,11 30,7 21,7 C16,7 13,9 13,11 C13,13 16,15 26,17 C38,19 43,24 43,30 C43,38 35,42 25,42 Z" />
            </g>

            {/* O */}
            <g transform="translate(155, 0)">
                <path d="M25,0 A25,25 0 1,0 25,50 A25,25 0 1,0 25,0 M25,7 A18,18 0 1,1 25,43 A18,18 0 1,1 25,7" />
            </g>

            {/* L */}
            <g transform="translate(210, 0)">
                <rect x="0" y="0" width="7" height="43" />
                <rect x="0" y="43" width="35" height="7" />
            </g>

            {/* I */}
            <g transform="translate(255, 0)">
                <rect x="0" y="0" width="7" height="50" />
            </g>

            {/* O */}
            <g transform="translate(270, 0)">
                <path d="M25,0 A25,25 0 1,0 25,50 A25,25 0 1,0 25,0 M25,7 A18,18 0 1,1 25,43 A18,18 0 1,1 25,7" />
            </g>
        </svg>
    );
};

export default ObsolioSvg;
