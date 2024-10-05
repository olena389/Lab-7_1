import React, { Component } from 'react';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCount1: 0,
      clickCount2: 0,
      currentImage: null,
      maxImageWidth: 1000,
    };
  }

  // Номер варіанту
  n = 2; // номер варіанту
  // Обчислюємо індекси елементів
  elementIndex1 = (this.n % 10); // для "Читання"
  elementIndex2 = (this.n % 10) + 1; // для "Подорожі"

  // Функція для зміни класів
  changeClass = (element, clickCount) => {
    if (clickCount === 1) {
      element.classList.add("first-click");
      element.classList.remove("second-click");
    } else if (clickCount === 2) {
      element.classList.add("second-click");
      element.classList.remove("first-click");
    }
  };

  // Обробник кліків для першого елемента
  handleFirstClick = () => {
    const allElements = document.querySelectorAll('body *');
    const element = allElements[this.elementIndex1 + 9]; // зміщення для хобі
    this.setState(
      prevState => {
        const newClickCount = prevState.clickCount1 + 1 > 2 ? 1 : prevState.clickCount1 + 1;
        this.changeClass(element, newClickCount);
        return { clickCount1: newClickCount };
      }
    );
  };

  // Обробник кліків для другого елемента
  handleSecondClick = () => {
    const allElements = document.querySelectorAll('body *');
    const element = allElements[this.elementIndex2 + 9]; // зміщення для хобі
    this.setState(
      prevState => {
        const newClickCount = prevState.clickCount2 + 1 > 2 ? 1 : prevState.clickCount2 + 1;
        this.changeClass(element, newClickCount);
        return { clickCount2: newClickCount };
      }
    );
  };

  // Додати зображення
  addImage = () => {
    const imageContainer = document.getElementById('image-container');
    const newImage = document.createElement('img');
    newImage.src =
      'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcT7ShI3vENXx1R-6X_GsIGR0wv_nL5cv-Ec9cyKbgdr_vmzN72OsW5eW4W6_QDPdN3oWdZnJB40ND6_Ldaklqj0u2fINuksdvpwXB7V6A';
    newImage.alt = 'Нюрнберг';
    newImage.style.width = '600px';
    newImage.style.maxWidth = '100%';
    imageContainer.appendChild(newImage);
    this.updateCurrentImage();
  };

  // Функції для зміни зображень
  increaseImage = () => {
    if (this.state.currentImage) {
      let currentWidth = this.state.currentImage.clientWidth;
      let newWidth = currentWidth + 50;
      if (newWidth > this.state.maxImageWidth) {
        newWidth = this.state.maxImageWidth;
      }
      this.state.currentImage.style.width = `${newWidth}px`;
    }
  };

  decreaseImage = () => {
    if (this.state.currentImage) {
      let currentWidth = this.state.currentImage.clientWidth;
      if (currentWidth > 100) {
        this.state.currentImage.style.width = `${currentWidth - 50}px`;
      }
    }
  };

  removeImage = () => {
    if (this.state.currentImage) {
      this.state.currentImage.remove();
      this.updateCurrentImage();
    }
  };

  // Оновлення поточного зображення
  updateCurrentImage = () => {
    const images = document.getElementById('image-container').getElementsByTagName('img');
    if (images.length > 0) {
      this.setState({ currentImage: images[images.length - 1] });
    } else {
      this.setState({ currentImage: null });
    }
  };

  componentDidMount() {
    const allElements = document.querySelectorAll('body *');
    if (allElements[this.elementIndex1 + 9]) {
      allElements[this.elementIndex1 + 9].addEventListener('click', this.handleFirstClick);
    }
    if (allElements[this.elementIndex2 + 9]) {
      allElements[this.elementIndex2 + 9].addEventListener('click', this.handleSecondClick);
    }
  }

  componentWillUnmount() {
    const allElements = document.querySelectorAll('body *');
    if (allElements[this.elementIndex1 + 9]) {
      allElements[this.elementIndex1 + 9].removeEventListener('click', this.handleFirstClick);
    }
    if (allElements[this.elementIndex2 + 9]) {
      allElements[this.elementIndex2 + 9].removeEventListener('click', this.handleSecondClick);
    }
  }

  render() {
    return (
      <div>
        <p>Дата та місце народження: 19 жовтня, 2004 року, м. Вараш</p>
        <p>Освіта: Ліцей №4, м. Вараш; НТУУ "КПІ", м. Київ</p>

        <p>Хобі:</p>
        <ul>
          <li>Спорт</li>
          <li>Читання</li>
          <li>Подорожі</li>
          <li>Танці</li>
        </ul>

        <p>Улюблені книги:</p>
        <ol>
          <li>"Купи собі той довбаний букет", Тара Шустер</li>
          <li>"Хірург", Тесс Ґеррітсен</li>
          <li>"НЕ мона", Джен Сінсеро</li>
        </ol>

        <h3>Нюрнберг:</h3>
        <p>Нюрнберг – це місто, яке мені дуже сподобалося. Воно має багату історію, красиву архітектуру і є одним з найважливіших центрів культури та мистецтва в Німеччині.</p>
        <p>Протягом Середньовіччя Нюрнберг був важливим центром культури, ремесел та торгівлі. Найвідомішими символами міста є Нюрнберзький замок та Лоренцкірхе — старовинний готичний собор, який вражає своєю величністю.</p>

        <div id="buttons">
          <button onClick={this.addImage}>Додати зображення</button>
          <button onClick={this.increaseImage}>Збільшити зображення</button>
          <button onClick={this.decreaseImage}>Зменшити зображення</button>
          <button onClick={this.removeImage}>Видалити зображення</button>
        </div>
        <div id="image-container"></div>
      </div>
    );
  }
}

export default Content;
