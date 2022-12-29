import React, { useEffect, useRef } from "react";
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.css';
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

    return <>
            <div style={{display:'flex', flexDirection:'row'}}>
               <h2 style={{marginRight:'20px'}}>Output</h2>
               {loading? <Spinner animation="border" />: null}
            </div>
            <textarea id="outputField"></textarea>
           </>;
};

export default OutputField;