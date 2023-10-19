//UTC -> 한국시간으로 바꿔주는 함수.
export default function SetKST(time) {
    const kor = new Date(time);
    kor.setHours(kor.getHours() + 9);

    // console.log(kor.toLocaleString(0,20));
    return kor.toLocaleString('ko-KR').slice(0,21)  // 'ko-KR': 한국시간에 맞춰서
}