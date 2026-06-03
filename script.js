// ===============================
// PROJECT DATA
// ===============================

const projects = [{
        id: 1,
        title: "Neural Style Transfer App",
        desc: "Real-time artistic style transfer using deep learning.",
        tags: ["ai", "web"],
        tech: ["Python", "TensorFlow", "React", "FastAPI"],
        featured: true,
        complexity: 9,
        date: "2024-11"
    },
    {
        id: 2,
        title: "Smart Code Reviewer",
        desc: "AI-powered code review tool.",
        tags: ["ai"],
        tech: ["GPT-4", "Node.js", "GitHub API"],
        featured: true,
        complexity: 10,
        date: "2024-10"
    },
    {
        id: 3,
        title: "E-Commerce Platform",
        desc: "Full-stack marketplace.",
        tags: ["web"],
        tech: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
        featured: false,
        complexity: 8,
        date: "2024-08"
    }, {
        id: 4,
        title: "Food Delivery Mobile App",
        desc: "Android application for food ordering.",
        tags: ["mobile"],
        tech: ["Flutter", "Firebase"],
        featured: true,
        complexity: 7,
        date: "2025-05"
    }
];

let currentFilter = "all";
let currentSort = "latest";
let searchQuery = "";

const searchInput =
    document.getElementById("projectSearch");

if (searchInput) {

    searchInput.addEventListener("input", e => {

        searchQuery =
            e.target.value.trim().toLowerCase();

        renderProjects();

    });

}

// ===============================
// PROJECT RENDERING
// ===============================
console.log("Filter:", currentFilter);
console.log("Sort:", currentSort);
console.log("Search:", searchQuery);


function renderProjects() {
    const grid = document.getElementById("projectGrid");

    if (!grid) return;

    let filtered = projects.filter(project => {

        const filterMatch =
            currentFilter === "all" ||
            project.tags.some(
                tag =>
                tag.trim().toLowerCase() ===
                currentFilter.trim().toLowerCase()
            );

        const searchMatch =
            searchQuery === "" ||
            project.title.toLowerCase().includes(searchQuery) ||
            project.desc.toLowerCase().includes(searchQuery);

        return filterMatch && searchMatch;

    });

    console.log("Filtered Projects:", filtered);
    console.log("Count:", filtered.length);

    if (currentSort === "latest") {
        filtered.sort((a, b) => b.date.localeCompare(a.date));
    }

    if (currentSort === "complex") {
        filtered.sort((a, b) => b.complexity - a.complexity);
    }

    console.log("Grid Found:", grid);

    grid.innerHTML = filtered
        .map(
            project => `
      <div class="card-hover rounded-2xl bg-dark-800 border border-dark-600 overflow-hidden">
        <div class="p-5">
          <h3 class="text-xl font-semibold mb-2">${project.title}</h3>

          <p class="text-gray-400 mb-4">
            ${project.desc}
          </p>

          <div class="flex flex-wrap gap-2 mb-4">
            ${project.tech
              .map(
                tech => `
                <span class="px-2 py-1 rounded bg-dark-700 text-xs">
                  ${tech}
                </span>
              `
              )
              .join("")}
          </div>
        </div>
      </div>
    `
    )
    .join("");

  lucide.createIcons();
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {

    console.log("Button clicked:", btn.dataset.filter);

    currentFilter = btn.dataset.filter;

    console.log("currentFilter =", currentFilter);
    console.log("searchQuery =", searchQuery);

    renderProjects();

  });
});

document.querySelectorAll(".sort-btn").forEach(btn => {
  btn.addEventListener("click", () => {

    currentSort = btn.dataset.sort;

    renderProjects();

  });
});

// ===============================
// MOBILE MENU
// ===============================

const mobileMenuBtn =
  document.getElementById("mobileMenuBtn");

const mobileMenu =
  document.getElementById("mobileMenu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// ===============================
// CHATBOT
// ===============================

const chatKnowledge = {
  projects:
    "Vasavi has built multiple AI and Web projects.",
  skills:
    "HTML, CSS, JavaScript, React, Node.js, Python, AI/ML.",
  contact:
    "You can contact Vasavi through the contact form.",
  experience:
    "Computer Science student passionate about AI and Web Development."
};

function getChatResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes("project"))
    return chatKnowledge.projects;

  if (msg.includes("skill"))
    return chatKnowledge.skills;

  if (msg.includes("contact"))
    return chatKnowledge.contact;

  if (msg.includes("experience"))
    return chatKnowledge.experience;

  return "Ask me about projects, skills, contact or experience.";
}

const chatForm = document.getElementById("chatForm");

if (chatForm) {
  chatForm.addEventListener("submit", e => {
    e.preventDefault();

    const input =
      document.getElementById("chatInput");

    const container =
      document.getElementById("chatMessages");

    const message = input.value.trim();

    if (!message) return;

    container.innerHTML += `
      <div class="chat-bubble bg-accent/20 ml-auto">
        ${message}
      </div>
    `;

    input.value = "";

    setTimeout(() => {
      container.innerHTML += `
        <div class="chat-bubble bg-dark-700">
          ${getChatResponse(message)}
        </div>
      `;

      container.scrollTop =
        container.scrollHeight;
    }, 500);
  });
}

// ===============================
// TOAST
// ===============================

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ===============================
// CONTACT FORM
// ===============================

const form = document.getElementById("contactForm");

if (form) {

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const btn = document.getElementById("submitBtn");

    const name =
      document.getElementById("contactName").value;

    const email =
      document.getElementById("contactEmail").value;

    const message =
      document.getElementById("contactMessage").value;

    btn.disabled = true;
    btn.innerHTML = "Sending...";

    try {

      await fetch(
  "https://script.google.com/macros/s/AKfycbzEVFKNotC3QVMymQzpvBxed6_ox3jg2LcESx9y2F9eKo_ABBo25aN43N6wA2sLO7Rj/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: new URLSearchParams({
            name,
            email,
            message
          })
        }
      );

      alert("Message Sent Successfully!");
      form.reset();

    } catch (error) {

      console.error(error);
      alert("Failed to send message");

    }

    btn.disabled = false;

    btn.innerHTML =
      '<i data-lucide="send" class="w-4 h-4"></i> Send Message';

    lucide.createIcons();

  });

}
// ===============================
// SCROLL REVEAL
// ===============================

const observer =
  new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "visible"
          );
        }
      });
    },
    { threshold: 0.1 }
  );

document
  .querySelectorAll(".section-reveal")
  .forEach(section =>
    observer.observe(section)
  );

// ===============================
// INIT
// ===============================


// ===============================
// CHAT TOGGLE
// ===============================

const chatToggle =
  document.getElementById("chatToggle");

const chatPanel =
  document.getElementById("chatPanel");

const chatClose =
  document.getElementById("chatClose");

if (chatToggle && chatPanel) {

  chatToggle.addEventListener("click", () => {

    chatPanel.classList.toggle("hidden");

  });

}

if (chatClose && chatPanel) {

  chatClose.addEventListener("click", () => {

    chatPanel.classList.add("hidden");

  });

}



renderProjects();
lucide.createIcons();