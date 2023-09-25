import Link_header from "./LinkHeader";
import ToggleTheme from "../toggle/ToggleTheme";

export default function Header(){
    return(
        <div className=" flex justify-center align-baseline my-4 h-8 border-b-2 dark:border-slate-200 border-slate-800 pb-10">
            <Link_header caminho="/" texto="Home"/>
            <Link_header caminho="/certificado" texto="Certificado"/>
            <Link_header caminho="/projeto" texto="Projeto"/>
            <Link_header caminho="/listas" texto="Listas"/>
            <div className=" flex items-center h-8 absolute right-10">
                <ToggleTheme/>
            </div>
        </div>
    )
}