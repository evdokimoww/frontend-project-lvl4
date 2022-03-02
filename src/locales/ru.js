export default {
  ru:
    {
      translation: {
        header: {
          logoText: 'Hexlet Chat',
          logoutBtn: 'Выйти',
        },
        loginPage: {
          loginTitle: 'Войти',
          incorrectDataAlert: 'Неправильный логин или пароль',
          submitButton: 'Войти',
          noAccountQuestion: 'Нет аккаунта?',
          registrationLink: 'Регистрация',
          loginFormValidation: {
            noUsername: 'Имя пользователя не указано',
            usernameMaxLength: 'Длина не более 15 символов',
            noPassword: 'Пароль не указан',
            passwordMaxLength: 'Длина не менее 4 символов'
          },
          loginForm: {
            usernameLabel: 'Имя пользователя',
            passwordLabel: 'Пароль',
          }
        },
        signupPage: {
          signupTitle: 'Регистрация',
          alertAlreadyExist: 'Пользователь с таким именем уже существует!',
          submitButton: 'Зарегистрироваться',
          signupFormValidation: {
            noUsername: 'Имя пользователя не указано',
            usernameMaxLength: 'Длина не более 15 символов',
            noPassword: 'Пароль не указан',
            passwordMaxLength: 'Длина не менее 6 символов',
            passwordsMustMatch: 'Пароли должны совпадать',
          },
          signupForm: {
            usernameLabel: 'Имя пользователя',
            passwordLabel: 'Пароль',
            confirmLabel: 'Подтверждение пароля',
          }
        },
        chatPage: {
          chatChannels: {
            title: 'Каналы',
            renameButton: 'Переименовать',
            removeButton: 'Удалить'
          },
          chatMessages: {
            messageCounter: {
              count_one: '{{count}} сообщение',
              count_few: '{{count}} сообщения',
              count_many: '{{count}} сообщений',
            },
            messageInputPlaceholder: 'Ваше сообщение ...',
            sendMessageButton: 'Отправить'
          }
        },
        modals: {
          modalsValidate: {
            required: 'Обязательное поле',
            minMaxLength: 'От 3 до 20 символов',
            uniqueChannelName: 'Должно быть уникальным',
          },
          modalsButton: {
            sendBtn: 'Отправить',
            closeBtn: 'Закрыть',
            removeBtn: 'Удалить',
          },
          addChannelModal: {
            modalTitle: 'Добавить канал',
            channelNameInput: 'Введите имя канала',
          },
          renameChannelModal: {
            modalTitle: 'Переименовать канал',
            channelNameInput: 'Введите имя канала',
          },
          removeChannelModal: {
            modalTitle: 'Удалить канал',
            modalWarning: 'Уверены?',
          }
        }
      }
    }
};