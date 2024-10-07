import TituloInput from "../titleInput/TituloInput";

export default function InputElement({
  type = "text",
  placeholder,
  aoAlterado,
  valor,
  name,
}) {
  const aoDigitado = (event) => {
    aoAlterado?.(event.target.value);
  };

  return (
    <>
      <TituloInput texto={placeholder} />
      <input
        className="outline-none p-2 rounded-md dark:bg-zinc-700 dark:placeholder-slate-200 dark:text-white border-solid border-2 bg-white dark:border-0 border-slate-950 placeholder-slate-600"
        type={type}
        onChange={aoDigitado}
        value={valor}
        required
        placeholder={placeholder}
        name={name}
      ></input>
    </>
  );
}
