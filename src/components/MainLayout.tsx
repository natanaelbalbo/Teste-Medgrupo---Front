import { Outlet, Link } from 'react-router-dom';
import { School, LayoutDashboard, Settings, User } from 'lucide-react';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-white/5 h-16 px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="bg-primary p-1.5 rounded-lg text-white">
            <School size={20} />
          </div>
          <span>Edu<span className="text-primary">Manager</span></span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium leading-none">Admin CityHall</p>
            <p className="text-xs text-muted-foreground mt-1">Gestor Municipal</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white border-2 border-white/10">
            <User size={20} />
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        <Outlet />
      </main>

      <footer className="border-t border-white/5 py-8 mt-auto px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 EduManager - Sistema de Gestão Escolar Municipal</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
