import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import { store } from './redux/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './app/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastProvider } from './shared/toast/ToastContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <Provider store={store}>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>
        </Provider>
      </BrowserRouter>
    </ToastProvider>
  </StrictMode>
);
