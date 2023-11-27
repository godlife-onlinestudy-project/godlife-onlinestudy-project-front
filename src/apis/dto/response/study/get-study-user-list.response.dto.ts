import { StudyUserListItem } from 'types';
import ResponseDto from '..';

export default interface GetStudyUserListResponseDto extends ResponseDto {
    studyUserList: StudyUserListItem[];
}