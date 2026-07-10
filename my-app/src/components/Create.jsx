import { useState } from "react";
export default function Create({ create }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("available");

  return (
    <div>
      <h2>➕ Создать книгу</h2>

      <input
        placeholder="Название книги"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="available">
          available
        </option>

        <option value="taken">
          taken
        </option>
      </select>

      <br />
      <br />

      <button
        onClick={() => create(title, status)}
      >
        Создать
      </button>
    </div>
  );
}