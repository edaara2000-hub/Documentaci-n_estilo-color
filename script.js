/**
 * ESTILO & COLOR - PELUQUERÍA ULTRA HD
 * Archivo de Lógica Interactiva (script.js)
 * 
 * Funcionalidades:
 * 1. Menú móvil interactivo (hamburguesa accesible y fluido).
 * 2. Comparador interactivo "Antes y Después" con soporte táctil y mouse.
 * 3. Selector de casos en galería "Antes y Después" (Balayage, Keratina, Novias).
 * 4. Filtro por categoría en Catálogo de Trabajos (Corte #1 al #9).
 * 5. Modal Lightbox con ficha técnica detallada (tinturas utilizadas y técnica).
 * 6. Acordeón interactivo de Preguntas Frecuentes (FAQ).
 * 7. Formulario de contacto con validación y base de datos local (localStorage).
 * 8. Resaltado de enlace activo de navegación según scroll.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. MENÚ MÓVIL RESPONSIVE
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta-btn');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenuBtn.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Cerrar al hacer clic fuera del menú móvil
    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target) && mobileNav.classList.contains('open')) {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ==========================================================================
     2. COMPARADOR INTERACTIVO ANTES Y DESPUÉS (Slider)
     ========================================================================== */
  const baBox = document.getElementById('baComparisonBox');
  const baAfterContainer = document.getElementById('baAfterContainer');
  const baHandle = document.getElementById('baHandle');

  let isDragging = false;

  function updateSliderPosition(x) {
    if (!baBox || !baAfterContainer || !baHandle) return;
    const rect = baBox.getBoundingClientRect();
    let posX = x - rect.left;
    if (posX < 0) posX = 0;
    if (posX > rect.width) posX = rect.width;

    const percentage = (posX / rect.width) * 100;
    baHandle.style.left = `${percentage}%`;
    baAfterContainer.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
  }

  if (baBox) {
    baBox.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Soporte para dispositivos táctiles (móviles / tablets)
    baBox.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches.length > 0) {
        updateSliderPosition(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches.length > 0) {
        updateSliderPosition(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  /* ==========================================================================
     3. TABS PARA CASOS DE ANTES Y DESPUÉS
     ========================================================================== */
  const baTabButtons = document.querySelectorAll('.ba-tab-btn');
  const baImageBefore = document.getElementById('baImageBefore');
  const baImageAfter = document.getElementById('baImageAfter');
  const baCaseTitle = document.getElementById('baCaseTitle');
  const baCaseDesc = document.getElementById('baCaseDesc');

  const baCasesData = {
    balayage: {
      title: "Balayage Rubio Miel & Tonalización Fría",
      desc: "<strong>Procedimiento realizado:</strong> Decoloración controlada con plex protector Wella Blondor + Tonalización sin amoníaco Color Touch + Hidratación intensiva con keratina líquida. Cero quiebre y máxima suavidad al tacto.",
      beforeImg: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80",
      afterImg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80"
    },
    keratina: {
      title: "Tratamiento de Keratina Brasileña Antifrizz",
      desc: "<strong>Procedimiento realizado:</strong> Sellado térmico orgánico con aminoácidos de keratina pura. Eliminación del 100% del encrespamiento, reestructuración de la hebra maltratada y acabado brillante efecto espejo.",
      beforeImg: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80",
      afterImg: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80"
    },
    novia: {
      title: "Peinado de Novia Romántica & Ondas al Agua",
      desc: "<strong>Procedimiento realizado:</strong> Preparación con protector térmico, marcación de ondas con tenaza cónica de turmalina, fijación de larga duración antihumedad y colocación de tocado dorado floral.",
      beforeImg: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1200&q=80",
      afterImg: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
    }
  };

  baTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      baTabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const caseKey = btn.dataset.case;
      const data = baCasesData[caseKey];

      if (data && baImageBefore && baImageAfter && baCaseTitle && baCaseDesc) {
        baImageBefore.src = data.beforeImg;
        baImageAfter.src = data.afterImg;
        baCaseTitle.textContent = data.title;
        baCaseDesc.innerHTML = data.desc;

        // Reset slider position to 50%
        if (baHandle && baAfterContainer) {
          baHandle.style.left = '50%';
          baAfterContainer.style.clipPath = 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)';
        }
      }
    });
  });

  /* ==========================================================================
     4. FILTROS DEL CATÁLOGO DE CORTES (Corte #1 al #9)
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const catalogCards = document.querySelectorAll('.catalog-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.dataset.filter;

      catalogCards.forEach(card => {
        const category = card.dataset.category;
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     5. MODAL LIGHTBOX CON FICHA TÉCNICA DE LOS CORTES
     ========================================================================== */
  const catalogDetails = {
    1: {
      title: "Balayage Vainilla Doré",
      category: "Tinturas & Balayage Especializado",
      img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
      technique: "Balayage a mano alzada con técnica 'Freehand' en diagonal, fusionando tonos mantequilla y vainilla para generar luminosidad profunda.",
      products: "Decolorante Wella BlondorPlex + Tonalización sin amoníaco Color Touch 9/73 + Mascarilla Olaplex No. 3.",
      idealFor: "Bases castañas claras o rubias oscuras que buscan brillo sin comprometer la raíz natural."
    },
    2: {
      title: "Bob Francés Texturizado",
      category: "Cortes de Tendencia & Visagismo",
      img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1000&q=80",
      technique: "Corte estructurado a la altura de la mandíbula con capas desfiladas invisibles y flequillo cortina ligero.",
      products: "Spray texturizador con sal marina de L'Oréal Tecni.Art + Óleo sublimador de argán.",
      idealFor: "Rostros ovalados y cuadrados que buscan resaltar el cuello y los pómulos con máxima elegancia."
    },
    3: {
      title: "Recogido Romántico de Novia",
      category: "Peinados de Fiesta & Novias",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
      technique: "Semirecogido con trenza espiga desarmada, bucles abiertos pulidos y anclaje invisible para tocado o velo.",
      products: "Laca de fijación flexible Infinium L'Oréal + Bruma de brillo Gloss Glam.",
      idealFor: "Novias, madrinas y eventos de gala tanto de día como de noche con vestidos de espalda descubierta."
    },
    4: {
      title: "Morena Iluminada Caramelo",
      category: "Tinturas & Balayage Especializado",
      img: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1000&q=80",
      technique: "Baby highlights en zonas estratégicas de contorno y medios, tonalizadas en gamas avellana, miel y toffee.",
      products: "Tintura profesional Schwarzkopf Igora Royal sin amoníaco abrasivo + Baño de sellado de brillo ácido.",
      idealFor: "Cabellos castaños oscuros o negros que desean iluminación sutil sin pasar por decoloraciones agresivas."
    },
    5: {
      title: "Corte Mariposa (Butterfly Cut)",
      category: "Cortes de Tendencia & Visagismo",
      img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1000&q=80",
      technique: "Capas escalonadas en doble nivel que emulan dos cortes en uno: volumen en la coronilla y longitud fluida.",
      products: "Mousse voluminizadora en raíces + Serum sellador de puntas termoactivo.",
      idealFor: "Cabellos medianos a largos que buscan máximo cuerpo, movimiento al caminar y ligereza."
    },
    6: {
      title: "Ondas Hollywood Glam para Gala",
      category: "Peinados de Fiesta & Novias",
      img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80",
      technique: "Marcado unidireccional con cepillado en bloque y pulido espejo para crear la clásica silueta de ondas continuas.",
      products: "Serum antifrizz con queratina + Fijador de fijación extra fuerte resistente a la humedad y pista de baile.",
      idealFor: "Graduaciones, galas elegantes y cenas de etiqueta."
    },
    7: {
      title: "Rubio Platino Ice & Gloss",
      category: "Tinturas & Balayage Especializado",
      img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80",
      technique: "Decoloración global de alta precisión respetando el cuero cabelludo sensible, seguido de matiz polar perlado.",
      products: "Polvo decolorante Blondor Multi Blonde + Sistema fortalecedor Olaplex pasos 1 y 2 + Mascarilla violeta anti-amarillo.",
      idealFor: "Personalidades audaces que desean un rubio nórdico impecable, luminoso y saludable."
    },
    8: {
      title: "Lob Elegance Moderno",
      category: "Cortes de Tendencia & Visagismo",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
      technique: "Long bob con inclinación sutil hacia el frente y corte en seco para esculpir la densidad según la caída natural.",
      products: "Crema de peinado suavizante sin enjuague + Aceite de camelia nutritivo.",
      idealFor: "Mujeres ejecutivas y profesionales que buscan un look sofisticado de bajísimo mantenimiento diario."
    },
    9: {
      title: "Moño Alto Desenfadado (Updo)",
      category: "Peinados de Fiesta & Novias",
      img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1000&q=80",
      technique: "Moño alto texturizado con mechones frontales sueltos para enmarcar el rostro con suavidad y ligereza.",
      products: "Polvo volumétrico en raíces + Spray de fijación satinada y tiaras doradas de fantasía fina.",
      idealFor: "Matrimonios de verano, fiestas de fin de año o invitadas de gala."
    }
  };

  const modal = document.getElementById('catalogModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalTechnique = document.getElementById('modalTechnique');
  const modalProducts = document.getElementById('modalProducts');
  const modalIdealFor = document.getElementById('modalIdealFor');
  const modalCtaBtn = document.getElementById('modalCtaBtn');

  window.openModal = function(index) {
    const item = catalogDetails[index];
    if (!item || !modal) return;

    modalImg.src = item.img;
    modalBadge.textContent = `CORTE #${index}`;
    modalTitle.textContent = item.title;
    modalCategory.textContent = item.category;
    modalTechnique.textContent = item.technique;
    modalProducts.textContent = item.products;
    modalIdealFor.textContent = item.idealFor;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  if (modalCtaBtn) {
    modalCtaBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  /* ==========================================================================
     6. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
     ========================================================================== */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parentItem = header.parentElement;
      const isActive = parentItem.classList.contains('active');

      // Cerrar otros acordeones para mantener orden visual
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isActive) {
        parentItem.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     7. FORMULARIO DE CONTACTO & BASE DE DATOS LOCAL (LocalStorage)
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccessMsg = document.getElementById('formSuccessMsg');
  const consultsCount = document.getElementById('consultsCount');
  const consultsList = document.getElementById('consultsList');
  const toggleConsultsBtn = document.getElementById('toggleConsultsBtn');

  // Key de almacenamiento local
  const STORAGE_KEY = 'estilo_color_consultas';

  function getStoredConsultations() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  function renderConsultations() {
    const consults = getStoredConsultations();
    if (consultsCount) {
      consultsCount.textContent = consults.length;
    }

    if (consultsList) {
      if (consults.length === 0) {
        consultsList.innerHTML = '<p style="font-size:0.8rem; color:#888; padding:10px 0;">Aún no hay consultas registradas en este navegador.</p>';
      } else {
        consultsList.innerHTML = consults.slice().reverse().map(item => `
          <div class="consult-item">
            <div class="consult-meta">
              <span><strong>${escapeHTML(item.name)}</strong> (${escapeHTML(item.subject)})</span>
              <small>${item.date}</small>
            </div>
            <p style="margin: 4px 0 2px; color:#555;">${escapeHTML(item.message)}</p>
            <small style="color:#997833;">✉ ${escapeHTML(item.email)}</small>
          </div>
        `).join('');
      }
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Cargar consultas iniciales al iniciar
  renderConsultations();

  if (toggleConsultsBtn && consultsList) {
    toggleConsultsBtn.addEventListener('click', () => {
      const isHidden = consultsList.classList.contains('d-none');
      if (isHidden) {
        consultsList.classList.remove('d-none');
        toggleConsultsBtn.textContent = 'Ocultar Consultas';
      } else {
        consultsList.classList.add('d-none');
        toggleConsultsBtn.textContent = 'Ver Consultas';
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Limpiar errores previos
      clearErrors();

      let isValid = true;

      // Validación de Nombre
      if (!fullNameInput.value.trim() || fullNameInput.value.trim().length < 3) {
        showError('nameError', 'Por favor ingresa tu nombre completo (mínimo 3 caracteres).');
        isValid = false;
      }

      // Validación de Correo
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        showError('emailError', 'Ingresa un correo electrónico válido.');
        isValid = false;
      }

      // Validación de Asunto
      if (!subjectInput.value) {
        showError('subjectError', 'Por favor selecciona el motivo de tu consulta.');
        isValid = false;
      }

      // Validación de Mensaje
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showError('messageError', 'El mensaje debe tener al menos 10 caracteres explicativos.');
        isValid = false;
      }

      if (!isValid) return;

      // Simular guardado y animación de carga
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Guardando en Base de Datos...';

      setTimeout(() => {
        const newConsultation = {
          id: Date.now(),
          name: fullNameInput.value.trim(),
          email: emailInput.value.trim(),
          subject: subjectInput.value,
          message: messageInput.value.trim(),
          date: new Date().toLocaleDateString('es-CL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };

        // Guardar en LocalStorage
        const consults = getStoredConsultations();
        consults.push(newConsultation);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(consults));

        // Actualizar vista
        renderConsultations();

        // Mostrar confirmación
        if (formSuccessMsg) {
          formSuccessMsg.classList.remove('d-none');
        }

        // Restablecer formulario
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = 'ENVIAR MENSAJE';

        // Ocultar mensaje de confirmación después de 6 segundos
        setTimeout(() => {
          if (formSuccessMsg) {
            formSuccessMsg.classList.add('d-none');
          }
        }, 6000);

      }, 700);
    });
  }

  function showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function clearErrors() {
    ['nameError', 'emailError', 'subjectError', 'messageError'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
  }

  /* ==========================================================================
     8. NAVEGACIÓN ACTIVA SEGÚN SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

});
