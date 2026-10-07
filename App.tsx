import React from 'react';
import { HomeScreen } from './src/screens/HomeScreen';

/**
 * Universal Application Entrypoint
 * Used directly by React Native Windows, macOS, and standard React Native runners.
 * In Expo Router, src/app/_layout.tsx serves as the file-based route navigator.
 */
export default function App() {
  return <HomeScreen />;
}
