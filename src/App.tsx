import logo from './logo.svg';
import './App.scss';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import React from 'react';

const App = ({children} : {children: any}) => {
  return (
    <AppProvider>
      {children}
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
