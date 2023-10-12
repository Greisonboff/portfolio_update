export default function Status({ estado, retorno }) {
    const ativaRetorno = () => {
        setTimeout(() => {
            estado('')
        }, 2000);
    }
    ativaRetorno();

    return (
        <div className="flex justify-center  pt-3 sm:pt-0">
            {retorno.includes('sucesso') == true ?
                <p className="text-green-700 font-semibold text-base sm:text-xl">{retorno}</p>
                :<p className="text-red-700 font-semibold text-base sm:text-xl">{retorno}</p>
            }
        </div>
    )
}