export default function Li({param,item}){
    return <li className=" dark:text-gray-300 text-gray-500 ">{param} &nbsp; <span className=" dark:text-white text-slate-950">{item}</span></li>
}