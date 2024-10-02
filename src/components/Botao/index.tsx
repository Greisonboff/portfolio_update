import { Button } from "@mui/joy";

interface BotaoProps {
  text: string; // A prop 'texto' deve ser uma string
  click?: () => void;
  className?: string;
  disabled?: boolean;
  tipo?: "button" | "submit" | "reset";
  loading?: boolean;
}

export default function Botao({
  text,
  click = () => null,
  className,
  disabled = false,
  tipo = "button",
  loading = false,
}: BotaoProps) {
  return (
    <Button
      type={tipo}
      onClick={click}
      variant="outlined"
      disabled={disabled}
      loading={loading}
      children={text}
      color="neutral"
      className={`dark:text-slate-300 text-gray-600 m-1 lg:m-4 rounded-md border-2 border-solid dark:border-slate-300 !border-slate-600 p-2 dark:hover:text-gray-400 hover:border-[#000] hover:animate-pulse hover:dark:text-slate-900 ${className}`}
    />
  );
}
