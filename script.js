 /* ── EmailJS init ── */
  emailjs.init('Wijd-lfjfangHHnP2'); // ← STEP 3: paste your EmailJS Public Key here

  /* ── Side Drawer ── */
  const ham = document.getElementById('hamburger');
  const mMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('drawer-overlay');

  ham.addEventListener('click', () => {
    const isOpen = mMenu.classList.contains('open');
    if (isOpen) { closeMenu(); } else { openMenu(); }
  });

  function openMenu() {
    ham.classList.add('open');
    mMenu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    ham.classList.remove('open');
    mMenu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Typing ── */
  const roles = ['Shopify Developer','Liquid Theme Developer','Frontend Developer','React.js Developer'];
  let rIdx=0,cIdx=0,del=false;
  const typed = document.getElementById('typed-text');
  function type() {
    const w=roles[rIdx];
    typed.textContent=del?w.slice(0,--cIdx):w.slice(0,++cIdx);
    if(!del&&cIdx===w.length){del=true;setTimeout(type,1800);return;}
    if(del&&cIdx===0){del=false;rIdx=(rIdx+1)%roles.length;}
    setTimeout(type,del?60:100);
  }
  type();

  /* ── Filter ── */
//   function filterProjects(type, btn) {
//     document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
//     btn.classList.add('active');
//     document.querySelectorAll('.project-card').forEach(card=>{
//       card.style.display=(type==='all'||card.dataset.type===type)?'flex':'none';
//     });
//   }
/* ── Filter (limit-aware) ── */
  function filterProjects(type, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const allCards = document.querySelectorAll('#projects-grid .project-card');
    let shown = 0;
    allCards.forEach(card => {
      const match = (type === 'all' || card.dataset.type === type);
      if (match && shown < LIMIT) {
        card.style.display = 'flex';
        shown++;
      } else {
        card.style.display = 'none';
      }
    });
  }

  /* ── Scroll Reveal ── */
  /* ── Show only 6 projects, hide rest ── */
  const allCards = document.querySelectorAll('#projects-grid .project-card');
  const LIMIT = 8; // Show only first 8 projects by default
  allCards.forEach((card, i) => {
    if (i >= LIMIT) card.style.display = 'none';
  });
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  },{threshold:0.1});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  /* ── Contact Form → Gmail via EmailJS ── */
  function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    status.style.display = 'none';
    emailjs.sendForm(
      'service_tpc0t3s',   // ← STEP 3: paste your EmailJS Service ID
      'template_iopbxae',  // ← STEP 3: paste your EmailJS Template ID
      '#contact-form'
    ).then(() => {
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      btn.style.background = '#22c55e';
      status.style.display = 'block';
      status.style.color = '#22c55e';
      status.textContent = '✓ Your message was delivered successfully.';
      e.target.reset();
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        btn.disabled = false;
        status.style.display = 'none';
      }, 4000);
    }, (error) => {
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      btn.disabled = false;
      status.style.display = 'block';
      status.style.color = '#f87171';
      status.textContent = '✗ Failed to send. Please email me directly at chatherusman05@gmail.com';
      console.error('EmailJS error:', error);
    });
  }