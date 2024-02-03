//UTC -> 한국시간으로 바꿔주는 함수.
export default function SetKST(time) {
	let kor = new Date(time);
	//한국시간 +9
	kor.setHours(kor.getHours() + 9);
	//데이터 형식 수정
	kor = kor.toLocaleString("ko-KR").slice(0, 22);
	// 1시~ 9시
	if (kor[kor.length - 1] == ":") return kor.slice(0, 21);
	// 10시~ 12시
	else return kor;
}
