  const inicio = new Date("2024-04-01T00:00:00");

  function atualizarContador() {
    const agora = new Date();

  let anos = agora.getFullYear() - inicio.getFullYear();
  let meses = agora.getMonth() - inicio.getMonth();
  let dias = agora.getDate() - inicio.getDate();
  let horas = agora.getHours() - inicio.getHours();
  let minutos = agora.getMinutes() - inicio.getMinutes();
  let segundos = agora.getSeconds() - inicio.getSeconds();

  if (segundos < 0) {
    segundos += 60;
  minutos--;
    }

  if (minutos < 0) {
    minutos += 60;
  horas--;
    }

  if (horas < 0) {
    horas += 24;
  dias--;
    }

  if (dias < 0) {
      const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
  dias += mesAnterior;
  meses--;
    }

  if (meses < 0) {
    meses += 12;
  anos--;
    }

  document.getElementById("anos").textContent = anos;
  document.getElementById("meses").textContent = meses;
  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = horas;
  document.getElementById("minutos").textContent = minutos;
  document.getElementById("segundos").textContent = segundos;
  }

  setInterval(atualizarContador, 1000);
  atualizarContador();


// Canvas corações mais suaves e delicados

const canvas = document.getElementById('coracoes');
const ctx = canvas.getContext('2d');
let width, height;
let hearts = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function Heart() {
  this.x = Math.random() * width;
  this.y = Math.random() * height;
  this.size = Math.random() * 8 + 5;
  this.speed = Math.random() * 0.7 + 0.3;
  this.alpha = Math.random() * 0.4 + 0.3;
  this.angle = Math.random() * 2 * Math.PI;
  this.spinSpeed = (Math.random() - 0.5) * 0.01;
}

Heart.prototype.draw = function () {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle);
  let gradient = ctx.createRadialGradient(0, 0, this.size * 0.3, 0, 0, this.size);
  gradient.addColorStop(0, `rgba(140, 74, 90, ${this.alpha})`);
  gradient.addColorStop(1, `rgba(140, 74, 90, 0)`);
  ctx.fillStyle = gradient;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    this.size / 2, -this.size,
    this.size * 2, this.size / 2,
    0, this.size * 2
  );
  ctx.bezierCurveTo(
    -this.size * 2, this.size / 2,
    -this.size / 2, -this.size,
    0, 0
  );
  ctx.fill();
  ctx.restore();
};

Heart.prototype.update = function () {
  this.y += this.speed;
  this.angle += this.spinSpeed;
  if (this.y > height + this.size * 2) {
    this.y = -this.size * 2;
    this.x = Math.random() * width;
  }
};

function animate() {
  ctx.clearRect(0, 0, width, height);
  hearts.forEach(h => {
    h.update();
    h.draw();
  });
  requestAnimationFrame(animate);
}

for (let i = 0; i < 40; i++) {
  hearts.push(new Heart());
}
animate();

// Partículas cintilantes suaves

const particulasCanvas = document.getElementById('particulas');
const pctx = particulasCanvas.getContext('2d');

let pWidth, pHeight;
let particulas = [];

function resizeParticulas() {
  pWidth = particulasCanvas.width = window.innerWidth;
  pHeight = particulasCanvas.height = window.innerHeight;
}
resizeParticulas();
window.addEventListener('resize', resizeParticulas);

function Particula() {
  this.x = Math.random() * pWidth;
  this.y = Math.random() * pHeight;
  this.size = Math.random() * 1.3 + 0.6;
  this.speedY = Math.random() * 0.1 + 0.03;
  this.alpha = Math.random() * 0.3 + 0.2;
}

Particula.prototype.draw = function () {
  pctx.beginPath();
  pctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  pctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
  pctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
  pctx.shadowBlur = 4;
  pctx.fill();
};

Particula.prototype.update = function () {
  this.y -= this.speedY;
  if (this.y < -this.size) {
    this.y = pHeight + this.size;
    this.x = Math.random() * pWidth;
  }
};

function animateParticulas() {
  pctx.clearRect(0, 0, pWidth, pHeight);
  particulas.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticulas);
}

for (let i = 0; i < 60; i++) {
  particulas.push(new Particula());
}
animateParticulas();

// Modal surpresa com botão
function mostrarSurpresa() {
  const modal = document.createElement('div');
  modal.id = 'modal-surpresa';
  modal.innerHTML = `
    <div class="conteudo-modal">
      <span class="fechar" onclick="fecharModal()">&times;</span>
      <h2>Eu te amooo muitãooo do tantão do infinitãoo!</h2>
      <p>Essa é só uma das muitas formas de mostrar o quanto você é especial pra mim. ❤️</p>
    </div>
  `;
  document.body.appendChild(modal);
}

function fecharModal() {
  const modal = document.getElementById('modal-surpresa');
  if (modal) modal.remove();
}
