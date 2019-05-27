export default [
  {label: "Имя", key: "firstName", render: true, defaultValue: 'Не заполнено'},
  {label: "Фамилия", key: "lastName", render: true, defaultValue: 'Не заполнено'},
  {label: "Отчество", key: "middleName", render: true, defaultValue: 'Не заполнено'},
  {
    label: "Пол", key: "gender", type: "select", render: true, options: [
      {label: "Не указан", key: "UNKNOWN"},
      {label: "Мужской", key: "MALE"},
      {label: "Женский", key: "FEMALE"}
    ], defaultValue: 'UNKNOWN'
  },
  {label: "Страна Проживания", key: "country", render: true, defaultValue: 'Не заполнено'},
  {label: "Город Проживания", key: "city", render: true, defaultValue: 'Не заполнено'},
  {label: "Адресс, 8 символов", key: "address", render: true, defaultValue: 'Не заполнено'},
  {label: "Дополнительный Адресс, 8 символов", key: "addAddress", render: false, defaultValue: 'Не заполнено'},
  {label: "Аватар (URL)", key: "avatarUrl", render: false, defaultValue: null},
  {label: "Обложка (URL)", key: "coverUrl", render: false, defaultValue: null},
];
