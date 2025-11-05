import React from "react";
import classes from "./title.module.css";

export default function Title({ children }: { children: string }) {
  return <div className={classes.title}><span>{children}</span></div>;
}
