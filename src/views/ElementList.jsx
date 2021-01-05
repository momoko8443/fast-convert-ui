import {useEffect, useState} from 'react';
import {Checkbox} from 'antd';
export default function ElementList(props){
    const [groups,setGroups] = useState([]);
    useEffect(()=>{
        const copyGroups = JSON.parse(JSON.stringify(props.groups));
        copyGroups.forEach(group => {
            group.selected = false
        });
        setGroups(copyGroups);
    },[props.groups])

    // function getImageOriginalSize(e){
    //     const originalSize =
    //     e.target.naturalWidth + " x " + e.target.naturalHeight;
    //     e.target.nextSibling.innerHTML = originalSize;
    // }
    function getImageUrl(src){
        if (!src) {
            return "";
        }
        if (src.startsWith("//")) {
            return "https:" + src;
        } else if (src.startsWith("/")) {
            return this.getDomain() + src;
        }
        return src;
    }

    function checkboxChangedHandler(e, group){
        //console.log(e.target.checked);
        //console.log(group);
        group.selected = e.target.checked;
        const selectedGroups = groups.filter(g => g.selected === true);
        if(props.selectedGroupsUpdated){
            props.selectedGroupsUpdated(selectedGroups);
        }
    }

    return (
        <div>
            {groups.map((group, index) => 
                <div className="group" key={index}>
                    <div className="imgGroup">
                        <img
                            className="thumbnail"
                            alt={group.image}
                            src={getImageUrl(group.image)}
                        />
                    </div>
                    
                    <div className="textGroup">
                        {group.texts.map((text)=>
                            <div className="text" key={text}>{ text }</div>
                        )}                   
                    </div>

                    <div className="checkboxBox">
                        <Checkbox onChange={(e)=>{checkboxChangedHandler(e, group)}}></Checkbox>
                        {/* <input type="checkbox" checked={group.selected} onChange={checkboxChangedHandler}></input> */}
                    </div>
                </div>
            )}
        </div>
    )
} 