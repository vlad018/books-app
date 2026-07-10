import { useEffect, useState } from "react";

export default function Profile({ token, user }) {
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    async function getMyBooks() {
      const res = await fetch(
        "http://localhost:3001/books/my-books",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setMyBooks(data);
    }

    getMyBooks();
  }, [token]);


  return (
    <div>

      <h2>👤 Профиль</h2>

      <p>ID: {user.id}</p>

      <p>Email: {user.email}</p>

      <p>Роль: {user.role}</p>


      <h2>📚 Мои книги</h2>


      {myBooks.map((book) => (
        <div
          key={book.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "10px",
          }}
        >

          <h3>{book.title}</h3>

          <p>
            Статус: {book.status}
          </p>

          <p>
            Создана: {book.createdAt}
          </p>

        </div>
      ))}


    </div>
  );
}