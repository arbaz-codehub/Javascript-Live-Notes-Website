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

  // Add EDI section
  html += `<h2 id="edi">${content.ediTitle}</h2>`;
  html += `<p>${content.ediDescription}</p>`;

  // Add EDI Applications section
  html += `<h2 id="ediApplications">${content.ediApplicationsTitle}</h2>`;
  content.ediApplications.forEach((application, index) => {
    html += `<div class="ediApplication">${index + 1}. <strong>${
      application.title
    }</strong>: ${application.description}</div>`;
  });

  // Add Drawbacks of EDI section
  html += `<h2 id="ediDrawbacks">${content.ediDrawbacksTitle}</h2>`;
  content.ediDrawbacks.forEach((drawback, index) => {
    html += `<div class="ediDrawback">${index + 1}. <strong>${
      drawback.title
    }</strong>: ${drawback.description}</div>`;
  });

  // Add Electronic Payment Systems section
  html += `<h2 id="ePayment">${content.ePaymentTitle}</h2>`;
  html += `<p>${content.ePaymentDescription}</p>`;

  // Add Characteristics of Electronic Payment System section
  html += `<h2 id="ePaymentCharacteristics">${content.ePaymentCharacteristicsTitle}</h2>`;
  content.ePaymentCharacteristics.forEach((characteristic, index) => {
    html += `<div class="ePaymentCharacteristic">${index + 1}. <strong>${
      characteristic.title
    }</strong>: ${characteristic.description}</div>`;
  });

  // Add Comparison between Electronic Payment System and Traditional Payment System section
  html += `<h2 id="ePaymentVsTraditional">${content.ePaymentVsTraditionalTitle}</h2>`;
  content.ePaymentVsTraditional.forEach((comparison, index) => {
    html += `<div class="ePaymentVsTraditional">${index + 1}. <strong>${
      comparison.title
    }</strong>: ${comparison.description}</div>`;
  });

  // Add Types of Electronic Payment Systems section
  html += `<h2 id="ePaymentTypes">${content.ePaymentTypesTitle}</h2>`;
  content.ePaymentTypes.forEach((paymentType, index) => {
    html += `<div class="ePaymentType">
      <h3>${index + 1}. ${paymentType.title}</h3>
      <p><strong>Explanation:</strong> ${paymentType.explanation}</p>
      <p><strong>Use Case:</strong> ${paymentType.useCase}</p>
    </div>`;
  });

  // Add main title
  html += `<h2 id="methodsOfEPayment">${content.methodsOfEPayment}</h2>`;

  // Add Debit Cards section
  html += `<h2 id="debitCards">${content.debitCardsTitle}</h2>`;
  html += `<p>${content.debitCards.definition}</p>`;
  html += `<h3>Advantages of Debit Cards</h3>`;
  content.debitCards.advantages.forEach((advantage, index) => {
    html += `<div class="debitAdvantage">${index + 1}. <strong>${
      advantage.title
    }</strong>: ${advantage.description}</div>`;
  });
  html += `<h3>Disadvantages of Debit Cards</h3>`;
  content.debitCards.disadvantages.forEach((disadvantage, index) => {
    html += `<div class="debitDisadvantage">${index + 1}. <strong>${
      disadvantage.title
    }</strong>: ${disadvantage.description}</div>`;
  });

  // Add Credit Cards section
  html += `<h2 id="creditCards">${content.creditCardsTitle}</h2>`;
  html += `<p>${content.creditCards.definition}</p>`;
  html += `<h3>Advantages of Credit Cards</h3>`;
  content.creditCards.advantages.forEach((advantage, index) => {
    html += `<div class="creditAdvantage">${index + 1}. <strong>${
      advantage.title
    }</strong>: ${advantage.description}</div>`;
  });
  html += `<h3>Disadvantages of Credit Cards</h3>`;
  content.creditCards.disadvantages.forEach((disadvantage, index) => {
    html += `<div class="creditDisadvantage">${index + 1}. <strong>${
      disadvantage.title
    }</strong>: ${disadvantage.description}</div>`;
  });
  // Add Smart Cards section
  html += `<h2 id="smartCards">${content.smartCardsTitle}</h2>`;
  html += `<p>${content.smartCards.definition}</p>`;
  html += `<h3>Advantages of Smart Cards</h3>`;
  content.smartCards.advantages.forEach((advantage, index) => {
    html += `<div class="smartCardAdvantage">${index + 1}. <strong>${
      advantage.title
    }</strong>: ${advantage.description}</div>`;
  });
  html += `<h3>Disadvantages of Smart Cards</h3>`;
  content.smartCards.disadvantages.forEach((disadvantage, index) => {
    html += `<div class="smartCardDisadvantage">${index + 1}. <strong>${
      disadvantage.title
    }</strong>: ${disadvantage.description}</div>`;
  });

  // Add E-Cash section
  html += `<h2 id="eCash">${content.eCashTitle}</h2>`;
  html += `<p>${content.eCash.definition}</p>`;

  // Add E-cheques section
  html += `<h2 id="eCheques">${content.eChequesTitle}</h2>`;
  html += `<p>${content.eCheques.definition}</p>`;

  // Add UPI section
  html += `<h2 id="upi">${content.upiTitle}</h2>`;
  html += `<p>${content.upi.definition}</p>`;

  // Add E-Money section
  html += `<h2 id="eMoney">${content.eMoneyTitle}</h2>`;
  html += `<p>${content.eMoney.definition}</p>`;

  // Add E-Wallets section
  html += `<h2 id="eWallets">${content.eWalletsTitle}</h2>`;
  html += `<p>${content.eWallets.definition}</p>`;

  // Add EFT section
  html += `<h2 id="eft">${content.eftTitle}</h2>`;
  html += `<p>${content.eft.definition}</p>`;

  // Add ACH section
  html += `<h2 id="ach">${content.achTitle}</h2>`;
  html += `<p>${content.ach.definition}</p>`;

  // Add Risks Involved in Electronic Payment Systems section
  html += `<h2 id="risks">${content.risksTitle}</h2>`;
  content.risks.forEach((risk, index) => {
    html += `<div class="risk">${index + 1}. <strong>${risk.title}</strong>: ${
      risk.description
    }</div>`;
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
