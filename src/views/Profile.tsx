import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container className="profile-page">
      <h1>Perfil</h1>
      <p>Bem-vindo ao seu perfil.</p>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Voltar para Home
      </Button>
    </Container>
  );
};

export default Profile;