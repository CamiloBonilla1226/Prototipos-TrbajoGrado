
/* =========================================================================
   DATOS SIMULADOS DEL DECANO
   Origen en el sistema real: tabla de usuarios de JDCE.
   PENDIENTE: confirmar el nombre y los datos reales del Decano de la FIET
   antes de la sustentación. Los valores de abajo son de ejemplo.
   ========================================================================= */
const DECANO = {
  codigo:'10419021506',
  numeroDocumento:'104567284',
  tipoDocumento:'Cedula',
  nombres:'Carlos',
  apellidos:'Alegria',
  telefono:'3105320861',
  usuario:'calegria',
  correo:'calegria@unicauca.edu.co',
  vinculacion:'30/01/2024',
  /* Campos que sí existen en la vista actual de JDCE pero que la tarjeta del
     panel de Funcionario no muestra. Se conservan aquí a la espera de decidir
     si se incorporan a la tarjeta.
     El valor de tipoUsuario se reproduce literal del Manual de Usuario V1.0
     de JDCE, incluida la ausencia de tilde en "Maxima". */
  estado:'Activo',
  tipoUsuario:'Maxima autoridad FIET - Decano',
  roles:'Decano'
};

/* Módulos de la vista actual del Decano (Figura 4 del Manual de Usuario V1.0).
   Solo "Mi usuario" está implementado en este prototipo. */
const MODULOS = {
  'mi-usuario':    {nombre:'Mi usuario'},
  'usuarios':      {nombre:'Usuarios'},
  'roles':         {nombre:'Roles'},
  'solicitudes':   {nombre:'Solicitudes'},
  'modulo-academico': {nombre:'Módulo académico'},
  'orden-del-dia': {nombre:'Orden del día'},
  'respuestas':    {nombre:'Respuestas'},
  'configuracion': {nombre:'Configuración'},
  'historial':     {nombre:'Historial'}
};

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* =========================================================================
   MI USUARIO
   ========================================================================= */
function pintarUsuario(){
  const primerNombre   = DECANO.nombres.split(' ')[0];
  const primerApellido = DECANO.apellidos.split(' ')[0];
  const iniciales = (primerNombre[0] + primerApellido[0]).toUpperCase();

  $('cardUser').textContent    = primerNombre;
  $('cardAvatar').textContent  = iniciales;
  $('cVinculacion').textContent = DECANO.vinculacion;

  $('cCodigo').textContent     = DECANO.codigo;
  $('cNumDoc').textContent     = DECANO.numeroDocumento;
  $('cTipoDoc').textContent    = DECANO.tipoDocumento;
  $('cNombres').textContent    = DECANO.nombres;
  $('cApellidos').textContent  = DECANO.apellidos;
  $('cTelefono').textContent   = DECANO.telefono;
  $('cUsuario').textContent    = DECANO.usuario;
  $('cCorreo').textContent     = DECANO.correo;
  $('cRoles').textContent      = DECANO.roles;

  $('topName').textContent   = `${primerNombre} ${primerApellido}`;
  $('avatarIni').textContent = iniciales;
}

/* =========================================================================
   SOLICITUDES REMITIDAS POR EL FUNCIONARIO — evaluación del Decano
   Estados desde la perspectiva del Decano: Pendiente (debe decidir) o
   Respondida (ya aprobó o rechazó). Al decidir, la solicitud sale de la
   bandeja de Solicitudes y pasa al historial de Respuestas.
   ========================================================================= */
const PROC = {
  CM:'Cancelación de Matrícula',
  CA:'Cancelación de Asignatura',
  ES:'Examen Supletorio'
};

