class AppMain extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" })
    this.shadow.innerHTML = /*html*/`
      <style>
        :host {
          display: block;
          width: 100%;
          height: calc(100dvh - 4rem);
          max-width: 100%;
          min-width: 0;
          min-height: 0;
          box-sizing: border-box;
          background: var(--color-fondo);
          overflow: hidden;
        }
        main {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
          grid-template-rows: minmax(0, 1fr);
          gap: 1.25rem;
          width: 100%;
          height: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 0;
          box-sizing: border-box;
          padding: 1.5rem;
          background: var(--color-fondo);
          overflow: hidden;
        }
        @media (max-width: 64rem) {
          main {
            gap: 1rem;
            padding: 1.25rem;
          }
        }
        @media (max-width: 48rem) {
          main {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 1rem;
          }
        }
        @media (max-width: 30rem) {
          main {
            gap: 0.75rem;
            padding: 0.75rem;
          }
        }
      </style>
      <main>
        <slot></slot>
      </main>
    `;
  }
}
customElements.define("app-main", AppMain);