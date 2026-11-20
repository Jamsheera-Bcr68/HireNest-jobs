import { env } from '../../infrastructure/config/env';
import { generalMessages } from '../../shared/constants/messages/general.messages';
import {
  AIAnswerInputDto,
  AIAnswerEvaluationDto,
  FinalEvaluationInputDto,
  FinalEvaluationOutputDto,
} from '../dtos/ai-session.-data.dto';
import { IAIInterviewService } from '../interfaces/services/ai.service.interface';
import Groq, { toFile } from 'groq-sdk';
import { getAiInterviewQuestionsPrompt, getFinalEvaluationPrompt } from '../utils/ai-promt';

export class GroqAIInterviewService implements IAIInterviewService {
  private _ai: Groq;
  constructor() {
    const apiKey = env.GROQ_API_KEY;

    if (!apiKey) {
      throw new Error(
        generalMessages.errors.CONFIGURATION_ISSUE('gROQ configuration')
      );
    }
    this._ai = new Groq({ apiKey });
  }

  async evaluateAnswerAndGenerateNextQuestion(
    input: AIAnswerInputDto
  ): Promise<AIAnswerEvaluationDto | null> {
    const prompt = getAiInterviewQuestionsPrompt(input);

    try {
      console.log('1. Sending audio to Groq transcription');

      const audioFile = await toFile(input.audio, 'candidate-answer.webm');

      const transcription = await this._ai.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-large-v3-turbo',
        language: 'en',
      });

      const candidateAnswer = transcription.text;

      console.log('2. Transcription completed:', candidateAnswer);

      if (!candidateAnswer.trim()) {
        throw new Error('Could not transcribe candidate audio');
      }

      console.log('3. Sending answer for evaluation');

      const response = await this._ai.chat.completions.create({
        model: 'openai/gpt-oss-120b',
        messages: [
          {
            role: 'system',
            content: prompt,
          },
          {
            role: 'user',
            content: `Candidate answer: ${candidateAnswer}`,
          },
        ],
        temperature: 0.3,
      });

      const aiResponse = response.choices[0]?.message?.content;

      console.log('4. AI evaluation completed:', aiResponse);

      if (!aiResponse) {
        return null;
      }

      const parsedResponse = JSON.parse(aiResponse) as AIAnswerEvaluationDto;

      return {
        transcript: parsedResponse.transcript,
        score: parsedResponse.score,
        feedback: parsedResponse.feedback,
        nextQuestion: parsedResponse.nextQuestion,
        topic: parsedResponse.topic,
      };
    } catch (error) {
      console.error('Groq API error:', error);
      throw error;
    }
  }

  async getFinalEvaluation(
    data: FinalEvaluationInputDto
  ): Promise<FinalEvaluationOutputDto|null> {
    const prompt = getFinalEvaluationPrompt(data);
    try {
      const response = await this._ai.chat.completions.create({
        model: 'openai/gpt-oss-120b',
        messages: [
          {
            role: 'system',
            content: prompt,
          },
          {
            role: 'user',
            content: `Deatils ${data}`,
          },
        ],
        temperature: 0.3,
      });

      const aiResponse = response.choices[0]?.message?.content;
      if (!aiResponse) {
        return null;
      }

      const parsedResponse = JSON.parse(aiResponse) as FinalEvaluationOutputDto;

      return {
        result: parsedResponse.result,
        score: parsedResponse.score,
        feedback: parsedResponse.feedback,
      };
    } catch (error) {
      console.error('Groq API error:', error);
      throw error;
    }
  }
}
