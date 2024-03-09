import express from "express";
import type { User, UserInfo } from "../api-interface";

const app = express();
const port = 3000;

const users = new Map<number, User>();

function getUser(id: number): UserInfo | undefined {
  const user = users.get(id);

  if (!user) {
    return;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

function addUser(user: User): UserInfo | undefined {
  const { name, email, password } = user;

  if (!name || !email || !password) {
    return;
  }

  user.id = users.size + 1;
  users.set(user.id, { id: user.id, name, email, password });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

function updateUser(user: User): UserInfo | undefined {
  if (!user.id) {
    return;
  }
  users.set(user.id, user);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

function deleteUser(id: number): UserInfo | undefined {
  const user = users.get(id);

  if (!user) {
    return;
  }

  users.delete(id);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

function changeUserPassword(
  id: number,
  oldPassword: string,
  newPassword: string
): boolean {
  const user = users.get(id);

  if (user && user.password === oldPassword) {
    user.password = newPassword;
    return true;
  }
  return false;
}

app.use(express.static("dist/client"));
app.use(express.json());

app.get("/get_users", (_, res) => {
  res.status(200).json([...users.values()]);
});

app.get("/get_user", (req, res) => {
  const user = req.query.id && getUser(Number(req.query.id));

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).json({
      message: "Пользователь с таким id не найден",
    });
  }
});

app.put("/create_user", (req, res) => {
  const data = req.body;
  const createdUser = addUser(data);
  res.status(201).json(createdUser);
});

app.post("/update_user", (req, res) => {
  const data = req.body;
  const updatedUser = updateUser(data);

  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    res.status(400).json({
      message: "Пользователь не найден",
    });
  }
});

app.delete("/delete_user", (req, res) => {
  const data = req.body;
  const deletedUser = deleteUser(data.id);

  if (deletedUser) {
    res.status(200).json(deletedUser);
  } else {
    res.status(400).json({
      message: "Пользователь с таким id не найден",
    });
  }
});

app.patch("/change_user_password", (req, res) => {
  const data = req.body;

  const result = changeUserPassword(
    data.id,
    data.oldPassword,
    data.newPassword
  );

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({
      message: "Пользователь с таким id не найден",
    });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
