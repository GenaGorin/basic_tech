import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
} from "@material-ui/core";
import { Navigate, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../routes/constant-route";
import { useDispatch } from "react-redux";
import { register } from "../redux/userSlice";

const currencies = [
  {
    value: "male",
    label: "Мужчина",
  },
  {
    value: "female",
    label: "Женщина",
  },
];

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [birthdate, setBirthdate] = useState("");
  const [file, setFile] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const registerHandler = (e) => {
    e.preventDefault();
    if ((!name, !email, !password, !birthdate)) {
      return false;
    }
    const data = {
      name,
      email,
      password,
      birthdate,
      gender,
      img: file,
    };
    dispatch(register(data));
    //console.log(data);
  };

  const setPhoto = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  return (
    <div className="App">
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Регистрация
            </Typography>

            <form>
              <Grid container spacing={1}>
                <Grid xs={12} item>
                  <TextField
                    placeholder="Укажите имя"
                    label="Имя"
                    variant="outlined"
                    fullWidth
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    placeholder="Укажите email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    placeholder="Укажите пароль"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="date"
                    placeholder="Дата рождения"
                    label="Дата рождения"
                    variant="outlined"
                    fullWidth
                    required
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    value={gender}
                    onChange={handleChange}
                    helperText="Укажите ваш пол"
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="file"
                    //label="Фото"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setPhoto(e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={(e) => registerHandler(e)}
                  >
                    Зарегистрироваться
                  </Button>
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </form>
            <Button
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Войти
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default RegisterPage;
