import { INTERVIEW_INSTRUCTIONS } from '../../shared/constants/messages/ai-interview-instructions';
import {
  AIAnswerInputDto,
  FinalEvaluationInputDto,
} from '../dtos/ai-session.-data.dto';

export const getAiInterviewQuestionsPrompt = (
  data: AIAnswerInputDto
): string => {
  const turnRule = data.isLastQuestion
    ? `This is the FINAL question of the interview. Evaluate the answer and write closing feedback. Do NOT generate a next question. Leave nextQuestion and topic empty.`
    : `After evaluating the answer, generate the next question. Pick a topic from the list that has not been covered yet, and do not repeat any previous question.`;

  const prompt = `
    You are an experienced ${data.roundName} interviewer.

    Job role: ${data.jobTitle}

    Topics to cover: ${data.topics.join(', ')}

    Current question: ${data.currentQuestion}

    Total questions: ${data.questionCount}
    Previous Questions:${data.previousQuestions}

    Evaluate the candidate's answer.

    Instructions:${INTERVIEW_INSTRUCTIONS},
    Interview Progress:${turnRule}
  `;
  return prompt;
};

export const getFinalEvaluationPrompt = (
  input: FinalEvaluationInputDto
): string => {
  return `
You are an experienced technical interviewer responsible for evaluating a candidate's overall interview performance.

Your task is to evaluate the candidate based on the topics, questions, answers, individual scores, and feedback provided below.

INTERVIEW TOPICS:
${input.topics.join(', ')}

QUESTIONS AND ANSWERS:
${JSON.stringify(input.questionsAndAnswers, null, 2)}

MINIMUM PASSING SCORE:
${input.minimumScore} out of 10

EVALUATION INSTRUCTIONS:

1. Evaluate the candidate's overall performance across all questions and answers.

2. Consider the following factors:
   - Technical correctness and understanding.
   - Relevance of the answers to the questions.
   - Completeness and depth of explanations.
   - Ability to explain concepts clearly.
   - Practical understanding and problem-solving ability.

3. Consider the individual question scores and feedback as supporting evidence. Do not blindly calculate the final score by averaging the individual scores. Use your judgment to assess overall performance.

4. Assign one final score between 0 and 10:
   - 0 means the candidate demonstrated almost no relevant understanding.
   - 10 means the candidate demonstrated excellent knowledge and understanding.

5. Determine the final result:
   - If the final score is greater than or equal to the minimum passing score, result must be "passed".
   - If the final score is below the minimum passing score, result must be "failed".

6. Provide constructive overall feedback in 2–3 sentences.
   - Mention the candidate's strengths.
   - Identify important areas that need improvement.
   - Keep the feedback specific to the answers provided.
   - Maintain a professional and encouraging tone.

7. Do not invent information or assume knowledge that the candidate did not demonstrate.

8. Return ONLY valid JSON in the following format:

{
  "score": 8,
  "result": "passed",
  "feedback": "The candidate demonstrated a good understanding of the core technical concepts. However, some answers lacked depth and practical examples. Improving problem-solving explanations would strengthen their overall performance."
}

IMPORTANT:
- Score must be a number between 0 and 10.
- Result must be exactly "passed" or "failed".
- Feedback must be a string containing 2–3 sentences.
- Do not include Markdown formatting or additional text.
`;
};
