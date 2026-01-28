import type { Config } from "tailwindcss";

export default {
	darkMode: ["class", ".dark-theme"],
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				// Shadcn compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
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
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Module colors (Radix tokens)
				biblio: {
					DEFAULT: 'var(--biblio)',
					hover: 'var(--biblio-hover)',
					strong: 'var(--biblio-strong)',
					text: 'var(--biblio-text)',
					tint: 'var(--biblio-tint)',
					light: 'var(--biblio-light)',
					border: 'var(--biblio-border)',
					foreground: 'var(--biblio-foreground)',
				},
				manu: {
					DEFAULT: 'var(--manu)',
					hover: 'var(--manu-hover)',
					strong: 'var(--manu-strong)',
					text: 'var(--manu-text)',
					tint: 'var(--manu-tint)',
					light: 'var(--manu-light)',
					border: 'var(--manu-border)',
					foreground: 'var(--manu-foreground)',
				},
				discover: {
					DEFAULT: 'var(--discover)',
					hover: 'var(--discover-hover)',
					strong: 'var(--discover-strong)',
					text: 'var(--discover-text)',
					tint: 'var(--discover-tint)',
					light: 'var(--discover-light)',
					border: 'var(--discover-border)',
					foreground: 'var(--discover-foreground)',
				},
				// Semantic colors
				success: {
					DEFAULT: 'var(--success)',
					text: 'var(--success-text)',
					tint: 'var(--success-tint)',
				},
				warning: {
					DEFAULT: 'var(--warning)',
					text: 'var(--warning-text)',
					tint: 'var(--warning-tint)',
				},
				error: {
					DEFAULT: 'var(--error)',
					text: 'var(--error-text)',
					tint: 'var(--error-tint)',
				},
			},
			backgroundColor: {
				'bg-primary': 'var(--bg-primary)',
				'bg-secondary': 'var(--bg-secondary)',
				'bg-tertiary': 'var(--bg-tertiary)',
				'bg-hover': 'var(--bg-hover)',
				'bg-active': 'var(--bg-active)',
			},
			textColor: {
				'text-primary': 'var(--text-primary)',
				'text-secondary': 'var(--text-secondary)',
				'text-muted': 'var(--text-muted)',
			},
			borderColor: {
				'border-subtle': 'var(--border-subtle)',
				'border-default': 'var(--border-default)',
				'border-strong': 'var(--border-strong)',
			},
			boxShadow: {
				'soft': 'var(--shadow-soft)',
				'medium': 'var(--shadow-medium)',
				'strong': 'var(--shadow-strong)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-up': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
