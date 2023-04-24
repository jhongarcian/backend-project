const form = document.getElementById('form');
const credsContainer = form.querySelector("#credentials-container")

function stringifyFormData(fd) {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 4);
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const stringified = stringifyFormData(data);
  const response = await doLogin(stringified)
  renderForm()
};

renderForm()
form.addEventListener('submit', handleSubmit);

function renderForm() {
  const html = `
    <div class="input-field">
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Enter Username"
      />
    </div>
    <div class="input-field">
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter Password"
      />
    </div>
    <input type="submit" value="LogIn" />
  `;
  credsContainer.innerHTML = html
}

async function doLogin(body) {
  const options = {
    body,
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }

  const response = await fetch("/login", options);
  const data = await response.json()
  return data
}