export default function Botao_navegacao({text, funcao}){
    return <button onClick={funcao} className="text-gray-200 m-1 lg:m-4 rounded-md border-2 border-solid border-slate-200 p-2 hover:text-gray-400 hover:border-transparent hover:animate-pulse">{text}</button>
}