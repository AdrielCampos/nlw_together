import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";

import styles from "./styles.module.scss";
import { Button } from "../../components/Button";
import { Aside } from "../../components/Aside";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();

  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id={styles["page-auth"]}>
      <Aside />
      <main>
        <div className={styles["main-content"]}>
          <img src={logoImg} alt="Letmeask" />
          <h1>
            Bem vindo(a)
            <br />
            {user?.name}!
          </h1>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
