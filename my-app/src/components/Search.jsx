export default function Search({
  search,
  setSearch,
}) {
  return (
    <input
      type="text"
      placeholder="Поиск книги..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}