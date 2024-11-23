import React, { useState } from "react";
import { Switch, Typography, Container, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
    localStorage.getItem("notificationsEnabled") === "true"
  );

  const handleNotificationsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNotificationsEnabled(event.target.checked);
    localStorage.setItem(
      "notificationsEnabled",
      event.target.checked.toString()
    );
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Configurações
      </Typography>
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs>
          <Typography>Notificações</Typography>
        </Grid>
        <Grid item>
          <Switch
            checked={notificationsEnabled}
            onChange={handleNotificationsChange}
            color="primary"
          />
        </Grid>
      </Grid>
      <Button
        variant="outlined"
        onClick={() => navigate("/")}
        style={{ marginTop: "20px" }}
      >
        Voltar para Home
      </Button>
    </Container>
  );
};

export default Settings;