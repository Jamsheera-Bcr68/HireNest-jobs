import { IEducationRepository } from '../../../domain/repository-interfaces/education-repository.interface';
import { EducationDto } from '../../dtos/education.dto';
import { IGetAllEducationUseCase } from '../../interfaces/candidate/get-educations.usecase';

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
