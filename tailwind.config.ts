import type { Config } from 'tailwindcss'
import { heroui } from '@heroui/theme'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors - blue/purple gradient like the logo
        brand: {
          blue: '#3B82F6',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
        },
        // Accent colors for highlights
        accent: {
          primary: '#3B82F6',
          secondary: '#8B5CF6',
        },
        // Background colors for light theme
        bg: {
          primary: '#FFFFFF',
          secondary: '#F8FAFC',
          tertiary: '#F1F5F9',
          card: '#FFFFFF',
        },
        // Text colors
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          tertiary: '#64748B',
          muted: '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.3)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)',
        'hero-gradient': 'linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(139,92,246,0.05) 50%, rgba(6,182,212,0.05) 100%)',
        'mesh-light': 'radial-gradient(ellipse at 20% 20%, rgba(59,130,246,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(139,92,246,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 50%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        'brand': '0 4px 14px 0 rgba(59, 130, 246, 0.25)',
      },
    },
  },
  plugins: [
    heroui({
      defaultTheme: 'light',
      themes: {
        light: {
          extend: 'light',
          colors: {
            primary: {
              50: '#EFF6FF',
              100: '#DBEAFE',
              200: '#BFDBFE',
              300: '#93C5FD',
              400: '#60A5FA',
              500: '#3B82F6',
              600: '#2563EB',
              700: '#1D4ED8',
              800: '#1E40AF',
              900: '#1E3A8A',
              foreground: '#FFFFFF',
              DEFAULT: '#3B82F6',
            },
            secondary: {
              50: '#F5F3FF',
              100: '#EDE9FE',
              200: '#DDD6FE',
              300: '#C4B5FD',
              400: '#A78BFA',
              500: '#8B5CF6',
              600: '#7C3AED',
              700: '#6D28D9',
              800: '#5B21B6',
              900: '#4C1D95',
              foreground: '#FFFFFF',
              DEFAULT: '#8B5CF6',
            },
            success: {
              500: '#10B981',
              foreground: '#FFFFFF',
            },
            warning: {
              500: '#F59E0B',
              foreground: '#FFFFFF',
            },
            danger: {
              500: '#EF4444',
              foreground: '#FFFFFF',
            },
            background: '#FFFFFF',
            foreground: '#0F172A',
            focus: '#3B82F6',
            divider: 'rgba(0,0,0,0.1)',
            overlay: 'rgba(0,0,0,0.4)',
          },
          layout: {
            radius: {
              small: '8px',
              medium: '12px',
              large: '16px',
            },
            borderWidth: {
              small: '1px',
              medium: '1.5px',
            },
            disabledOpacity: 0.5,
          },
        },
      },
    }),
  ],
}
export default config
