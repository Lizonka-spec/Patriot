import { monumentData } from "./scripts/LayOut"
import { homePageData } from "./scripts/Data"

import appLayoutStyles from './styles/AppLayOut.module.scss';
import navigationStyles from './styles/Navigation.module.scss';


document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  if (container) container.classList.add(appLayoutStyles.container);

  const section = document.querySelector('section');
  if (section) section.classList.add(navigationStyles.navigationSection);

  const ul = section.querySelector('ul');
  if (ul) ul.classList.add(navigationStyles.navigationList);

  const allNavLinks = document.querySelectorAll('section a');
  allNavLinks.forEach(link => {
    link.classList.add(navigationStyles.navLink);
    const li = link.closest('li');
    if (li) li.classList.add(navigationStyles.navigationItem);
  });

  const mainContentArea = document.querySelector('.main-content-area');
  if (mainContentArea) mainContentArea.classList.add(appLayoutStyles.mainContentArea);

  const gameLink = document.querySelector('.game-link');
  if (gameLink) gameLink.classList.add(appLayoutStyles.gameLink);

  const monumentDisplay = document.querySelector('.monument-display');
  if (monumentDisplay) monumentDisplay.classList.add(appLayoutStyles.contentDisplay);
  const monumentTitle = document.querySelector('.monument-title');
  const monumentImage = document.querySelector('.monument-image');
  const monumentDescription = document.querySelector('.monument-description');
  const monumentLocation = document.querySelector('.monument-location');

  const homePageDisplay = document.querySelector('.home-page-display');
  if (homePageDisplay) homePageDisplay.classList.add(appLayoutStyles.contentDisplay);
  const homePageTitle = document.querySelector('.home-page-title');
  const homePageDescription = document.querySelector('.home-page-description');
  const homePageImage = document.querySelector(".home-page-image");

  const removeActiveClass = () => {
    allNavLinks.forEach(link => {
      link.classList.remove(navigationStyles.active);
    });
  };

  const renderHomePage = () => {
    removeActiveClass();

    if (monumentDisplay) monumentDisplay.style.display = 'none';
    if (monumentImage) monumentImage.style.display = 'none';
    if (homePageDisplay) homePageDisplay.style.display = 'block';
    if (homePageImage) homePageImage.style.display = 'block'

    if (homePageTitle) homePageTitle.textContent = homePageData.title;
    if (homePageDescription) homePageDescription.textContent = homePageData.description;
    if (homePageData.image && homePageImage) {
      homePageImage.classList.add(appLayoutStyles.image)
      homePageImage.src = homePageData.image;
      homePageImage.style.display = 'block';
    } else if (homePageImage) {
      homePageImage.style.display = 'none';
    }

    const homeLink = document.querySelector('[data-page-id="home-page"]');
    if (homeLink) {
      homeLink.classList.add(navigationStyles.active);
    }
  };

  const renderMonumentPage = (monumentId) => {
    removeActiveClass();

    if (homePageDisplay) homePageDisplay.style.display = 'none';
    if (homePageImage) homePageImage.style.display = 'none'

    if (monumentDisplay) monumentDisplay.style.display = 'block';


    const data = monumentData[monumentId];
    if (data) {
      if (monumentTitle) monumentTitle.textContent = data.title;
      if (monumentImage) {
        monumentImage.src = data.image;
        monumentImage.alt = data.title;
        monumentImage.style.display = 'block';
        monumentImage.classList.add(appLayoutStyles.image);
      }
      if (monumentDescription) monumentDescription.textContent = data.description;
      if (monumentLocation) monumentLocation.textContent = "Местоположение: " + data.location;

      const monumentLink = document.querySelector(`[data-monument-id="${monumentId}"]`);
      if (monumentLink) {
        monumentLink.classList.add(navigationStyles.active);
      }
    } else {
      if (monumentTitle) monumentTitle.textContent = "Информация о памятнике не найдена";
      if (monumentImage) monumentImage.style.display = 'none';
      if (monumentDescription) monumentDescription.textContent = "";
      if (monumentLocation) monumentLocation.textContent = "";
    }
  };

  renderHomePage();
  allNavLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const pageId = link.dataset.pageId;
      const monumentId = link.dataset.monumentId;

      if (pageId === 'home-page') {
        renderHomePage();
      } else if (monumentId) {
        renderMonumentPage(monumentId);
      }
    });
  });
});

