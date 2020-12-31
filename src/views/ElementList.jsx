import {useEffect, useState} from 'react';
export default function ElementList(props){
    const [groups,setGroups] = useState([]);
    useEffect(()=>{
        setGroups(props.groups);
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
        console.log(src);
        if (src.startsWith("//")) {
            return "https:" + src;
        } else if (src.startsWith("/")) {
            return this.getDomain() + src;
        }
        return src;
    }

    return (
        <div>
            {groups.map((group) => 
                <div className="group">
                    <div className="imgGroup">
                        <img
                            className="thumbnail"
                            alt={group.image}
                            src={getImageUrl(group.image)}
                        />
                    </div>
                    
                    <div className="textGroup">
                        {group.texts.map((text)=>
                            <div className="text">{ text }</div>
                        )}                   
                    </div>

                    <div className="checkboxBox">
                        <input type="checkbox"></input>
                    </div>
                </div>
            )}
        </div>
    )
} 