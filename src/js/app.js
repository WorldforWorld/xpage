document.addEventListener("DOMContentLoaded", () => {
  // Получаем все кнопки и элементы изображений
  const buttons = document.querySelectorAll(".promo__button-item");
  const imageItems = document.querySelectorAll(".promo__image-item");

  buttons.forEach((button, index) => {
    button.addEventListener("mouseenter", () => {
      // Удаляем активный класс у всех изображений
      imageItems.forEach((item) =>
        item.classList.remove("promo__image-item--active")
      );

      // Добавляем активный класс к соответствующему изображению
      imageItems[index].classList.add("promo__image-item--active");
    });
  });
});
