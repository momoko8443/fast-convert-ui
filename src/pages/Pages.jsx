import scrapyService from '../services/scrapyService';
import { useEffect, useState } from 'react';
import { Table, Input, Button } from 'antd';
import {
    Link, useParams
} from "react-router-dom";

export default function Sites() {
    const columns = [
        {
          title: 'Pages',
          dataIndex: 'page',
          key: 'page',
          render: (text,record) =>  <Link to={"/elements/" + record.id }>{text}</Link>,
        }
      ];
    let { domain } = useParams();
    const [pages, setPages] = useState([]);
    useEffect(() => {
        scrapyService.getPagesByDomain(domain).then((result) => {
            setPages(result);
        })
    }, [domain]);
    return (
        <div className="pageMain">
            <Table dataSource={pages} columns={columns} />
        </div>
    )
} 