import { useEffect, useState } from 'react';

import delegateUserService from "../services/delegateUserService";
import useToken from "../hooks/useToken";
import types from "../mocks/showCaseType";
import { Form, Modal,Select } from 'antd';

const { Option } = Select;
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


export default function MigrationModal(props) {
    const { token } = useToken();
    const [companies, setCompanies] = useState([]);
    useEffect(() => {
        delegateUserService.getDelegatedCompanies(token.email).then((result) => {
            if (result && result.length > 0) {
                setCompanies(result);
                setSelectedCompany(result[0].accessedOrganizationId);
            }
        });
    }, [token.email]);

    const [selectedCompany, setSelectedCompany] = useState();

    const [sectionTypes] = useState(types);
    const [selectedType, setSelectedType] = useState(sectionTypes[0].value);


    function companiesChangedHandler(value) {
        //console.log(e.target.value);
        setSelectedCompany(value);
    }
    function sectionTypesChangedHandler(value) {
        //console.log(e.target.value);
        setSelectedType(value);
    }
    return (
        <Modal
            visible={props.isOpen}
            onCancel={props.closeModal}
            title="Migration"
            
        >
            <Form {...layout}>
                <Form.Item
                    label="Target company"
                    name="targetCompany"
                    size="large"
                >
                    <Select initialValues={[selectedCompany]} onChange={companiesChangedHandler}>
                        {
                            companies.map((company) => {
                                return <Option value={company.accessedOrganizationId} key={company.accessedOrganizationId}>{company.accessedOrganizationName}</Option>
                            })
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Section type"
                    name="sectionType"
                >
                    <Select initialValues={[selectedType]} onChange={sectionTypesChangedHandler}>
                        {
                            sectionTypes.map((type) => {
                                return <Option value={type.value} key={type.value}>{type.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
            </Form>
            <div className="thumbnailGroup">
                {
                    props.groups.map((group) => {
                        return (
                            <div className="hbox under-line v-gap-4" key={group.image}>
                                <div className="h-gap-4">
                                    <img src={group.image} alt={group.image} className="thumbnail-sm"></img>
                                </div>
                                <div>
                                    <span>title:</span>{group.texts[0]}
                                    <p>{group.texts.slice(1).join('')}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            {/* <div className="hbox-r v-gap-4">
                <div className="h-gap-4">
                    <Button type="primary" onClick={submitForm}>Submit</Button>
                </div>
                <Button onClick={submitForm}>Cancel</Button>
            </div> */}
        </Modal>
    );
}