import { io } from 'socket.io-client';
import i18next from 'i18next';
import ru from './locales/ru.js';
import { initReactI18next } from 'react-i18next';

export default async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
    lng: 'ru',
    resources: ru,
  });

  const socket = io();



  return { socket, i18nextInstance }
}