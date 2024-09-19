import { memo } from "react";

function Botao_navegacao({ text, funcao, className }) {
  return (
    <button
      onClick={funcao}
      className={`${className} dark:text-slate-300 text-gray-600 m-1 lg:m-4 rounded-md border-2 border-solid dark:border-slate-300 border-slate-600 p-2 dark:hover:text-gray-400 hover:border-[#000] hover:animate-pulse`}
    >
      {text}
    </button>
  );
}

export default memo(Botao_navegacao);