const SOLICITUDES = [
  {rad:'2026-ES-0144', est:'Juan Sebastián Paz',     doc:'1004556612', prog:'Tecnología en Telemática', proc:PROC.ES, fecha:'2026-07-27T15:40', estado:'Pendiente', just:'Solicito examen supletorio de Bases de Datos por calamidad doméstica presentada el día de la evaluación.', anexos:['Solicitud firmada.pdf','Certificado de defunción.pdf']},
  {rad:'2026-CM-0121', est:'Camilo Andrés Ledezma',  doc:'1005990011', prog:'Tecnología en Telemática', proc:PROC.CM, fecha:'2026-07-18T09:15', estado:'Pendiente', just:'Solicito la cancelación de matrícula por prestación del servicio militar obligatorio.', anexos:['Solicitud firmada.pdf','Orden de presentación.pdf'], resolucion:'Resolución 0121-2026.pdf'},
  {rad:'2026-CA-0151', est:'Julián David Rosero',    doc:'1066123456', prog:'Ingeniería de Sistemas', proc:PROC.CA, fecha:'2026-07-29T08:15', estado:'Pendiente', just:'Solicito la cancelación de la asignatura Cálculo Multivariado por incompatibilidad de horario con una asignatura obligatoria del plan de estudios.', anexos:['Solicitud firmada.pdf','Horario académico.pdf'], resolucion:'Resolución 0151-2026.pdf'},
  {rad:'2026-CM-0142', est:'Diana Carolina Bolaños', doc:'1061223344', prog:'Ingeniería de Sistemas', proc:PROC.CM, fecha:'2026-07-27T09:10', estado:'Respondida', decision:'Aprobada', resolucion:'Resolución 0142-2026.pdf', just:'Solicito la cancelación de matrícula por traslado laboral fuera de la ciudad de Popayán a partir del mes de agosto.', anexos:['Solicitud firmada.pdf','Carta laboral.pdf','Historia académica.pdf']},
  {rad:'2026-CA-0127', est:'Daniel Esteban Vidal',   doc:'1058445566', prog:'Ingeniería en Automática Industrial', proc:PROC.CA, fecha:'2026-07-19T14:40', estado:'Respondida', decision:'Rechazada', observacion:'La asignatura para la cual se solicita la cancelación no presenta cruce real según el horario oficial registrado en el sistema académico.', just:'Solicito la cancelación de la asignatura Instrumentación Industrial por superposición con el curso de nivelación autorizado.', anexos:['Solicitud firmada.pdf']},
  {rad:'2026-CA-0139', est:'Kevin Steven Muñoz',     doc:'1007889900', prog:'Ingeniería Electrónica y Telecomunicaciones', proc:PROC.CA, fecha:'2026-07-24T11:20', estado:'Respondida', decision:'Aprobada', resolucion:'Resolución 0139-2026.pdf', just:'Solicito la cancelación de la asignatura Electrónica Analógica II por bajo rendimiento derivado de una situación familiar.', anexos:['Solicitud firmada.pdf','Historia académica.pdf']},
  {rad:'2026-CM-0136', est:'Óscar Iván Chicangana',  doc:'1059334455', prog:'Ingeniería en Automática Industrial', proc:PROC.CM, fecha:'2026-07-23T16:05', estado:'Respondida', decision:'Rechazada', observacion:'No se anexó soporte suficiente que justifique la cancelación por motivos económicos alegados.', just:'Solicito la cancelación de matrícula por razones económicas que me impiden sostener el semestre en curso.', anexos:['Solicitud firmada.pdf','Declaración de renta familiar.pdf']}
];

function fmtFecha(iso){
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2,'0');
  const mm = String(d.getMonth()+1).padStart(2,'0');
  let h = d.getHours(); const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  return `${dd}/${mm}/${d.getFullYear()} - ${h}:${String(d.getMinutes()).padStart(2,'0')} ${ampm}`;
}
function iconPendiente(){
  return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E0952B" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>';
}
function iconDecision(d){
  if(d === 'Rechazada')
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D0463B" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></svg>';
  return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E6B" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.5L16 9.5"/></svg>';
}

const PAGE_SIZE = 8;
let pageD = 1, sortDirD = 'desc', pageRD = 1, sortKeyRD = 'fecha', sortDirRD = 'desc';

