# 📊 E-commerce Dashboard

A clean, responsive, and modern e-commerce dashboard interface built to practice professional web layouts and component structuring.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3, JavaScript (JS), Bootstrap 5
* **Icons:** Font Awesome / Bootstrap Icons

## 🚀 Features
* Fully responsive layout (Mobile, Tablet, Desktop)
* Beautifully structured product and sales metric cards
* Interactive sidebar navigation and top navbar
* Clean data tables for recent orders and user activity
*

async fetchsalesdata(filtertype) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typeicode.com/posts",
      );
      if (!Response.ok) throw new Error("network reponse is not good");
      const livenumbers = await response.json();
      for (let i = 0; i < 7; i++) {
        livenumbers.push(Math.floor(Math.random() * (120 - 10 + 1)) + 10);
      }

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