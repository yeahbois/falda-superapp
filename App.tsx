import React from 'react';
import HomeScreen from './src/app/index';

/**
 * Universal Application Entrypoint
 * Standalone React Native runners targeting App.tsx now render the unified Expo Router home screen.
 */
export default function App() {
  return <HomeScreen />;
}
