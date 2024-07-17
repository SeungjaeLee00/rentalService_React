import { useNavigate } from "react-router-dom";
import useGet from "../../hooks/useGet";

export default function MyLike() {
	const likePosts = useGet("/api/posts/likes");
	const navigate = useNavigate();

	if (likePosts.loading) return <div>로딩중...</div>;
	if (likePosts.error) return <div>에러...</div>;
	if (!likePosts.data) return null;

	return (
		<div className="MyLike-wrap">
			<div className="Like-top">
				<p>찜</p>
			</div>
			<div className="Like-bottom">
				{likePosts.data.postList.map((a) => (
					<div
						key={a.id}
						className="Like-item"
						onClick={() => {
							navigate("/itemmain/detail/" + a.id);
						}}
					>
						<div className="Like-img">
							<img src={"https://sharingplatformbucket.s3.ap-northeast-2.amazonaws.com/post/" + a.link}></img>
						</div>
						<div className="item-info">
							<div style={{ fontSize: "20px", fontWeight: "bold" }}>{a.title}</div>
							<div style={{ marginTop: "10px" }}>{a.createdTime.replace("T", " ")}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
