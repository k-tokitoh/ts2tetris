import Game from "./game";

class App {
  constructor() {
    this.#draw();
    this.#prepareGame();
  }

  #draw() {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", 500);
    canvas.setAttribute("height", 750);

    const app = document.getElementById("app");
    app.appendChild(canvas);
  }

  #prepareGame() {
    this.game = null;
    document.addEventListener("keypress", () => {
      if (this.game) return;
      this.game = new Game();
      this.game.start();
    });
  }
}

export default App;
