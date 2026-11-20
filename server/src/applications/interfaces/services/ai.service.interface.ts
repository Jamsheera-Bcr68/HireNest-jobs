import {
  AIAnswerEvaluationDto,
  AIAnswerInputDto,
  FinalEvaluationInputDto,
  FinalEvaluationOutputDto,
} from '../../dtos/ai-session.-data.dto';

export interface IAIInterviewService {
  evaluateAnswerAndGenerateNextQuestion(
    input: AIAnswerInputDto
  ): Promise<AIAnswerEvaluationDto | null>;

  getFinalEvaluation(
    data: FinalEvaluationInputDto
  ): Promise<FinalEvaluationOutputDto | null>;
}
