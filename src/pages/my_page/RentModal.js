import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function RentModal(props) {
	const actoken = localStorage.accessToken;
	const retoken = localStorage.refreshToken;
	const nickname = window.sessionStorage.getItem("nickname");
	const navigate = useNavigate();

	const [tradeinfo, setTradeInfo] = useState();
	const [loadging, setLoading] = useState(null);
	const [error, setError] = useState(null);

	//거래내역단건조회
	const fetchtradeinfo = async () => {
		try {
			setError(null);
			setTradeInfo(null);

			setLoading(true);
			const response = await axios.get("/api/trades/" + props.tradeid);
			console.log(response.data);
			setTradeInfo(response.data);
		} catch (e) {
			console.log(e);
			setError(e);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchtradeinfo();
	}, []);

	function closeModal() {
		props.closeModal();
	}

	if (loadging) return <div>로딩중...</div>;
	if (error) return <div>에러가 발생했습니다</div>;
	if (!tradeinfo) return null;

	const TradeComplete = (tradecheck) => {
		//이미 거래완료버튼을 눌렀으면
		if (tradecheck == true) {
			alert("이미 거래를 완료하셨습니다");
		} else {
			axios
				.patch("/api/trades/trade/" + props.tradeid, null, {
					headers: {
						Authorization: `Bearer ${actoken}`,
						Auth: retoken,
					},
				})
				.then((response) => {
					console.log(response);
					alert("거래가 완료되었습니다");
				})
				.catch((error) => {
					if (error.response.data.code == "511") {
						alert("로그인이 만료되어 로그인 페이지로 이동합니다");
						window.location.replace("/loginpage");
					}
					console.log(error);
				});
		}
	};

	const WriteReviewBtn = (tradecheck) => {
		//상품주인이 거래완료버튼을 클릭했으면 리뷰작성
		if (tradecheck == true) {
			navigate("/reviews/write-review", { state: { postid: props.postid, tradeid: props.tradeid } });
		}
		//거래완료버튼을 누르지 않았으면 리뷰작성못함
		else {
			alert("거래가 완료되지 않았습니다");
		}
	};
	const DeleteTrade = () => {
		axios
			.delete(`/api/trades/${tradeinfo.tradeId}`, {
				headers: {
					Authorization: `Bearer ${actoken}`,
					Auth: retoken,
				},
			})
			.then((response) => {
				alert("거래삭제가 완료되었습니다");
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="RentModal" onClick={closeModal}>
			<div className="RentmodalBody" onClick={(e) => e.stopPropagation()}>
				<button className="RentmodalCloseBtn" onClick={closeModal}>
					X
				</button>
				<div className="RentModal-content">
					<div className="Rent-title">
						<RentSpan>게시글제목:{props.tradetitle}</RentSpan>
					</div>
					<div className="Rent-date">
						<span>대여기간 : </span>
						<DateSpan>
							{tradeinfo.startDate[0] + "년" + tradeinfo.startDate[1] + "월" + tradeinfo.startDate[2] + "일"} ~
							{tradeinfo.endDate[0] + "년" + tradeinfo.endDate[1] + "월" + tradeinfo.endDate[2] + "일"}
						</DateSpan>
					</div>
					<div>
						{/* 빌려주는사람닉네임이랑 현재유저의 닉네임이랑 같으면 거래완료생기기 */}
						{tradeinfo.renderMember == nickname ? (
							<button
								onClick={() => {
									TradeComplete(tradeinfo.tradeComplete);
								}}
							>
								거래 완료
							</button>
						) : (
							<button
								onClick={() => {
									WriteReviewBtn(tradeinfo.tradeComplete);
								}}
							>
								📝리뷰작성
							</button>
						)}
						{tradeinfo.tradeComplete ? (
							<button
								onClick={() => {
									DeleteTrade();
								}}
							>
								거래삭제
							</button>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}

let RentSpan = styled.span`
	font-size: 25px;
	font-weight: bold;
`;

let DateSpan = styled.span`
	font-weight: bold;
	color: #ff8906;
`;
