import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../style/OneMessage.css";
import ReplyModal from "./ReplyModal";
import SetKST from "../../utils/SetKST";
import "react-datepicker/dist/react-datepicker.css";
import TradeModal from "./TradeModal";
import styled from "styled-components";
import useGet from "../../hooks/useGet";
export default function OneMessage() {
	const navigate = useNavigate();
	const actoken = localStorage.accessToken;
	const retoken = localStorage.refreshToken;

	//state에 MessageList의 copy가 담김.(copy에는 쪽지id, 받은쪽지인지 보낸쪽지인지 나타내는 값 총2개)
	let { state } = useLocation();
	// console.log(state.copy);

	//단건메시지조회한 데이터
	// const [msg, setMsg] = useState();
	// const [loading, setLoading] = useState();
	// const [error, setError] = useState();

	const msg = useGet(`/api/messages/${state.copy[0]}`);

	// const fetchonemsg = async () => {
	//     try {
	//         setMsg(null);
	//         setError(null);

	//         setLoading(true);
	//         const response = await axios.get(`/api/messages/${state.copy[0]}`, {
	//             headers: {
	//                 'Authorization': `Bearer ${actoken}`,
	//                 'Auth': retoken
	//             }
	//         })
	//         console.log(response);
	//         setLoading(false);
	//         setMsg(response.data)
	//     } catch (error) {
	//         console.log(error);
	//         setError(error);
	//         if (error.response.data.code == '511') {
	//             alert('로그인이 만료되어 로그인 페이지로 이동합니다');
	//             window.location.replace('/loginpage');
	//         }

	//     }
	// }

	// useEffect(() => {
	//    fetchonemsg();
	// }, [])

	//쪽지 삭제 함수
	function deletesend() {
		let deletecheck = window.confirm("정말 삭제하시겠습니까?");
		console.log(state.copy[1]);
		if (deletecheck) {
			axios
				.delete(`/api/messages/${msg.id}/${state.copy[1]}`, {
					headers: { Authorization: `Bearer ${actoken}` },
					headers: { Auth: retoken },
				})
				.then((response) => {
					console.log("메시지삭제성공");
					navigate(-1);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}
	const [modalopen, setModalOpen] = useState(false);
	const [trademodalopen, setTradeModalOpen] = useState(false);

	if (msg.loading == true) <div>로딩중..</div>;
	if (msg.error == true) <div>에러발생..</div>;
	if (!msg.data) return null;
	console.log(msg);
	return (
		<div>
			<div className="one-wrap">
				<div className="one-top">
					<div className="top-title">
						<Title>쪽지함</Title>
						<div className="top-button">
							<button
								className="trade-button"
								onClick={() => {
									setTradeModalOpen(!trademodalopen);
								}}
							>
								거래하기
							</button>
						</div>
						{trademodalopen && (
							<TradeModal
								postId={msg.data.postId}
								borrowerName={msg.data.senderNickname}
								closeModal={() => setTradeModalOpen(!trademodalopen)}
							/>
						)}
					</div>
					<div className="top-info">
						<div className="info-left">
							<PostTitle>게시글 : {msg.data.postTitle}</PostTitle>
							<SendTime>{SetKST(msg.data.createdDate)}</SendTime>

							<Sender className="left-bottom">발신자 : {msg.data.senderNickname}</Sender>
						</div>
						<div className="info-right">
							<button
								onClick={() => {
									setModalOpen(!modalopen);
								}}
							>
								답장
							</button>
							{/* 모달창 컴포넌트 호출 (https://joylee-developer.tistory.com/184)*/}
							{modalopen && (
								<ReplyModal
									msgid={msg.data.postId}
									senderNickname={msg.data.senderNickname}
									closeModal={() => setModalOpen(!modalopen)}
								/>
							)}
							<button onClick={deletesend}>삭제</button>
						</div>
					</div>
				</div>
				<div className="one-bottom">
					<div className="msg-content">{msg.data.content}</div>
					<div className="msg-bottom">
						{/* <Link to="/my-page/chats">목록으로</Link> */}
						{/* Link태그썼는데 안되서 navigate(-1) 즉 뒤로가기 이용 */}
						<button
							onClick={() => {
								navigate(-1);
							}}
						>
							목록
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
let Title = styled.div`
	margin-left: 30px;
	font-size: 30px;
	@media all and (max-width: 600px) {
		font-size: 20px;
	}
`;

let PostTitle = styled.div`
	font-size: 20px;
	margin-left: 30px;
	font-weight: bold;
	@media all and (max-width: 580px) {
		font-size: 13px;
	}
`;

let SendTime = styled.div`
	font-weight: bold;
	margin-top: 10px;
	margin-left: 30px;
	@media all and (max-width: 580px) {
		font-size: 10px;
	}
`;

let Sender = styled.div`
	margin-top: 10px;
	margin-left: 30px;
	font-weight: bold;
	@media all and (max-width: 580px) {
		font-size: 10px;
	}
`;
