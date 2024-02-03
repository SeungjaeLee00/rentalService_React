import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../../style/LoginPage.css";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function Find_pw() {
	let navigate = useNavigate(); // hook: page 이동을 도와줌

	const ABOUT = "Billim에 가입한 이메일을 정확히 입력해 주세요.\n이메일을 통해 비밀번호 변경 인증번호가 전송됩니다.";

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSumbit = (data) => {
		console.log(data);

		axios
			.post("/api/email/password-reset?email=" + data.username)
			.then((response) => {
				if ((response.status = 200)) {
					return navigate("/reset-pw", { state: data.username });
				}
			})
			.catch((error) => {
				console.log(error);
				//존재하지 않는 회원
				if (error.response.data.code == "404") {
					alert("존재하지 않는 회원입니다");
				}
				//이미 메일을 전송한 경우 -> 다음화면으로 이동
				else if (error.response.data.code == "409") {
					alert("이미 메일을 전송했습니다. 다음 화면으로 이동합니다.");
					navigate("/reset-pw", { state: data.username });
				}
			});
	};

	return (
		<div className="findpw-wrap">
			<div className="findpw-top">
				<h3>비밀번호 변경</h3>
				<p>{ABOUT}</p>
			</div>
			<div className="findpw-bottom">
				<form onSubmit={handleSubmit(onSumbit)}>
					<label>이메일</label>
					<input
						class="inputField"
						placeholder="abcdef@google.com"
						{...register("username", {
							required: "이메일을 입력하세요 ",
							pattern: {
								value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
								message: "이메일을 올바르게 입력해주세요.",
							},
						})}
					/>
					{errors.username && <p>{errors.username.message}</p>}
					<button type="submit">인증</button>
				</form>
			</div>
		</div>
	);
}

export default Find_pw;
