import { SearchStudyRoomItem } from "types";
import ResponseDto from "..";

export default interface GetSearchWordStudyListResponseDto extends ResponseDto {
  searchWordList: SearchStudyRoomItem[];
}
