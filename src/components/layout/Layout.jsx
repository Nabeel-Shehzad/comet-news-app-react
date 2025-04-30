import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import SearchBar from '../ui/SearchBar';
import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Footer from './Footer';
import { useState } from 'react';

const Layout = () => {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Scroll to top whenever the location (route) changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className={`${theme} min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]`}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar - hidden on mobile unless toggled */}
      <div className={`fixed left-0 top-0 z-50 h-screen w-72 transform bg-[hsl(var(--sidebar-background))] transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
        <Sidebar onCloseMobile={() => setSidebarOpen(false)} />
      </div>

      {/* Main content area */}
      <div className="lg:ml-72">
        {/* Header - increased z-index to 50 */}
        <header className="sticky top-0 z-50 bg-[hsl(var(--background))] p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                className="rounded-full p-2 hover:bg-[hsl(var(--secondary))] lg:hidden"
                onClick={toggleSidebar}
              >
                <Menu size={22} />
              </button>

              {/* Theme toggle button for mobile only */}
              <button
                className="rounded-full p-2 hover:bg-[hsl(var(--secondary))] lg:hidden"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* SearchBar taking most of the space */}
            <div className="flex-grow">
              <SearchBar />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-6">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;