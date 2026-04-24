import axios from "axios";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axios
      .get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};

export const createQuizForCourse = async (courseId: string, quiz: any) => {
    const response = await axios.post(
      `${COURSES_API}/${courseId}/quizzes`,
      quiz
    );
    return response.data;
}; 

const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;
export const deleteQuiz = async (quizId: string) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const updateQuiz = async (quiz: any) => {
    const { data } = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
}; 

export const findQuizById = async (quizId: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}`);
  return data;
}

const QUIZ_ATTEMPTS_API = `${HTTP_SERVER}/api/quizAttempts`;

export const saveNewQuizAttempt = async (attempt: any) => {
  const response = await axios.post(QUIZ_ATTEMPTS_API, attempt);
  return response.data;
};

export const fetchLastAttempt = async (studentId: string, quizId: string) => {
  const { data } = await axios.get(`${QUIZ_ATTEMPTS_API}/${quizId}/${studentId}`);
  return data;
};

export const fetchNumberOfTakenAttempts = async (studentId: string, quizId: string) => {
  const { data } = await axios.get(`${QUIZ_ATTEMPTS_API}/${quizId}/${studentId}/count`);
  return data;
};
