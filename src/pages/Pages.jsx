import convertorService from '../services/convertorService';
import { useState } from 'react';
export default function Pages(){
    const [website, setWebsite] = useState("");
    const [groups, setGroups] = useState([]);
    function runHandler(){
        if (website) {
            const ws = encodeURI(website);
            convertorService.analyse(ws).then((result) => {
                groups = result;
            });
        }
    }
    return (
        <div className="">
            <div>
                <input type="text" value={website} onChange={e => setWebsite(e.target.value)}></input>
                <button onClick={runHandler}>Run</button>
            </div>
        </div>
    )
} 