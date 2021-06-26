import { RoomCode } from "../../components/RoomCode";
import logoImg from "../../assets/images/logo.svg";

import styles from "./styles.module.scss";
import { Button } from "../Button";
import { database } from "../../services/firebase";
import { useHistory } from "react-router-dom";

type HeaderProps = {
  roomId: string;
  isAdmin?: boolean;
};

export function Header(props: HeaderProps) {
  const history = useHistory();

  async function handleEndRoom() {
    database.ref(`rooms/${props.roomId}`).off();
    await database.ref(`rooms/${props.roomId}`).remove();

    history.push("/");
  }

  return (
    <header id={styles.header}>
      <div>
        <img src={logoImg} alt="Letmeask" />
        {props.isAdmin ? (
          <div className={styles["admin-section"]}>
            <RoomCode code={props.roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        ) : (
          <RoomCode code={props.roomId} />
        )}
      </div>
    </header>
  );
}
