import { useEffect, useState } from 'react';

import delegateUserService from "../services/delegateUserService";
import useToken from "../hooks/useToken";
import types from "../mocks/showCaseType";
import { Form, Modal, Select } from 'antd';
import { Draggable,DragDropContext,Droppable } from 'react-beautiful-dnd';

const { Option } = Select;
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  
  const grid = 8;
  
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });
  
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    // width: 250
    height: '600px',
    overflow: 'auto'
  });

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

    const [groups, setGroups] = useState([]);
    useEffect(()=>{
        const newGroups = [];
        props.groups.forEach((group)=>{
            const newGroup = {image: group.image, title:group.texts[0],description:group.texts.slice(1).join('')};
            newGroups.push(newGroup);
        })
        setGroups(newGroups);
    },[props.groups]);

    function companiesChangedHandler(value) {
        //console.log(e.target.value);
        setSelectedCompany(value);
    }
    function sectionTypesChangedHandler(value) {
        //console.log(e.target.value);
        setSelectedType(value);
    }

    function onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          groups,
          result.source.index,
          result.destination.index
        );
        console.log('items',items);
        setGroups(items);
        
    }

    function editTitleHandler(e,index){
        groups[index].title = e.target.innerText;
        setGroups(groups);
    }
    function editDescriptionHandler(e,index){
        groups[index].description = e.target.innerText;
        setGroups(groups);
    }

    function submitHandler(){
        console.log(groups);
        props.onSubmit && props.onSubmit(groups,selectedCompany,selectedType);
    }
    return (
        <Modal
            visible={props.isOpen}
            onOk={submitHandler}
            onCancel={props.closeModal}
            title="Migration"
            width="800px"
        >
            <Form {...layout}>
                <Form.Item
                    label="Target company"
                    name="targetCompany"
                    size="large"
                    initialValue={selectedCompany}
                >
                    <Select onChange={companiesChangedHandler}>
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
                    initialValue={selectedType}
                >
                    <Select onChange={sectionTypesChangedHandler}>
                        {
                            sectionTypes.map((type) => {
                                return <Option value={type.value} key={type.value}>{type.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
            </Form>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {
                                groups.map((group, index) => {
                                    return (
                                        <Draggable key={group.image} draggableId={group.image} index={index}>
                                            {/* <div className="hbox under-line v-gap-4" key={group.image}> */}
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="hbox"
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        <div className="h-gap-4">
                                                            <img src={group.image} alt={group.image} className="thumbnail-sm"></img>
                                                        </div>
                                                        <div>
                                                            <div>
                                                                <p contenteditable="true" onInput={(e)=>{editTitleHandler(e,index)}}>{group.title}</p>
                                                            </div>
                                                            <div>     
                                                                <p contenteditable="true" onInput={(e)=>{editDescriptionHandler(e,index)}}>{group.description}</p>
                                                            </div>
                                                        </div>   
                                                    </div>
                                                )}
                                            {/* </div> */}
                                        </Draggable>
                                    );
                                })
                            }
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Modal>
    );
}