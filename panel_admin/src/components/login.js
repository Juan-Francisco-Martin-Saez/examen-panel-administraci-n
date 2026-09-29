class LoginComponent extends HTMLElement {
  static get observedAttributes() {
    return ["titulo"];
  }
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = /* html */ `
      <style>
        :host {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-width: 0;
          min-height: 100%;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }
        .login {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
          max-width: 25rem;
          min-width: 0;
          box-sizing: border-box;
          padding: 2rem;
          border: 0.0625rem solid var(--color-borde-elemento);
          border-radius: 1rem;
          background: var(--color-panel);
          color: var(--color-texto);
        }
        .cabecera {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          text-align: center;
        }
        .titulo {
          margin: 0;
          color: var(--color-texto);
          font-size: 1.6rem;
          font-weight: 600;
          overflow-wrap: anywhere;
        }
        .descripcion {
          margin: 0;
          color: var(--color-texto-secundario);
          font-size: 0.9rem;
          line-height: 1.5;
        }
        .formulario {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          width: 100%;
          min-width: 0;
        }
        .campo {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 0;
        }
        .etiqueta {
          color: var(--color-texto-secundario);
          font-size: 0.9rem;
        }
        .entrada {
          width: 100%;
          min-width: 0;
          min-height: 2.8rem;
          box-sizing: border-box;
          padding: 0.7rem 0.85rem;
          border: 0.0625rem solid var(--color-borde-boton);
          border-radius: 0.5rem;
          background: var(--color-elemento);
          color: var(--color-texto);
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          transition:
            border-color 0.2s ease,
            background 0.2s ease;
        }
        .entrada:focus {
          border-color: var(--color-borde-activo);
          background: var(--color-elemento-hover);
        }
        .entrada::placeholder {
          color: var(--color-texto-secundario);
          opacity: 0.7;
        }
        .boton-enviar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 2.8rem;
          padding: 0.75rem 1rem;
          border: 0.0625rem solid var(--color-borde-boton);
          border-radius: 0.5rem;
          background: var(--color-elemento);
          color: var(--color-texto);
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition:
            background 0.2s ease,
            border-color 0.2s ease;
        }
        .boton-enviar:hover {
          background: var(--color-elemento-hover);
          border-color: var(--color-borde-boton-hover);
        }
        .boton-enviar:focus-visible {
          outline: 0.125rem solid var(--color-borde-activo);
          outline-offset: 0.125rem;
        }
        @media (max-width: 30rem) {
          .login {
            padding: 1.25rem;
            gap: 1.25rem;
          }
          .titulo {
            font-size: 1.4rem;
          }
        }
      </style>
      <section class="login">
        <header class="cabecera">
          <h1 class="titulo"></h1>
          <p class="descripcion">
            Introduce tus datos para acceder.
          </p>
        </header>
        <form class="formulario">
          <div class="campo">
            <label class="etiqueta" for="usuario">
              Usuario
            </label>
            <input class="entrada" id="usuario" name="usuario" type="text" placeholder="Introduce tu usuario" autocomplete="username" required>
          </div>
          <div class="campo">
            <label class="etiqueta" for="contrasena">
              Contraseña
            </label>
            <input
              class="entrada" id="contrasena" name="contrasena" type="password" placeholder="Introduce tu contraseña" autocomplete="current-password" required>
          </div>
          <button class="boton-enviar" type="submit">
            Iniciar sesión
          </button>
        </form>
      </section>
    `;
    this.titulo = this.shadow.querySelector(".titulo");
    this.formulario = this.shadow.querySelector(".formulario");
    this.formulario.addEventListener("submit", (event) => {
      event.preventDefault();
      const datos = new FormData(this.formulario);
      this.dispatchEvent(
        new CustomEvent("login-submit", {
          detail: {
            usuario: datos.get("usuario"),
            contrasena: datos.get("contrasena")
          },
          bubbles: true,
          composed: true
        })
      );
    });
  }
  connectedCallback() {
    this.actualizarTitulo();
  }
  attributeChangedCallback() {
    this.actualizarTitulo();
  }
  actualizarTitulo() {
    if (!this.titulo) return;

    this.titulo.textContent =
      this.getAttribute("titulo") || "Iniciar sesión";
  }
}
customElements.define("login-component", LoginComponent);

//nota