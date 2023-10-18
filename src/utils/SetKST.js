//UTC -> 한국시간으로 바꿔주는 함수.
export default function SetKST(time) {
    const kor = new Date(time);
    kor.setHours(kor.getHours() + 9);
    return kor.toLocaleString().slice(0,21)
}