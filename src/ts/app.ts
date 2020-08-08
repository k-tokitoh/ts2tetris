import Game from "./game";

class App {
  game: Game | null;
  elem: HTMLElement;

  constructor() {
    this.elem = document.getElementById("app");
    this.prepareGame();
  }

  prepareGame() {
    this.game = null;
    document.addEventListener("keypress", () => {
      if (this.game) return;
      this.game = new Game(this.elem);
    });
  }
}

export default App;
