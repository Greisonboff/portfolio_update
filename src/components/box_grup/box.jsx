import Header from "../header/Header";

export default function Box({ element }) {
    const ComponenteRecebido = element;
    return (
        /*<div className="flex-wrap flex-col w-full h-full md:h-screen lg:h-screen flex justify-center bg bg-gradient-to-tr from-gray-800 via-gray-400 to-gray-600 lg:p-8 p-2">*/
        <div className="flex-wrap h-screen md:h-screen lg:h-screen flex justify-center p-2">
            {
                ComponenteRecebido.map(ComponenteRecebido => (
                    <ComponenteRecebido key={ComponenteRecebido} />
                ))
            }
        </div>
    )
}