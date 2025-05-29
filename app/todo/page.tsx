"use client";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import {
  ListSubheader,
  ListItemText,
  ListItem,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
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

  return (
    <span>
      <div className="todo-list">
        {todos.map((todo) => (
          <Card
            sx={{ maxWidth: 345 }}
            style={{ background: todo.completed ? "green" : "white" }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {todo.todo}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </span>
  );
}
