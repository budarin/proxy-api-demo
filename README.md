# Демо прокси для АПИ слоя на клиенте

Демо проект демонтрирует использование слоя АПИ, реализованного при помощи Proxy.
Для простоты кода и демонстрации идеи реализуем следующие соглашения:

- протокол АПИ - RPC
- данные передаются в формате json
- не будем реализовывать всех проверок для простоты кода
- и по этому считаем что все методы выполняются успешно
  (вы самостоятельно можете добавить все проверки и генерацию ошибок)
- имя метода АПИ на клиенте имеет следующую структуру <httpMethod><entityName>

Пример вызова на клиенте

```ts
api.getUsers();
// => GET http://domain/api/get_users

api.getUser({ id: 1 });
// => GET http://domain/api/get_user?id=1

api.createUser({ name: "Ivan", email: "ivan@domain.ru", password: "123456" });
// => PUT http://domain/api/create_user
// body: { name: "Ivan", email: "ivan@domain.ru", password: "123456" }

api.updateUser({ id: 1, name: "Ivan", email: "ivan@new-domain.ru" });
// => POST http://domain/api/update_user
// body: { id: 1, name: "Ivan", email: "ivan@new-domain.ru" }

api.changeUserPassword({
  id: 1,
  oldPassword: "123456",
  newPassword: "new password",
});
// => POST http://domain/api/change_user_password
// body: { id: 1, oldPassword: "123456", newPassword: "new password" }

api.deleteUser({ id: 1 });
// => DELETE http://domain/api/delete_user
// body: { id: 1 }
```

Для установки всех зависимостей выполните в терминале команду

- npm install

Для запуска проекта нужно в отдельных окнах терминала выполнить команды запуска серверов

- npm run server
- npm run client

Для остановки процессов вам нужно в каждом терминале процесса нажать `Ctrl + C`;

Запустите процессы, откройте браузер по адресу `http://localhost:3000`, откройте консоль и убедитесь что все вызовы АПИ были выполнены успешно и вернули результат

Остановите процессы.

Теперь для понимания процесса обновления клиента после изменений на сервере измените к примеру имя метода на сервере с `createUser` на `createPerson`.

Для того, чтобы эти изменения были применимы на клиенте - необходимо изменить описание измененного метода в файле описания интерфейса АПИ `./src/api-interface.ts` - переименуйте метод в этом файле.

Теперь перейдите в файл клиента `./scr/client/index.ts` - на вызове `api.createUser(...)` вы увидите ошибку typescript.
Наведите мышку на слово `createUser` - вы увидите сообщение об ошибке: `Property 'createUser' does not exist on type 'API'.` Теперь удалите `.createUser` поставьте точку - IDE покажет вам список доступных методов - среди них будет и новое имя метода `createPerson`. Выберите его. Запустите процессы снова и убедитесь в том что все работает

Вы можете выработать свои соглашения и ограничения и реализовать их в объекте-прокси