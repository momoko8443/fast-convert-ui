import convertorService from '../services/convertorService';
import scrapyService from '../services/scrapyService';
import ElementList from '../views/ElementList';
import {useState ,useEffect} from 'react';
import MigrationModal from './MigrationModal';
import {Input, Button} from 'antd';
import {CloudUploadOutlined} from '@ant-design/icons';
import { useParams } from 'react-router-dom';

export default function Elements(){
    const [website, setWebsite] = useState("");
    const {id} = useParams();
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        scrapyService.getElementsByPage(id).then((result)=>{
            setGroups(result);
        })
    }, [id]);

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

    function submitHandler(images,companyId,type){
        convertorService.uploadImages(images,companyId,type).then((result)=>{

        })
    }

    
    

    return (
        <div className="pageMain">
            <div className="websiteInput hbox">
                <Input style={{marginRight:'8px'}} type="text" value={website} onChange={e => setWebsite(e.target.value)}></Input>
                <Button onClick={runHandler}>Analyse</Button>
            </div>
            {groups.length > 0 && 
            <div>
                <div className="hbox-r" style={{  position: 'fixed',bottom:'50px',right: '60px'}}>
                    <Button size="large" type="primary" className="migration-btn" icon={<CloudUploadOutlined />} shape="round" onClick={openMigrationModal}>Migrate</Button>
                </div>
                <div className="v-gap-4">
                    <ElementList groups={groups} selectedGroupsUpdated={selectedGroupsUpdatedHandler}></ElementList>
                </div>
            </div>
            }
            <MigrationModal isOpen={showModal} groups={selectedGroups} onSubmit={submitHandler} closeModal={()=>{setShowModal(false);}}></MigrationModal>
        </div>
    )
} 