import i18next from 'i18next';
import ru from './locales/ru.js';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import store from './slices/index.js';
import App from './components/App.js';
import { Provider } from 'react-redux';
import React from 'react';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

export default async (socket) => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources: ru,
    });

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const rollbarConfig = {
    accessToken: 'ce6cb18737c348a5a2788b472e04021f',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  }

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18nextInstance}>
            <App socket={socket}/>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  )
}