function search() {
  const value = document.getElementById("searchRobux").value;
  const keys = getKeys();

  const filtered = value
    ? keys.filter(k => k.robux == value)
    : keys;

  render(filtered);
}
