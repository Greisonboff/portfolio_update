export default function Erro({texto}){
    return <div className="flex justify-center p-2">
        <span className="text-red-600">{texto}</span>
    </div>
}