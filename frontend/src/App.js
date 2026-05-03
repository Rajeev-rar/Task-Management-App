import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { 
  LoginIcon, 
  UserIcon, 
  CheckCircleIcon, 
  ClockIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

function App() {
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    testBackend();
  }, []);

  const testBackend = async () => {
    try {
      await axios.get('http://localhost:5000/');
      setBackendStatus('✅ Connected');
      toast.success('Backend Ready! ✨');
    } catch {
      setBackendStatus('❌ Offline');
      toast.error('Start backend: cd backend && npm run dev');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let res;
      if (currentView === 'signup') {
        res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      } else {
        res = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });
      }
      
      setUser(res.data.user);
      toast.success(`Welcome back, ${res.data.user.name}! 🎉`);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentView('login');
    toast.success('Logged out safely! 👋');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-10 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl float"></div>
      </div>

      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.2)',
          }
        }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="glass-hover max-w-md w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-10 pt-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl mb-6 shadow-2xl">
              <SparklesIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent mb-3">
              TaskMaster
            </h1>
            <p className="text-white/70 text-lg font-medium">Modern Team Collaboration</p>
          </div>

          {/* Backend Status */}
          <div className={`p-4 rounded-2xl mb-8 text-center font-semibold transition-all duration-500 ${
            backendStatus === '✅ Connected' 
              ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-100' 
              : backendStatus === '❌ Offline'
              ? 'bg-red-500/20 border-red-500/50 text-red-100'
              : 'bg-yellow-500/20 border-yellow-500/50 text-yellow-100'
          } border-2`}>
            <div className="flex items-center justify-center gap-2">
              {backendStatus === '✅ Connected' && <CheckCircleIcon className="w-5 h-5" />}
              {backendStatus === '❌ Offline' && <ClockIcon className="w-5 h-5" />}
              {backendStatus}
            </div>
          </div>

          {user ? (
            /* DASHBOARD VIEW */
            <div className="space-y-6">
              <div className="glass p-8 rounded-3xl text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl mb-4 mx-auto">
                  <UserIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{user.name}</h3>
                <p className="text-indigo-100 text-sm">{user.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button className="btn-primary flex-1" onClick={() => toast('Projects coming soon! 🚀')}>
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  Projects
                </button>
                <button className="btn-secondary flex-1">
                  Tasks
                </button>
              </div>

              <button 
                onClick={logout}
                className="w-full glass-hover p-4 rounded-2xl border-2 border-white/30 text-white font-semibold hover:border-white/50 transition-all duration-300"
              >
                👋 Logout
              </button>
            </div>
          ) : (
            /* AUTH FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentView === 'signup' && (
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-3">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full glass p-4 rounded-2xl text-white placeholder-white/50 focus:ring-4 focus:ring-indigo-500/30 focus:outline-none transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-3">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full glass p-4 rounded-2xl text-white placeholder-white/50 focus:ring-4 focus:ring-indigo-500/30 focus:outline-none transition-all"
                  placeholder="admin@team.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-3">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full glass p-4 rounded-2xl text-white placeholder-white/50 focus:ring-4 focus:ring-indigo-500/30 focus:outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full btn-primary text-lg font-bold py-5 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Processing...
                  </span>
                ) : currentView === 'signup' ? 'Create Account' : 'Sign In'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setCurrentView(currentView === 'login' ? 'signup' : 'login')}
                  className="text-indigo-200 hover:text-white font-semibold transition-colors"
                >
                  {currentView === 'login' 
                    ? "Don't have account? Create one" 
                    : "Already have account? Sign in"
                  }
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/50 text-xs text-center">
        Made with ❤️ using Tailwind CSS | localhost:3000
      </div>
    </div>
  );
}

export default App;