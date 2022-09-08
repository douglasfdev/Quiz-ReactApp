import { createContext, useReducer } from 'react';
import questions from '../assets/data/questions';

const STAGES = ['Start', 'Playing', 'End'];

const initialState = {
  gameStage: STAGES[0],
  questions,
  currentQuestion: 0,
  score: 0,
  answerSelected: false,
};

const quizzReducer = (state, action) => {

  switch(action.type){
    case "CHANGE_STAGE":
      return {
        ...state,
        gameStage: STAGES[1],
      };

    case "REORDER_QUESTIONS":
      const reorderedQuestios = questions.sort(() => Math.random() - .5);
      return {
        ...state,
        questions: reorderedQuestios,
      };

    case "CHANGE_QUESTION":
      const nextQuestion = state.currentQuestion + 1;
      let endGame = false;

      if(!questions[nextQuestion]) endGame = true;

      return {
        ...state,
        currentQuestion: nextQuestion,
        gameStage: endGame ? STAGES[2] : state.gameStage,
        answerSelected: false,
      };

    case "NEW_GAME":
      return initialState;

    case "CHECK_ANSWER":
      if(state.answerSelected) return state;

      const answer = action.playload.answer;
      const option = action.playload.option;
      let currentAnswer = 0;

      if(answer === option) currentAnswer = 1;

      return {
        ...state,
        score: state.score + currentAnswer,
        answerSelected: option,
      };

    default:
      return state;
  }

}

export const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
  const value = useReducer(quizzReducer, initialState);
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
