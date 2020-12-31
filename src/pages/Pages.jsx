import convertorService from '../services/convertorService';
import ElementList from '../views/ElementList';
import { useState } from 'react';
export default function Pages(){
    const [website, setWebsite] = useState("https://www.esquel.com/from-seed-to-shirt");
    const [groups, setGroups] = useState([]);
    function runHandler(){
        if (website) {
            const ws = encodeURI(website);
            convertorService.analyse(ws).then((result) => {
                setGroups(result);
            });
            console.log(ws);
        }
    }
    return (
        <div className="pageMain">
            <div className="websiteInput">
                <input type="text" value={website} onChange={e => setWebsite(e.target.value)}></input>
                <button onClick={runHandler}>Analyse</button>
            </div>
            {groups.length > 0 && 
            <div>
                <div>
                    <button>Transfer</button>
                </div>
                <div>
                    <ElementList groups={groups}></ElementList>
                </div>
            </div>
            }
        </div>
    )
} 