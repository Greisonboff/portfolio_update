import { Button } from "@mui/joy";
import React from "react";

export default function BotaoNavegacao({ text, funcao, className }) {
  return (
    <Button
      onClick={funcao}
      variant="outlined"
      className={`${className} dark:text-slate-300 text-gray-600 m-1 lg:m-4 rounded-md border-2 border-solid dark:border-slate-300 border-slate-600 p-2 dark:hover:text-gray-400 hover:border-[#000] hover:animate-pulse hover:dark:text-slate-900`}
    >
      {text}
    </Button>
  );
}
