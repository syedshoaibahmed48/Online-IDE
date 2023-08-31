import React, {useState} from "react";

const Dropdown = ({language, setLanguage}) => {

    const fullName = {
        "c": "C",
        "cpp": "C++",
        "java": "Java",
        "py": "Python",
        "js": "JavaScript"
    }

    const [option, setOption] = useState(fullName[language]); //[C, C++, Java, Python, JavaScript]

    const showOptions = () => { //show options in dropdown menu
        const options = document.getElementById("options");
        if(options.style.display === "none"){
            options.style.display = "block";
        } else {
            options.style.display = "none";
        }
    }

    const closeOptions = () => { //close options in dropdown menu
        const options = document.getElementById("options");
        options.style.display = "none";
    }

    const Option = ({option, language}) => { //display option in dropdown menu
        return( 
        <div className="flex flex-row px-2 py-2 text-sm text-white hover:bg-[#111827]" 
        onClick={(e)=>{ setOption(e.target.innerText); setLanguage(language); closeOptions()}}>
            <img className="w-6 h-6 mr-2" src={ new URL (`../assets/${language}.png`, import.meta.url)} alt='logo' />
            <span className="self-center">{option}</span>
        </div>
        );
    }


    return (
        <div className="flex flex-column cursor-pointer">
        <button className="flex-row justify-between inline-flex w-36 items-center text-white font-semibold rounded px-2 py-2 border hover:bg-gray-900"
         onClick={showOptions}>
            <div className="flex flex-row text-sm text-white hover:bg-zinc-900" >
                <img className="w-6 h-6 mr-2" src={ new URL (`../assets/${language}.png`, import.meta.url)} alt='logo' />
                <span className="self-center">{option}</span>
            </div>
            <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <div id="options" className="absolute w-36 z-20 mt-12 bg-[#0b0f18] rounded-md shadow-lg px-1 py-2" style={{display: "none"}}>
                <Option option="C" language="c"/>
                <Option option="C++" language="cpp"/>
                <Option option="Java" language="java"/>
                <Option option="JavaScript" language="js"/>
                <Option option="Python" language="py"/>
            </div>
        </div>
    );
};

export default Dropdown;