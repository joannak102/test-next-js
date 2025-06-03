"use client";
import { useEffect, useState, useTransition } from "react";
import {
  CircularProgress
} from "@mui/material";
import WithSearch from "../components/WithSearch";
import Todo from "./components/Todo";

export default function Page() {


  const [todos, settodos] = useState<
    {
      id: number;
      todo: string;
      completed: boolean;
      userId: number;
    }[]
  >([]);

  const [statusFilter, setStatusFilter] = useState<string>('all');


 const [isLoading, startTransition] = useTransition();

  const getData = () => {
  
   startTransition(async () => {
    try {
      const res = await fetch("https://dummyjson.com/todos");
      const resp = await res.json();

 
      settodos(resp.todos);

      return
    } catch (error) {
      console.log(error);
      return
    }
  })}

  useEffect(() => {
    getData();
  }, []);

const todoComponent = WithSearch(Todo(todos));

 
  
if (isLoading) {
  return <CircularProgress />
}

return (
  <span>
    <WithSearch
    ></WithSearch>
  </span>
);
}
