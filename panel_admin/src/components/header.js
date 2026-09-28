class AppHeader extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" })
    this.shadow.innerHTML =
    /*html*/`

      <style>

        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 5.25rem;
          min-height: 5.25rem;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          padding-inline: 2rem;
          background: var(--color-cabecera);
          border-bottom: 0.0625rem solid var(--color-borde);
          box-shadow: 0 0.25rem 1rem var(--color-sombra);
          overflow: hidden;
        }

        @media (max-width: 64rem) {

          header {
            height: 5rem;
            min-height: 5rem;
            padding-inline: 1.5rem;
          }

        }

        @media (max-width: 48rem) {

          header {
            height: 4.75rem;
            min-height: 4.75rem;
            padding-inline: 1rem;
          }

        }

        @media (max-width: 30rem) {

          header {
            height: 4.5rem;
            min-height: 4.5rem;
            padding-inline: 0.75rem;
          }

        }

      </style>
      <header>
        <slot></slot>
      </header>

    `;

  }

}


customElements.define("app-header", AppHeader);