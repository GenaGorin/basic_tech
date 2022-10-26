import axios from "axios";

const basicTech = axios.create({
  // withCredentials: true,
  //baseURL: "http://x98736zu.beget.tech/web/api/",
  //baseURL: "http://api/api/",
  baseURL: "http://localhost:5000/api",
});

export const setToken = (token) => {
  basicTech.defaults.headers.common.Authorization = "Bearer " + token;
  return token;
};

export const api = {
  login(loginData) {
    return basicTech.post("/user/login", loginData);
  },
  register(data) {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("gender", data.gender);
    formData.append("birthdate", data.birthdate);
    formData.append("img", data.img);
    return basicTech.post("/user/registration", formData);
  },
  getUsers() {
    return basicTech.get("/user/getUsers");
  },
  update(data) {
    let formData = new FormData();
    if (data.name) {
      formData.append("name", data.name);
    }
    if (data.password) {
      formData.append("password", data.password);
    }
    if (data.file) {
      formData.append("image", data.file);
    }

    return basicTech.put("/user/update", formData);
  },
};
