import convertorService from '../services/convertorService';
import ElementList from '../views/ElementList';
import {useState } from 'react';
import MigrationModal from './MigrationModal';
export default function Pages(){
    const [website, setWebsite] = useState("https://www.esquel.com/from-seed-to-shirt");
    const [groups, setGroups] = useState([]);

    const [selectedGroups, setSelectedGroups] = useState([]);

    function runHandler(){
        if (website) {
            const ws = encodeURI(website);
            convertorService.analyse(ws).then((result) => {
                setGroups(result);
            });
        }
    }
    const [showModal,setShowModal] = useState(false);

    function openMigrationModal(){
        setShowModal(true);
    }

    function selectedGroupsUpdatedHandler(groups){
        console.log(groups);
        setSelectedGroups(groups);
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
                    <MigrationModal isOpen={showModal} groups={selectedGroups} closeModal={()=>{setShowModal(false);}}></MigrationModal>
                    <button className="migrateBtn" onClick={openMigrationModal}>Migrate</button>
                </div>
                <div>
                    <ElementList groups={groups} selectedGroupsUpdated={selectedGroupsUpdatedHandler}></ElementList>
                </div>
            </div>
            }
            
        </div>
    )
} 