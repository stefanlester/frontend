
import React, { useState } from 'react';
import { signup, login } from '../api';
import hairLogo from '../hairlogo.png';

interface AuthPageProps {
  onAuth: (token: string, email: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const fn = isLogin ? login : signup;
      const res = await fn(email, password);
      onAuth(res.token, res.email);
    } catch (err: any) {
      setError(err?.message || 'Auth failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-3xl w-full mx-auto">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full text-center">
          <img src={hairLogo} alt="logo" className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100">{isLogin ? 'Sign In' : 'Create Account'}</h2>
          <p className="text-sm text-gray-500 mb-6">{isLogin ? '' : ''}</p>

          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="mb-3 block w-full p-3 rounded-lg border border-gray-200 bg-white dark:bg-gray-700 text-center mx-auto"
          />

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="mb-3 block w-full p-3 rounded-lg border border-gray-200 bg-white dark:bg-gray-700 text-center mx-auto"
          />

          {error && <div className="text-red-500 text-center mb-3">{error}</div>}

          <button
            type="submit"
            className="w-3/4 mx-auto bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow hover:shadow-lg transition-all"
            disabled={loading}
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>

          <div className="mt-4 text-sm">
            <button type="button" className="text-sm text-gray-500 underline" onClick={() => setIsLogin(l => !l)}>
              {isLogin ? 'Create an account' : 'Have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
