import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Input, Modal, Tabs, Select } from "antd"
import "./App.css"
import MessageBar from "./components/MessageBar";
import {SearchOutlined} from "@ant-design/icons"
import KeyWordCard from "./components/KeyWordCard";
import MyTable from "./components/MyTable";
import MyTable2 from "./components/MyTable2";

const {TabPane} = Tabs
const { Option } = Select

function App() {
	const [form] = Form.useForm()
	const [contacts, setContacts] = useState(() => {
		const localContacts = JSON.parse(localStorage.getItem("contacts"))
		return localContacts ? localContacts : []
	})
	const [manage, setManage] = useState(false)
	const [visible, setVisible] = useState(false)
	const [searchValue, setSearchedValue] = useState("")
	const manageContacts = () => {
		setManage(!manage)
	}
	
	const hashmap = new Map()
	hashmap.set("ESFP",5)
	hashmap.set("INTJ",3)
	hashmap.set("ISTJ",4)
	hashmap.set("ENTP",2)

	hashmap.set("INFP",3.5)
	hashmap.set("ENFP",2)
	hashmap.set("INFJ",3)
	hashmap.set("ENFJ",5)

	hashmap.set("ENTJ",2.5)
	hashmap.set("INTP",1)
	hashmap.set("ISFP",5)
	hashmap.set("ISTP",3)

	hashmap.set("ESTP",2)
	hashmap.set("ISFJ",4)
	hashmap.set("ESFJ",3)
	hashmap.set("ESTJ",5)


	const addContact = () => {
		setVisible(true)
	}
	const handleModelOk = () => {
		setVisible(false)
		const mbti = form.getFieldValue("mbti")
		form.setFieldValue("match", hashmap.get(mbti))
		const newContact = form.getFieldsValue(true)
		setContacts([...contacts, {key: newContact.name, ...newContact}])
		console.log([...contacts, {key: newContact.name, ...newContact}])
		form.resetFields()
	}
	const handleModelCancel = () => {
		setVisible(false)
		form.resetFields()

	}
	const handleSearch = (e) => {
		const value = e.target.value
		setSearchedValue(value)
	}
	const searchedContacts = contacts.filter(contact => {
		if (!searchValue) {
			return false
		}
		if (contact.name.indexOf(searchValue) !== -1) {
			return true
		}
		return contact.mbti.indexOf(searchValue) !== -1;
	})
	useEffect(() => {
		localStorage.setItem("contacts", JSON.stringify(contacts))
	})
	return (
		<Card>
			<Tabs defaultActiveKey="1"
				// tabBarExtraContent={{
				//     right: <Button style={{
				//       border: "none",
				//       background: "transparent"
				//     }} onClick={() => chrome}>X</Button>,
				// }}
			>
				<TabPane
					tab="联系人"
					key="1"
					style={{
						position: "relative",
						height: "100%",
						paddingTop: 0
					}}>
					<div style={{display: "flex", justifyContent: "center"}}>
						{contacts.length ? (
							<MyTable contacts={contacts} manage={manage} addContact={addContact}
							         manageContacts={manageContacts} setContacts={setContacts}/>
						) : (
							<div style={{
								width: "100%",
								height: 150,
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								paddingTop: 30,
								marginTop: 30
							}}>
								<img style={{
									width: 300,
									height: 250
								}} src="./imgs/Vector.png" alt=""/>
								<div>开始添加你的联系人的MBTI吧！</div>
								<div style={{
									paddingTop: 10
								}}><Button type="primary" onClick={addContact}>添加联系人</Button></div>
							</div>
						)}
						<MessageBar/>
					</div>

				</TabPane>
				<TabPane
					tab="搜索"
					key="2"
					className="search"
				>
					<div style={{
						display: "flex",
						// justifyContent: "",
						flexDirection: "column",
						height: 300,
						alignItems: "center"
					}}>
						<Input
							placeholder="输入MBTI人格或联系人姓名进行搜索"
							style={{
								borderRadius: 14,
								width: 450,
								height: 40,
								marginBottom: 20,
								marginTop:20
							}}
							onChange={handleSearch}
							value={searchValue}
							suffix={<SearchOutlined/>}
						></Input>
						{searchedContacts.length > 0 ?
							(<MyTable2 contacts={searchedContacts}/>) :
							<KeyWordCard setSearchedValue={setSearchedValue}/>}
					</div>
				</TabPane>
				<TabPane tab="测试" key="3">
				    <div style={{display: "flex", justifyContent: "center"}}>
					
							<div style={{
								width: "100%",
								height: 150,
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								paddingTop: 30,
								marginTop: 30
							}}>
								<img style={{
									width: 200,
									height: 150
								}} src="./imgs/undraw_coffee_with_friends_3cbj.svg" alt=""/>
								<div>开始测试你的MBTI吧！</div>
								<div style={{paddingTop: 10}}>
									<Button type="primary" ><a href="https://www.16personalities.com/" target="_blank" rel="noreferrer">测试链接</a></Button>
							    </div>
							</div>
						
						<MessageBar/>
					</div>
				</TabPane>
			</Tabs>
			<Modal
				title="添加联系人"
				visible={visible}
				onOk={handleModelOk}
				onCancel={handleModelCancel}
				centered
				width={400}
			>
				<Form
					form={form}
					onFinish={handleModelOk}
					labelCol={{style: {width: 80, whiteSpace: 'normal', textAlign: 'left'}}}
				>
					<Form.Item
						name={"name"}
						label="姓名:"
						rules={[
							{
								required: true,
								message: '姓名不能为空',
							},
						]}
					>
						<Input placeholder="请输入姓名" size={"small"}/>
					</Form.Item>
					<Form.Item
						name={"mbti"}
						label="MBTI:"
						rules={[
							{
								required: true,
								message: 'MBTI不能为空',
							},
						]}
					>
						<Select placeholder="请选择关系" size={"small"}>
						    <Option value="ESFP">ESFP</Option>
							<Option value="INTJ">INTJ</Option>
						    <Option value="ISTJ">ISTJ</Option>
							<Option value="ENTP">ENTP</Option>
							<Option value="INFP">INFP</Option>
							<Option value="ENFP">ENFP</Option>
							<Option value="INFJ">INFJ</Option>
							<Option value="ENFJ">ENFJ</Option>
							<Option value="ENTJ">ENTJ</Option>
							<Option value="INTP">INTP</Option>
							<Option value="ISFP">ISFP</Option>
							<Option value="ISTP">ISTP</Option>
							<Option value="ESTP">ESTP</Option>
							<Option value="ISFJ">ISFJ</Option>
							<Option value="ESFJ">ESFJ</Option>
							<Option value="ESTJ">ESTJ</Option>
						</Select>
					</Form.Item>
					<Form.Item
						name={"relationship"}
						label="关系:"
						rules={[
							{
								required: true,
								message: '关系不能为空',
							},
						]}
					>
						<Select placeholder="请选择关系" size={"small"}>
							<Option value="自己">自己</Option>
							<Option value="同事">同事</Option>
							<Option value="朋友">朋友</Option>
							<Option value="恋人">恋人</Option>
							<Option value="领导">领导</Option>
							<Option value="家人">家人</Option>
						</Select>
						{/* <Input placeholder="请输入关系" size={"small"}/> */}
					</Form.Item>
					{/* <Form.Item name={"match"} label="匹配程度:">
						<Rate style={{textAlign: "left"}} onChange={value => form.setFieldValue("match", value)}></Rate>
					</Form.Item> */}
				</Form>
			</Modal>
		</Card>


	);
}

export default App;
