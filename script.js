// Global variables
let lastScrollTop = 0;
const timeText = document.querySelector(".time");

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initNavigation();
  initDateTimeDisplay();
  initScrollEffect();
  initActiveLinks();
  initMarqueeText();
  initProjectSection();
  
  // Set initial active state for menu items
  setActiveMenuItemOnLoad();
  
  // Ensure marquee is visible if about section is initially in view
  ensureMarqueeVisibility();
});

// Set active menu item based on current section
function setActiveMenuItemOnLoad() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;
  const hash = window.location.hash;
  
  // If we have a hash, set that link as active
  if (hash) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === hash) {
        link.classList.add('active');
      }
    });
  } else {
    // Set first item as active by default
    if (navLinks.length > 0) {
      navLinks[0].classList.add('active');
    }
  }
}

// Handle navigation functionality
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const logo = document.getElementById('logo');
  
  // Toggle mobile menu
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenuBtn.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      
      // Lock/unlock body scroll
      if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }
  
  // Handle nav link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Update active state
      navLinks.forEach(item => item.classList.remove('active'));
      link.classList.add('active');
      
      // Close mobile menu if open
      if (mobileNav && mobileNav.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Logo click - scroll to top
  if (logo) {
    logo.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Close menu on window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && mobileNav && mobileNav.classList.contains('active')) {
      mobileMenuBtn.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
      mobileMenuBtn.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    }
  });
}

// Handle scroll effects
function initScrollEffect() {
  const header = document.getElementById('main-header');
  
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Header hide/show on scroll
    if (scrollTop > lastScrollTop && scrollTop > 80) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }
    
    // Add 'scrolled' class to header when page is scrolled
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Enhanced marquee visibility control
    const aboutSection = document.querySelector('.about');
    const textWrapper = document.querySelector('.about .text-wrapper');
    
    if (aboutSection && textWrapper) {
      const aboutRect = aboutSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Make marquee visible if about section is in viewport or near it
      if (aboutRect.top < viewportHeight + 200 && aboutRect.bottom > -200) {
        textWrapper.style.opacity = '1';
        textWrapper.style.visibility = 'visible';
        
        // Apply different styles based on screen size
        if (window.innerWidth <= 768) {
          // Mobile styles
          textWrapper.style.transform = 'rotate(0)';
          textWrapper.style.position = 'relative';
          textWrapper.style.bottom = '0';
        } else {
          // Desktop styles
          textWrapper.style.transform = 'rotate(-1.5deg)';
          textWrapper.style.bottom = '-120px';
        }
      }
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Update marquee styling on window resize
  window.addEventListener("resize", () => {
    ensureMarqueeVisibility();
  });
}

// Initialize marquee text
function initMarqueeText() {
  const textWrappers = document.querySelectorAll('.text-wrapper .text');
  
  textWrappers.forEach(textWrapper => {
    // Clone the existing content to create continuous flow
    const originalContent = textWrapper.innerHTML;
    textWrapper.innerHTML = originalContent + originalContent + originalContent;
  });
}

// Set active link based on scroll position
function initActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Handle date & time display
function initDateTimeDisplay() {
  // Philippines timezone display
  updateTime();
  
  // Update time every second
  setInterval(updateTime, 1000);
  
  // Set copyright year
  const yearText = document.getElementById("year");
  if (yearText) {
    yearText.textContent = new Date().getFullYear();
  }
}

// Update the time display
function updateTime() {
  if (!timeText) return;
  
  const now = new Date();
  let formattedTime = now.toLocaleTimeString("en-US", {
    timeZone: "Asia/Manila",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });
  
  timeText.textContent = formattedTime + " | Manila, Philippines";
}

// Ensure marquee visibility on page load
function ensureMarqueeVisibility() {
  const aboutSection = document.querySelector('.about');
  const textWrapper = document.querySelector('.about .text-wrapper');
  
  if (aboutSection && textWrapper) {
    const aboutRect = aboutSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    if (aboutRect.top < viewportHeight + 200 && aboutRect.bottom > -200) {
      textWrapper.style.opacity = '1';
      textWrapper.style.visibility = 'visible';
      
      // Apply different styles based on screen size
      if (window.innerWidth <= 768) {
        // Mobile styles
        textWrapper.style.transform = 'rotate(0)';
        textWrapper.style.position = 'relative';
        textWrapper.style.bottom = '0';
      } else {
        // Desktop styles
        textWrapper.style.transform = 'rotate(-1.5deg)';
        textWrapper.style.bottom = '-120px';
      }
    }
  }
}

// Initialize project section with animations and effects
function initProjectSection() {
  const projectPanels = document.querySelectorAll('.project-panel');
  let activePanel = null;
  
  // Check if device is mobile/small screen
  const isMobileView = () => window.innerWidth <= 768;
  
  projectPanels.forEach(panel => {
    // Initial setup
    const header = panel.querySelector('.project-panel-header');
    const content = panel.querySelector('.project-panel-content');
    const inner = panel.querySelector('.project-panel-inner');
    
    // Set initial height to 0
    content.style.height = '0px';
    
    // Add click event for panel headers (always active)
    header.addEventListener('click', (e) => {
      const isActive = panel.classList.contains('active');
      
      // Close other panels first
      projectPanels.forEach(otherPanel => {
        if (otherPanel !== panel && otherPanel.classList.contains('active')) {
          otherPanel.classList.remove('active');
          otherPanel.classList.remove('hover');
          otherPanel.querySelector('.project-panel-content').style.height = '0px';
        }
      });
      
      // Toggle current panel
      if (isActive) {
        panel.classList.remove('active');
        panel.classList.remove('hover');
        content.style.height = '0px';
        activePanel = null;
      } else {
        panel.classList.add('active');
        panel.classList.add('hover');
        content.style.height = inner.offsetHeight + 'px';
        activePanel = panel;
        
        // Smooth scroll to panel if not in view
        const panelRect = panel.getBoundingClientRect();
        const headerHeight = document.querySelector('#main-header').offsetHeight;
        const isInView = (
          panelRect.top >= headerHeight &&
          panelRect.bottom <= window.innerHeight
        );
        
        if (!isInView) {
          const scrollPosition = panel.offsetTop - headerHeight - 20;
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
        }
      }
      
      // Prevent event propagation
      e.stopPropagation();
    });
    
    // Only add hover events on desktop
    if (!('ontouchstart' in window)) {
      panel.addEventListener('mouseenter', () => {
        // Only use hover effect on desktop views
        if (!isMobileView() && !panel.classList.contains('active')) {
          panel.classList.add('hover');
          
          // Apply subtle animations to child elements
          const projectNumber = panel.querySelector('.project-number');
          const projectTitle = panel.querySelector('.project-title');
          const tags = panel.querySelectorAll('.project-tags span');
          
          if (projectNumber) {
            projectNumber.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease';
          }
          
          if (projectTitle) {
            projectTitle.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease';
          }
          
          tags.forEach((tag, index) => {
            tag.style.transition = `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s, background-color 0.3s ease, color 0.3s ease`;
          });
        }
      });
      
      panel.addEventListener('mouseleave', () => {
        if (!panel.classList.contains('active')) {
          panel.classList.remove('hover');
        }
      });
    }
    
    // Prevent link clicks from closing the panel
    panel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
  });
  
  // Add resize handler to maintain proper height on window resize
  window.addEventListener('resize', () => {
    if (activePanel) {
      const content = activePanel.querySelector('.project-panel-content');
      const inner = activePanel.querySelector('.project-panel-inner');
      content.style.height = inner.offsetHeight + 'px';
    }
  });
}