import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, editTask, toggleComplete } from "../redux/taskSlice";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UndoIcon from "@mui/icons-material/Undo";
import SaveIcon from "@mui/icons-material/Save";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

  const handleEditTask = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      dispatch(editTask({ id: editId, newText: editText }));
      setEditId(null);
      setEditText("");
    }
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          sx={{
            bgcolor: task.completed ? "#d4edda" : "white",
            borderRadius: 2,
            mb: 1,
            boxShadow: 1,
          }}
        >
          {editId === task.id ? (
            <TextField
              fullWidth
              variant="outlined"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
              autoFocus
            />
          ) : (
            <ListItemText
              primary={task.text}
              sx={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "gray" : "black",
              }}
            />
          )}

          <ListItemSecondaryAction>
            {editId === task.id ? (
              <IconButton edge="end" color="primary" onClick={handleSaveEdit}>
                <SaveIcon />
              </IconButton>
            ) : (
              <>
                <IconButton
                  edge="end"
                  color="success"
                  onClick={() => dispatch(toggleComplete(task.id))}
                >
                  {task.completed ? <UndoIcon /> : <CheckCircleIcon />}
                </IconButton>

                <IconButton
                  edge="end"
                  color="warning"
                  onClick={() => handleEditTask(task.id, task.text)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => dispatch(deleteTask(task.id))}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
