import { SearchStudyRoomItem } from "types";
import ResponseDto from "..";

export default interface GetSearchStudyListResponseDto extends ResponseDto {
  searchList: SearchStudyRoomItem[];
}
