import { listData } from "./scripts/LayOut";
import { homePageData } from "./scripts/Data";

import appLayoutStyles from "./styles/AppLayOut.module.scss";
import navigationStyles from "./styles/Navigation.module.scss";

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navigationSection = document.querySelector(".navigationSection");

  hamburger.addEventListener("click", () => {
    navigationSection.classList.toggle("open");
  });

  const container = document.querySelector(".container");
  if (container) container.classList.add(appLayoutStyles.container);

  const section = document.querySelector("section");
  if (section) section.classList.add(navigationStyles.navigationSection);

  const ul = section.querySelector("ul");
  if (ul) ul.classList.add(navigationStyles.navigationList);

  const allNavLinks = document.querySelectorAll("section a");
  allNavLinks.forEach((link) => {
    link.classList.add(navigationStyles.navLink);
    const li = link.closest("li");
    if (li) li.classList.add(navigationStyles.navigationItem);
  });

  const mainContentArea = document.querySelector(".main-content-area");
  if (mainContentArea)
    mainContentArea.classList.add(appLayoutStyles.mainContentArea);

  const gameLink = document.querySelector(".game-link");
  if (gameLink) gameLink.classList.add(appLayoutStyles.gameLink);

  const listDisplay = document.querySelector(".list-display");
  if (listDisplay) listDisplay.classList.add(appLayoutStyles.contentDisplay);
  const listTitle = document.querySelector(".list-title");
  const listImage = document.querySelector(".list-image");
  const listDescription = document.querySelector(".list-description");
  const listLocation = document.querySelector(".list-location");

  const homePageDisplay = document.querySelector(".home-page-display");
  if (homePageDisplay)
    homePageDisplay.classList.add(appLayoutStyles.contentDisplay);
  const homePageTitle = document.querySelector(".home-page-title");
  const homePageDescription = document.querySelector(".home-page-description");
  const homePageImage = document.querySelector(".home-page-image");

  const removeActiveClass = () => {
    allNavLinks.forEach((link) => {
      link.classList.remove(navigationStyles.active);
    });
  };

  const renderHomePage = () => {
    removeActiveClass();

    if (listDisplay) listDisplay.style.display = "none";
    if (listImage) listImage.style.display = "none";
    if (homePageDisplay) homePageDisplay.style.display = "block";
    if (homePageImage) homePageImage.style.display = "block";

    if (homePageTitle) homePageTitle.textContent = homePageData.title;
    if (homePageDescription)
      homePageDescription.textContent = homePageData.description;
    if (homePageData.image && homePageImage) {
      homePageImage.classList.add(appLayoutStyles.image);
      homePageImage.src = homePageData.image;
      homePageImage.style.display = "block";
    } else if (homePageImage) {
      homePageImage.style.display = "none";
    }

    const homeLink = document.querySelector('[data-page-id="home-page"]');
    if (homeLink) {
      homeLink.classList.add(navigationStyles.active);
    }
  };

  const renderMonumentPage = (listID) => {
    removeActiveClass();

    if (homePageDisplay) homePageDisplay.style.display = "none";
    if (homePageImage) homePageImage.style.display = "none";

    if (listDisplay) listDisplay.style.display = "block";

    const data = listData[listID];
    if (data) {
      if (listTitle) listTitle.textContent = data.title;
      if (listImage) {
        listImage.src = data.image;
        listImage.alt = data.title;
        listImage.style.display = "block";
        listImage.classList.add(appLayoutStyles.image);
      }
      if (listDescription) listDescription.textContent = data.description;
      if (listLocation) listLocation.textContent = data.location;

      const listLink = document.querySelector(`[data-list-id="${listID}"]`);
      if (listLink) {
        listLink.classList.add(navigationStyles.active);
      }
    } else {
      if (listTitle)
        listTitle.textContent = "Информация о памятнике не найдена";
      if (listImage) listImage.style.display = "none";
      if (listDescription) listDescription.textContent = "";
      if (listLocation) listLocation.textContent = "";
    }
  };

  renderHomePage();
  allNavLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const pageId = link.dataset.pageId;
      const listID = link.dataset.listId;

      if (pageId === "home-page") {
        renderHomePage();
      } else if (listID) {
        renderMonumentPage(listID);
      }
    });
  });
});
