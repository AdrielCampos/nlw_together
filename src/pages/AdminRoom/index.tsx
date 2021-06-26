import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { Question } from "../../components/Question";
import { useRoom } from "../../hooks/useRoom";
import { database } from "../../services/firebase";

import deleteImg from "../../assets/images/delete.svg";
import checkImg from "../../assets/images/check.svg";
import answerImg from "../../assets/images/answer.svg";

import styles from "./styles.module.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();

  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que voce deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <>
      <Header roomId={roomId} isAdmin />
      <div id={styles["page-room"]}>
        <main>
          <div className={styles["room-title"]}>
            <h1>{title === "" ? "..." : title}</h1>
            {questions.length > 0 && (
              <span>
                {questions.length} pergunta{questions.length > 1 && "s"}
              </span>
            )}
          </div>

          <div className={styles["question-list"]}>
            {questions.map((question) => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleCheckQuestionAsAnswered(question.id)
                        }
                      >
                        <img
                          src={checkImg}
                          alt="Marcar pergunta como respondida"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Dar destaque à pergunta" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
