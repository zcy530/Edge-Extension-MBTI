import React, {useEffect, useState} from 'react';
import {Button, Col, Popover, Row} from "antd";
import axios from "axios";

function KeyWordCard({}) {
	const alphabet = ["E", "I", "S", "N", "T", "F", "J", "P"]
	const character = ["INTI", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP",]
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
	return (
		<div style={{
			background: "white",
			width: 450,
			height: 250,
			borderRadius: 5,
			display: "flex",
			flexDirection: "row",
			alignItems: "center"
		}}>
			<div style={{
				width: 180,
				height: 200,
				// background: "green",

			}}>
				<Row
					style={{
						paddingTop: 10
					}}
					gutter={[0, 15]}
				>
					<Col span={24} style={{color: "gray"}}>每个字母含义</Col>
					{alphabet.map(item => {
						return <Col span={12}><Popover content={<Content item={item}/>} trigger="hover">
							<Button size="small" style={{width: 60}}
							        >{item}</Button>
						</Popover></Col>
					})}
				</Row>

			</div>
			<div style={{
				width: 1,
				height: 200,
				background: "gray",
				margin: 1
			}}></div>
			<div style={{
				width: 240,
				height: 200,
				// background: "green",
			}}>
				<Row
					style={{
						paddingTop: 10
					}}
					gutter={[0, 15]}
				>
					<Col span={24} style={{color: "gray"}}>每种人格的含义</Col>
					{character.map(item => {
						return (
							<Col span={6}>
								<Popover content={<Content item={item}/>} trigger="hover">
									<Button size="small" style={{width: 50}}
									        >{item}
									</Button>
								</Popover>
							</Col>
						)
					})}
				</Row>
			</div>
		</div>
	);
}

export default KeyWordCard;