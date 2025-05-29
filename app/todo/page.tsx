"use client";
import { useRef, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

export default function todo(): any {
  const allTodos = useRef<
    {
      id: number;
      todo: string;
      completed: boolean;
      userId: number;
    }[]
  >([]);

  const [todos, settodos] = useState<
    {
      id: number;
      todo: string;
      completed: boolean;
      userId: number;
    }[]
  >([]);

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((resp) => {
        allTodos.current = resp.todos;
        settodos(allTodos.current);
      });
  }, []);

  const filterByState = (state: string): void => {
     if (state === "completed") {
      settodos(allTodos.current.filter((todo) => todo.completed));
    } else if (state === "pending") {
      settodos(allTodos.current.filter((todo) => !todo.completed));
    } else {
      settodos(allTodos.current);
    }
  };

  const deleteTask = (id: number): void => {
     const index = allTodos.current.findIndex(todo => todo.id === id);
    if (index !== -1) {
      allTodos.current.splice(index, 1);
      settodos([...allTodos.current]);
    }
  }

  return (
    <span>
      <div className="button-group">
          <button 
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4  border border-blue-500 hover:border-transparent rounded-full"
            onClick={() =>filterByState('completed')}
          >
              Show Completed
          </button>
          <button 
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4  border border-blue-500 hover:border-transparent rounded-full"
            onClick={() =>filterByState('pending')}>
              Show Pending
          </button>
          <button 
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4  border border-blue-500 hover:border-transparent rounded-full"
             onClick={() =>filterByState('all')}>
              Show All
          </button>
      </div>
      <div className="todo-list">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            sx={{ maxWidth: 345 }}
            style={{ background: todo.completed ? "green" : "white" }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {todo.todo}
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small"
                 onClick={() =>deleteTask(todo.id)}
              >Delete</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </span>
  );
}
