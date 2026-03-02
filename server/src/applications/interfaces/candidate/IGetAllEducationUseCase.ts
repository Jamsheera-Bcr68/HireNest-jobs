import { EducationDto } from '../../Dtos/educationDto';
export interface IGetAllEducationUseCase {
  execute(userId: string): Promise<EducationDto[] | []>;
}
