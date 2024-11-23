import React, { useState } from 'react';
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField, // Importando o TextField
} from '@mui/material';
import { Add, Bedtime, BabyChangingStation } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

interface FabButtonProps {
  onAddDiaperChange: () => void;
  onOpenSleepDialog: () => void;
}

const FabButton: React.FC<FabButtonProps> = ({ onAddDiaperChange, onOpenSleepDialog }) => {
  return (
    <SpeedDial
      ariaLabel="Adicionar Evento"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon openIcon={<Add />} />}
    >
      <SpeedDialAction
        icon={<Bedtime />}
        tooltipTitle="Registrar Tempo de Sono"
        onClick={onOpenSleepDialog}
      />
      <SpeedDialAction
        icon={<BabyChangingStation />}
        tooltipTitle="Registrar Troca de Fralda"
        onClick={onAddDiaperChange}
      />
    </SpeedDial>
  );
};

export default FabButton;