
import { TbLoader } from "react-icons/tb"

export default function Loader() {
    return (
        <div className="flex justify-center pt-3 sm:pt-0">
            <TbLoader className="animate-[spin_2.5s_linear_infinite] dark:text-slate-300 text-[25px] sm:text-[30px]" />
        </div>
    )
}