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
const donutchart = {
  series: [44, 28, 18, 10],
  labels: ["Direct", "Social", "Email", "Other"],
  chart: { type: "donut", height: 250 },
  colors: ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e"],
  legend: { position: "bottom" },
};

// 1. Sales Overview (Left Smooth Area Line Chart)
const salesOverview = {
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
const trafficChart = new ApexCharts(
  document.querySelector("#MainSalesChart"),
  salesOverview,
);
trafficChart.render();
// Render (Donon ko tumhari HTML ke mutabiq load karna)
const salesChart = new ApexCharts(
  document.querySelector("#TrafficDonutChart"),
  donutchart,
);
salesChart.render();

class ChartDataManager {
  constructor(chartInstance) {
    this.chart = chartInstance;
  }
  async fetchsalesdata(filtertype) {
    try {
      const response = await fetch(
        "https://www.randomnumberapi.com/api/v1.0/random?min=10&max=120&count=7",
      );
      if (!Response.ok) throw new Error("network reponse is not good");
      const livenumbers = await response.json();
      console.log(`live api data for ${filtertype}:`, livenumbers);
      let newcategories = [];
      if (filtertype === "weekly") {
        newcategories = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
      } else if (filtertype === "monthly") {
        newcategories = [
          "jan",
          "feb",
          "mar",
          "apr",
          "may",
          "june",
          "july",
          "aug",
          "sep",
          "oct",
          "nov",
          "dec",
        ];
      } else if (filtertype === "yearly") {
        newcategories = [
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
          "2025",
          "2026",
        ];
      }
      this.chart.updateOptions({
        xaxis: { categories: newcategories },
      });
      this.chart.updateSeries([
        {
          name: "Sales",
          data: livenumbers,
        },
      ]);
    } catch (error) {
      console.log('"masla agya ha');
    }
  }
}
const datamanager = new ChartDataManager(salesChart);
const filterbuttons = {
  weekly: document.getElementById("btn-weekly"),
  monthly: document.getElementById("btn-monthkly"),
  yearly: document.getElementById("btn-yearly"),
};
Object.keys(filterbuttons).forEach((type) => {
  if (filterbuttons[type]) {
    filterbuttons[type].addEventListener("click", function () {
      Object.values(filterbuttons).forEach((btn) =>
        btn.classList.remove("actve"),
      );
      this.classList.add("active");
      datamanager.fetchsalesdata(type);
    });
  }
});
