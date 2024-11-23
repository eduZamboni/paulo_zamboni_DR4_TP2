import React, { useState, useEffect } from "react";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import FabButton from "../components/FabButton";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Today, AssignmentTurnedIn } from "@mui/icons-material";
import Checkbox from "../components/Checkbox";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [sleepHours, setSleepHours] = useState<number>(0);
  const [diaperChanges, setDiaperChanges] = useState<number>(0);
  const [tasks, setTasks] = useState({
    limparMamadeira: false,
    prepararPapinhas: false,
    verificarFraldas: false,
    verificarBateriaBaba: false,
  });

  const [tabIndex, setTabIndex] = useState(0);

  // Estado e funções do diálogo
  const [openSleepDialog, setOpenSleepDialog] = useState(false);
  const [sleepStartTime, setSleepStartTime] = useState<Dayjs | null>(dayjs());
  const [sleepEndTime, setSleepEndTime] = useState<Dayjs | null>(dayjs());

  const handleOpenSleepDialog = () => {
    setOpenSleepDialog(true);
  };

  const handleCloseSleepDialog = () => {
    setOpenSleepDialog(false);
  };

  const handleSaveSleep = () => {
    if (sleepStartTime && sleepEndTime) {
      const duration = sleepEndTime.diff(sleepStartTime, "hour", true);
      updateSleepHours(duration);
    }
    setOpenSleepDialog(false);
  };

  useEffect(() => {
    const savedSleepHours = localStorage.getItem("sleepHours");
    const savedDiaperChanges = localStorage.getItem("diaperChanges");
    const savedTasks = localStorage.getItem("dailyTasks");

    if (savedSleepHours) {
      setSleepHours(parseFloat(savedSleepHours));
    }
    if (savedDiaperChanges) {
      setDiaperChanges(parseInt(savedDiaperChanges));
    }
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const updateSleepHours = (hours: number) => {
    const totalSleepHours = sleepHours + hours;
    setSleepHours(totalSleepHours);
    localStorage.setItem("sleepHours", totalSleepHours.toString());
  };

  const incrementDiaperChanges = () => {
    const totalDiaperChanges = diaperChanges + 1;
    setDiaperChanges(totalDiaperChanges);
    localStorage.setItem("diaperChanges", totalDiaperChanges.toString());
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleTaskChange =
    (field: keyof typeof tasks) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedTasks = { ...tasks, [field]: event.target.checked };
      setTasks(updatedTasks);
      localStorage.setItem("dailyTasks", JSON.stringify(updatedTasks));
    };

  const handleSleepCardClick = () => {
    handleOpenSleepDialog();
  };

  const handleDiaperCardClick = () => {
    incrementDiaperChanges();
  };

  return (
    <main className="App">
      <Container className="header">
        <h1>Baby Manager</h1>
        <Avatar
          name="Paulo Zamboni"
          size={40}
          onClick={() => {
            navigate("/profile");
          }}
        />
      </Container>

      <Container className="tabs">
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            icon={<Today />}
            label="Resumo do Dia"
            aria-label="Resumo do Dia"
          />
          <Tab
            icon={<AssignmentTurnedIn />}
            label="Atividades Concluídas"
            aria-label="Atividades Concluídas"
          />
        </Tabs>
      </Container>

      <Container className="content">
        {tabIndex === 0 && (
          <Card title="Resumo do Dia" stats={[]}>
            <div className="cards-container">
              <Card
                title="Tempo de Sono"
                stats={[
                  {
                    title: "Horas Dormidas",
                    value: sleepHours.toFixed(2),
                    unit: "horas",
                  },
                ]}
                onClick={handleSleepCardClick}
              />
              <Card
                title="Fraldas Trocadas"
                stats={[
                  { title: "Total", value: diaperChanges, unit: "fraldas" },
                ]}
                onClick={handleDiaperCardClick}
              />
            </div>
          </Card>
        )}
        {tabIndex === 1 && (
          <Card title="Atividades Diárias" stats={[]}>
            <div className="checkbox-group">
              <Checkbox
                label="Limpar Mamadeira"
                checked={tasks.limparMamadeira}
                onChange={handleTaskChange("limparMamadeira")}
              />
              <Checkbox
                label="Preparar Papinhas"
                checked={tasks.prepararPapinhas}
                onChange={handleTaskChange("prepararPapinhas")}
              />
              <Checkbox
                label="Verificar Estoque de Fraldas"
                checked={tasks.verificarFraldas}
                onChange={handleTaskChange("verificarFraldas")}
              />
              <Checkbox
                label="Verificar Bateria da Babá Eletrônica"
                checked={tasks.verificarBateriaBaba}
                onChange={handleTaskChange("verificarBateriaBaba")}
              />
            </div>
          </Card>
        )}
      </Container>

      {/* Diálogo para Registrar Tempo de Sono */}
      <Dialog open={openSleepDialog} onClose={handleCloseSleepDialog}>
        <DialogTitle>Registrar Tempo de Sono</DialogTitle>
        <DialogContent>
          <DateTimePicker
            label="Hora de Dormir"
            value={sleepStartTime}
            onChange={setSleepStartTime}
            format="DD/MM/YYYY HH:mm"
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
          <DateTimePicker
            label="Hora de Acordar"
            value={sleepEndTime}
            onChange={setSleepEndTime}
            format="DD/MM/YYYY HH:mm"
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSleepDialog}>Cancelar</Button>
          <Button onClick={handleSaveSleep} variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <FabButton
        onAddDiaperChange={incrementDiaperChanges}
        onOpenSleepDialog={handleOpenSleepDialog}
      />
    </main>
  );
};

export default Home;
