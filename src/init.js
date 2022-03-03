import i18next from 'i18next';
import ru from './locales/ru.js';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import store from './slices/index.js';
import App from './components/App.js';
import { Provider } from 'react-redux';
import React from 'react';
import filter from 'leo-profanity';

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

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nextInstance}>
        <App socket={socket}/>
      </I18nextProvider>
    </Provider>
  )
}