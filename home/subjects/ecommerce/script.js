document.addEventListener("DOMContentLoaded", () => {
  const listItems = document.querySelectorAll(".list li");

  listItems.forEach((item) => {
    item.addEventListener("click", () => {
      window.location.href = item.getAttribute("data-href");
    });
  });
});
