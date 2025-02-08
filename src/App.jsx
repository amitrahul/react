import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { Container, Paper, Typography } from "@mui/material";

const App = () => {
  console.log("hello jee");

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          📝 React To-Do App
        </Typography>
        <TaskInput />
        <TaskList />
      </Paper>
    </Container>
  );
};

export default App;
