import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: uuidv4(),
        title: quiz.title,
        course: quiz.course,
        description: quiz.description,
        quiz_type: quiz.quiz_type,
        points: quiz.points,
        assignment_group: quiz.assignment_group,
        shuffle_answers: quiz.shuffle_answers,
        time_limit: quiz.time_limit,
        multiple_attempts: quiz.multiple_attempts,
        number_attempts: quiz.number_attempts,
        show_correct_answers: quiz.show_correct_answers,
        access_code: quiz.access_code,
        one_question_at_a_time: quiz.one_question_at_a_time,
        webcam_required: quiz.webcam_required,
        lock_questions_after_answering: quiz.lock_questions_after_answering,
        due_date: quiz.due_date,
        available_date: quiz.available_date, 
        until_date: quiz.until_date,
        questions: quiz.questions,
        published: quiz.published,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      ) as any;
    },
  },
});

export const { setQuizzes, addQuiz, updateQuiz } =
quizzesSlice.actions;
export default quizzesSlice.reducer;