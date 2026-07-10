export default function Login({
  email,
  setEmail,
  password,
  setPassword,
  login,
}) {
  return (
    <>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={login}>
        Войти
      </button>
    </>
  );
}