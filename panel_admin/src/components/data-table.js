class DataTable extends HTMLElement {

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "open" })
    this.data = []
    this.elementosPorPagina = 8
    this.totalPaginas = null
    this.paginaActual = 1
  }

  async connectedCallback() {
    await this.loadData()
    await this.render()
  }

  async loadData() {
    const respuesta = await fetch(this.getAttribute("src"));

    this.data = await respuesta.json()

    this.totalPaginas = Math.max(1, Math.ceil(this.data.length / this.elementosPorPagina))

    if (this.paginaActual > this.totalPaginas) {
      this.paginaActual = this.totalPaginas;
    }
  }

  async render() {
    this.shadow.innerHTML = /*html*/`
      <style>
:host {
  display: block;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
}

.tabla {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  padding: 1.25rem;
  overflow: hidden;
}

.paginacion {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  box-sizing: border-box;
  flex-shrink: 0;
}

.boton-filtro {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 0.0625rem solid var(--color-borde);
  border-radius: 0.55rem;
  background: var(--color-elemento);
  color: var(--color-texto);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.boton-filtro:hover {
  background: var(--color-elemento-hover);
  border-color: var(--color-borde-hover);
}

.boton-filtro:active {
  background: var(--color-elemento-activo);
  border-color: var(--color-borde-activo);
}

.icono-filtro {
  width: 1.2rem;
  height: 1.2rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.grupo-paginacion {
  display: flex;
  align-items: center;
  width: max-content;
  max-width: 100%;
}

.controles-paginacion {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: max-content;
  max-width: 100%;
}

.boton-pagina {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 0.0625rem solid var(--color-borde);
  border-radius: 0.55rem;
  background: var(--color-elemento);
  color: var(--color-texto);
  font-family: Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
}

.boton-pagina:hover:not(:disabled) {
  background: var(--color-elemento-hover);
  color: var(--color-texto);
  border-color: var(--color-borde-hover);
}

.boton-pagina:active:not(:disabled) {
  background: var(--color-elemento-activo);
  border-color: var(--color-borde-activo);
}

.boton-pagina:disabled {
  opacity: 0.3;
  cursor: default;
}

.numero-pagina {
  width: 3.5rem;
  height: 2.5rem;
  box-sizing: border-box;
  padding: 0.4rem 0.5rem;
  border: 0.0625rem solid var(--color-borde);
  border-radius: 0.55rem;
  background: var(--color-elemento);
  color: var(--color-texto);
  font-family: Arial, sans-serif;
  font-size: 0.9rem;
  text-align: center;
  outline: none;
  appearance: textfield;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.numero-pagina:hover {
  background: var(--color-elemento-hover);
}

.numero-pagina:focus {
  background: var(--color-elemento-hover);
  border-color: var(--color-borde-hover);
}

.numero-pagina::-webkit-inner-spin-button,
.numero-pagina::-webkit-outer-spin-button {
  margin: 0;
  appearance: none;
}

.total-paginas {
  color: var(--color-texto-secundario);
  font-family: Arial, sans-serif;
  font-size: 0.85rem;
  line-height: 1.2;
  white-space: nowrap;
}

.entradas {
  display: flex;
  flex: 1 1 75dvh;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: 0.35rem;
}

.entradas::-webkit-scrollbar {
  width: 0.45rem;
}

.entradas::-webkit-scrollbar-track {
  background: var(--color-elemento);
  border-radius: 0.5rem;
}

.entradas::-webkit-scrollbar-thumb {
  background: var(--color-borde);
  border-radius: 0.5rem;
}

.entradas::-webkit-scrollbar-thumb:hover {
  background: var(--color-borde-hover);
}

.tarjeta {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 1rem;
  background: var(--color-elemento);
  border: 0.0625rem solid var(--color-borde);
  border-radius: 0.7rem;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.tarjeta:hover {
  background: var(--color-elemento-hover);
  border-color: var(--color-borde-hover);
}

.dato {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 0.35rem;
}

.dato:last-child {
  margin-bottom: 0;
}

.etiqueta {
  flex-shrink: 0;
  color: var(--color-texto-secundario);
  font-size: 0.9rem;
}

.valor {
  min-width: 0;
  color: var(--color-texto);
  font-size: 0.9rem;
  overflow-wrap: anywhere;
}

@media (max-width: 48rem) {
  .tabla {
    padding: 2.5rem 1rem 1rem;
  }
}

@media (max-width: 30rem) {
  .tabla {
    padding: 2.25rem 0.75rem 0.75rem;
  }

  .controles-paginacion {
    gap: 0.3rem;
  }

  .boton-pagina,
  .boton-filtro {
    width: 2.25rem;
    height: 2.25rem;
  }

  .boton-pagina {
    font-size: 1.3rem;
  }

  .icono-filtro {
    width: 1.05rem;
    height: 1.05rem;
  }

  .numero-pagina {
    width: 3.25rem;
    height: 2.25rem;
    font-size: 0.85rem;
  }

  .total-paginas {
    font-size: 0.8rem;
  }

  .tarjeta {
    padding: 0.85rem;
  }
}
      </style>

      <section class="tabla">
        <nav class="paginacion" aria-label="Paginación">
          <button class="boton-filtro" type="button" aria-label="Filtrar" title="Filtrar">
            <svg class="icono-filtro" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 5h16M7 12h10M10 19h4"></path>
            </svg>
          </button>

          <div class="grupo-paginacion">
            <div class="controles-paginacion">
              <button class="boton-pagina anterior" type="button" aria-label="Página anterior">&lt;</button>
              <input class="numero-pagina" type="number" min="1" value="1" aria-label="Número de página">
              <span class="total-paginas" aria-live="polite">de ${this.totalPaginas} páginas</span>
              <button class="boton-pagina siguiente" type="button" aria-label="Página siguiente">&gt;</button>
            </div>
          </div>
        </nav>

        <div class="entradas"></div>
      </section>
    `

    this.showElements()
    this.renderPagination()
  }

  showElements() {
    const entradas = this.shadowRoot.querySelector(".entradas")
    entradas.innerHTML = ""

    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    const datosPagina = this.data.slice(inicio, fin);

    datosPagina.forEach(dato => {
      const tarjeta = document.createElement("article")
      tarjeta.classList.add("tarjeta")

      Object.entries(dato).forEach(([clave, valor]) => {
        const elementoDato = document.createElement("div")
        elementoDato.classList.add("dato")
        tarjeta.append(elementoDato)

        const etiqueta = document.createElement("span")
        etiqueta.classList.add("etiqueta")
        etiqueta.textContent = `${this.formatearEtiqueta(clave)}:`
        elementoDato.append(etiqueta)

        const elementoValor = document.createElement("span")
        elementoValor.classList.add("valor")
        elementoValor.textContent = valor
        elementoDato.append(elementoValor)
      })

      entradas.append(tarjeta)
    })

    this.totalPaginas = Math.max(1, Math.ceil(this.data.length / this.elementosPorPagina))

    if (this.paginaActual > this.totalPaginas) {
      this.paginaActual = this.totalPaginas;
    }
  }

  renderPagination() {
    this.shadow.querySelector('.tabla').addEventListener('click', event => {
      if (event.target.closest('.anterior')) {
        this.cambiarPagina(this.paginaActual - 1);
        return
      }

      if (event.target.closest('.siguiente')) {
        this.cambiarPagina(this.paginaActual + 1);
        return
      }
    })

    this.shadowRoot.querySelector(".numero-pagina").addEventListener("input", () => {
      this.cambiarPagina(this.shadowRoot.querySelector(".numero-pagina").value);
    })
  }

  formatearEtiqueta(clave) {
    return clave.replaceAll("_", " ").replace(/^./, letra => letra.toUpperCase())
  }

  cambiarPagina(numero) {
    numero = Number(numero)

    if (Number.isNaN(numero)) {
      numero = this.paginaActual
    }

    numero = Math.round(numero)

    if (numero < 1) {
      numero = 1
    }

    if (numero > this.totalPaginas) {
      numero = this.totalPaginas
    }

    this.paginaActual = numero

    this.shadowRoot.querySelector(".numero-pagina").value = this.paginaActual
    this.showElements()
  }
}

customElements.define("data-table", DataTable);