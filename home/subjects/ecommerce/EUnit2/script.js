const menuIcon = document.getElementById("menu-icon");
const menuTip = document.getElementById("menu-tip");
const sidebar = document.getElementById("sidebar");
const menuItems = document.querySelectorAll("#sidebar a");
const contentDiv = document.getElementById("content");

// Load Content
function loadContent() {
  axios
    .get("content.json")
    .then((response) => {
      const content = response.data;
      renderContent(content);
    })
    .catch((error) => console.error("Error loading content:", error));
}

// Render Content
function renderContent(content) {
  let html = "";

  // Add Online Marketing section
  html += `<h2 id="onlineMarketing">${content.onlineMarketingTitle}</h2>`;
  html += `<p>${content.onlineMarketingDescription}</p>`;

  // Add Online Marketing Components section
  html += `<h2 id="onlineMarketingComponents">${content.onlineMarketingComponentsTitle}</h2>`;
  html += `<h2 id="onlineMarketingComponentsAlt">${content.onlineMarketingComponentsAltTitle}</h2>`;
  content.onlineMarketingComponents.forEach((component, index) => {
    html += `<div class="onlineMarketingComponents">${index + 1}. <strong>${
      component.title
    }</strong>: ${component.description}</div>`;
  });

  // Add Advantages / Merits of Online Marketing section
  html += `<h2 id="onlineMarketingAdvantages">${content.onlineMarketingAdvantagesTitle}</h2>`;
  content.onlineMarketingAdvantages.forEach((advantage, index) => {
    html += `<div class="onlineMarketingAdvantages">${index + 1}. <strong>${
      advantage.title
    }</strong>: ${advantage.description}</div>`;
  });

  // Add Disadvantages / Demerits of Online Marketing section
  html += `<h2 id="onlineMarketingDisadvantages">${content.onlineMarketingDisadvantagesTitle}</h2>`;
  content.onlineMarketingDisadvantages.forEach((disadvantage, index) => {
    html += `<div class="onlineMarketingDisadvantages">${index + 1}. <strong>${
      disadvantage.title
    }</strong>: ${disadvantage.description}</div>`;
  });

  // Add Methodology of Online Marketing section
  html += `<h2 id="methodologyOnlineMarketing">${content.methodologyOnlineMarketingTitle}</h2>`;
  html += `<h2 id="methodologyOnlineMarketing2">${content.methodologyOnlineMarketingTitle2}</h2>`;
  html += `<h2 id="methodologyOnlineMarketing3">${content.methodologyOnlineMarketingTitle3}</h2>`;
  content.methodologyOnlineMarketing.forEach((step, index) => {
    html += `<div class="methodologyOnlineMarketing">${index + 1}. <strong>${
      step.title
    }</strong>: ${step.description}</div>`;
  });

  // Add Online Advertising section
  html += `<h2 id="onlineAdvertising">${content.onlineAdvertisingTitle}</h2>`;
  html += `<p>${content.onlineAdvertisingDescription}</p>`;

  // Add Guidelines for Online Advertising section
  html += `<h2 id="guidelinesOnlineAdvertising">${content.guidelinesOnlineAdvertisingTitle}</h2>`;
  content.guidelinesOnlineAdvertising.forEach((guideline, index) => {
    html += `<div class="guidelinesOnlineAdvertising">${index + 1}. <strong>${
      guideline.title
    }</strong>: ${guideline.description}</div>`;
  });

  // Add Weaknesses of Internet Advertising section
  html += `<h2 id="weaknessesInternetAdvertising">${content.weaknessesInternetAdvertisingTitle}</h2>`;
  content.weaknessesInternetAdvertising.forEach((weakness, index) => {
    html += `<div class="weaknessesInternetAdvertising">${index + 1}. <strong>${
      weakness.title
    }</strong>: ${weakness.description}</div>`;
  });

  // Add Advertising and Marketing on the Internet section
  html += `<h2 id="advertisingMarketingInternet">${content.advertisingMarketingInternetTitle}</h2>`;
  html += `<h3>${content.advertisingMarketingInternet.onlineAdvertising.title}</h3>`;
  content.advertisingMarketingInternet.onlineAdvertising.points.forEach(
    (point, index) => {
      html += `<div class="advertisingPoint">${index + 1}. <strong>${
        point.title
      }</strong>: ${point.description}</div>`;
    }
  );
  html += `<h3>${content.advertisingMarketingInternet.onlineMarketing.title}</h3>`;
  content.advertisingMarketingInternet.onlineMarketing.points.forEach(
    (point, index) => {
      html += `<div class="marketingPoint">${index + 1}. <strong>${
        point.title
      }</strong>: ${point.description}</div>`;
    }
  );

  // Add Active or Push-Based Advertising section
  html += `<h2 id="activePushAdvertising">${content.activePushAdvertisingTitle}</h2>`;
  html += `<p>${content.activePushAdvertising}</p>`;

  // Add Active or Push-Based Advertising Models section
  html += `<h2 id="activePushAdvertisingModels">${content.activePushAdvertisingModelsTitle}</h2>`;
  content.activePushAdvertisingModels.forEach((model, index) => {
    html += `<div class="advertisingModel">${index + 1}. <strong>${
      model.title
    }</strong>: ${model.description}</div>`;
  });

  // Add Passive or Pull-Based Advertising section
  html += `<h2 id="passivePullAdvertising">${content.passivePullAdvertisingTitle}</h2>`;
  html += `<p>${content.passivePullAdvertising}</p>`;

  // Add Passive or Pull-Based Advertising Models section
  html += `<h2 id="passivePullAdvertisingModels">${content.passivePullAdvertisingModelsTitle}</h2>`;
  content.passivePullAdvertisingModels.forEach((model, index) => {
    html += `<div class="advertisingModel">${index + 1}. <strong>${
      model.title
    }</strong>: ${model.description}</div>`;
  });

  // Add Consumer-Oriented Applications section
  html += `<h2 id="consumerOrientedApplications">${content.consumerOrientedApplicationsTitle}</h2>`;
  html += `<h2 id="consumerOrientedApplications">${content.consumerOrientedApplicationsTitle2}</h2>`;
  content.consumerOrientedApplications.forEach((app, index) => {
    html += `<div class="application">${index + 1}. <strong>${
      app.title
    }</strong>: ${app.description}</div>`;
  });

  // Add Mercantile Process Models section
  html += `<h2 id="mercantileProcessModels">${content.mercantileProcessModelsTitle}</h2>`;
  content.mercantileProcessModels.forEach((model, index) => {
    html += `<div class="processModel">${index + 1}. <strong>${
      model.title
    }</strong>: ${model.description}</div>`;
  });

  // Add The New Age Information-Based Marketing section
  html += `<h2 id="newAgeInformationBasedMarketing">${content.newAgeInformationBasedMarketingTitle}</h2>`;
  content.newAgeInformationBasedMarketing.forEach((marketing, index) => {
    html += `<div class="marketing">${index + 1}. <strong>${
      marketing.title
    }</strong>: ${marketing.description}</div>`;
  });

  // Update contentDiv with the new HTML
  contentDiv.innerHTML = html;
}

