import { IEducationRepository } from '../../../domain/repositoriesInterfaces/IEducationRepository';
import { EducationDto } from '../../Dtos/educationDto';
import { IGetAllEducationUseCase } from '../../interfaces/candidate/IGetAllEducationUseCase';

export class GetAllEducationUseCase implements IGetAllEducationUseCase {
  private _educationRepository: IEducationRepository;
  constructor(educationRepsotory: IEducationRepository) {
    this._educationRepository = educationRepsotory;
  }
  async execute(userId: string): Promise<EducationDto[] | []> {
    const educations = await this._educationRepository.getAllEducations(userId);
    return educations;
  }
}
