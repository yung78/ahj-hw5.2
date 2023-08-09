export default class Tooltip {
  constructor() {
    this.tooltips = [];
  }

  showTooltip(message, element) {
    const { bottom, left } = element.getBoundingClientRect();

    const div = document.createElement('div');
    div.classList.add('form_error');
    div.textContent = message;
    div.style.top = `${bottom + 5}px`;
    div.style.left = `${left + (element.offsetWidth / 2) - 90}px`;

    document.querySelector('.content').appendChild(div);

    const id = performance.now();

    this.tooltips.push({
      id,
      element: div,
    });

    return id;
  }

  _removeTooltip(id) {
    let tooltip = this.tooltips.find((t) => t.id === id);
    tooltip.element.remove();
    tooltip = this.tooltips.filter((t) => t.id !== id);
  }
}
