import { Link } from "react-router-dom";

export default function Link_header({caminho, texto}){
    return <Link className="lg:mx-4 mx-1 hover:text-lg" to={caminho}>{texto}</Link>
}