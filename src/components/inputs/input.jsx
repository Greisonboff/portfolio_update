import TituloInput from "../titleInput/TituloInput"

export default function Input({ type, placeholder, aoAlterado, valor }) {
    const aoDigitado = (event) => {
        aoAlterado(event.target.value)
    }

    const chave = localStorage.getItem('chave_de_acesso_github');
    if (placeholder === 'Chave de acesso' && chave) {
        valor = chave;
        aoAlterado(chave)
    }

    return (
        <>
            <TituloInput texto={placeholder} />
            <input className="outline-none p-2 rounded-md dark:bg-zinc-700 dark:placeholder-white dark:text-white border-solid border-2 bg-white dark:border-0 border-slate-950 placeholder-slate-600" type={type} onChange={aoDigitado} value={valor} required placeholder={placeholder}></input>
        </>
    )
}