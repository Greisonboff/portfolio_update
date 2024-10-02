import { Button } from "@mui/joy";

export default function Botao({ texto }) {
  return (
    <Button
      sx={{ marginTop: 1, width: "100%" }}
      type="submit"
      variant="outlined"
      className="dark:bg-zinc-800 font-semibold bg-zinc-400 dark:text-slate-300 text-slate-900 m-6 h-16 w-2/3 mx-auto rounded-md hover:animate-pulse hover:dark:text-slate-900"
    >
      {texto}
    </Button>
  );
}
