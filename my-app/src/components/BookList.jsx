export default function BookList({ books }) {
  return (
    <>
      {books.map((book) => (
        <div
          key={book.id}
          style={{
            border: "1px solid gray",
            borderRadius: "10px",
            padding: "15px",
            marginTop: "15px",
          }}
        >
          <h3>{book.title}</h3>

          <p>Статус: {book.status}</p>

          <p>Пользователь: {book.userId}</p>
        </div>
      ))}
    </>
  );
}