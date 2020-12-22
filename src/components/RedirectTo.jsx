import { Redirect } from "react-router-dom";

import React, { useState, useEffect } from 'react';

export default function RedirectTo(props){
    const [url] = useState(props.url);
    useEffect(() => {
        window.location.href = url;
    });

    return <div></div>
}