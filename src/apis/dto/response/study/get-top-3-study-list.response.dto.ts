import { RecommendationStudyRoomItem } from "types";
import ResponseDto from "..";

export default interface GetTop5StudyListResponseDto extends ResponseDto {
  top5List: RecommendationStudyRoomItem[];
}
