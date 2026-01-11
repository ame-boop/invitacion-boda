/* =========================
   CONFIG (EDITAR AQUÍ)
   ========================= */
   const CONFIG = {
    coupleNames: "Kristel + Guilia",
  
    // Fecha/hora local Italia (CEST en junio suele ser +02:00)
    // Si el evento fuera en CET (+01:00), se ajusta. Pero para junio lo normal es +02:00.
    dateISO: "2026-06-06T17:30:00+02:00",
  
    datePrettyShort: "06/06/2026",
    datePrettyLong: "Sábado 06 de junio de 2026",
    timePretty: "17:30",
    cityPretty: "Cortina d'Ampezzo, Belluno, Italia",
  
    venueName: "Cortina d'Ampezzo",
    venueAddress: "Cortina d'Ampezzo, Belluno, Italia",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Cortina%20d%27Ampezzo%2C%20Belluno%2C%20Italia",
  
    rsvpDeadline: "15 de abril de 2026",
  
    // RSVP en Google Form (PEGÁS EL LINK REAL DESPUÉS)
    googleFormUrl: "https://forms.gle/PEGAR-TU-LINK-AQUI"
  };
  
  /* =========================
     NAV (mobile)
     ========================= */
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("isOpen");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });
  
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("isOpen");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }
  
  /* =========================
     HELPERS
     ========================= */
  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }
  function setAttr(id, attr, value) {
    const el = document.getElementById(id);
    if (el) el.setAttribute(attr, value);
  }
  
  /* =========================
     TEXT INJECTION
     ========================= */
  setText("coupleNames", CONFIG.coupleNames);
  
  setText("weddingDateText", CONFIG.datePrettyShort);
  setText("weddingTimeText", CONFIG.timePretty);
  setText("weddingCityText", "Cortina d'Ampezzo, Italia");
  
  setText("dateLongText", CONFIG.datePrettyLong);
  setText("timeLongText", `${CONFIG.timePretty} (llegar 30 min antes)`);
  
  setText("venueText", CONFIG.cityPretty);
  setText("venueName", CONFIG.venueName);
  setText("venueAddress", "Belluno, Italia");
  setAttr("mapsLink", "href", CONFIG.googleMapsUrl);
  
  setText("rsvpDeadlineText", CONFIG.rsvpDeadline);
  setAttr("formBtn", "href", CONFIG.googleFormUrl);
  
  /* =========================
     COPY ADDRESS
     ========================= */
  const copyAddressBtn = document.getElementById("copyAddressBtn");
  const copyHint = document.getElementById("copyHint");
  
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(CONFIG.venueAddress);
        if (copyHint) copyHint.textContent = "Dirección copiada ✅";
        setTimeout(() => { if (copyHint) copyHint.textContent = ""; }, 2200);
      } catch (e) {
        if (copyHint) copyHint.textContent = "No pude copiar 😭 Copiala manualmente.";
        setTimeout(() => { if (copyHint) copyHint.textContent = ""; }, 2600);
      }
    });
  }
  
  /* =========================
     RSVP MESSAGE (para copiar)
     ========================= */
  const guestName = document.getElementById("guestName");
  const attendance = document.getElementById("attendance");
  const notes = document.getElementById("notes");
  const copyRsvpBtn = document.getElementById("copyRsvpBtn");
  const rsvpHint = document.getElementById("rsvpHint");
  
  function buildRsvpMessage() {
    const name = (guestName?.value || "").trim() || "____";
    const status = attendance?.value || "A confirmar";
    const extra = (notes?.value || "").trim();
  
    let msg = `RSVP — ${CONFIG.coupleNames}\n`;
    msg += `Nombre: ${name}\n`;
    msg += `Asistencia: ${status}\n`;
    if (extra) msg += `Notas: ${extra}\n`;
    msg += `Lugar: ${CONFIG.cityPretty}\nFecha: ${CONFIG.datePrettyShort} ${CONFIG.timePretty}`;
    return msg;
  }
  
  if (copyRsvpBtn) {
    copyRsvpBtn.addEventListener("click", async () => {
      const msg = buildRsvpMessage();
      try {
        await navigator.clipboard.writeText(msg);
        if (rsvpHint) rsvpHint.textContent = "Copiado ✅ Si querés, pegalo dentro del formulario.";
        setTimeout(() => { if (rsvpHint) rsvpHint.textContent = ""; }, 2600);
      } catch (e) {
        if (rsvpHint) rsvpHint.textContent = "No pude copiar 😭 Copiá manual.";
        setTimeout(() => { if (rsvpHint) rsvpHint.textContent = ""; }, 2600);
      }
    });
  }
  
  /* =========================
     COUNTDOWN
     ========================= */
  const cdDays = document.getElementById("cdDays");
  const cdHours = document.getElementById("cdHours");
  const cdMins = document.getElementById("cdMins");
  const cdSecs = document.getElementById("cdSecs");
  const countdownNote = document.getElementById("countdownNote");
  
  function pad2(n) { return String(n).padStart(2, "0"); }
  
  function updateCountdown() {
    const target = new Date(CONFIG.dateISO).getTime();
    const now = Date.now();
    const diff = target - now;
  
    if (diff <= 0) {
      if (cdDays) cdDays.textContent = "0";
      if (cdHours) cdHours.textContent = "00";
      if (cdMins) cdMins.textContent = "00";
      if (cdSecs) cdSecs.textContent = "00";
      if (countdownNote) countdownNote.textContent = "¡Es hoy! 🎉";
      return;
    }
  
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
  
    if (cdDays) cdDays.textContent = String(days);
    if (cdHours) cdHours.textContent = pad2(hours);
    if (cdMins) cdMins.textContent = pad2(mins);
    if (cdSecs) cdSecs.textContent = pad2(secs);
  }
  
  setInterval(updateCountdown, 1000);
  updateCountdown();
  
  /* =========================
     GALLERY MODAL
     ========================= */
  const modal = document.getElementById("modal");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");
  const modalImg = document.getElementById("modalImg");
  const modalCap = document.getElementById("modalCap");
  
  function openModal(src, cap) {
    if (!modal || !modalImg || !modalCap) return;
  
    if (!src) {
      modalImg.removeAttribute("src");
      modalImg.setAttribute("alt", "");
      modalImg.style.height = "260px";
      modalImg.style.display = "grid";
      modalImg.style.placeItems = "center";
      modalImg.style.background = "rgba(255,255,255,.04)";
      modalCap.textContent = `${cap} — (agrega una imagen para mostrarla aquí)`;
    } else {
      modalImg.style.height = "";
      modalImg.style.display = "block";
      modalImg.style.placeItems = "";
      modalImg.style.background = "";
      modalImg.setAttribute("src", src);
      modalImg.setAttribute("alt", cap || "Imagen");
      modalCap.textContent = cap || "";
    }
  
    modal.classList.add("isOpen");
    modal.setAttribute("aria-hidden", "false");
  }
  
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("isOpen");
    modal.setAttribute("aria-hidden", "true");
  }
  
  document.querySelectorAll(".gItem").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-img") || "";
      const cap = btn.getAttribute("data-caption") || "";
      openModal(src, cap);
    });
  });
  
  [modalOverlay, modalClose].forEach((el) => {
    if (!el) return;
    el.addEventListener("click", closeModal);
  });
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
  