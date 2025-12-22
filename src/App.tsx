import React, { useState, createContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import AppRoutes from './AppRoutes';
import Footer from './components/Footer';
import NewsletterSignup from './components/NewsletterSignup';

export const AuthContext = createContext<{ token: string | null; email: string | null } | undefined>(undefined);


function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [email, setEmail] = useState(() => localStorage.getItem('email'));

  const handleAuth = (token: string, email: string) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    window.location.href = '/';
  };

  return (
    <CartProvider>
      <AuthContext.Provider value={{ token, email }}>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
            <Navbar />
            <main className="flex-1">
              <AppRoutes onAuth={handleAuth} />
            </main>
            <NewsletterSignup />
            <Footer />
          </div>
        </Router>
      </AuthContext.Provider>
    </CartProvider>
  );
}

export default App;
