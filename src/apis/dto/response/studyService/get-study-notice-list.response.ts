import { StudyNoticeListItem } from "types";
import ResponseDto from "..";

// GetStudyNoticeListResponseDto
export default interface GetStudyNoticeListResponseDto extends ResponseDto{

    noticeList : StudyNoticeListItem[];
}