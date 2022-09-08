import { useContext } from "react";
import { QuizContext } from "../context/quiz";

import Quizz from '../assets/img/quiz.svg';
import './Welcome.css';

const Welcome = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div id="welcome">
      <h2>Seja bem-vindo</h2>
      <p>Clique no botão abaixo para começar:</p>
      <button onClick={() => dispatch({ type: "CHANGE_STAGE" })}>
        Iniciar
      </button>
      <img src={Quizz} alt="Início do Quiz" />
    </div>
  );
};

export default Welcome;