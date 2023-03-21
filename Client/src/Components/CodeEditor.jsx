import React, { useEffect, useRef} from "react";
import CodeMirror from "codemirror";
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/theme/tomorrow-night-eighties.css';
import 'codemirror/addon/edit/closebrackets';
import SampleCode from "../SampleCode.js";

const CodeEditor = ({language, setCode}) => {

    const editorRef=useRef(null);

    useEffect(()=>{//create the codemirror editor
        const init = async ()=> {
            editorRef.current=CodeMirror.fromTextArea(document.getElementById('editor'),{
                mode: {name: 'clike'},
                theme: 'tomorrow-night-eighties',
                lineNumbers: true,
                autoCloseBrackets: true,
            });
        }
        init();
    },[])

    useEffect(()=>{//whenever language is changed using dropdown
        let languageMode;
        switch(language){
            case 'c':
            case 'cpp':
            case 'java':
                languageMode= {name: 'clike'};
                break;
            case 'js':
                languageMode = {name: 'javascript', json: true};
                break;
            case 'py':
                languageMode = {name: 'python'};
                break;
            default:
                languageMode= {name: 'clike'};
                break;
        }
        editorRef.current.setOption('mode',languageMode);
        editorRef.current.setValue(SampleCode[language]);
    }, [language]);

    useEffect(()=>{//whenever changes are done in code
        editorRef.current.on('change',()=>{setCode(editorRef.current.getDoc().getValue())})
    },[setCode])



    return <textarea id="editor"></textarea>
};

export default CodeEditor;