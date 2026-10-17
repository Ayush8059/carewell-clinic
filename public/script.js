fetch('/api/info').then(r => r.json()).then(d => {
  const b = document.getElementById('badge');
  b.textContent = (d.color !== 'none' ? d.color.toUpperCase() + ' | ' : '') + 'version ' + d.version;
  if (d.color !== 'none') document.body.classList.add(d.color);
});
const box = document.getElementById('doctors');
if (box) fetch('/api/doctors').then(r => r.json()).then(list => {
  box.innerHTML = list.map(d => `<div class="card"><h3>${d.name}</h3><p>${d.dept}</p><p>${d.time}</p></div>`).join('');
});
function submitForm(e){ e.preventDefault(); alert('Thank you! (Demo form - no data is stored)'); e.target.reset(); }
