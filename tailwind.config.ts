import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'hero': ['Poppins', 'sans-serif'],
				'display': ['Playfair Display', 'serif'],
				'prose': ['Source Sans Pro', 'sans-serif'],
				'heading': ['Manrope', 'sans-serif'],
				'body': ['Inter', 'sans-serif'],
				'brand': ['Fredoka', 'sans-serif'], // Currently active - Playful rounded
				'brand-comfortaa': ['Comfortaa', 'cursive'], // Soft bubbly geometric
				'brand-pacifico': ['Pacifico', 'cursive'], // Handwritten script flowing
				'brand-bungee': ['Bungee', 'display'], // Bold blocky graffiti style
				'brand-pixel': ['Press Start 2P', 'monospace'], // Retro 8-bit gaming
				'brand-kalam': ['Kalam', 'cursive'], // Handwritten casual marker
				'brand-caveat': ['Caveat', 'cursive'], // Natural handwriting
				'brand-bangers': ['Bangers', 'display'], // Comic book explosion
				'brand-griffy': ['Griffy', 'display'], // Decorative vintage serif
				'brand-faster': ['Faster One', 'display'], // Racing speed lines
				'brand-creepster': ['Creepster', 'display'], // Horror movie poster
				'brand-blackops': ['Black Ops One', 'display'], // Military stencil
				'brand-audiowide': ['Audiowide', 'sans-serif'], // Sci-fi technology
				'brand-orbitron': ['Orbitron', 'sans-serif'], // Futuristic space
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					soft: 'hsl(var(--primary-soft))',
					muted: 'hsl(var(--primary-muted))'
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
					foreground: 'hsl(var(--accent-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translate(0px, 0px) rotate(0deg)'
					},
					'33%': {
						transform: 'translate(30px, -30px) rotate(120deg)'
					},
					'66%': {
						transform: 'translate(-20px, 20px) rotate(240deg)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 20s ease-in-out infinite',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-up': 'slide-up 0.8s ease-out',
				'scale': 'scale-in 0.5s ease-out'
			},
			animationDelay: {
				'0': '0s',
				'75': '75ms',
				'100': '100ms',
				'150': '150ms',
				'200': '200ms',
				'300': '300ms',
				'500': '500ms',
				'700': '700ms',
				'1000': '1s',
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
