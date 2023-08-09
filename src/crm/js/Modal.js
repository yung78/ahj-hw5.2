import Tooltip from './Tooltip';

export default class Modal {
  constructor() {
    this.table = document.querySelector('.table');
    this.modal = document.querySelector('.modal');
    this.name = document.querySelector('.name_input');
    this.price = document.querySelector('.price_input');
    this.form = document.querySelector('.form');
    // this.data = { samsung: 50000, xiaomi: 30000, apple: 100000 };
    this.data = {};
    this.tooltip = new Tooltip();
    this.actualMessage = [];
    this.temp = {};
    this.errors = {
      name: {
        valueMissing: 'Пустое поле - моветон',
      },
      price: {
        valueMissing: 'Пустое поле - моветон',
        patternMismatch: 'Странный ценник',
      },
    };

    this._createElemet();
  }

  _createElemet() {
    Object.keys(this.data).sort().forEach((el) => {
      const tr = document.createElement('tr');
      tr.className = 'product';
      tr.innerHTML = `
        <td class="name">${el}</td>
        <td class="price">${this.data[el]}</td>
        <td class="actions">
          <div class="edit"></div>
          <div class="delete"></div>
        </td>
      `;
      this.table.append(tr);
    });
  }

  _openModal() {
    this.modal.style.display = 'block';
  }

  _closeModal() {
    this.modal.style.display = 'none';
  }

  _showTooltip(message, element) {
    this.actualMessage.push(this.tooltip.showTooltip(message, element));
  }

  _removeTooltip() {
    this.actualMessage.forEach((id) => this.tooltip._removeTooltip(id));
    this.actualMessage = [];
  }

  _validation() {
    this._removeTooltip();

    const elements = this.form.elements;
    const invalid = ![...elements].some((el) => {
      return Object.keys(ValidityState.prototype).some((key) => {
        if (!el.name) return;

        if (key === 'valid') return;

        if (el.validity[key]) {
          this._showTooltip(this.errors[el.name][key], el);
          return true;
        }
      });
    });

    return invalid;
  }

  addProduct() {
    document.querySelector('.add').addEventListener('click', (e) => {
      e.preventDefault();
      this._openModal();
    });
  }

  removeProduct() {
    this.table.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.className === 'delete') {
        e.target.closest('.product').remove();
      }
    });
  }

  editProduct() {
    this.table.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.className === 'edit') {
        this._openModal();
        this.name.value = e.target.closest('.product').querySelector('.name').textContent;
        this.price.value = e.target.closest('.product').querySelector('.price').textContent;
        this.temp[this.name.value] = this.price.value;
      }
    });
  }

  cancelModal() {
    document.querySelector('.cancel_btn').addEventListener('click', (e) => {
      e.preventDefault();
      this._closeModal();
      this.name.value = '';
      this.price.value = '';
    });
  }

  saveModal() {
    document.querySelector('.save_btn').addEventListener('click', (e) => {
      e.preventDefault();
      if (this._validation()) {
        if (Object.keys(this.temp)[0]) {
          delete this.data[Object.keys(this.temp)[0]];
        }
        this.data[this.name.value] = Number(this.price.value);
        document.querySelectorAll('.product').forEach((el) => el.remove());
        this._createElemet();
        this.name.value = '';
        this.price.value = '';
        this._closeModal();
        this.temp = {};
      }
    });
  }

  activeAll() {
    this.addProduct();
    this.cancelModal();
    this.saveModal();
    this.removeProduct();
    this.editProduct();
  }
}
