class Seccion {
  constructor(elementoClase) {
    this.elemento = document.querySelector(elementoClase);
  }

  mostrar() {
    this.elemento.style.display = "flex";
  }

  ocultar() {
    this.elemento.style.display = "none";
  }
}

class InicioSesion extends Seccion {
  constructor(elementoClase, registro, juego) {
    super(elementoClase);
    this.registro = registro;
    this.juego = juego;
  }

  mostrarRegistro(event) {
    event.preventDefault();
    this.ocultar();
    this.registro.mostrar();
  }

  cargarJuego() {
    this.ocultar();
    this.juego.mostrar();
  }
}

class Registro extends Seccion {
  constructor(elementoClase, inicioSesion) {
    super(elementoClase);
    this.inicioSesion = inicioSesion;
  }

  mostrarInicio(event) {
    event.preventDefault();
    this.ocultar();
    this.inicioSesion.mostrar();
  }
}

class Juego extends Seccion {
  constructor(elementoClase) {
    super(elementoClase);
    this.opciones = ["Piedra", "Papel", "Tijeras"];
    this.resultadoTexto = document.querySelector(".card-body");
  }

  determinarGanador(usuario, computadora) {
    if (usuario === computadora) return "¡Es un empate!";
    if (
      (usuario === "Piedra" && computadora === "Tijeras") ||
      (usuario === "Papel" && computadora === "Piedra") ||
      (usuario === "Tijeras" && computadora === "Papel")
    ) {
      return "¡Ganaste!";
    }
    return "Perdiste...";
  }

  jugar(eleccionUsuario) {
    const eleccionComputadora =
      this.opciones[Math.floor(Math.random() * this.opciones.length)];
    const resultado = this.determinarGanador(eleccionUsuario, eleccionComputadora);

    this.resultadoTexto.innerHTML = `
      <p>Elegiste: <strong>${eleccionUsuario}</strong></p>
      <p>Computadora eligió: <strong>${eleccionComputadora}</strong></p>
      <p><strong>${resultado}</strong></p>
    `;
  }

  inicializarBotones() {
    document.querySelectorAll(".btn-juego").forEach((boton, index) => {
      boton.addEventListener("click", () =>
        this.jugar(this.opciones[index])
      );
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const seccionInicio = new InicioSesion(
    ".inicio-sesion",
    new Registro(".registro", new Seccion(".inicio-sesion")),
    new Juego(".juego")
  );

  const seccionRegistro = seccionInicio.registro;
  const seccionJuego = seccionInicio.juego;

  window.mostrarRegistro = (event) => seccionInicio.mostrarRegistro(event);
  window.mostrarInicio = (event) => seccionRegistro.mostrarInicio(event);
  window.cargarJuego = () => seccionInicio.cargarJuego();

  seccionJuego.inicializarBotones();
});
