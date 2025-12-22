
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useContext } from 'react';
import { AuthContext } from '../App';
import hairLogo from '../hairlogo.png';


const Navbar = () => {
  const { itemCount } = useCart();
  
  // Dark mode toggle
  // Default to dark mode
  const [dark, setDark] = React.useState(true);
  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  const [menuOpen, setMenuOpen] = React.useState(false);

  const auth = useContext(AuthContext);

  return (
    <nav className="bg-purple-50 dark:bg-gray-950 shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-50 transition-colors duration-300">
      <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-purple-600 dark:text-brand-accent tracking-tight hover:scale-105 transition-transform font-heading">
        <img src={hairLogo} alt="Chi's Luxe Beauties Logo" className="w-11 h-11 rounded-full shadow bg-white border border-purple-100 dark:border-gray-700 object-contain" />
        <span className="text-lg">Chi's Luxe Beauties</span>
      </Link>
      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-2">
        <div className="space-x-4">
          <Link to="/products" className="text-purple-600 dark:text-brand-accent font-medium px-3 py-2 rounded hover:bg-purple-100 dark:hover:bg-gray-900 hover:text-purple-700 transition-colors">Products</Link>
          <Link to="/cart" className="text-purple-600 dark:text-brand-accent font-medium px-3 py-2 rounded hover:bg-purple-100 dark:hover:bg-gray-900 hover:text-purple-700 transition-colors relative">
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <Link to="/admin" className="text-brand-primary dark:text-brand-accent font-medium px-3 py-2 rounded hover:bg-brand-muted dark:hover:bg-gray-900 hover:text-brand-accent dark:hover:text-brand-accent transition-colors">Admin</Link>
          <Link to="/about-us" className="text-brand-primary dark:text-brand-accent font-medium px-3 py-2 rounded hover:bg-brand-muted dark:hover:bg-gray-900 hover:text-brand-accent dark:hover:text-brand-accent transition-colors">About Us</Link>
          {!auth?.token ? (
            <Link to="/auth" className="text-white bg-pink-500 px-3 py-2 rounded-full font-semibold ml-2">Sign In</Link>
          ) : (
            <Link to="/logout" className="text-purple-600 dark:text-brand-accent font-medium px-3 py-2 rounded hover:bg-purple-100">{auth.email}</Link>
          )}
        </div>
        <button
          onClick={() => setDark((d) => !d)}
          className="ml-4 p-2 rounded-full bg-purple-100 dark:bg-gray-800 hover:bg-purple-200 transition-colors"
          aria-label="Toggle dark mode"
        >
          {dark ? '🌙' : '☀️'}
        </button>
      </div>
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-accent"
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-brand-primary mb-1"></span>
          <span className="block w-6 h-0.5 bg-brand-primary mb-1"></span>
          <span className="block w-6 h-0.5 bg-brand-primary"></span>
        </button>
      </div>
      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white dark:bg-gray-950 shadow-lg flex flex-col items-center py-6 z-50 animate-fadeIn">
          <Link to="/products" className="w-full text-center py-2 text-brand-primary dark:text-brand-accent font-medium hover:bg-brand-muted dark:hover:bg-gray-900" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link to="/cart" className="w-full text-center py-2 text-brand-primary dark:text-brand-accent font-medium hover:bg-brand-muted dark:hover:bg-gray-900" onClick={() => setMenuOpen(false)}>Cart</Link>
          <Link to="/admin" className="w-full text-center py-2 text-brand-primary dark:text-brand-accent font-medium hover:bg-brand-muted dark:hover:bg-gray-900" onClick={() => setMenuOpen(false)}>Admin</Link>
          <Link to="/about-us" className="w-full text-center py-2 text-brand-primary dark:text-brand-accent font-medium hover:bg-brand-muted dark:hover:bg-gray-900" onClick={() => setMenuOpen(false)}>About Us</Link>
          {!auth?.token ? (
            <Link to="/auth" className="w-full text-center py-2 text-white bg-pink-500 rounded font-medium mt-2" onClick={() => setMenuOpen(false)}>Sign In</Link>
          ) : (
            <Link to="/logout" className="w-full text-center py-2 text-brand-primary dark:text-brand-accent font-medium hover:bg-brand-muted dark:hover:bg-gray-900" onClick={() => setMenuOpen(false)}>{auth.email}</Link>
          )}
          <button
            onClick={() => { setDark((d) => !d); setMenuOpen(false); }}
            className="mt-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-brand-muted dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? '🌙' : '☀️'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
