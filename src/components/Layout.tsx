import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AdSlot } from './AdSlot';
import { CookieBanner } from './CookieBanner';
import { NewsletterBox } from './NewsletterBox';
import { Menu, X, Scale, Gift, TrendingUp, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: '/surebet', label: 'Surebet', icon: Scale },
    { path: '/freebet', label: 'Freebet', icon: Gift },
    { path: '/refund', label: 'Refund', icon: ShieldCheck },
    { path: '/boost', label: 'Boost', icon: TrendingUp },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-slate-800 text-emerald-400 font-semibold' : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800/50'}`;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col font-sans">
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group z-50">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-slate-900 group-hover:bg-emerald-400 transition-colors">
              B
            </div>
            <span className="font-bold text-xl tracking-tight">BetCalc <span className="text-emerald-500">France</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-2 text-sm font-medium">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={linkClass}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-400 hover:text-emerald-500 transition-colors rounded-lg hover:bg-slate-800/50"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              className="md:hidden p-2 text-slate-400 hover:text-emerald-500 transition-colors z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Overlay */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-slate-900 z-40 flex flex-col pt-20 px-4 md:hidden animate-in slide-in-from-top-10 duration-200">
              <nav className="flex flex-col gap-4 text-lg font-medium">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-4 p-4 rounded-xl border ${isActive ? 'bg-slate-800 border-emerald-500/30 text-emerald-400' : 'border-slate-800 text-slate-400'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-6 h-6" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 md:grid md:grid-cols-12 md:gap-8">
        <aside className="hidden md:block md:col-span-2 space-y-6">
          <AdSlot className="h-[300px]" />
          <AdSlot className="h-[300px]" />
        </aside>

        <div className="md:col-span-8 space-y-8">
          {children}

          <div className="mt-12">
            <NewsletterBox />
          </div>
        </div>

        <aside className="hidden md:block md:col-span-2 space-y-6">
          <AdSlot className="h-[300px]" />
          <AdSlot className="h-[300px]" />
        </aside>
      </main>

      <footer className="border-t border-slate-800 py-12 mt-auto bg-slate-950">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm mb-4">&copy; {new Date().getFullYear()} BetCalc France. Tous droits réservés.</p>

          <div className="border-t border-slate-900 pt-6 mt-6 max-w-2xl mx-auto">
            <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider mb-2">
              JOUER COMPORTE DES RISQUES : ENDETTEMENT, ISOLEMENT, DÉPENDANCE.
            </p>
            <p className="text-xs text-emerald-600/70 font-bold">
              POUR ÊTRE AIDÉ, APPELEZ LE 09-74-75-13-13 (APPEL NON SURTAXÉ).
            </p>
          </div>
        </div>
      </footer>
      <CookieBanner />
    </div>
  );
};
