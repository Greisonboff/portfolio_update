import { Link } from "react-router-dom";
import Link_header from "./Link_header";

export default function Header(){
    return(
        <div className="flex justify-center my-4 h-8">
            <Link_header caminho="/" texto="Home"/>
            <Link_header caminho="/certificado" texto="Certificado"/>
            <Link_header caminho="/projeto" texto="Projeto"/>
            <Link_header caminho="/listas" texto="Listas"/>
        </div>
    )
}