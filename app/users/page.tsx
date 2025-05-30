"use client";
import * as React from "react";
import {
  useRef,
  useEffect,
  useState,
  useTransition,
  createContext,
} from "react";
import { IUser } from "@/models/IUser.d";
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import styles from "./users.module.css";
import CompanyModal from "./components/CompanyModal";

export const UserContext = createContext<IUser | null>(null);

export default function Users() {
  const allUsers = useRef<IUser[]>([]);

  const [users, setUsers] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const [isLoading, startTransition] = useTransition();

  const getData = () => {
    startTransition(async () => {
      try {
        const res = await fetch("https://dummyjson.com/users");
        const resp = await res.json();

        allUsers.current = resp.users;
        setUsers(allUsers.current);

        return;
      } catch (error) {
        console.log(error);
        return;
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const openCompanyModal = (user: IUser) => {
    setUser(user);
    setOpen(true);
  };
  
  const handleOnClose = () => {
    setOpen(false);
    setUser(null);
  };
  
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <span>
      <div className={styles.userlist}>
        {users.map((user) => (
          <Card key={user.id} sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {user.lastName}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => openCompanyModal(user)}>
                Company
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <UserContext.Provider value={user}>
        {open ? <CompanyModal open={true} onClosed={handleOnClose} /> : ""}
      </UserContext.Provider>
    </span>
  );
}
