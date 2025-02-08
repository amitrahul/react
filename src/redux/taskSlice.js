import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: JSON.parse(localStorage.getItem("tasks")) || [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    deleteTask: (state, action) => {
      const updatedTasks = state.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    },
    editTask: (state, action) => {
      const { id, newText } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) task.text = newText;
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    toggleComplete: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      localStorage.setItem("tasks", JSON.stringify(state));
    },
  },
});

export const { addTask, deleteTask, editTask, toggleComplete } =
  taskSlice.actions;
export default taskSlice.reducer;
