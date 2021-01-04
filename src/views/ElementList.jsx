import {useEffect, useState} from 'react';
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

    function checkboxChangedHandler(e){
        console.log(e);
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
                        <input type="checkbox" checked={group.selected} onChange={checkboxChangedHandler}></input>
                    </div>
                </div>
            )}
        </div>
    )
} 