"use client";
import { useRef, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress
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

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetch("https://dummyjson.com/todos")
        .then((res) => res.json())
        .then((resp) => {
          allTodos.current = resp.todos;
          settodos(allTodos.current);
        })
        .catch((error) => {
        console.error("Failed to fetch todos:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading after fetch completes
      });
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (statusFilter) {
      filterByState(statusFilter);
    }
  }, [statusFilter]);

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

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newStatusFilter: string,
  ) => {
    setStatusFilter(newStatusFilter);
  };

return (
  <span>
    <ToggleButtonGroup
      className="mb-8"
      color="primary"
      value={statusFilter}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="completed">Completed</ToggleButton>
      <ToggleButton value="pending">Pending</ToggleButton>
      <ToggleButton value="all">All</ToggleButton>
    </ToggleButtonGroup>

    <div className="todo-list">
      {loading ? (
        <CircularProgress />
      ) : (
        todos.map((todo) => (
          <Card
            key={todo.id}
            sx={{ maxWidth: 345 }}
            style={{ background: todo.completed ? "lightgreen" : "white" }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {todo.todo}
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small"
                onClick={() => deleteTask(todo.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))
      )}
    </div>
  </span>
);
}
