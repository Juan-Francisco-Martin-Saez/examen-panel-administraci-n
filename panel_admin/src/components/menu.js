
class AppMenu extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" })
    this.data = []
    this.shadow.innerHTML =
    /*html*/`
      <style>
        :host {
          display: block;
          width: max-content;
          max-width: 100%;
        }
        .boton-menu {
          position: relative;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.3rem;
          width: 2.8rem;
          height: 2.8rem;
          padding: 0;
          border: 0;
          border-radius: 0.6rem;
          background: transparent;
          cursor: pointer;
          transition:
            background 0.2s ease;
        }
        .boton-menu:hover {
          background: var(--color-elemento-hover);
        }
        .linea {
          display: block;
          width: 1.4rem;
          height: 0.12rem;
          border-radius: 1rem;
          background: var(--color-texto);
          transition:
            transform 0.25s ease,
            opacity 0.25s ease;
        }
        .boton-menu.abierto .linea:nth-child(1) {
          transform: translateY(0.42rem) rotate(45deg);
        }
        .boton-menu.abierto .linea:nth-child(2) {
          opacity: 0;
        }
        .boton-menu.abierto .linea:nth-child(3) {
          transform: translateY(-0.42rem) rotate(-45deg);
        }
        .velo {
          position: fixed;
          inset: 0;
          z-index: 998;
          width: 100%;
          height: 100%;
          background: hsla(0, 0%, 0%, 0.45);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.25s ease, visibility 0.25s ease;
        }
        .velo.visible {
          opacity: 1;
          visibility: visible;
        }
        .menu {
          position: fixed;
          top: 0;
          right: 0;
          z-index: 999;
          width: 20rem;
          max-width: 100vw;
          height: 100dvh;
          box-sizing: border-box;
          padding: 6rem 1.5rem 2rem;
          background: var(--color-cabecera);
          border-left: 0.0625rem solid var(--color-borde);
          box-shadow: -0.5rem 0 2rem var(--color-sombra);
          transform: translateX(100%);
          visibility: hidden;
          transition: transform 0.3s ease, visibility 0.3s ease;
          overflow-x: hidden;
          overflow-y: auto;
        }
        .menu.abierto {
          transform: translateX(0);
          visibility: visible;
        }
        .lista {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          width: 100%;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .enlace {
          display: flex;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
          padding: 0.9rem 1rem;
          border-radius: 0.6rem;
          color: var(--color-texto);
          text-decoration: none;
          font-family: Arial, sans-serif;
          font-size: 1rem;
          transition:
            background 0.2s ease,
            color 0.2s ease;
        }
        .enlace:hover {
          background: var(--color-elemento-hover);
          color: var(--color-texto);
        }
        @media (max-width: 48rem) {
          .menu {
            top: 6rem;
            left: 1rem;
            right: 1rem;
            width: auto;
            max-width: none;
            height: auto;
            max-height: calc(100dvh - 7rem);
            padding: 1.25rem;
            border: 0.0625rem solid var(--color-borde);
            border-radius: 0.9rem;
            box-shadow: 0 1rem 3rem var(--color-sombra);
            transform: translateY(-1rem);
            opacity: 0;
          }
          .menu.abierto {
            transform: translateY(0);
            opacity: 1;
          }
          .lista {
            gap: 0.35rem;
          }
          .enlace {
            padding: 1rem;
          }
        }
        @media (max-width: 30rem) {
          .menu {
            top: 5.25rem;
            left: 0.75rem;
            right: 0.75rem;
            width: auto;
            max-height: calc(100dvh - 6rem);
            padding: 1rem;
            border-radius: 0.8rem;
          }
          .enlace {
            padding: 0.85rem 0.9rem;
            font-size: 0.95rem;
          }
        }
        @media (max-width: 22rem) {
          .boton-menu {
            width: 2.5rem;
            height: 2.5rem;
          }
          .linea {
            width: 1.25rem;
          }
          .menu {
            left: 0.5rem;
            right: 0.5rem;
            padding: 0.75rem;
          }
        }
      </style>
      <button class="boton-menu" type="button" aria-label="Abrir menú" aria-expanded="false">
        <span class="linea"></span>
        <span class="linea"></span>
        <span class="linea"></span>
      </button>
      <div class="velo"></div>
      <nav class="menu" aria-hidden="true">
        <ul class="lista"></ul>
      </nav>
    `;
    this.boton = this.shadow.querySelector(".boton-menu");
    this.menu = this.shadow.querySelector(".menu");
    this.velo = this.shadow.querySelector(".velo");
    this.lista = this.shadow.querySelector(".lista");
    this.boton.addEventListener("click", () => {
      this.alternarMenu();
    });
    this.velo.addEventListener("click", () => {
      this.cerrarMenu();
    });
    this.lista.addEventListener("click", (evento) => {
      if (evento.target.closest(".enlace")) {
        this.cerrarMenu();
      }
    });
    document.addEventListener("keydown", (evento) => {
      if (
        evento.key === "Escape" &&
        this.menu.classList.contains("abierto")
      ) {
        this.cerrarMenu();
      }
    });
  }
  async connectedCallback() {
    await this.loadData();
    this.renderLinks();
  }
  async loadData() {
    const respuesta = await fetch(this.getAttribute("src"));
    this.data = await respuesta.json();
  }
  renderLinks() {
    this.lista.innerHTML = "";
    this.data.forEach(dato => {
      const li = document.createElement("li");
      const enlace = document.createElement("a");
      enlace.classList.add("enlace");
      enlace.href = dato.href;
      enlace.textContent = dato.nombre;
      li.append(enlace);
      this.lista.append(li);
    });
  }
  alternarMenu() {
    const abierto =
      this.menu.classList.contains("abierto");
    if (abierto) {
      this.cerrarMenu();
    } else {
      this.abrirMenu();
    }
  }
  abrirMenu() {
    this.boton.classList.add("abierto");
    this.menu.classList.add("abierto");
    this.velo.classList.add("visible");
    this.boton.setAttribute("aria-expanded", "true");
    this.boton.setAttribute("aria-label", "Cerrar menú");
    this.menu.setAttribute("aria-hidden", "false");
  }
  cerrarMenu() {
    this.boton.classList.remove("abierto");
    this.menu.classList.remove("abierto");
    this.velo.classList.remove("visible");
    this.boton.setAttribute("aria-expanded", "false");
    this.boton.setAttribute("aria-label", "Abrir menú");
    this.menu.setAttribute("aria-hidden", "true");
  }
}
customElements.define("app-menu", AppMenu);