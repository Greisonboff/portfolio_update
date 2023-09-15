export default function Botao_navegacao({text, funcao}){
    return <button onClick={funcao} className="m-1 lg:m-4 rounded-md border-2 border-solid border-slate-950 p-2 hover:text-neutral-100">{text}</button>
}