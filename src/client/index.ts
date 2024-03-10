import { API } from "../api-interface";

var httpMethods = {
  get: "GET",
  create: "POST",
  update: "PUT",
  change: "PATCH",
  delete: "DELETE",
};

function getHttpMethod(method: string) {
  return httpMethods[method.toLowerCase() as keyof typeof httpMethods] || "GET";
}
function camelToSnake(str: string) {
  return str.replace(/([A-Z])/g, function ($1) {
    return "_".concat($1.toLowerCase());
  });
}

// Описываем фабрику Proxy API объекта
var getAPI = function (apiUrl: string): API {
  return new Proxy(
    {},
    {
      get: function (_, method_name: string) {
        return async (props?: Record<string, string>) => {
          const apiMethod = camelToSnake(method_name);
          const httpMethod = getHttpMethod(apiMethod.split("_")[0]);
          const isGetMethod = httpMethod === "GET";
          const url = new URL(`${apiUrl}/${apiMethod}`);

          const options: RequestInit = {
            method: httpMethod,
            headers: { "Content-Type": "application/json" },
          };

          if (isGetMethod) {
            if (props) {
              url.search = new URLSearchParams(props).toString();
            }
          } else {
            options.body = JSON.stringify(props);
          }

          const response = await fetch(url, options);

          return response.json();
        };
      },
    }
  ) as API;
};

async function main() {
  // Создаем экземпляр API на клиенте
  var api = getAPI("http://localhost:3000");

  // Вызываем методы API
  let result;

  result = await api.createUser({
    name: "Ivan",
    email: "ivan@domain.ru",
    password: "123456",
  });
  console.log(
    "api.createUser({ name: 'Ivan', email: 'ivan@domain.ru', password: '123456' })",
    result
  );

  result = await api.getUsers();
  console.log("api.getUsers()", result);

  result = await api.updateUser({
    id: 1,
    name: "Ivan",
    email: "ivan@new-domain.ru",
  });
  console.log(
    "api.updateUser({ name: 'Ivan', email: 'ivan@new-domain.ru' })",
    result
  );

  result = await api.changeUserPassword({
    id: 1,
    oldPassword: "123456",
    newPassword: "new password",
  });
  console.log(
    "api.changeUserPassword({ id: 1, oldPassword: '123456', newPassword: 'new password' })",
    result
  );

  result = await api.deleteUser({ id: 1 });
  console.log("api.deleteUser({ id: 1 })", result);
}

main();
