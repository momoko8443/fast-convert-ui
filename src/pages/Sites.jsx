import scrapyService from '../services/scrapyService';
import { useEffect, useState } from 'react';
import { Table, Input, Button } from 'antd';
import {
    Link
} from "react-router-dom";

export default function Sites() {
    const columns = [
        {
          title: 'Domain',
          dataIndex: 'starturl',
          key: 'starturl',
          render: (text,record) =>  <Link to={"/pages/" + record.domain }>{text}</Link>,
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
      ];
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        scrapyService.getAllRequests().then((result) => {
            setRequests(result.data);
        })
    }, []);
    return (
        <div className="pageMain">
            <Table dataSource={requests} columns={columns} />
        </div>
    )
} 