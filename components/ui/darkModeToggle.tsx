import { useEffect } from "react";

const DarkModeToggle: React.FC = () => {

    useEffect(() => {
        // Set the initial theme based on localStorage
        const storedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", storedTheme);
    }, []);


    const handleToggle = (e: any) => {
        const newTheme = e.target.checked ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    }
    return (<>
        <div>
            <label className="grid cursor-pointer place-items-center absolute top-4 right-4">
                <input
                    onClick={handleToggle}
                    type="checkbox"
                    className="toggle theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:theme(colors.sky.500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:theme(colors.blue.900)]" />

            </label>
        </div>

    </>);

}
export default DarkModeToggle;