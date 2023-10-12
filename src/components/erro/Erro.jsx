import { memo } from "react"

function Erro({texto}){
    return <div className="flex justify-center p-2">
        <span className="text-red-600">{texto}</span>
    </div>
}

export default memo(Erro)