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

document.addEventListener("DOMContentLoaded", function () {
  const salesChartOptions = {
    chart: {
      type: "area",
      height: 300,
      toolbar: { show: false },
    },
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
    xaxis: {
      categories: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    },
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
  };
  const salesChartEl = document.querySelector("#MainSalesChart");
  let salesChart;

  if (salesChartEl) {
    salesChart = new ApexCharts(salesChartEl, salesChartOptions);
    salesChart.render();
  } else {
    console.log("Sales chart element nahi mila HTML mein!");
  }
  const donutChartOptions = {
    chart: {
      type: "donut",
      height: 300,
    },
    series: [44, 55, 41, 17],
    labels: ["Direct", "Social Media", "Referral", "Organic"],
  };

  const donutChartEl = document.querySelector("#TrafficDonutChart");
  let donutChart;

  if (donutChartEl) {
    donutChart = new ApexCharts(donutChartEl, donutChartOptions);
    donutChart.render();
  } else {
    console.log("Donut chart element nahi mila HTML mein!");
  }
  class ChartDataManager {
    constructor(chartInstance) {
      this.chart = chartInstance;
    }

    async fetchsalesdata(filtertype) {
      if (!this.chart) {
        console.log("Chart initialized nahi hai!");
        return;
      }
      try {
        let livenumbers = [];
        let newcategories = [];

        if (filtertype === "weekly") {
          livenumbers = [31, 40, 28, 51, 42, 109, 100];
          newcategories = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
        } else if (filtertype === "monthly") {
          livenumbers = [
            400, 450, 500, 600, 550, 700, 800, 750, 900, 850, 950, 1000,
          ];
          newcategories = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
        } else if (filtertype === "yearly") {
          livenumbers = [5000, 6200, 7100, 8500, 9200, 11000, 13000];
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

        console.log(`Local data loaded for ${filtertype}:`, livenumbers);
        this.chart.updateOptions({
          xaxis: {
            categories: newcategories,
          },
          series: [
            {
              name: "Sales",
              data: livenumbers,
            },
          ],
        });
      } catch (error) {
        console.log("masla agya ha:", error);
      }
    }
  }
  const datamanager = new ChartDataManager(salesChart);

  const filterbuttons = {
    weekly: document.getElementById("btn-weekly"),
    monthly: document.getElementById("btn-monthly"),
    yearly: document.getElementById("btn-yearly"),
  };

  Object.keys(filterbuttons).forEach((type) => {
    const currentBtn = filterbuttons[type];

    if (currentBtn) {
      currentBtn.addEventListener("click", function () {
        Object.values(filterbuttons).forEach((btn) => {
          if (btn) btn.classList.remove("active");
        });

        currentBtn.classList.add("active");
        datamanager.fetchsalesdata(type);
      });
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Check karna ke tumhare hamburger menu button par id="menu-toggle" lagi ho
  const menuToggle = document.getElementById("menu-toggle");
  const wrapper = document.getElementById("wrapper");

  if (menuToggle) {
    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      wrapper.classList.toggle("toggled"); // Yeh class sidebar ko slide-in karegi
    });
  }
});
