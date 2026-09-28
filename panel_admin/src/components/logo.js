class AppLogo extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" })
    this.shadow.innerHTML =
    /*html*/`

      <style>

        @import url(
          "https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap"
        );

        :host {
          display: flex;
          width: max-content;
          height: 100%;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: baseline;
          white-space: nowrap;
          font-family: "Roboto", sans-serif;
          font-weight: 900;
          color:var(--color-texto);
          line-height: 1;
        }

        .logo-principal {
          font-size: clamp(1.25rem,2vw,1.7rem);
          letter-spacing: -0.04em;
        }

        .logo-separador {
          margin: 0 0.35rem;
          font-size: 1.1rem;
          color:var(--color-texto-secundario);
        }

        .logo-secundario {
          font-size: clamp(0.9rem,1.4vw,1.15rem);
          color:var(--color-texto-secundario);
          letter-spacing: -0.02em;
        }

      </style>

      <div class="logo">
        <span class="logo-principal">
          ReijohanGPT
        </span>
        <span class="logo-separador">
          -
        </span>
        <span class="logo-secundario">
          Dashboard
        </span>
      </div>

    `;

  }

}


customElements.define("app-logo", AppLogo);