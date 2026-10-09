import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import { store } from './redux/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './app/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastProvider } from './shared/toast/ToastContext.tsx';
import { env } from './config/env.ts';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Missing #root element');
}
createRoot(rootElement).render(
  <StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <Provider store={store}>
          <GoogleOAuthProvider clientId={env.googleClientId}>
            <App />
          </GoogleOAuthProvider>
        </Provider>
      </BrowserRouter>
    </ToastProvider>
  </StrictMode>
);
