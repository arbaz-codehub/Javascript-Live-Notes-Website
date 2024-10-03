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

  // Existing sections
  html += `<h1 id="ecommerce">${content.title}</h1>`;
  html += `<p>${content.introduction}</p>`;

  html += `<h2 id="features">${content.featuresTitle}</h2>`;
  content.features.forEach((feature, index) => {
    html += `<div class="feature">${index + 1}. <strong>${
      feature.title
    }</strong>: ${feature.description}</div>`;
  });

  html += `<h2 id="comparison">${content.comparisonTitle}</h2>`;
  content.comparisons.forEach((comparison) => {
    html += `
      <div class="comparison">
          <div class="column-left"><strong>Traditional Commerce:</strong> ${comparison.traditional}</div>
          <div class="column-right"><strong>E-commerce:</strong> ${comparison.ecommerce}</div>
      </div>`;
  });

  html += `<h2 id="pureVsPartial">${content.pureVsPartialTitle}</h2>`;
  content.pureVsPartialComparisons.forEach((comparison) => {
    html += `
      <div class="comparison">
          <h3>${comparison.aspect}</h3>
          <div class="column-left"><strong>Pure E-commerce:</strong> ${comparison.pure}</div>
          <div class="column-right"><strong>Partial E-commerce:</strong> ${comparison.partial}</div>
      </div>`;
  });

  html += `<h2 id="elements">${content.elementsTitle}</h2>`;
  content.elements.forEach((element, index) => {
    html += `<div class="feature">${index + 1}. <strong>${
      element.name
    }</strong>: ${element.description}</div>`;
  });

  html += `<h2 id="types">${content.typesTitle}</h2>`;
  content.types.forEach((type) => {
    html += `
      <div class="type">
          <h3>${type.name}</h3>
          <p>${type.description}</p>
          <p><strong>Examples:</strong> ${type.examples}</p>
      </div>`;
  });

  // New Limitations section
  html += `<h2 id="limitations">${content.limitationsTitle}</h2>`;
  content.limitations.forEach((limitation, index) => {
    html += `<div class="limitation">${index + 1}. <strong>${
      limitation.title
    }</strong>: ${limitation.description}</div>`;
  });

  // New E-business vs E-commerce section
  html += `<h2 id="ebusinessVsEcommerce">${content.ebusinessVsEcommerceTitle}</h2>`;
  content.ebusinessVsEcommerce.forEach((comparison) => {
    html += `
      <div class="ebusiness-vs-ecommerce">
          <h3>${comparison.aspect}</h3>
          <div class="column-left"><strong>E-business:</strong> ${comparison.eBusiness}</div>
          <div class="column-right"><strong>E-commerce:</strong> ${comparison.eCommerce}</div>
      </div>`;
  });

  // Add the impacts heading
  html += `<h2 id="impacts">${content.impactsHeading}</h2>`;

  // Render Economic Impact section
  html += `<h2 id="economicImpact">${content.economicImpactTitle}</h2>`;
  content.economicImpact.forEach((impact, index) => {
    html += `<div class="impact">${index + 1}. <strong>${
      impact.title
    }</strong>: ${impact.description}</div>`;
  });

  // Render Social Impact section
  html += `<h2 id="socialImpact">${content.socialImpactTitle}</h2>`;
  content.socialImpact.forEach((impact, index) => {
    html += `<div class="impact">${index + 1}. <strong>${
      impact.title
    }</strong>: ${impact.description}</div>`;
  });

  // Render Environmental Impact section
  html += `<h2 id="environmentalImpact">${content.environmentalImpactTitle}</h2>`;
  content.environmentalImpact.forEach((impact, index) => {
    html += `<div class="impact">${index + 1}. <strong>${
      impact.title
    }</strong>: ${impact.description}</div>`;
  });

  // Render Technological Impact section
  html += `<h2 id="technologicalImpact">${content.technologicalImpactTitle}</h2>`;
  content.technologicalImpact.forEach((impact, index) => {
    html += `<div class="impact">${index + 1}. <strong>${
      impact.title
    }</strong>: ${impact.description}</div>`;
  });

  // Add Ecommerce in India section
  html += `<h2 id="ecommerceInIndia">${content.ecommerceInIndiaTitle}</h2>`;
  content.ecommerceInIndia.forEach((item, index) => {
    html += `<div class="ecommerceInIndia">${index + 1}. <strong>${
      item.title
    }</strong>: ${item.description}</div>`;
  });

  // Add Current Scenario of Ecommerce in India section
  html += `<h2 id="currentScenario">${content.currentScenarioTitle}</h2>`;
  content.currentScenario.forEach((item, index) => {
    html += `<div class="currentScenario">${index + 1}. <strong>${
      item.title
    }</strong>: ${item.description}</div>`;
  });

  // Add Future Prospects of Ecommerce in India section
  html += `<h2 id="futureProspects">${content.futureProspectsTitle}</h2>`;
  content.futureProspects.forEach((item, index) => {
    html += `<div class="futureProspects">${index + 1}. <strong>${
      item.title
    }</strong>: ${item.description}</div>`;
  });

  // Add Anatomy of Ecommerce section
  html += `<h2 id="anatomyOfEcommerce">${content.anatomyOfEcommerceTitle}</h2>`;
  content.anatomyOfEcommerce.forEach((part, index) => {
    html += `<div class="anatomyOfEcommerce">${index + 1}. <strong>${
      part.title
    }</strong>: ${part.description}</div>`;
  });

  // Add Framework / Architecture of Ecommerce section
  html += `<h2 id="ecommerceFramework">${content.ecommerceFrameworkTitle}</h2>`;
  content.ecommerceFramework.forEach((framework, index) => {
    html += `<div class="ecommerceFramework">${index + 1}. <strong>${
      framework.title
    }</strong>: ${framework.description}</div>`;
  });

  // Add Ecommerce Consumer Applications section
  html += `<h2 id="ecommerceConsumerApplications">${content.ecommerceConsumerApplicationsTitle}</h2>`;
  content.ecommerceConsumerApplications.forEach((application, index) => {
    html += `<div class="ecommerceConsumerApplications">${index + 1}. <strong>${
      application.title
    }</strong>: ${application.description}</div>`;
  });

  // Add Ecommerce Organisation Applications section
  html += `<h2 id="ecommerceOrganisationApplications">${content.ecommerceOrganisationApplicationsTitle}</h2>`;
  content.ecommerceOrganisationApplications.forEach((application, index) => {
    html += `<div class="ecommerceOrganisationApplications">${
      index + 1
    }. <strong>${application.title}</strong>: ${application.description}</div>`;
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
