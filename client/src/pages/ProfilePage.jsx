import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "../api/api";
import { setUser, update } from "../redux/userSlice";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import { USERS_ROUTE } from "../routes/constant-route";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();

  const setPhoto = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = { name, password, file };
    update(data);
    //console.log("update", data);
  };

  const logout = () => {
    dispatch(setUser({}));
  };

  return (
    <div>
      <div className="App">
        <Grid>
          <Card
            style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5">
                Редактирование профиля
              </Typography>

              <form>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      placeholder="Новое имя"
                      label="Новое имя"
                      variant="outlined"
                      fullWidth
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      placeholder="Новый пароль"
                      label="Новый пароль"
                      variant="outlined"
                      fullWidth
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
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
                      onClick={(e) => handleUpdate(e)}
                    >
                      Обновить данные
                    </Button>
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
              </form>
              <Grid item xs={12}>
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => navigate(USERS_ROUTE)}
                >
                  Все пользователи
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  style={{ marginTop: "10px" }}
                  size="large"
                  type="submit"
                  variant="contained"
                  color="default"
                  fullWidth
                  onClick={logout}
                >
                  Выйти
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </div>
    </div>
  );
};

export default ProfilePage;
