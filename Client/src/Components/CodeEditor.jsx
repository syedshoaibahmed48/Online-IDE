import React, { useEffect, useRef} from "react";
import CodeMirror from "codemirror";
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/theme/tomorrow-night-eighties.css';
import 'codemirror/addon/edit/closebrackets';
import SampleCode from "../utils/SampleCode.js";


const CodeEditor = ({ language, code, setCode, isCollaborative, socket, useSampleCode }) => {

    const editor=useRef(null);

    const sendCode = (instance) => {
        const code = instance.getValue();
        const { line, ch } = instance.getDoc().getCursor();
        socket.current.emit('code-change', { code, line, ch });
    }

    useEffect(()=>{//create the codemirror editor
        const init = async ()=> {
            editor.current=CodeMirror.fromTextArea(document.getElementById('editor'),{
                mode: {name: 'clike'},
                theme: 'tomorrow-night-eighties',
                lineNumbers: true,
                autoCloseBrackets: true,
            });
        }
        init();

        if(isCollaborative){ //if collaborative, register event listener for collaborative editing

            socket.current.on('sync-code', ({userName, code, remoteCursorPos }) => {
                const { line, ch } = editor.current.getDoc().getCursor();
                editor.current.getDoc().setValue(code);
                editor.current.getDoc().setCursor({line, ch});

                // show remote user's cursor
                const remoteCursor = document.createElement('div');
                remoteCursor.innerHTML = `<div class="userName">${userName}</div><span>|</span>`;
                remoteCursor.className = 'remote-cursor';

                const bookmark = editor.current.getDoc().setBookmark(
                    {line: remoteCursorPos.line, ch: remoteCursorPos.ch}, {  widget: remoteCursor });
                setTimeout(() => bookmark.clear(), 1000);
            });
            
        }

        editor.current.on('change',(instance, changeObj)=>{
            setCode(instance.getValue());
            const { origin } = changeObj;
            if(isCollaborative && origin !== 'setValue' ) sendCode(instance);
        });

        return ()=>{//cleanup
            editor.current.off('change');
            editor.current.toTextArea();
            if(isCollaborative) socket.current.off('sync-code');
        }
    },[]);

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
        editor.current.setOption('mode',languageMode);
        editor.current.setValue( useSampleCode ? SampleCode[language] : code );
    }, [language]);

    return <textarea id="editor"></textarea>
};

export default CodeEditor;