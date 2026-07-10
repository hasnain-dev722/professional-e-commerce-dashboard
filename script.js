const sidebarlinks = document.querySelectorAll(".list-group-item");
const allpages = document.querySelectorAll(".content-box");
sidebarlinks.forEach((link) => {
  link.addEventListener("click", function (e) {
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
  series: [
    {
      name: "Sales",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ],
  chart: {
    type: "area",
    height: 350,
    toolbar: {show: false },
  },
  colors: ["#4e73df"],
  xaxis: {
    categories: ["mon, tue, wed, thu, fri, sat, sun"],
  },
};
const trafficOptions = {
  series: [44, 55, 13],
  chart: {
    type: "donut",
    height: 350,
  },
  labels: ["Social Media", "Direct", "Organic Search"],
  colors: ["#4e73df", "#1cc88a", "#36b9cc"],
};
const SalesChart = new ApexCharts(
  document.querySelector("#MainSalesChart"),
  salesoption,
);
SalesChart.render();
const trafficChart = new ApexCharts(
  document.querySelector("#TrafficDonutChart"),
  trafficOptions,
);
trafficChart.render();
