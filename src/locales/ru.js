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
          incorrectDataAlert: 'Неверные имя пользователя или пароль',
          submitButton: 'Войти',
          noAccountQuestion: 'Нет аккаунта?',
          registrationLink: 'Регистрация',
          loginFormValidation: {
            noUsername: 'Имя пользователя не указано',
            usernameMinMaxLength: 'От 3 до 20 символов',
            noPassword: 'Пароль не указан',
            passwordMaxLength: 'Длина не менее 4 символов'
          },
          loginForm: {
            usernameLabel: 'Ваш ник',
            passwordLabel: 'Пароль',
          },
          networkError: 'Ошибка подключения'
        },
        signupPage: {
          signupTitle: 'Регистрация',
          alertAlreadyExist: 'Пользователь с таким именем уже существует!',
          submitButton: 'Зарегистрироваться',
          signupFormValidation: {
            noUsername: 'Имя пользователя не указано',
            usernameMinMaxLength: 'От 3 до 20 символов',
            noPassword: 'Пароль не указан',
            passwordMaxLength: 'Не менее 6 символов',
            passwordsMustMatch: 'Пароли должны совпадать',
          },
          signupForm: {
            usernameLabel: 'Имя пользователя',
            passwordLabel: 'Пароль',
            confirmLabel: 'Подтвердите пароль',
          },
          networkError: 'Ошибка подключения'
        },
        chatPage: {
          chatChannels: {
            title: 'Каналы',
            renameButton: 'Переименовать',
            removeButton: 'Удалить',
            changeChannelButton: 'Управление каналом',
            plusButton: '+'
          },
          chatMessages: {
            messageCounter: {
              count_one: '{{count}} сообщение',
              count_few: '{{count}} сообщения',
              count_many: '{{count}} сообщений',
            },
            messageInputPlaceholder: 'Ваше сообщение ...',
            messageAriaLabel: 'Новое сообщение',
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
            inputLabel: 'Имя канала'
          },
          renameChannelModal: {
            modalTitle: 'Переименовать канал',
            channelNameInput: 'Введите имя канала',
            inputLabel: 'Имя канала'
          },
          removeChannelModal: {
            modalTitle: 'Удалить канал',
            modalWarning: 'Уверены?',
          },
          toastMessages: {
            successCreateChannel: 'Канал успешно создан',
            successRemoveChannel: 'Канал успешно удален',
            successRenameChannel: 'Канал успешно переименован'
          }
        },
      }
    }
};