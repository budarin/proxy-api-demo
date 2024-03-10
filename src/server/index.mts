import express from "express";
import {
  addUser,
  changeUserPassword,
  deleteUser,
  getUser,
  updateUser,
  users,
} from "./usersStore.mjs";

const app = express();
const port = 3000;

app.use(express.static("dist/client"));
app.use(express.json());

// Методы АПИ

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

app.post("/create_user", (req, res) => {
  const createdUser = addUser(req.body);
  res.status(201).json(createdUser);
});

app.put("/update_user", (req, res) => {
  const updatedUser = updateUser(req.body);

  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    res.status(400).json({
      message: "Пользователь не найден",
    });
  }
});

app.delete("/delete_user", (req, res) => {
  const deletedUser = deleteUser(req.body.id);

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