/* ---------- Bandeja: Solicitudes pendientes ---------- */
function getFilteredD(){
  const p = $('fDProceso').value;
  const d = $('fDDoc').value.trim();
  return SOLICITUDES
    .filter(r => r.estado === 'Pendiente' && (!p || r.proc === p) && (!d || r.doc.includes(d)))
    .sort((a,b) => {
      if(a.fecha < b.fecha) return sortDirD === 'asc' ? -1 : 1;
      if(a.fecha > b.fecha) return sortDirD === 'asc' ? 1 : -1;
      return 0;
    });
}
function hasFiltersD(){
  return !!($('fDProceso').value || $('fDDoc').value.trim());
}
function renderD(){
  const rows = getFilteredD();
  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  if(pageD > totalPages) pageD = totalPages;

  const tbody = $('tbodyD'), empty = $('emptyD');
  const table = document.querySelector('#modSolicitudes .table-scroll');
  const pager = $('pagerD');

  if(rows.length === 0){
    table.hidden = true; pager.innerHTML = ''; empty.hidden = false;
    const filtered = hasFiltersD();
    $('emptyTitleD').textContent = filtered ? 'No se encontraron solicitudes' : 'No hay solicitudes pendientes por evaluar';
    $('emptyTextD').textContent = filtered
      ? 'Ninguna solicitud coincide con los criterios aplicados. Ajusta los filtros o límpialos para volver al listado completo.'
      : 'En este momento no hay solicitudes remitidas por el Funcionario Académico a la espera de tu decisión.';
    $('emptyClearD').hidden = !filtered;
    return;
  }

  table.hidden = false; empty.hidden = true;
  const slice = rows.slice((pageD-1)*PAGE_SIZE, pageD*PAGE_SIZE);
  tbody.innerHTML = slice.map(r => `
    <tr>
      <td class="radicado">${r.rad}</td>
      <td>${r.est}</td>
      <td class="doc">${r.doc}</td>
      <td>${r.proc}</td>
      <td class="fecha">${fmtFecha(r.fecha)}</td>
      <td><span class="estado">${iconPendiente()}${r.estado}</span></td>
      <td>
        <button class="btn-eye" data-rad="${r.rad}" title="Ver detalle" aria-label="Ver detalle de ${r.rad}">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#2F6FD0" stroke-width="1.7" aria-hidden="true">
            <path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.7"/>
          </svg>
        </button>
      </td>
    </tr>`).join('');

  renderPagerD(totalPages);
}
function renderPagerD(total){
  const pager = $('pagerD');
  let btns = `<button ${pageD===1?'disabled':''} data-go="${pageD-1}">&lt; Anterior</button>`;
  const nums = [];
  for(let i=1;i<=total;i++){
    if(i===1 || i===total || Math.abs(i-pageD)<=1) nums.push(i);
    else if(nums[nums.length-1] !== '…') nums.push('…');
  }
  nums.forEach(n => {
    btns += (n === '…')
      ? `<button class="dots" disabled>…</button>`
      : `<button class="${n===pageD?'is-current':''}" data-go="${n}">${n}</button>`;
  });
  btns += `<button ${pageD===total?'disabled':''} data-go="${pageD+1}">Siguiente &gt;</button>`;
  pager.innerHTML = `<div class="pager-box">${btns}</div>`;
}
function limpiarD(){
  $('fDProceso').value = '';
  $('fDDoc').value = '';
  pageD = 1; renderD();
}

