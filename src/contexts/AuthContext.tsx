import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'pedagogia' | 'psicologia' | 'nutricion' | 'trabajo-social' | 'general';
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking auth from localStorage
    const stored = localStorage.getItem('edugest-user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    // For demo, we'll hardcode some users
    const users: Record<string, { password: string; user: User }> = {
      'admin@colegio.edu': { password: 'admin123', user: { id: '1', name: 'Administrador', email: 'admin@colegio.edu', role: 'admin' } },
      'pedagogia@colegio.edu': { password: 'pedago123', user: { id: '2', name: 'Pedagogo', email: 'pedagogia@colegio.edu', role: 'pedagogia' } },
      'psicologia@colegio.edu': { password: 'psico123', user: { id: '3', name: 'Psicólogo', email: 'psicologia@colegio.edu', role: 'psicologia' } },
      'nutricion@colegio.edu': { password: 'nutri123', user: { id: '4', name: 'Nutricionista', email: 'nutricion@colegio.edu', role: 'nutricion' } },
      'trabajosocial@colegio.edu': { password: 'ts123', user: { id: '5', name: 'Trabajador Social', email: 'trabajosocial@colegio.edu', role: 'trabajo-social' } },
      'general@colegio.edu': { password: 'general123', user: { id: '6', name: 'Personal General', email: 'general@colegio.edu', role: 'general' } },
    };

    const u = users[email];
    if (!u || u.password !== password) {
      throw new Error('Credenciales inválidas');
    }
    setUser(u.user);
    localStorage.setItem('edugest-user', JSON.stringify(u.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edugest-user');
    window.location.href = '/login';
  };

  if (loading) {
    return null; // or show a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};