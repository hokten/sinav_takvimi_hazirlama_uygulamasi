import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { worker } from './mocks/browser'

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const theme = createTheme({
  /** Put your mantine theme override here */
});

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

enableMocking().then(() => {


const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <MantineProvider theme={theme}>
     <Notifications />
      <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
  )});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
