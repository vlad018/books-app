import { useState, useEffect } from "react";
import Create from "./components/Create";
import "./App.css";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Search from "./components/Search";
import Register from "./components/Register";
import BookList from "./components/BookList";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [user, setUser] = useState(null);
const [token, setToken] = useState("");
const [page, setPage] = useState("feed");


  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!token) return;

    async function loadBooks() {
      const res = await fetch(
        `http://localhost:3001/books?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    const data = await res.json();

console.log(data);

if (Array.isArray(data)) {
  setBooks(data);
} else {
  console.log(data);
  setBooks([]);
}

    
    }

    loadBooks();
  }, [search, token]);
async function getMe(jwt) {
  const res = await fetch(
    "http://localhost:3001/auth/me",
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );


  const data = await res.json();

  setUser(data);
}


async function register(email, password) {

  const res = await fetch(
    "http://localhost:3001/auth/register",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );


  const data = await res.json();


  console.log(data);


  alert(data.message);
}

  async function login() {
    const res = await fetch(
      "http://localhost:3001/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();
    

   if (data.access_token) {
  setToken(data.access_token);

  await getMe(data.access_token);

    } else {
      alert("Неверный логин или пароль");
    }
  }

    

    

    
  async function create(title, status) {
  const res = await fetch(
    "http://localhost:3001/books",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        title,
        status,
        userId: user.id,
      }),
    }
  );

  const data = await res.json();
console.log(data.message);

  setBooks([...books, data]);

  setPage("feed");
}

  return (
    <div style={{ padding: 30 }}>
      <h1>📚 InstaBook</h1>

      {!token ? (
<>
  <Login
    email={email}
    setEmail={setEmail}
    password={password}
    setPassword={setPassword}
    login={login}
  />

  <Register
    register={register}
  />
</>
) : (
        <>
<>
  <div className="menu">
    <button onClick={() => setPage("feed")}>
      🏠 Лента
    </button>

    <button onClick={() => setPage("profile")}>
      👤 Профиль
    </button>
      <button onClick={() => setPage("create")}>
      создать
    </button>
  </div>

  {page === "feed" && (
    <>
      <Search
        search={search}
        setSearch={setSearch}
      />

      <BookList books={books} />
    </>
  )}

{page === "profile" && (
  <Profile 
    user={user}
    token={token}
  />
)}

  {page === "create" && (
<Create create={create} />
)}
</>
        </>
      )}
    </div>
  );
}

export default App;