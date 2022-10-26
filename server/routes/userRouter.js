const Router = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = new Router();

router.post(
  "/registration",
  [
    check("name", "Укажите имя").notEmpty(),
    check("email", "Некорректный email").isEmail(),
    check("password", "Введите пароль").notEmpty(),
    check("birthdate", "Укажите дату рождения").notEmpty(),
    check("gender", "Укажите пол").notEmpty(),
  ],
  userController.registration
);
router.post(
  "/login",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Введите пароль").notEmpty(),
  ],
  userController.login
);
router.get("/getUsers", authMiddleware, userController.getUsers);
router.put("/update", authMiddleware, userController.updateProfie);

module.exports = router;
