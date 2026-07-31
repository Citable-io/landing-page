import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1.5rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1280px',
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				heading: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
			},
			fontSize: {
				'2xs': ['0.625rem', { lineHeight: '1.3' }],     // 10px - badges
				'xs': ['0.6875rem', { lineHeight: '1.4' }],     // 11px - small labels
				'sm': ['0.75rem', { lineHeight: '1.5' }],       // 12px - captions
				'base': ['0.8125rem', { lineHeight: '1.5' }],   // 13px - body small
				'md': ['0.875rem', { lineHeight: '1.6' }],      // 14px - body
				'lg': ['1rem', { lineHeight: '1.6' }],          // 16px - large body
				'xl': ['1.125rem', { lineHeight: '1.4' }],      // 18px - section titles
				'2xl': ['1.5rem', { lineHeight: '1.3' }],       // 24px - headings
				'3xl': ['2rem', { lineHeight: '1.25' }],        // 32px - large headings
				'4xl': ['2.5rem', { lineHeight: '1.2' }],       // 40px - hero subhead
				'5xl': ['3.5rem', { lineHeight: '1.15' }],      // 56px - hero headline
				'6xl': ['4.5rem', { lineHeight: '1.1' }],       // 72px - massive display
			},
			spacing: {
				'xs': '0.25rem',    // 4px
				'sm': '0.5rem',     // 8px
				'md': '0.75rem',    // 12px
				'lg': '1rem',       // 16px
				'xl': '1.5rem',     // 24px
				'2xl': '2rem',      // 32px
				'3xl': '3rem',      // 48px
				'4xl': '4rem',      // 64px
				'5xl': '6rem',      // 96px
				'section': '6rem',  // Section spacing
			},
			colors: {
				// Background Hierarchy
				'bg-primary': 'hsl(var(--bg-primary))',
				'bg-secondary': 'hsl(var(--bg-secondary))',
				'bg-tertiary': 'hsl(var(--bg-tertiary))',
				'bg-hover': 'hsl(var(--bg-hover))',
				'bg-elevated': 'hsl(var(--bg-elevated))',
				// Text Hierarchy
				'text-primary': 'hsl(var(--text-primary))',
				'text-secondary': 'hsl(var(--text-secondary))',
				'text-muted': 'hsl(var(--text-muted))',
				'text-dim': 'hsl(var(--text-dim))',
				// Accent Colors
				'accent-primary': 'hsl(var(--accent-primary))',
				'accent-hover': 'hsl(var(--accent-hover))',
				'success': 'hsl(var(--success))',
				'warning': 'hsl(var(--warning))',
				'error': 'hsl(var(--error))',
				// Feature Accents
				'manuscripts-green': 'hsl(var(--manuscripts-green))',
				'bibliography-blue': 'hsl(var(--bibliography-blue))',
				// shadcn/ui compatible
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					glow: 'hsl(var(--accent-glow))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			backgroundImage: {
				'gradient-radial': 'var(--gradient-radial)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-accent': 'var(--gradient-accent)',
			},
			boxShadow: {
				'sm': 'var(--shadow-sm)',
				'md': 'var(--shadow-md)',
				'lg': 'var(--shadow-lg)',
				'glow': '0 0 20px hsl(var(--primary) / 0.5)',
				'glow-lg': '0 0 40px hsl(var(--primary) / 0.3)',
				'glow-accent': 'var(--shadow-glow)',
			},
			borderRadius: {
				'sm': 'var(--radius-sm)',
				'md': 'var(--radius-md)',
				'lg': 'var(--radius-lg)',
				'xl': 'var(--radius-xl)',
				'2xl': 'var(--radius-2xl)',
			},
			transitionDuration: {
				'fast': '150ms',
				'medium': '300ms',
				'slow': '500ms',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-up': {
					from: { opacity: '0', transform: 'translateY(30px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-left': {
					from: { opacity: '0', transform: 'translateX(-30px)' },
					to: { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-in-right': {
					from: { opacity: '0', transform: 'translateX(30px)' },
					to: { opacity: '1', transform: 'translateX(0)' }
				},
				'scale-in': {
					from: { opacity: '0', transform: 'scale(0.95)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--accent-primary) / 0.3)' },
					'50%': { boxShadow: '0 0 40px hsl(var(--accent-primary) / 0.5)' }
				},
				'float-slow': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-20px) rotate(2deg)' }
				},
				'float-medium': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-15px) rotate(-1deg)' }
				},
				'float-gentle': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
				'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
				'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
				'scale-in': 'scale-in 0.5s ease-out forwards',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'float-slow': 'float-slow 8s ease-in-out infinite',
				'float-medium': 'float-medium 6s ease-in-out infinite',
				'float-gentle': 'float-gentle 4s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
