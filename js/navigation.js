import { initializeHomeEvents } from "./events/home.js";

export const navigate = async (route) => {
  try {
    const response = await fetch(`../pages/${route}.html`);
    const data = await response.text();
    document.getElementById("app").innerHTML = data;
    switch (route) {
      case "home":
        initializeHomeEvents();
        break;
    }
  } catch (err) {
    console.log(err.message);
  }
};
