import { EducationDto } from '../../dtos/education.dto';
export interface IGetAllEducationUseCase {
  execute(userId: string): Promise<EducationDto[] | []>;
}
