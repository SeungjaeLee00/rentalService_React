import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../style/modal.css";
import "../../../style/Edit_membership.css";
import { useAuth } from "../../../components/AuthContext";
import ViewProfile from "./ViewProfile";
import EditForm from "./EditForm";
import useGet from "../../../hooks/useGet";

const Edit_membership = () => {
	const state = useLocation();
	console.log(state);
	const navigate = useNavigate();

	const username = sessionStorage.getItem("nickname");
	const { isAuthenticated } = useAuth();
	//아이디, 닉네임, 휴대폰번호, 주소
	const userData = useGet("/api/members/my-profile");
	//자기소개,프로필사진
	const userData2 = useGet(`/api/members/${username}`);

	const [isEditing, setIsEditing] = useState(false);

	const startEditing = () => {
		setIsEditing(!isEditing);
	};

	useEffect(() => {
		return () => {
			if (!isAuthenticated) {
				navigate("/loginpage");
				return;
			}
		};
	}, []);

	if (userData.loading || userData2.loading) return <div>로딩 중...</div>;
	if (userData.error || userData2.error) return <div>에러</div>;
	if (!userData.data || !userData2.data) return null;

	return (
		<div>
			<div className="editmy-top">
				<p>기본 회원정보</p>
			</div>
			{isEditing ? (
				<EditForm userData={userData.data} userData2={userData2.data} />
			) : (
				<ViewProfile userData={userData.data} userData2={userData2.data} startEditing={startEditing} />
			)}
		</div>
	);
};

export default Edit_membership;
