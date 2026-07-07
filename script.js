const sidebarlinks = document.querySelectorAll(".list-group-item");
sidebarlinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebarlinks.forEach((item) => {
      item.classList.remove("active");
    });
    link.classList.add("active");
  });
});
