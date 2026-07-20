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
      toolbar: { show: false },
      zoom: { enabled: false },
      height: 300,
      toolbar: { show: false },
      tooltip: { enabled: false },
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
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
    window.salesChart = salesChart;
  } else {
    console.log("Sales chart element nahi mila HTML mein!");
  }
  const donutChartOptions = {
    chart: {
      type: "donut",
      height: 300,
      tooltip: { enabled: false },

      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
    },
    series: [44, 55, 41, 17],
    labels: ["Direct", "Social Media", "Referral", "Organic"],
  };

  const donutChartEl = document.querySelector("#TrafficDonutChart");
  let donutChart;

  if (donutChartEl) {
    donutChart = new ApexCharts(donutChartEl, donutChartOptions);
    donutChart.render();
    window.donutChart = donutChart;
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
document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("sidebar-wrapper").classList.toggle("active");
});
document.addEventListener("click", function (e) {
  const sidebar = document.getElementById("sidebar-wrapper");
  const toggle = document.getElementById("menu-toggle");

  if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
    sidebar.classList.remove("active");
  }
});

const darkmodebtn = document.getElementById("dark-mode-toggle");
const darkbody = document.body;
if (localStorage.getItem("theme") === "dark") {
  darkbody.classList.add("dark");
  setTimeout(() => applyChartDarkMode(true), 10);
}
darkmodebtn.addEventListener("click", () => {
  darkbody.classList.toggle("dark");
  if (darkbody.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
  const isDark = darkbody.classList.contains("dark");
  applyChartDarkMode(isDark); // <-- ye line add karo yahan
});
function applyChartDarkMode(isDark) {
  const theme = {
    theme: { mode: isDark ? "dark" : "light" },
    grid: { borderColor: isDark ? "#444444" : "#e0e0e0" },
    xaxis: { labels: { style: { colors: isDark ? "#ffffff" : "#333333" } } },
    yaxis: { labels: { style: { colors: isDark ? "#ffffff" : "#333333" } } },
    legend: { labels: { colors: isDark ? "#ffffff" : "#333333" } },
  };

  if (window.salesChart) salesChart.updateOptions(theme);
  if (window.donutChart) donutChart.updateOptions(theme);
}
const searchInput = document.querySelector('input[placeholder="Search..."]');
const searchResults = document.getElementById("search-results");

const pages = [
  { name: "Dashboard", target: "dashboard-page" },
  { name: "Components", target: "components-page" },
  { name: "Forms", target: "forms-page" },
  { name: "Tables", target: "tables-page" },
  { name: "Maps", target: "maps-page" },
  { name: "Widgets", target: "widgets-page" },
  { name: "Charts", target: "charts-page" },
];

searchInput.addEventListener("input", () => {
  console.log("typing detected:", searchInput.value);
  const query = searchInput.value.trim().toLowerCase();

  if (query === "") {
    searchResults.style.display = "none";
    return;
  }

  const matches = pages.filter((page) =>
    page.name.toLowerCase().includes(query),
  );
  console.log("matches found:", matches);

  if (matches.length === 0) {
    searchResults.innerHTML = `<div class="p-2 text-muted small">No results</div>`;
  } else {
    searchResults.innerHTML = matches
      .map(
        (page) =>
          `<div class="search-result-item p-2" data-target="${page.target}">${page.name}</div>`,
      )
      .join("");
  }
  console.log("HTML set to:", searchResults.innerHTML);
  searchResults.style.display = "block";
});

searchResults.addEventListener("click", (e) => {
  const item = e.target.closest(".search-result-item");
  if (!item) return;

  const targetId = item.getAttribute("data-target");
  document.querySelectorAll(".content-box").forEach((page) => {
    page.classList.toggle("d-none", page.id !== targetId);
  });

  searchInput.value = "";
  searchResults.style.display = "none";
});

document.addEventListener("click", (e) => {
  if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
    searchResults.style.display = "none";
  }
});
