import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, LogIn, MessageSquare, Sun, Moon, X, LogOut, User, Settings } from 'lucide-react';
import Button from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';

export const Sidebar = ({ onCloseMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, userProfile, isAdmin } = useAuth();
  
  // Check if the current path matches the link
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
      if (onCloseMobile) onCloseMobile();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[hsl(var(--sidebar-background))] p-6 w-72">
      <div className="flex items-center justify-between w-full mb-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M8 12l4-4 4 4-4 4z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-blue-500">Comet</span>
        </Link>
        
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          
          {/* Close button - only visible on mobile */}
          <button 
            className="ml-2 rounded-full p-1.5 text-sidebar-foreground hover:bg-sidebar-accent lg:hidden" 
            onClick={onCloseMobile}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <Link
          to="/"
          className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
            isActive('/') 
              ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground' 
              : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
          }`}
          onClick={onCloseMobile}
        >
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link
          to="/chat"
          className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
            isActive('/chat') 
              ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground' 
              : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
          }`}
          onClick={onCloseMobile}
        >
          <MessageSquare size={20} />
          <span>Live Chat</span>
        </Link>
        
        {/* Admin Dashboard Link - Only visible to admins */}
        {isAdmin && (
          <Link
            to="/admin"
            className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
              isActive('/admin') 
                ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground' 
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            }`}
            onClick={onCloseMobile}
          >
            <Settings size={20} />
            <span>Admin Dashboard</span>
          </Link>
        )}
      </div>

      <div className="mt-auto">
        {isAuthenticated ? (
          <div className="space-y-3">
            {/* User profile section */}
            <div className="flex items-center gap-3 px-2 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <User size={18} />
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="truncate font-medium text-sidebar-foreground">
                  {userProfile?.name || 'User'}
                </h3>
                <p className="truncate text-xs text-sidebar-muted">
                  {userProfile?.role === 'admin' ? 'Administrator' : 
                   userProfile?.role === 'moderator' ? 'Moderator' : 'User'}
                </p>
              </div>
            </div>
            
            {/* Logout button */}
            <Button 
              variant="outline" 
              className="w-full justify-center border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              leftIcon={<LogOut size={16} />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/login">
            <Button 
              variant="outline" 
              className="w-full justify-center border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              leftIcon={<LogIn size={16} />}
              onClick={onCloseMobile}
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;