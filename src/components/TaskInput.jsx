import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import { TextField, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TaskInput = () => {
  const [taskText, setTaskText] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch(addTask({ id: Date.now(), text: taskText, completed: false }));
      setTaskText("");
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
      <TextField
        fullWidth
        label="New Task"
        variant="outlined"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
      />
      <Button variant="contained" color="success" onClick={handleAddTask}>
        <AddIcon />
      </Button>
    </Box>
  );
};

export default TaskInput;
