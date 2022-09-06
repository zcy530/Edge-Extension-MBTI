import React, {useState} from 'react';
import {Button, Rate, Table, Popover} from "antd";
import {HeartFilled, ShareAltOutlined } from '@ant-design/icons';
import {CloseOutlined} from "@ant-design/icons";
import "./index.css"
import {EditableRow, EditableCell} from "./EditableCell";

function MyTable({contacts, addContact, setContacts}) {
	const [manage, setManage] = useState(false)
	const entp = "忠诚、支持、情感反馈——这些不是ENTP在他们的友谊中寻找的东西。辩论家性格类型的人最不想听到的就是“你是对的”，除非他们在激烈的知识辩论中占据绝对优势。如果他们错了，ENTP希望被告知，他们希望朋友可以揭露他们逻辑中错误的每一个细节。其中一部分原因是他们表达出的观点是武断的，另一部分原因是他们是为了捍卫观点逻辑，必须要采取对比和阻拦的方式。"
	const intj = "尽管他们可能会感到惊讶，但INTJ可以成为伟大的领导者。在工作场所，他们很少为了证明自己的权威而放弃自己的权威。一般来说，INTJ更愿意平等地对待为他们工作的人。他们的目标不是微观管理，而是指导更广泛的战略，同时让其他人处理日常活动。尊重并奖励积极主动的行为，将责任委托给具有最强批判性思维能力的员工。难以指导自己的员工——只想被告知该做什么——可能很难达到建筑师的标准。任何试图用奉承或借口来掩盖糟糕结果的人都可能会感到失望。这些策略很少适用于建筑师的个性。"
	const istj = "ISTJ 朋友不是自发的。他们不健谈，或者在他们的感情中特别顽皮。ISTJ 的朋友是忠诚的、值得信赖的、光荣的、可靠的。其他人可能会随着生活的起起落落、来来去去，但ISTJ无论如何都会留在他们朋友的身边，有着其他类型甚至可能不相信的深度承诺。"

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
					style={{color: "purple"}}/></Button> : <Popover content={istj} trigger="hover"><a><ShareAltOutlined/></a></Popover>}</>
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