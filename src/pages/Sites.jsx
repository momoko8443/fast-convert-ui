import scrapyService from '../services/scrapyService';
import { useEffect, useState } from 'react';
import { Input, Button } from 'antd';


export default function Sites() {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        scrapyService.getAllRequests().then((result) => {
            setRequests(result.data);
        })
    }, []);
    return (
        <div className="pageMain">
            {
                requests.map((site) => {
                    return <div key={site.id}>{site.starturl}</div>
                })
            }
        </div>
    )
} 