/* ---------- Historial: Respuestas del Decano ---------- */
function getFilteredRD(){
  const p = $('fRDProceso').value;
  const dec = $('fRDDecision').value;
  const d = $('fRDDoc').value.trim();
  const rows = SOLICITUDES.filter(r =>
    r.estado === 'Respondida' && (!p || r.proc === p) && (!dec || r.decision === dec) && (!d || r.doc.includes(d))
  );
  const ORDEN_DECISION = {'Aprobada':0,'Rechazada':1};
  rows.sort((a,b)=>{
    let va, vb;
    if(sortKeyRD === 'decision'){ va = ORDEN_DECISION[a.decision]; vb = ORDEN_DECISION[b.decision]; }
    else { va = a.fecha; vb = b.fecha; }
    if(va < vb) return sortDirRD === 'asc' ? -1 : 1;
    if(va > vb) return sortDirRD === 'asc' ? 1 : -1;
    return 0;
  });
  return rows;
}
function hasFiltersRD(){
  return !!($('fRDProceso').value || $('fRDDecision').value || $('fRDDoc').value.trim());
}
function renderRD(){
  const rows = getFilteredRD();
  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  if(pageRD > totalPages) pageRD = totalPages;

  const tbody = $('tbodyRD'), empty = $('emptyRD');
  const table = document.querySelector('#modRespuestas .table-scroll');
  const pager = $('pagerRD');

  if(rows.length === 0){
    table.hidden = true; pager.innerHTML = ''; empty.hidden = false;
    const filtered = hasFiltersRD();
    $('emptyTitleRD').textContent = filtered ? 'No se encontraron respuestas' : 'Aún no hay solicitudes evaluadas';
    $('emptyTextRD').textContent = filtered
      ? 'Ninguna respuesta coincide con los criterios aplicados. Ajusta los filtros o límpialos para volver al listado completo.'
      : 'Cuando apruebes o rechaces una solicitud, quedará registrada aquí como historial de solo lectura.';
    $('emptyClearRD').hidden = !filtered;
    return;
  }

  table.hidden = false; empty.hidden = true;
  const slice = rows.slice((pageRD-1)*PAGE_SIZE, pageRD*PAGE_SIZE);
  tbody.innerHTML = slice.map(r => `
    <tr>
      <td class="radicado">${r.rad}</td>
      <td>${r.est}</td>
      <td class="doc">${r.doc}</td>
      <td>${r.proc}</td>
      <td class="fecha">${fmtFecha(r.fecha)}</td>
      <td><span class="estado">${iconDecision(r.decision)}${r.decision}</span></td>
      <td>
        <button class="btn-eye" data-rad="${r.rad}" title="Ver detalle" aria-label="Ver detalle de ${r.rad}">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#2F6FD0" stroke-width="1.7" aria-hidden="true">
            <path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.7"/>
          </svg>
        </button>
      </td>
    </tr>`).join('');

  renderPagerRD(totalPages);
}
function renderPagerRD(total){
  const pager = $('pagerRD');
  let btns = `<button ${pageRD===1?'disabled':''} data-go="${pageRD-1}">&lt; Anterior</button>`;
  const nums = [];
  for(let i=1;i<=total;i++){
    if(i===1 || i===total || Math.abs(i-pageRD)<=1) nums.push(i);
    else if(nums[nums.length-1] !== '…') nums.push('…');
  }
  nums.forEach(n => {
    btns += (n === '…')
      ? `<button class="dots" disabled>…</button>`
      : `<button class="${n===pageRD?'is-current':''}" data-go="${n}">${n}</button>`;
  });
  btns += `<button ${pageRD===total?'disabled':''} data-go="${pageRD+1}">Siguiente &gt;</button>`;
  pager.innerHTML = `<div class="pager-box">${btns}</div>`;
}
function limpiarRD(){
  $('fRDProceso').value = '';
  $('fRDDecision').value = '';
  $('fRDDoc').value = '';
  pageRD = 1; renderRD();
}

['fDProceso'].forEach(id => $(id).addEventListener('change', () => { pageD=1; renderD(); }));
$('fDDoc').addEventListener('input', () => { pageD=1; renderD(); });
$('btnClearD').addEventListener('click', limpiarD);
$('emptyClearD').addEventListener('click', limpiarD);

['fRDProceso','fRDDecision'].forEach(id => $(id).addEventListener('change', () => { pageRD=1; renderRD(); }));
$('fRDDoc').addEventListener('input', () => { pageRD=1; renderRD(); });
$('btnClearRD').addEventListener('click', limpiarRD);
$('emptyClearRD').addEventListener('click', limpiarRD);

