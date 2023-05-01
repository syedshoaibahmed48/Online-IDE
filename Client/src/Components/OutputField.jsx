import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/theme/tomorrow-night-eighties.css';
import 'codemirror/addon/edit/closebrackets';

const OutputField = ({output, loading}) => {

    const outputRef= useRef(null);

    useEffect(()=>{
        const init = async () => {
            outputRef.current = CodeMirror.fromTextArea(document.getElementById('outputField'),
            {
                mode:{name:'markdown', json:'true'},
                theme: 'tomorrow-night-eighties',
                autoCloseBrackets: true,
                readOnly:true
            });
        }
        init();
    },[]);

    useEffect(()=>{//whenever output is changed
        outputRef.current.setValue(output);
    }, [output])

    return <textarea id="outputField"></textarea>;
};

export default OutputField;