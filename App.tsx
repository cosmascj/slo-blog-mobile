import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { LoadApp } from '@/pilot';
import AuthContextProvider from '@/context/AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <AuthContextProvider>
        <LoadApp />

        <FlashMessage position="top" />
        <StatusBar style="auto" />
      </AuthContextProvider>

    </QueryClientProvider>
  );
}