$('tbodyD').addEventListener('click', e => {
  const b = e.target.closest('.btn-eye');
  if(b) abrirDetalleD(b.dataset.rad);
});
$('tbodyRD').addEventListener('click', e => {
  const b = e.target.closest('.btn-eye');
  if(b) abrirDetalleD(b.dataset.rad);
});
$('pagerD').addEventListener('click', e => {
  const b = e.target.closest('button[data-go]');
  if(b && !b.disabled){ pageD = Number(b.dataset.go); renderD(); window.scrollTo({top:0,behavior:'smooth'}); }
});
$('pagerRD').addEventListener('click', e => {
  const b = e.target.closest('button[data-go]');
  if(b && !b.disabled){ pageRD = Number(b.dataset.go); renderRD(); window.scrollTo({top:0,behavior:'smooth'}); }
});

/* ---------- Modal de detalle ---------- */
const backdropD = $('backdropD');
let lastFocusD = null;

function anexosHtml(anexos){
  return anexos.map(a => `
    <li>
      <span class="anexo-name">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D0463B" stroke-width="1.6" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z"/><path d="M14 3v5h5"/></svg>
        <span>${a}</span>
      </span>
      <span class="anexo-actions">
        <button class="link-btn" type="button">Visualizar</button>
        <button class="link-btn" type="button">Descargar</button>
      </span>
    </li>`).join('');
}

function abrirDetalleD(rad){
  const r = SOLICITUDES.find(x => x.rad === rad);
  if(!r) return;
  lastFocusD = document.activeElement;

  $('dTitle').textContent = r.estado === 'Pendiente' ? 'Detalle de la solicitud' : 'Detalle de la respuesta';
  $('dRad').textContent = r.rad;
  $('dProc').textContent = r.proc;
  $('dEst').textContent = r.est;
  $('dDoc').textContent = r.doc;
  $('dProg').textContent = r.prog;
  $('dFec').textContent = fmtFecha(r.fecha);
  $('dEstado').innerHTML = r.estado === 'Pendiente'
    ? `<span class="estado">${iconPendiente()}${r.estado}</span>`
    : `<span class="estado">${iconDecision(r.decision)}${r.decision}</span>`;
  $('dJust').textContent = r.just;
  $('dAnexos').innerHTML = anexosHtml(r.anexos);

  let extra = '';
  if(r.resolucion){
    extra += `
      <div class="modal-sub">${r.estado === 'Pendiente' ? 'Resolución remitida por el Funcionario' : 'Resolución'}</div>
      <ul class="anexos">
        <li>
          <span class="anexo-name">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D0463B" stroke-width="1.6" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z"/><path d="M14 3v5h5"/></svg>
            <span>${r.resolucion}</span>
          </span>
          <span class="anexo-actions">
            <button class="link-btn" type="button">Visualizar</button>
            <button class="link-btn" type="button">Descargar</button>
          </span>
        </li>
      </ul>`;
  }
  if(r.estado === 'Respondida' && r.decision === 'Rechazada'){
    extra += `
      <div class="modal-sub">Motivo del rechazo</div>
      <div class="just">${r.observacion || 'No se registró una observación.'}</div>`;
  }
  $('dExtra').innerHTML = extra;

  const notas = {
    'Pendiente': 'Esta solicitud fue remitida por el Funcionario Académico y está a la espera de tu decisión.',
    'Respondida': 'Ya tomaste una decisión sobre esta solicitud. El detalle es de solo lectura.'
  };
  $('dNote').textContent = notas[r.estado] || '';

  $('dFoot').innerHTML = r.estado === 'Pendiente'
    ? `<button class="btn btn-ghost" data-close>Cerrar</button>
       <button class="btn btn-danger" data-accion="rechazar" data-rad="${r.rad}">Rechazar solicitud</button>
       <button class="btn btn-primary" data-accion="aprobar" data-rad="${r.rad}">Aprobar solicitud</button>`
    : `<button class="btn btn-ghost" data-close>Cerrar</button>`;

  backdropD.classList.add('open');
  document.body.style.overflow = 'hidden';
  $('dClose').focus();
}
function cerrarDetalleD(){
  backdropD.classList.remove('open');
  document.body.style.overflow = '';
  if(lastFocusD) lastFocusD.focus();
}
$('dClose').addEventListener('click', cerrarDetalleD);
backdropD.addEventListener('click', e => {
  if(e.target === backdropD || e.target.hasAttribute('data-close')) cerrarDetalleD();
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && backdropD.classList.contains('open')) cerrarDetalleD();
});
$('dFoot').addEventListener('click', e => {
  const bAprobar  = e.target.closest('[data-accion="aprobar"]');
  const bRechazar = e.target.closest('[data-accion="rechazar"]');
  if(bAprobar){ cerrarDetalleD(); abrirAprobar(bAprobar.dataset.rad); }
  if(bRechazar){ cerrarDetalleD(); abrirRechazar(bRechazar.dataset.rad); }
});

