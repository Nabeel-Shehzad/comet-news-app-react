import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Get additional user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (userDoc.exists()) {
        console.log('User logged in successfully:', userDoc.data());
      } else {
        console.log('User logged in but no profile found');
      }
      
      // Redirect to home page after successful login
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      
      // Provide user-friendly error messages
      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Invalid email or password');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed login attempts. Please try again later');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled');
          break;
        default:
          setError('Failed to log in. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        role: 'user',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      console.log('User registered successfully:', user);
      
      // Redirect to home page after successful registration
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
      
      // Provide user-friendly error messages
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Email address is already in use');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Use at least 6 characters');
          break;
        default:
          setError('Failed to create account. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-12">
      <div className="w-full max-w-lg px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="text-primary text-4xl font-bold flex items-center">
            <svg className="w-8 h-8 mr-2 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
            Comet
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-lg">
          {/* Tab Navigation */}
          <div className="grid grid-cols-2">
            <button
              onClick={() => setActiveTab('login')}
              className={`py-4 text-center font-medium text-lg transition-all duration-200 ${
                activeTab === 'login' 
                  ? 'bg-[#222] text-primary border-b-2 border-primary' 
                  : 'bg-[#111] text-gray-400 border-b border-gray-800 hover:text-gray-300'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`py-4 text-center font-medium text-lg transition-all duration-200 ${
                activeTab === 'signup' 
                  ? 'bg-[#222] text-primary border-b-2 border-primary' 
                  : 'bg-[#111] text-gray-400 border-b border-gray-800 hover:text-gray-300'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-8">
            {/* Error Message Display */}
            {error && (
              <div className="bg-red-900/30 border border-red-800 text-red-100 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {/* Login Form */}
            {activeTab === 'login' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white">Welcome back</h2>
                <p className="text-gray-400 mb-8">Please enter your details to sign in</p>
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="remember" 
                        className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-primary focus:ring-primary/50"
                      />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-400">Remember me</label>
                    </div>
                    <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                  </div>
                  <Button
                    type="submit"
                    className="w-full py-3 mt-2"
                    variant="primary"
                    disabled={loading}
                    isLoading={loading}
                  >
                    Sign In
                  </Button>
                </form>
              </div>
            )}

            {/* Sign Up Form */}
            {activeTab === 'signup' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white">Create an account</h2>
                <p className="text-gray-400 mb-8">Enter your details to get started</p>
                <form onSubmit={handleSignUp} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <input
                      type="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      required
                      disabled={loading}
                      minLength={6}
                    />
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-primary focus:ring-primary/50"
                      required
                      disabled={loading}
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                      I agree to the <a href="#" className="text-primary hover:underline">Terms</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full py-3 mt-2"
                    variant="primary"
                    disabled={loading}
                    isLoading={loading}
                  >
                    Create Account
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;