import React, { useState } from "react";
import { Button } from "@mui/material";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showAlert, setShowAlert] = useState(true);
  const navigate = useNavigate(); // Hook para redirecionamento

  const handleLogin = () => {
    localStorage.setItem("token", "mockToken123"); // Salva o token no localStorage
    setShowAlert(false); // Oculta o alerta
    navigate("/"); // Redireciona para a página principal
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {showAlert && (
        <Alert
          message="Você não está logado. Por favor, faça login."
          severity="warning"
        />
      )}
      <p>Faça login na sua conta.</p>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Clique Aqui
      </Button>
    </div>
  );
};

export default SignIn;
