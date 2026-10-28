document.addEventListener("DOMContentLoaded", () => {
  // ==================== INTRO TYPEWRITER ====================
  const line1El = document.getElementById("intro_typewriter_line1");
  const line2El = document.getElementById("intro_typewriter_line2");
  const cursor1 = document.getElementById("cursor_line1");
  const cursor2 = document.getElementById("cursor_line2");
  const exploreBtn = document.querySelector(".intro_explore_btn");

  const line1Text = "WELCOME TO LOGIE'S";
  const line2Text = "DIGITAL PORTFOLIO";

  const typeSpeed = 70;
  const delayBetweenLines = 300;

  let i = 0;
  let j = 0;

  function typeLine1() {
    if (i < line1Text.length) {
      line1El.textContent += line1Text.charAt(i);
      i++;
      setTimeout(typeLine1, typeSpeed);
    } else {
      setTimeout(() => {
        cursor1.classList.add("hidden");
        cursor2.classList.remove("hidden");
        typeLine2();
      }, delayBetweenLines);
    }
  }

  function typeLine2() {
    if (j < line2Text.length) {
      line2El.textContent += line2Text.charAt(j);
      j++;
      setTimeout(typeLine2, typeSpeed);
    } else {
      exploreBtn.classList.add("visible");
    }
  }

  typeLine1();

  // ==================== HOME ROLE TYPEWRITER ====================
  const homeRoleEl = document.getElementById("home_role_typewriter");
  const homeRoleText = "SYSTEM DEVELOPER";
  let roleIndex = 0;
  let hasRoleTyped = false;

  function typeHomeRole() {
    if (hasRoleTyped) return;
    hasRoleTyped = true;

    function typeChar() {
      if (roleIndex < homeRoleText.length) {
        homeRoleEl.textContent += homeRoleText.charAt(roleIndex);
        roleIndex++;
        setTimeout(typeChar, 80);
      }
    }
    typeChar();
  }

  // Intersection observer to type when scrolling into Home
  const homeSection = document.getElementById("home");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeHomeRole();
        }
      });
    },
    { threshold: 0.3 }
  );

  if (homeSection) {
    observer.observe(homeSection);
  }

  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      setTimeout(typeHomeRole, 400);
    });
  }

  // ==================== NAVBAR & SOCIAL CLICKS ====================
  const navLinks = document.querySelectorAll(".home_nav_link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    });
  });

  const socialItems = document.querySelectorAll(".home_social_item");
  socialItems.forEach((item) => {
    item.addEventListener("click", function () {
      socialItems.forEach((s) => s.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // ==================== RESUME MODAL HANDLERS ====================
  const resumeModal = document.getElementById("resume_modal");
  const openResumeBtn = document.getElementById("open_resume_modal");
  const closeResumeBtn = document.getElementById("close_resume_modal");

  function openModal() {
    if (resumeModal) {
      resumeModal.classList.add("active");
      resumeModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; // Prevent page scroll when modal open
    }
  }

  function closeModal() {
    if (resumeModal) {
      resumeModal.classList.remove("active");
      resumeModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "auto";
    }
  }

  if (openResumeBtn) {
    openResumeBtn.addEventListener("click", openModal);
  }

  if (closeResumeBtn) {
    closeResumeBtn.addEventListener("click", closeModal);
  }

  // Close modal when clicking on the dark backdrop
  if (resumeModal) {
    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) {
        closeModal();
      }
    });
  }

  // Close modal on 'Escape' key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && resumeModal.classList.contains("active")) {
      closeModal();
    }
  });
});