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
// 1. Sales Overview (Left Smooth Area Line Chart)
const salesOptions = {
  series: [
    {
      name: "Sales",
      data: [31, 40, 28, 51, 42, 109, 100], // Exact teri image wale data points
    },
  ],
  chart: {
    type: "area",
    height: 350,
    toolbar: { show: false },
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  colors: ["#0d6efd"], // Blue color line
  dataLabels: {
    enabled: true, // Numbers line ke upar dikhane ke liye
    background: { enabled: true, fillColor: "#0d6efd" },
  },
  xaxis: {
    categories: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    axisBorder: { show: true },
    axisTicks: { show: true },
  },
  yaxis: {
    min: 20,
    max: 120,
    tickAmount: 5,
  },
};

// 2. Traffic Source (Right Donut Chart)
const trafficOptions = {
  series: [39.3, 49.1, 11.6], // Image wale percentages
  chart: {
    type: "donut",
    height: 300,
  },
  labels: ["Social Media", "Direct", "Organic Search"],
  colors: ["#0d6efd", "#198754", "#0dcaf0"], // Blue, Green, Light Blue
  dataLabels: { enabled: true },
  legend: {
    show: true,
    position: "right",
    verticalAlign: "middle",
  },
};

// Render (Donon ko tumhari HTML ke mutabiq load karna)
const salesChart = new ApexCharts(
  document.querySelector("#MainSalesChart"),
  salesOptions,
);
salesChart.render();

const trafficChart = new ApexCharts(
  document.querySelector("#TrafficDonutChart"),
  trafficOptions,
);
trafficChart.render();
// going
