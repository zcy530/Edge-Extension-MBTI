import React from 'react';
import {Rate, Table} from "antd";
import {HeartFilled } from '@ant-design/icons';


function MyTable({contacts}) {
	const columns = [
		{
			title: '姓名',
			dataIndex: 'name',
			width: 80,
			ellipsis: true
		},
		{
			title: 'MBTI',
			dataIndex: 'mbti',
			width: 80,
			ellipsis: true

		},
		{
			title: "关系",
			dataIndex: "relationship",
			width: 90,
			ellipsis: true
		},
		{
			title: '匹配程度',
			dataIndex: 'match',
			render: value => {
				const num = Math.floor(Math.random()*(5))+1;
				return <Rate character={<HeartFilled />} style={{color:'purple'}} disabled allowHalf defaultValue={num} count={5} />
			}
		}
	]

	return (
		<Table
			columns={columns}
			dataSource={contacts}
			style={{
				width: 460
			}}
			pagination={{size: "small", defaultPageSize: 2}}

		/>
	);
}

export default MyTable;