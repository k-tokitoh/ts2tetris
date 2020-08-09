const FILLED_COLOR = "#000000";
const EMPTY_COLOR = "#E0E0E0";

class CellOuter {
  elem: HTMLElement;
  inner: CellInner;

  constructor(parentElem) {
    this.elem = this.initialElem();
    this.inner = new CellInner(this.elem);
    parentElem.appendChild(this.elem);
  }

  initialElem = (): HTMLElement => {
    const elem = document.createElement("li");
    elem.style.listStyle = "none";
    elem.style.width = "78%";
    elem.style.height = "78%";
    elem.style.border = "2px solid";
    elem.style.display = "flex";
    elem.style.justifyContent = "center";
    elem.style.alignItems = "center";
    return elem;
  };

  fill = () => {
    this.elem.style.borderColor = FILLED_COLOR;
    this.inner.fill();
  };

  clear = () => {
    this.elem.style.borderColor = EMPTY_COLOR;
    this.inner.clear();
  };
}

class CellInner {
  elem: HTMLElement;

  constructor(parentElem) {
    this.elem = document.createElement("div");
    parentElem.appendChild(this.elem);

    this.elem.style.width = "75%";
    this.elem.style.height = "75%";
    this.elem.style.backgroundColor = EMPTY_COLOR;
  }

  fill = () => {
    this.elem.style.backgroundColor = FILLED_COLOR;
  };

  clear = () => {
    this.elem.style.backgroundColor = EMPTY_COLOR;
  };
}

export default CellOuter;
