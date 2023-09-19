import { Link } from "react-router-dom";

export default function Link_header({caminho, texto}){
    return <Link className="lg:mx-4 mx-1 text-base lg:text-lg text-gray-200 hover:text-slate-600 font-semibold" to={caminho}>{texto}</Link>
}