import React, {useState, useEffect} from 'react';
import {Button, Rate, Table, Popover} from "antd";
import {HeartFilled, ShareAltOutlined } from '@ant-design/icons';
import {CloseOutlined} from "@ant-design/icons";
import "./index.css"
import {EditableRow, EditableCell} from "./EditableCell";
import axios from "axios";

function MyTable({contacts, addContact, setContacts}) {
	const [manage, setManage] = useState(false)
	const Content = ({item}) => {
		const [content, setContent] = useState("")
		useEffect(
			() => {
				axios.post("https://mbtimaster.azurewebsites.net/search", {name: item}).then(
					value => setContent(value.data.data)
				)
			}
		)

		return content
	}

	const manageContacts = () => {
		setManage(!manage)
	}
	const defaultColumns = [
		{
			title: '姓名',
			dataIndex: 'name',
			width: 80,
			ellipsis: true,
			editable: manage
		},
		{
			title: 'MBTI',
			dataIndex: 'mbti',
			width: 80,
			ellipsis: true,
			editable: manage

		},
		{
			title: "关系",
			dataIndex: "relationship",
			width: 70,
			ellipsis: true,
			editable: manage
		},
		{
			title: '匹配程度',
			dataIndex: 'match',
			render: (value, record, index) => {
				//record.match = Math.floor(Math.random()*(5))+1;
				//const num = Math.floor(Math.random()*(5))+1;

				// eslint-disable-next-line
				const handleRateChange = value => {
					record.match = value
					const newData = [...contacts];
					const index = newData.findIndex((item) => record.key === item.key);
					const item = newData[index];
					newData.splice(index, 1, {...item, ...record});
					setContacts(newData);
				}
				return <Rate character={<HeartFilled />} style={{color:'purple'}} disabled allowHalf defaultValue={value} count={5} />
			}
		},
		{
			title: "",
			render: (text, record, index) => {
				const deleteContact = () => {
					const newContacts = contacts.slice().filter(item => {
						return item.key !== record.key;
					})
					setContacts(newContacts)
				}
				return <>{manage ? <Button className="deleteBtn" onClick={deleteContact}><CloseOutlined
					style={{color: "purple"}}/></Button> : <Popover content={<Content item={record.mbti}/>} trigger="hover"><a href='http://www.baidu.com'><ShareAltOutlined/></a></Popover>}</>
			},
			width: 50
		}
	]
	const onChange = (key) => {
	};
	const handleSave = (row) => {
		const newData = [...contacts];
		const index = newData.findIndex((item) => row.key === item.key);
		const item = newData[index];
		newData.splice(index, 1, {...item, ...row});
		setContacts(newData);
	};
	const columns = defaultColumns.map((col) => {
		if (!col.editable) {
			return col;
		}

		return {
			
			...col,
			onCell: (record) => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.title,
				handleSave,
			}),
		};
	});
	return (
		
			<Table
			components={{
				body: {
					row: EditableRow,
					cell: EditableCell,
				},
			}}
			columns={columns}
			dataSource={contacts}
			onChange={onChange}
			style={{
				width: 460,
				borderRadius:20
			}}
			pagination={{size: "small", defaultPageSize: 2}}
			footer={() => {
				return (
					<div style={{
						display: "flex",
						justifyContent: "center",
						position: "relative"
					}}>
						{manage ? <Button
							type="primary"
							onClick={addContact}
							style={{
								position: "absolute",
								right: 5
							}}
						>+</Button> : ""}
						<Button type="primary" onClick={manageContacts}>管理联系人</Button>
					</div>
				)
			}}
		/>
		
	);
}

export default MyTable;