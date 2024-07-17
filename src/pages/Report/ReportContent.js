import React, { useState } from "react";

function ReportContent({ content }) {
	const [showFullContent, setShowFullContent] = useState(false);

	const toggleContent = () => {
		setShowFullContent(!showFullContent);
	};

	const renderContent = () => {
		if (!content) {
			return null; // content가 undefined인 경우 아무 내용도 렌더링하지 않음
		}

		if (content.length <= 10 || showFullContent) {
			return (
				<div>
					<p className="report-info-item">{content}</p>
					{content.length > 10 && <button onClick={toggleContent}>{showFullContent ? "줄이기" : "더보기.."}</button>}
				</div>
			);
		} else {
			const shortenedContent = content.substring(0, 10);
			return (
				<>
					<p className="report-info-item">{shortenedContent}...</p>
					<button onClick={toggleContent}>더보기..</button>
				</>
			);
		}
	};

	return <div>{renderContent()}</div>;
}

export default ReportContent;
