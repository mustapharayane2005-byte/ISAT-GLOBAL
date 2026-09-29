import type { Config } from 'tailwindcss';

/**
 * iSAT design tokens.
 * One accent (orange), one ink scale, one alternate surface. Nothing else.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FFFFFF',
        surface: '#F5F5F7',
        ink: '#1D1D1F',
        'ink-muted': '#6E6E73',
        // Darker muted ink, for small text sitting on a grey frame rather than white.
        'ink-muted-strong': '#57575B',
        hairline: '#D2D2D7',
        // Brand orange. 5.6:1 on black and 3.75:1 on white, so it is used for
        // fills, graphics and display type, never for small text on white.
        accent: '#F83A04',
        // Same hue, deepened. 5.6:1 on white, 5.1:1 on the grey surface, and white
        // text on it clears 4.5:1, so every orange button and small orange label uses this.
        'accent-strong': '#C62C02',
        'accent-press': '#A82401',
        night: '#000000',
        'night-muted': '#A1A1A6',
        'night-hairline': '#2A2A2C',
      },
      fontFamily: {
        sans: ['var(--font-inter-tight)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display scale. Sized so a 6 word headline holds two lines at 1280px.
        display: ['clamp(2.75rem, 7.2vw, 7.5rem)', { lineHeight: '1.02', letterSpacing: '-0.04em', fontWeight: '700' }],
        headline: ['clamp(2.25rem, 5vw, 4.25rem)', { lineHeight: '1.06', letterSpacing: '-0.035em', fontWeight: '700' }],
        title: ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
        lead: ['clamp(1.25rem, 1.7vw, 1.75rem)', { lineHeight: '1.38', letterSpacing: '-0.015em' }],
        body: ['1.0625rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        caption: ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0' }],
        nav: ['0.875rem', { lineHeight: '1', letterSpacing: '-0.005em' }],
        numeral: ['clamp(3rem, 6vw, 5.5rem)', { lineHeight: '1', letterSpacing: '-0.045em', fontWeight: '700' }],
        stat: ['clamp(2.25rem, 3.4vw, 3.25rem)', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '700' }],
      },
      spacing: {
        // Vertical section rhythm: 96px mobile, up to 240px desktop.
        section: 'clamp(6rem, 13vw, 15rem)',
        'section-tight': 'clamp(5rem, 9vw, 10rem)',
      },
      maxWidth: {
        shell: '1120px',
        measure: '34rem', // holds body copy under 60 characters
        'measure-lead': '40rem',
        'measure-head': '48rem',
      },
      borderRadius: {
        // One radius rule: pills for interactive, 28px for frames and panels.
        frame: '28px',
        'frame-sm': '20px',
        pill: '980px',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};

export default config;
