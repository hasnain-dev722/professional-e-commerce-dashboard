const sidebarlinks = document.querySelectorAll(".list-group-item");
const allpages = document.querySelectorAll(".content-box");
sidebarlinks.forEach((link) => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    sidebarlinks.forEach((item) => {
      item.classList.remove("active");
    });
    this.classList.add("active");
    const targetname = this.getAttribute("data-target");
    allpages.forEach((page) => {
      if (page.id === targetname) {
        page.classList.remove("d-none");
      } else {
        page.classList.add("d-none");
      }
    });
  });
});
const salesoption = {
series: [{
  name: 'sales',
  data: [31, 40, 28, 51, 42, 109, 100]
}],
charts: {
  type:'area',
  height:350,
  tolbar: {show: false}
},
colors: ['#4e73df'],
xaxis: {
  categoreis: ['mon, tue, wed, thu, fri, sat, sun']
}
};
