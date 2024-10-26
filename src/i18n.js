
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      name: 'Name',
      email: 'Email',
      password: 'Password',
      submit: 'Submit',
    },
  },
  ru: {
    translation: {
      name: 'Имя',
      email: 'Электронная почта',
      password: 'Пароль',
      submit: 'Отправить',
    },
  },
};

i18n 
  .use(initReactI18next)  
  .init({
    resources,
    fallbackLng: 'en'
  });

export default i18n;


