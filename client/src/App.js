import { useSelector } from "react-redux";
import AppRouter from "./routes/AppRouter";
import { Container, Box } from "@material-ui/core";
import { useEffect } from "react";

function App() {
  return (
    <Container style={{ marginTop: "100px" }} maxWidth="sm">
      <AppRouter />
    </Container>
  );
}

export default App;
