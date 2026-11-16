/* ==========================================================================
   BURZUM BEER - LÓGICA DE INTERACCIÓN, NAVEGACIÓN Y SIMULADOR
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. MENÚ RESPONSIVE MOBILE ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Cierre del menú móvil al hacer clic en un enlace
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) {
        navMenu.classList.remove('active');
      }
    });
  });

  // --- 2. FILTRADO DE MENÚ (CERVEZAS / COMIDAS) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Quitar clase activa de todos los botones
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      menuCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'flex';
        } else {
          if (card.getAttribute('data-category') === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  // --- 3. SIMULADOR DEL GRIFO SQUADRON (SMART TAP) ---
  let currentVolume = 0;
  let pricePerMl = 32; // COP por ml por defecto ($16.000 / 500ml)
  const pouredVolumeEl = document.getElementById('pouredVolume');
  const pouredCostEl = document.getElementById('pouredCost');
  const btnPourBeer = document.getElementById('btnPourBeer');
  const btnResetTap = document.getElementById('btnResetTap');

  if (btnPourBeer) {
    btnPourBeer.addEventListener('click', () => {
      // Servir de a 50ml por clic
      currentVolume += 50;
      const totalCost = Math.round(currentVolume * pricePerMl);

      if (pouredVolumeEl) pouredVolumeEl.textContent = currentVolume;
      if (pouredCostEl) pouredCostEl.textContent = totalCost.toLocaleString('es-CO');
    });
  }

  if (btnResetTap) {
    btnResetTap.addEventListener('click', () => {
      currentVolume = 0;
      if (pouredVolumeEl) pouredVolumeEl.textContent = '0';
      if (pouredCostEl) pouredCostEl.textContent = '0';
    });
  }

});

// Función global para seleccionar cerveza del menú al grifo
function simulatePour(beerName, pricePerPinta) {
  const selectedBeerNameEl = document.getElementById('selectedBeerName');
  if (selectedBeerNameEl) {
    selectedBeerNameEl.textContent = beerName;
  }

  // Scroll suave hacia el simulador
  const simulatorEl = document.querySelector('.smart-tap-simulator');
  if (simulatorEl) {
    simulatorEl.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- 4. MANEJO DEL FORMULARIO DE CONTACTO ---
function handleFormSubmit(event) {
  event.preventDefault();
  const formResponse = document.getElementById('formResponse');
  const nombreInput = document.getElementById('nombre');
  const nombre = nombreInput ? nombreInput.value : 'Tripulante';

  if (formResponse) {
    formResponse.className = 'form-response success';
    formResponse.innerHTML = `<i class="fa-solid fa-circle-check"></i> ¡Gracias, <strong>${nombre}</strong>! Tu solicitud ha sido recibida en la Base Central. Te confirmaremos tu reserva en breve.`;

    // Limpiar formulario
    const contactForm = document.getElementById('contactForm');
    if (contactForm) contactForm.reset();
  }
}
