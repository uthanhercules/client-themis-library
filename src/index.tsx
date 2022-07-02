import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterOutlet from './router';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './styles/global.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ToastContainer />
      <RouterOutlet />
    </ChakraProvider>
  </React.StrictMode>
);
