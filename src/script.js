const cepForm = document.getElementById("cep-form");
const cepError = document.querySelector(".error");
const infoDiv = document.querySelector(".cep-info");

cepForm.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const input = cepForm[0]; // acessando o input do formulario
  const inputValue = input.value;
  const response = await fetch(`https://viacep.com.br/ws/${inputValue}/json`)
    .then((res) => res.json())
    .catch((error) => {
      return error;
    });

  response.cep === undefined
    ? (cepError.classList.remove("hidden"),
      (infoDiv.className = "cep-info hidden"))
    : (showInfo(response), (cepError.className = "error hidden"));
}

function showInfo(info) {
  infoDiv.classList.remove("hidden");
  const cep = info.cep;
  const rua = info.logradouro;
  const complemento = info.complemento;
  const bairro = info.bairro;
  const estado = info.localidade;
  const provincia = info.uf;

  const cepBlock = document.getElementById("cep");
  cepBlock.innerText = cep;
  const ruaBlock = document.getElementById("rua");
  ruaBlock.innerText = rua;
  const complementoBlock = document.getElementById("complemento");
  complementoBlock.innerText = complemento;
  const bairroBlock = document.getElementById("bairro");
  bairroBlock.innerText = bairro;
  const estadoBlock = document.getElementById("estado");
  estadoBlock.innerText = estado;
  const provinciaBlock = document.getElementById("provincia");
  provinciaBlock.innerText = provincia;
}
