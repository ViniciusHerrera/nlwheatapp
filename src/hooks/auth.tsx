import React, { createContext, useContext, useState } from "react";
import * as AuthSessions from 'expo-auth-session';
import { api } from "../services/api";

const CLIENT_ID = '829cdcef07de3011f9fc';
const SCOPE = 'read:user'; // Para ler somente os dados de usuário

type User = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
}

type AuthContextData = {
  user: User | null;
  isSigning: boolean;  //Saber se esta logando
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: React.ReactNode;
}

type AuthResponse = {
  token: string;
  user: User;
}

type AuthorizationResponse = {
  params: {
    code?: string
  }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isSigning, setIsSigning] = useState(false);
  const [user, setUser] = useState<User | null>(null);


  async function signIn() {
    setIsSigning(true);
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`
    const { params } = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse;

    if (params && params.code) {
      const authResponse = await api.post('/authenticate', { code: params.code })
      const { user, token } = authResponse.data as AuthResponse;

      // Adiciona o token no header de todas as requisições
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    }

    setIsSigning(false);
  }

  async function signOut() {

  }

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      user,
      isSigning
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context;
}

export { AuthProvider, useAuth };