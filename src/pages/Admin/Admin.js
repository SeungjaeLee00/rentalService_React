import { useState } from "react";
import useGet from "../../hooks/useGet";
import AdminBtm from "./AdminBtm";
import AdminTop from "./AdminTop";

export default function Admin() {
	const trade = useGet("/api/trades");
	const report = useGet("/api/reports");
	const review = useGet("/api/reviews/all");
	const [data, setData] = useState([]);
	const [type, setType] = useState("");

	// console.log(trade);
	// console.log(report);
	// console.log(review);
	if (trade.error == true || report.error == true || review.error == true) return <div>에러발생</div>;
	if (trade.loading == true || report.loading == true || review.loading == true) return <div>로딩중</div>;
	if (!trade.data || !report.data || !review.data) return null;

	return (
		<div>
			<AdminTop trade={trade} report={report} review={review} setData={setData} setType={setType} />
			<AdminBtm data={data} type={type} />
		</div>
	);
}
