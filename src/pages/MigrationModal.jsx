import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import delegateUserService from "../services/delegateUserService";
import useToken from "../hooks/useToken";
import types from "../mocks/showCaseType";

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default function MigrationModal(props) {
    const {token} = useToken();
    const [companies,setCompanies] = useState([]);
    useEffect(()=>{
        delegateUserService.getDelegatedCompanies(token.email).then((result)=>{
            if(result && result.length > 0){
                setCompanies(result);
                setSelectedCompany(result[0].accessedOrganizationId);
            }
        });
    },[token.email]);

    const [selectedCompany, setSelectedCompany] = useState();

    const [sectionTypes] = useState(types);
    const [selectedType, setSelectedType] = useState(sectionTypes[0].value);


    function companiesChangedHandler(e){
        console.log(e.target.value);
        setSelectedCompany(e.target.value);
    }
    function sectionTypesChangedHandler(e){
        console.log(e.target.value);
        setSelectedType(e.target.value);
    }

    function submitForm(){
        console.log(selectedCompany);
    }
    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <button onClick={props.closeModal}>close</button>
            <form>
                <label>Target company:
                    <select value={selectedCompany} onChange={companiesChangedHandler}>
                        {
                            companies.map((company)=>{
                                return <option value={company.accessedOrganizationId} key={company.accessedOrganizationId}>{company.accessedOrganizationName}</option>
                            })
                        }
                    </select>
                </label>

                <label>Section type:
                    <select value={selectedType} onChange={sectionTypesChangedHandler}>
                        {
                            sectionTypes.map((type)=>{
                                return <option value={type.value} key={type.value}>{type.name}</option>
                            })
                        }
                    </select>
                </label>
                {/* <div className="thumbnailGroup">
                    <div>
                        {
                            groups.map((group)=>{
                                return (
                                <>
                                    <div>
                                        <img src={group.image} className="thumbnail"></img>
                                    </div>
                                    <div>
                                        <span>title:</span>{groups.text[0]}
                                        <p>{groups.slice(1,-1).join('')}</p>
                                    </div>
                                </>
                                );
                            })
                        }
                    </div>
                </div> */}
            </form>
            <button onClick={submitForm}>Submit</button>
        </Modal>
    );
}