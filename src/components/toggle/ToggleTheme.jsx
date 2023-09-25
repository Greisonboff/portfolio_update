import {FiSun} from "react-icons/fi"
import {BsMoonStars} from "react-icons/bs"
import { useEffect } from "react";

const ToggleTheme = () => {

    // const sistemPreferences = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const sistemPreferences = () => {
        const theTheme = localStorage.getItem('theme') || '';
        if (theTheme === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
            if (localStorage.theme != 'dark') {
                localStorage.setItem('theme', 'dark');
            }
            return true;
        }
    };
    const pageClasses = document.documentElement.classList;

    useEffect(() => {
        sistemPreferences() && pageClasses.add('dark');
    })
    const toggle = () => {
        pageClasses.toggle('dark');
        localStorage.getItem('theme') == 'dark' ? localStorage.setItem('theme', 'light') : localStorage.setItem('theme', 'dark');
    }
    return (
        <div className="hidden sm:block">
            <BsMoonStars className=" h-6 w-6 text-gray-900 block dark:hidden cursor-pointer" onClick={toggle} />
            <FiSun className="h-6 w-6 text-gray-100  hidden dark:block cursor-pointer" onClick={toggle} />
        </div>
    )
}

export default ToggleTheme