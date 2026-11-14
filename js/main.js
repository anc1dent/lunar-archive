const detailPanel = document.getElementById("detail");
const byId = (id) => document.getElementById(id);

function openDevice(index) {
  const device = devices[index];
  if (!device) return;

  byId("detail-index").textContent = `DEVICE 0${index + 1} / 05`;
  byId("detail-title").textContent = device.title;
  byId("detail-description").textContent = device.description;
  byId("detail-year").textContent = device.year;
  byId("detail-mission").textContent = device.mission;
  byId("detail-purpose").textContent = device.purpose;
  byId("detail-status").textContent = device.status;

  const image = byId("device-image");
  const placeholder = byId("photo-placeholder");
  if (device.image) {
    image.src = device.image;
    image.alt = device.imageAlt || device.title;
    image.hidden = false;
    placeholder.hidden = true;
    image.onerror = () => {
      image.hidden = true;
      placeholder.hidden = false;
    };
  } else {
    image.removeAttribute("src");
    image.hidden = true;
    placeholder.hidden = false;
  }

  const source = byId("detail-source");
  source.textContent = device.source ? `Source: ${device.source}` : "";
  detailPanel.hidden = false;
  detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function goHome() {
  detailPanel.hidden = true;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-device]").forEach((button) => {
  button.addEventListener("click", () => openDevice(Number(button.dataset.device)));
});
document.getElementById("back-button").addEventListener("click", goHome);
document.querySelectorAll("[data-home]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    goHome();
  });
});
