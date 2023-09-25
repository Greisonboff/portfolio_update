export default function Botao({texto}){
    return <button className="dark:bg-zinc-800 bg-zinc-400 dark:text-slate-300 text-slate-900 m-6 h-16 rounded-md hover:animate-pulse" type="submit">{texto}</button>
}