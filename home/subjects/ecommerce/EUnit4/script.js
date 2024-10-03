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

  // Add Security Policy section
  html += `<h2 id="securityPolicy">${content.securityPolicyTitle}</h2>`;
  html += `<p>${content.securityPolicy}</p>`;

  // Add Security Issues with E-commerce section
  html += `<h2 id="securityIssues">${content.securityIssuesTitle}</h2>`;
  html += `<h2 id="securityIssues2">${content.securityIssuesTitle2}</h2>`;
  html += `<h2 id="securityIssues3">${content.securityIssuesTitle3}</h2>`;
  content.securityIssues.forEach((issue, index) => {
    html += `<div class="securityIssue">${index + 1}. <strong>${
      issue.title
    }</strong>: ${issue.description}</div>`;
  });

  // Add Secure Payments section
  html += `<h2 id="securePayments">${content.securePaymentsTitle}</h2>`;
  content.securePayments.forEach((paymentMethod, index) => {
    html += `<div class="securePayment">${index + 1}. <strong>${
      paymentMethod.title
    }</strong>: ${paymentMethod.description}</div>`;
  });

  // Add Importance of Security in E-business section
  html += `<h2 id="importanceOfSecurity">${content.importanceOfSecurityTitle}</h2>`;
  content.importanceOfSecurity.forEach((importance, index) => {
    html += `<div class="importanceOfSecurity">${index + 1}. <strong>${
      importance.title
    }</strong>: ${importance.description}</div>`;
  });

  // Add Challenges of E-commerce section
  html += `<h2 id="challenges">${content.challengesTitle}</h2>`;
  content.challenges.forEach((challenge, index) => {
    html += `<div class="challenge">${index + 1}. <strong>${
      challenge.title
    }</strong>: ${challenge.description}</div>`;
  });

  // Add Social and Business-Based Issues of Online Privacy section
  html += `<h2 id="privacyIssues">${content.privacyIssuesTitle}</h2>`;
  html += `<h3>Social Issues:</h3>`;
  content.privacyIssues.social.forEach((issue, index) => {
    html += `<div class="socialIssue">${index + 1}. <strong>${
      issue.title
    }</strong>: ${issue.description}</div>`;
  });

  html += `<h3>Business-Based Issues:</h3>`;
  content.privacyIssues.business.forEach((issue, index) => {
    html += `<div class="businessIssue">${index + 1}. <strong>${
      issue.title
    }</strong>: ${issue.description}</div>`;
  });

  // Add Customer Relationship Management (CRM) section
  html += `<h2 id="crm">${content.crmTitle}</h2>`;
  html += `<p>${content.crmContent}</p>`;

  // Add E-CRM section
  html += `<h2 id="eCrm">${content.eCrmTitle}</h2>`;
  html += `<p>${content.eCrmContent}</p>`;

  // Add Applications of E-CRM section
  html += `<h2 id="applicationsOfEcrm">${content.applicationsOfEcrmTitle}</h2>`;
  content.applicationsOfEcrm.forEach((application, index) => {
    html += `<div class="applicationOfEcrm">${index + 1}. <strong>${
      application.title
    }</strong>: ${application.description.replace(/\n/g, "<br>")}</div>`;
  });

  // Add How E-CRM Works section
  html += `<h2 id="howEcrmWorks">${content.howEcrmWorksTitle}</h2>`;
  content.howEcrmWorks.forEach((step, index) => {
    html += `<div class="howEcrmWorks">${index + 1}. <strong>${
      step.title
    }</strong>: ${step.description}</div>`;
  });

  // Add Components of E-CRM section
  html += `<h2 id="componentsOfEcrm">${content.componentsOfEcrmTitle}</h2>`;
  content.componentsOfEcrm.forEach((component, index) => {
    html += `<div class="componentOfEcrm">${index + 1}. <strong>${
      component.title
    }</strong>: ${component.description.replace(/\n/g, "<br>")}</div>`;
  });

  // Add How Online Customer Service Helps Improve CRM section
  html += `<h2 id="onlineCustomerService">${content.onlineCustomerServiceTitle}</h2>`;
  content.onlineCustomerService.forEach((benefit, index) => {
    html += `<div class="onlineCustomerService">${index + 1}. <strong>${
      benefit.title
    }</strong>: ${benefit.description}</div>`;
  });

  // Add Differentiate Between CRM and E-CRM section
  html += `<h2 id="differentiateCrmEcrm">${content.differentiateCrmEcrmTitle}</h2>`;
  content.differentiateCrmEcrm.forEach((item, index) => {
    html += `<div class="differentiateCrmEcrm">${index + 1}. <strong>${
      item.title
    }</strong>: <br><strong>CRM:</strong> ${
      item.crm
    }<br><strong>E-CRM:</strong> ${item.ecrm}</div>`;
  });

  // Add Global Scenario of E-CRM section
  html += `<h2 id="globalScenarioEcrm">${content.globalScenarioEcrmTitle}</h2>`;
  content.globalScenarioEcrm.forEach((scenario, index) => {
    html += `<div class="globalScenarioEcrm">${index + 1}. <strong>${
      scenario.title
    }</strong>: ${scenario.overview.replace(/\n/g, "<br>")}</div>`;
  });

  // Add CRM Utility in India section
  html += `<h2 id="crmUtilityIndia">${content.crmUtilityIndiaTitle}</h2>`;
  content.crmUtilityIndia.forEach((utility, index) => {
    html += `<div class="crmUtilityIndia">${index + 1}. <strong>${
      utility.title
    }</strong>: ${utility.overview.replace(/\n/g, "<br>")}</div>`;
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
