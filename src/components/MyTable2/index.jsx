import React from 'react';
import {Rate, Table} from "antd";


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
				return <Rate allowHalf value={value} count={5} disabled/>
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