menuIcon.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuIcon.classList.toggle("menu-icon-open");
});

menuTip.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuIcon.classList.toggle("menu-icon-open");
});

menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = item.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    targetElement.scrollIntoView({ behavior: "smooth" });

    updateActiveMenuItem(targetId);

    sidebar.classList.remove("open");
    menuIcon.classList.remove("menu-icon-open");
  });
});

function updateActiveMenuItem(activeId) {
  menuItems.forEach((mi) => mi.classList.remove("active"));
  const activeMenuItem = document.querySelector(
    `#sidebar a[href="#${activeId}"]`
  );
  if (activeMenuItem) {
    activeMenuItem.classList.add("active");
  }
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function onScroll() {
  const sections = document.querySelectorAll("h1, h2");
  let currentSection = "";
  sections.forEach((section) => {
    if (isElementInViewport(section)) {
      currentSection = section.id;
    }
  });
  if (currentSection !== "") {
    updateActiveMenuItem(currentSection);
  }

  if (window.scrollY > 50) {
    menuTip.style.display = "block";
    menuIcon.classList.add("hidden");
  } else {
    menuTip.style.display = "none";
    menuIcon.classList.remove("hidden");
  }
}

window.addEventListener("scroll", onScroll);
window.addEventListener("load", loadContent);
onScroll();
