class DataVarios extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.data = [];
    this.shadow.innerHTML = /*html*/`
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 0;
          box-sizing: border-box;
          overflow: hidden;
        }
        .contenedor {
          display: block;
          width: 100%;
          height: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 0;
          box-sizing: border-box;
          overflow-x: hidden;
          overflow-y: auto;
          padding-right: 0.35rem;
        }
        .contenedor::-webkit-scrollbar {
          width: 0.45rem;
        }
        .contenedor::-webkit-scrollbar-track {
          background: var(--color-elemento);
          border-radius: 0.5rem;
        }
        .contenedor::-webkit-scrollbar-thumb {
          background: var(--color-borde);
          border-radius: 0.5rem;
        }
        .contenedor::-webkit-scrollbar-thumb:hover {
          background: var(--color-borde-hover);
        }
        .tarjeta {
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
          padding: 1rem;
          margin-bottom: 1rem;
          border: 0.0625rem solid var(--color-borde-elemento);
          border-radius: 0.5rem;
          background: var(--color-elemento);
          color: var(--color-texto);
        }
        .titulo {
          margin: 0 0 0.5rem;
          color: var(--color-texto);
          font-family: Arial, sans-serif;
          font-size: 1rem;
          font-weight: 600;
        }
        .texto {
          margin: 0;
          color: var(--color-texto-secundario);
          font-family: Arial, sans-serif;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        @media (max-width: 48rem) {
          .tarjeta {
            margin-bottom: 0.75rem;
            padding: 0.9rem;
          }
        }
        @media (max-width: 30rem) {
          .tarjeta {
            padding: 0.75rem;
          }
          .titulo {
            font-size: 0.95rem;
          }
          .texto {
            font-size: 0.85rem;
          }
        }
      </style>
      <section class="contenedor"></section>
    `;
    this.contenedor = this.shadowRoot.querySelector(".contenedor");
  }
  async connectedCallback() {
    await this.loadData();
    this.render();
  }
  async loadData() {
    const respuesta = await fetch(this.getAttribute("src"));
    this.data = await respuesta.json();
  }
  render() {
    this.contenedor.innerHTML = "";
    this.data.forEach((item) => {
      const tarjeta = document.createElement("article");
      tarjeta.className = "tarjeta";
      const valores = Object.values(item);
      const titulo = document.createElement("h3");
      titulo.className = "titulo";
      titulo.textContent = valores[0] ?? "";
      tarjeta.appendChild(titulo);
      valores.slice(1).forEach((valor) => {
        const texto = document.createElement("p");
        texto.className = "texto";
        texto.textContent = valor ?? "";
        tarjeta.appendChild(texto);
      });
      this.contenedor.appendChild(tarjeta);
    });
  }
}
customElements.define("data-varios", DataVarios);