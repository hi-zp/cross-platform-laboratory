/* eslint-disable jsx-a11y/accessible-emoji */
import { WelcomePage } from '@cross-platform-laboratory/containers';
import React from 'react';
import { StatusBar } from 'react-native';

export const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <WelcomePage />
    </>
  );
};

export default App;