/* ---------- Modal Aprobar / Rechazar ---------- */
const backdropAccionD = $('backdropAccionD');
let accionRadD = null, accionModoD = null, accionLastFocusD = null;

function llenarDatosAccionD(r){
  $('aDEst').textContent  = r.est;
  $('aDDoc').textContent  = r.doc;
  $('aDProc').textContent = r.proc;
  $('aDRad').textContent  = r.rad;
}
function abrirBackdropAccionD(){
  backdropAccionD.classList.add('open');
  document.body.style.overflow = 'hidden';
  $('aDClose').focus();
}
function cerrarAccionD(){
  backdropAccionD.classList.remove('open');
  document.body.style.overflow = '';
  if(accionLastFocusD) accionLastFocusD.focus();
}

function abrirAprobar(rad){
  const r = SOLICITUDES.find(x => x.rad === rad);
  if(!r) return;
  accionRadD = rad; accionModoD = 'aprobar';
  accionLastFocusD = document.activeElement;

  $('aDTitle').textContent = 'Aprobar solicitud';
  llenarDatosAccionD(r);

  $('aDCentro').innerHTML = r.resolucion
    ? `<p class="dialog-note">Al aprobar, quedará registrada tu decisión junto con la resolución remitida por el Funcionario Académico. El Funcionario podrá enviar la respuesta al Estudiante.</p>`
    : `<p class="dialog-note">Al aprobar, quedará registrada tu decisión. El Funcionario Académico podrá enviar la respuesta al Estudiante.</p>`;

  $('aDFoot').innerHTML = `
    <button class="btn btn-ghost" data-close>Cancelar</button>
    <button class="btn btn-primary" id="aDConfirmar">Aprobar solicitud</button>`;

  abrirBackdropAccionD();
}

function abrirRechazar(rad){
  const r = SOLICITUDES.find(x => x.rad === rad);
  if(!r) return;
  accionRadD = rad; accionModoD = 'rechazar';
  accionLastFocusD = document.activeElement;

  $('aDTitle').textContent = 'Rechazar solicitud';
  llenarDatosAccionD(r);

  $('aDCentro').innerHTML = `
    <div class="field-block">
      <label for="aDObs">Observaciones <span class="req">*</span></label>
      <textarea id="aDObs" rows="4" placeholder="Describe el motivo del rechazo de la solicitud..."></textarea>
      <p class="field-error" id="aDObsError" hidden>Debes registrar una observación con el motivo del rechazo.</p>
    </div>
    <p class="dialog-note">Esta observación se comunicará al Estudiante a través del Funcionario Académico.</p>`;

  $('aDFoot').innerHTML = `
    <button class="btn btn-ghost" data-close>Cancelar</button>
    <button class="btn btn-danger" id="aDConfirmar">Rechazar solicitud</button>`;

  abrirBackdropAccionD();
}

