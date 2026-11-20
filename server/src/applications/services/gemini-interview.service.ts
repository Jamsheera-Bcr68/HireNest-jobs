import { env } from '../../infrastructure/config/env';
import { generalMessages } from '../../shared/constants/messages/general.messages';
import {
  AIAnswerInputDto,
  AIAnswerEvaluationDto,
} from '../dtos/ai-session.-data.dto';
import { IAIInterviewService } from '../interfaces/services/ai.service.interface';
import { GoogleGenAI } from '@google/genai';
import { getAiInterviewQuestionsPrompt } from '../utils/ai-promt';

export class GeminiAIInterviewService {
  private _ai: GoogleGenAI;
  constructor() {
    const apiKey = env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error(
        generalMessages.errors.CONFIGURATION_ISSUE('Gemini configuration')
      );
    }
    this._ai = new GoogleGenAI({ apiKey });
  }

  async evaluateAnswerAndGenerateNextQuestion(
    input: AIAnswerInputDto
  ): Promise<AIAnswerEvaluationDto | null> {
    const prompt = getAiInterviewQuestionsPrompt(input);

    console.log('from ai service class');

    const candidateAnswer =
      'Hi good evening my name is Jamsheera, I am a software developer currently focusing on MERN stack. I am from Malappuram, Kerala.';

    try {
      console.log('2. Sending request to Gemini');

      const geminiResponse = await this._ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              { text: `Candidate answer: ${candidateAnswer}` },
            ],
          },
        ],
      });

      console.log('3. Gemini response received');
      console.log('Response:', geminiResponse.text);
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
    return null;
  }
}
