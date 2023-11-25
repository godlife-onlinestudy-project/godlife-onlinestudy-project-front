import { MyToDoItem } from "types";
import ResponseDto from "..";

export default interface GetUserToDoListResponseDto extends ResponseDto {
  userToDoList: MyToDoItem[];
}