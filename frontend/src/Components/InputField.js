import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/theme/tomorrow-night-eighties.css';
import 'codemirror/addon/edit/closebrackets';

const InputField = ({setInputs}) => {

    const inputRef=useRef(null);

    useEffect(()=>{
        const init = async () => {
            inputRef.current = CodeMirror.fromTextArea(document.getElementById('inputField'),
            {
                mode:{name:'markdown', json:'true'},
                theme: 'tomorrow-night-eighties',
                autoCloseBrackets: true,
                lineNumbers: true
            });
        }
        init();
    },[]);

    useEffect(()=>{//whenever changes are done in InputField
        inputRef.current.on('change',()=>{setInputs(inputRef.current.getDoc().getValue())})
    },[setInputs])

    return <><h2>Input</h2><textarea id="inputField"></textarea></>;
};

export default InputField;