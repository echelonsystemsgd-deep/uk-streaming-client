/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      spacing: {
        // 8px grid system mapped to rem
        '1': '0.25rem', // 4px (half-unit)
        '2': '0.5rem',  // 8px (1 unit)
        '3': '0.75rem', // 12px
        '4': '1rem',    // 16px (2 units)
        '5': '1.25rem', // 20px
        '6': '1.5rem',  // 24px (3 units)
        '8': '2rem',    // 32px (4 units)
        '10': '2.5rem', // 40px (5 units)
        '12': '3rem',   // 48px (6 units)
        '16': '4rem',   // 64px (8 units)
        '20': '5rem',   // 80px (10 units)
        '24': '6rem',   // 96px (12 units)
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: {
          DEFAULT: 'hsl(var(--background))',
          elevated: 'hsl(var(--background-elevated))',
          subtle: 'hsl(var(--background-subtle))',
        },
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          hover: 'hsl(var(--primary-hover))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
          border: 'hsl(var(--card-border))',
        },
        gold: {
          DEFAULT: '#F59E0B',
          glow: 'rgba(245, 158, 11, 0.15)',
        },
        brand: {
          red: '#E50914',
          crimson: '#DC2626',
          dark: '#07090E',
          card: '#0F141F',
          cardHover: '#161E2E',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        // Restricted to card components only
        'card': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'card-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(245, 158, 11, 0.25)',
        'card-inner': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
