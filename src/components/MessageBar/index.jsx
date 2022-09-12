import React, {useEffect, useState} from 'react';
import axios from "axios"

const MessageBar = React.memo(function () {
	const [message, setMessage] = useState("")
	const [showThumbup, setShowThumbup] = useState(false)
	const [showThumbDown, setShowThumbDown] = useState(false)

	const changeThumbup = () => {
		setShowThumbup(!showThumbup)
	}

	const changeThumbdown = () => {
		setShowThumbDown(!showThumbDown)
	}
	
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
				borderRadius: 14,
				padding: 10,
				fontSize: 16,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between"

			}}>
				<div>{showThumbup||showThumbDown? '有67%的人跟你有一样的想法':message}</div>
				<div>
					
					<a><img src={showThumbup? "./imgs/thumbup focus.svg":"./imgs/thumbup.svg"} 
					            width={20} alt="" onClick={changeThumbup} style={{marginRight:"10px"}} /></a>
					<a><img src={showThumbDown? "./imgs/thumbsDown focus.svg":"./imgs/thumbsDown.svg"} 
					            width={19} alt="" onClick={changeThumbdown}/></a>
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