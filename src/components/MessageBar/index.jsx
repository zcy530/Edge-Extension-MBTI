import React, {useEffect, useState} from 'react';
import axios from "axios"

const MessageBar = React.memo(function () {
	const [message, setMessage] = useState("")
	useEffect(() => {
		axios.get("https://mbtimaster.azurewebsites.net/funfact").then(value => {
			console.log(value)
			setMessage(value.data.funfact)
		})
	},[])
	return (
		<div style={{
			position: "absolute",
			bottom: 1,
			left: "50%",
			marginLeft: -450 / 2,
		}}>
			<div style={{
				width: 450,
				height: 60,
				background: "rgba(255, 255, 255, 1)",
				borderRadius: 5,
				padding: 10,
				fontSize: 16,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between"

			}}>
				<div>{message}</div>
				<div>
					<a><img src="./imgs/dianzan.svg" width={20} alt=""/></a>
					<a><img src="./imgs/fandui.svg" width={20} alt=""/></a>
				</div>

			</div>
			<div style={{
				width: 0,
				height: 0,
				border: "10px solid #000",
				borderTopColor: "rgba(255, 255, 255, 1)",
				borderBottomColor: "rgba(0,0,0,0)",
				borderLeftColor: "rgba(0,0,0,0)",
				borderRightColor: "rgba(0,0,0,0)",
				marginLeft: 10
			}}>
			</div>
		</div>
	);
},()=>true)


export default MessageBar;