function confirmarAccionD(){
  const r = SOLICITUDES.find(x => x.rad === accionRadD);
  if(!r) return;

  if(accionModoD === 'aprobar'){
    r.decision = 'Aprobada';
    r.estado = 'Respondida';
    cerrarAccionD();
    renderD(); renderRD();
    mostrarToast('<b>Solicitud aprobada.</b><br>El Funcionario Académico podrá enviar la respuesta al Estudiante.');
    return;
  }

  if(accionModoD === 'rechazar'){
    const campo = $('aDObs');
    const obs = campo.value.trim();
    const err = $('aDObsError');
    if(!obs){
      err.hidden = false;
      campo.classList.add('is-invalid');
      return;
    }
    err.hidden = true;
    campo.classList.remove('is-invalid');
    r.decision = 'Rechazada';
    r.observacion = obs;
    r.estado = 'Respondida';
    cerrarAccionD();
    renderD(); renderRD();
    mostrarToast('<b>Solicitud rechazada.</b><br>Se registró tu observación para el Funcionario Académico.');
  }
}

$('aDFoot').addEventListener('click', e => {
  if(e.target.hasAttribute('data-close')){ cerrarAccionD(); return; }
  if(e.target.id === 'aDConfirmar') confirmarAccionD();
});
$('aDClose').addEventListener('click', cerrarAccionD);
backdropAccionD.addEventListener('click', e => {
  if(e.target === backdropAccionD) cerrarAccionD();
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && backdropAccionD.classList.contains('open')) cerrarAccionD();
});

document.querySelectorAll('#modSolicitudes th.sortable').forEach(th => th.addEventListener('click', () => {
  sortDirD = sortDirD === 'asc' ? 'desc' : 'asc';
  renderD();
}));

document.querySelectorAll('#modRespuestas th.sortable').forEach(th => th.addEventListener('click', () => {
  const k = th.dataset.sort;
  sortDirRD = (sortKeyRD === k && sortDirRD === 'asc') ? 'desc' : 'asc';
  sortKeyRD = k; renderRD();
}));

/* =========================================================================
   NAVEGACIÓN ENTRE MÓDULOS
   ========================================================================= */
function abrirModulo(clave){
  const mod = MODULOS[clave];
  if(!mod) return;

  document.querySelectorAll('.nav-item').forEach(b => {
    const activo = b.dataset.mod === clave;
    b.classList.toggle('is-active', activo);
    if(activo) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current');
  });

  $('crumbMod').textContent = mod.nombre;
  $('sectionTab').textContent = mod.nombre;

  const SECCIONES_REALES = {'mi-usuario':'modMiUsuario', 'solicitudes':'modSolicitudes', 'respuestas':'modRespuestas'};
  const idReal = SECCIONES_REALES[clave];

  Object.values(SECCIONES_REALES).forEach(id => $(id).hidden = (id !== idReal));
  $('modStub').hidden = !!idReal;
  if(!idReal) $('stubTitulo').textContent = mod.nombre;

  if(clave === 'solicitudes') renderD();
  if(clave === 'respuestas') renderRD();

  document.title = `Gestión de Procesos Académicos FIET — ${mod.nombre}`;
  window.scrollTo({top:0, behavior:'smooth'});
}

document.querySelectorAll('.nav-item').forEach(b => {
  b.addEventListener('click', () => abrirModulo(b.dataset.mod));
});

/* =========================================================================
   MENÚ DE USUARIO
   ========================================================================= */
const userMenuBtn = $('userMenuBtn'), userDropdown = $('userDropdown');
userMenuBtn.addEventListener('click', e => {
  e.stopPropagation();
  const abierto = !userDropdown.hidden;
  userDropdown.hidden = abierto;
  userMenuBtn.setAttribute('aria-expanded', String(!abierto));
});
document.addEventListener('click', e => {
  if(!userDropdown.hidden && !e.target.closest('.user-chip')){
    userDropdown.hidden = true;
    userMenuBtn.setAttribute('aria-expanded','false');
  }
});
$('btnLogout').addEventListener('click', () => {
  userDropdown.hidden = true;
  mostrarToast('<b>Sesión cerrada.</b><br>Has salido de Gestión de Procesos Académicos FIET.');
});

/* =========================================================================
   TOAST
   ========================================================================= */
let toastTimer = null;
function mostrarToast(html){
  const t = $('toast');
  $('toastText').innerHTML = html;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 4500);
}

/* Arranque */
pintarUsuario();
abrirModulo('mi-usuario');
