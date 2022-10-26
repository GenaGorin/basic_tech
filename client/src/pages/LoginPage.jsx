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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { REGISTRATION_ROUTE } from "../routes/constant-route";
import { login } from "../redux/userSlice";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="App">
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Авторизация
            </Typography>

            <form>
              <Grid container spacing={1}>
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
                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={(e) => handleLogin(e)}
                  >
                    Войти
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
              onClick={() => navigate(REGISTRATION_ROUTE)}
            >
              Регистрация
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default LoginPage;
