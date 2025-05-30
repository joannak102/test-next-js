import * as React from "react";
import { JSX, useContext } from "react";
import { UserContext } from "../page";

export default function Coord(): JSX.Element {
  const user = useContext(UserContext);
  return (
    <span>
      <p>{user?.company.address.city}</p>
      <p>{user?.company.address.country}</p>
      <p>{user?.company.address.address}</p>
    </span>
  );
}
