let inputPrincipal = document.querySelector(".input");
let botonAgregar = document.querySelector(".boton-agregar");
let container = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", function () {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach(function (task) {
    new Item(task);
  });
});

class Item {
  constructor(nuevaTarea) {
    this.crearDiv(nuevaTarea);
  }

  crearDiv(nuevaTarea) {
    let inputItem = document.createElement("input");
    inputItem.disabled = true;
    inputItem.classList.add("item-input");
    inputItem.value = nuevaTarea;

    let div = document.createElement("div");
    div.classList.add("item");

    let botonEditar = document.createElement("button");
    botonEditar.innerHTML = "<i class='fa-solid fa-lock' style='color: #136919;'></i>";
    botonEditar.classList.add("boton-editar");

    let botonRemover = document.createElement("button");
    botonRemover.innerHTML = "<i class='fa-solid fa-trash'></i>";
    botonRemover.classList.add("boton-remover");

    div.appendChild(inputItem);
    div.appendChild(botonEditar);
    div.appendChild(botonRemover);
    container.appendChild(div);

    botonEditar.addEventListener("click", function () {
      if (inputItem.disabled === true) {
        inputItem.disabled = false;
        botonEditar.innerHTML = "<i class='fa-solid fa-lock-open' style='color: #136919;'></i>";
      } else if (inputItem.disabled === false) {
        inputItem.disabled = true;
        botonEditar.innerHTML = "<i class='fa-solid fa-lock' style='color: #136919;'></i>";
      }
    });

    botonRemover.addEventListener("click", function () {
      div.remove();
      eliminarDeLocalStorage(nuevaTarea);
    });
  }
}

function chequearInput() {
  if (inputPrincipal.value !== "") {
    let nuevaTarea = inputPrincipal.value;
    new Item(nuevaTarea);
    guardarEnLocalStorage(nuevaTarea);
    inputPrincipal.value = "";
  }
}

function guardarEnLocalStorage(task) {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
}

function eliminarDeLocalStorage(task) {
  let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks = storedTasks.filter(function (t) {
    return t !== task;
  });
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
}

botonAgregar.addEventListener("click", function () {
  chequearInput();
});
