// setInterval(() => {
//   const d = new Date();
//   document.title = d.getMinutes();
// }, 1000);

const menuItemsContainer = document.querySelector(".menu-items-container");
const categoriesContainer = document.querySelector(".categories-container");

let data = [];

let allCategories = [];

async function fetchData() {
  try {
    fetch("../src/data.json")
      .then((res) => res.json())
      .then((fd) => {
        data = fd;
        handleData(fd);
      });
  } catch (error) {
    console.log(error);
  }
}

fetchData();

function handleData(d) {
  filterItems("all");
  // console.log(d);

  allCategories = ["All", ...new Set(d.map((item) => item.category))];
  // console.log(allCategories);

  categoriesContainer.innerHTML += allCategories
    .map(
      (c, i) =>
        `<button class="btn btn-outline-primary" onclick="filterItems('${c}')">${c}</button>`
    )
    .join("");
}

function filterItems(category) {
  menuItemsContainer.innerHTML = "";
  if (category.toLowerCase() === "all") {
    // console.log("all");
    showMenuItems(data);
  } else {
    const newItems = data.filter((item) => item.category === category);
    showMenuItems(newItems);
    // console.log("category:", category, "newItems:", newItems);
  }
}

function showMenuItems(items) {
  // console.log("items: ", items);
  // console.log(items.length);
  // document.getElementById("items-count").innerText = items.length;
  items.map(
    (item) =>
      (menuItemsContainer.innerHTML += `
        <div class="card " style="width:250px">
          <div
            class="card-img-top bg-success w-100"
            style="height: 250px"></div>
          <div class="card-body">
            <div
              class="d-flex justify-content-between align-items-center border-bottom border-2 mb-2">
              <h5 class="card-title">${item.title}</h5>
              <div class="price text-warning">$${item.price}</div>
            </div>
            <div class="card-text">${item.description} <span class="text-primary">#${item.category}</span></div>
          </div>
        </div>
      `)
  );
}

// why not working ::
// document.querySelectorAll("button").forEach((btn) => {
//   console.log("ali");
//   btn.addEventListener("click", (e) => {
//     console.log("btn");
//   });
// });
