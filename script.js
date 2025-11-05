document.addEventListener('DOMContentLoaded', function(){
  // Respect reduced motion
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Simple reveal on scroll
  if(!reduce && 'IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('reveal'); obs.unobserve(e.target); }
      });
    },{threshold:0.1});
    document.querySelectorAll('.card, .feature-illustration, .media-grid figure').forEach(el=>obs.observe(el));
  }

  // projects filters
  const filters = document.querySelectorAll('.filter');
  if(filters.length){
    filters.forEach(btn=>btn.addEventListener('click', ()=>{
      filters.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-filter');
      const projects = document.querySelectorAll('#projects .card');
      projects.forEach(p=>{
        if(f === '*' ) p.style.display = '';
        else {
          const tags = p.getAttribute('data-tags') || '';
          p.style.display = tags.includes(f) ? '' : 'none';
        }
      });
    }));
  }

  // Contact form (demo)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (ev)=>{
      ev.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sent ✓';
      setTimeout(()=>btn.textContent = 'Send message', 2500);
      form.reset();
    });
  }

  // Button micro interactions
  document.querySelectorAll('.btn').forEach(b=>{
    b.addEventListener('pointerdown', ()=>b.style.transform='scale(0.995)');
    b.addEventListener('pointerup', ()=>b.style.transform='');
    b.addEventListener('pointerleave', ()=>b.style.transform='');
  });
});
