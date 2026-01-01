
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useContext } from 'react';
import { AuthContext } from '../App';
import hairLogo from '../hairlogo.png';


const Navbar = () => {
  const { itemCount } = useCart();
  
  // Dark mode toggle
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const auth = useContext(AuthContext);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-brown py-3' 
        : 'bg-brown-50/80 dark:bg-gray-950/80 backdrop-blur-md py-5'
    } px-6 flex justify-between items-center`}>
      <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-brand-primary dark:text-gold-300 tracking-tight hover:scale-105 transition-transform font-heading group">
        <div className="relative">
          <img 
            src={hairLogo} 
            alt="Chi's Luxe Beauties Logo" 
            className="w-12 h-12 rounded-full shadow-brown bg-white border-2 border-brand-accent dark:border-gold-400 object-contain group-hover:rotate-12 transition-transform duration-300" 
          />
          <div className="absolute inset-0 rounded-full bg-gradient-gold opacity-0 group-hover:opacity-30 blur-lg transition-opacity"></div>
        </div>
        <span className="text-lg bg-gradient-brown bg-clip-text text-transparent dark:text-gold-300">Chi's Luxe Beauties</span>
      </Link>

      {/* Desktop menu */}
      <div className="hidden lg:flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-full px-2 py-2 shadow-md">
          <Link 
            to="/products" 
            className="text-brand-primary dark:text-gold-300 font-semibold px-4 py-2 rounded-full hover:bg-brand-accent/10 dark:hover:bg-gold-400/10 hover:text-brand-accent dark:hover:text-gold-400 transition-all duration-300"
          >
            Products
          </Link>
          <Link 
            to="/booking" 
            className="text-brand-primary dark:text-gold-300 font-semibold px-4 py-2 rounded-full hover:bg-brand-accent/10 dark:hover:bg-gold-400/10 hover:text-brand-accent dark:hover:text-gold-400 transition-all duration-300"
          >
            📅 Book
          </Link>
          <Link 
            to="/cart" 
            className="text-brand-primary dark:text-gold-300 font-semibold px-4 py-2 rounded-full hover:bg-brand-accent/10 dark:hover:bg-gold-400/10 hover:text-brand-accent dark:hover:text-gold-400 transition-all duration-300 relative"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-gold text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-gold animate-pulse">
                {itemCount}
              </span>
            )}
          </Link>
          <Link 
            to="/admin" 
            className="text-brand-primary dark:text-gold-300 font-semibold px-4 py-2 rounded-full hover:bg-brand-accent/10 dark:hover:bg-gold-400/10 hover:text-brand-accent dark:hover:text-gold-400 transition-all duration-300"
          >
            Admin
          </Link>
          <Link 
            to="/about-us" 
            className="text-brand-primary dark:text-gold-300 font-semibold px-4 py-2 rounded-full hover:bg-brand-accent/10 dark:hover:bg-gold-400/10 hover:text-brand-accent dark:hover:text-gold-400 transition-all duration-300"
          >
            About Us
          </Link>
        </div>
        {!auth?.token ? (
          <Link 
            to="/auth" 
            className="btn-gold ml-2"
          >
            Sign In
          </Link>
        ) : (
          <Link 
            to="/logout" 
            className="text-brand-primary dark:text-gold-300 font-semibold px-4 py-2 rounded-full hover:bg-brand-accent/10 dark:hover:bg-gold-400/10 transition-all duration-300"
          >
            {auth.email}
          </Link>
        )}
        <button
          onClick={() => setDark((d) => !d)}
          className="ml-3 p-3 rounded-full bg-gradient-to-br from-brand-lighter to-brown-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-lg transition-all duration-300 transform hover:scale-110"
          aria-label="Toggle dark mode"
        >
          <span className="text-xl">{dark ? '🌙' : '☀️'}</span>
        </button>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden flex items-center gap-2">
        <button
          onClick={() => setDark((d) => !d)}
          className="p-2 rounded-full bg-gradient-to-br from-brand-lighter to-brown-100 dark:from-gray-800 dark:to-gray-700 transition-all"
          aria-label="Toggle dark mode"
        >
          <span className="text-lg">{dark ? '🌙' : '☀️'}</span>
        </button>
        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="p-3 rounded-lg bg-gradient-brown shadow-brown hover:shadow-brown-lg transition-all duration-300"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-2xl flex flex-col py-6 z-50 animate-slideUp border-t-2 border-brand-accent/20">
          <Link 
            to="/products" 
            className="w-full text-center py-3 text-brand-primary dark:text-gold-300 font-semibold hover:bg-brand-accent/10 dark:hover:bg-gold-400/10 transition-all duration-300" 
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>
          <Link 
            to="/booking" 
            className="w-full text-center py-3 text-brand-primary dark:text-gold-300 font-semibold hover:bg-brand-accent/10 dark:hover:bg-gold-400/10 transition-all duration-300" 
            onClick={() => setMenuOpen(false)}
          >
            📅 Book Appointment
          </Link>
          <Link 
            to="/cart" 
            className="w-full text-center py-3 text-brand-primary dark:text-gold-300 font-semibold hover:bg-brand-accent/10 dark:hover:bg-gold-400/10 transition-all duration-300 relative" 
            onClick={() => setMenuOpen(false)}
          >
            Cart {itemCount > 0 && <span className="badge-gold ml-2">{itemCount}</span>}
          </Link>
          <Link 
            to="/admin" 
            className="w-full text-center py-3 text-brand-primary dark:text-gold-300 font-semibold hover:bg-brand-accent/10 dark:hover:bg-gold-400/10 transition-all duration-300" 
            onClick={() => setMenuOpen(false)}
          >
            Admin
          </Link>
          <Link 
            to="/about-us" 
            className="w-full text-center py-3 text-brand-primary dark:text-gold-300 font-semibold hover:bg-brand-accent/10 dark:hover:bg-gold-400/10 transition-all duration-300" 
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          {!auth?.token ? (
            <div className="px-6 mt-4">
              <Link 
                to="/auth" 
                className="btn-gold w-full block text-center" 
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link 
              to="/logout" 
              className="w-full text-center py-3 text-brand-primary dark:text-gold-300 font-semibold hover:bg-brand-accent/10 dark:hover:bg-gold-400/10 transition-all duration-300" 
              onClick={() => setMenuOpen(false)}
            >
              {auth.email}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
