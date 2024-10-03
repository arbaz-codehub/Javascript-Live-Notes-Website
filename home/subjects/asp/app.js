// app.js
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".pdf-btn");
  const loadingIndicator = document.getElementById("loading");
  let pdfCache = new Map();

  // Retrieve the pdfCache from sessionStorage
  const storedCache = sessionStorage.getItem("pdfCache");
  if (storedCache) {
    pdfCache = new Map(JSON.parse(storedCache));
    console.log("Retrieved PDF cache from sessionStorage");
  }

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const pdfFile = this.getAttribute("data-pdf");
      loadPDF(pdfFile);
    });
  });

  function loadPDF(pdfUrl) {
    loadingIndicator.style.display = "block";

    if (pdfCache.has(pdfUrl)) {
      console.log(`Using cached PDF: ${pdfUrl}`);
      openPDFInFullScreen(pdfCache.get(pdfUrl));
      loadingIndicator.style.display = "none";
    } else {
      console.log(`Lazy loading PDF: ${pdfUrl}`);
      fetch(pdfUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.blob();
        })
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob);
          pdfCache.set(pdfUrl, objectURL);
          openPDFInFullScreen(objectURL);
        })
        .catch((error) => {
          console.error("Error loading PDF:", error);
          alert("Failed to load PDF. Please try again.");
        })
        .finally(() => {
          loadingIndicator.style.display = "none";
        });
    }
  }

  function openPDFInFullScreen(objectURL) {
    const viewerUrl = `pdf-viewer.html?file=${encodeURIComponent(objectURL)}`;
    window.open(viewerUrl, "_blank", "fullscreen=yes");
  }
});
