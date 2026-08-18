const strip = document.getElementById('bulbs');
const n = Math.min(64, Math.floor(window.innerWidth / 12));

for (let i = 0; i < n; i += 1) {
  const bulb = document.createElement('div');
  bulb.className = 'bulb';
  bulb.style.animationDelay = `${i * 0.06}s`;
  strip.appendChild(bulb);
}

const panel = document.getElementById('panel');
const scrim = document.getElementById('scrim');

function openPanel() {
  panel.classList.add('on');
  scrim.classList.add('on');
  panel.setAttribute('aria-hidden', 'false');
}

function closePanel() {
  panel.classList.remove('on');
  scrim.classList.remove('on');
  panel.setAttribute('aria-hidden', 'true');
}

document.getElementById('open').onclick = openPanel;
document.getElementById('close').onclick = closePanel;
scrim.onclick = closePanel;
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePanel();
});

const DATA = {
  a: { name: '넥슨', rev: '매출 4.0조 · 직원 7,700명', score: 4.0 },
  b: { name: '크래프톤', rev: '매출 2.4조 · 직원 1,900명', score: 2.4 },
};

let streak = 0;
let done = false;

const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  card.addEventListener('click', () => {
    if (done) return;

    done = true;
    const pick = card.dataset.side;
    const win = DATA.a.score > DATA.b.score ? 'a' : 'b';

    cards.forEach((item) => {
      item.querySelector('[data-meta]').textContent = DATA[item.dataset.side].rev;
    });

    card.classList.add('picked');
    streak = pick === win ? streak + 1 : 0;
    document.getElementById('streak').textContent = String(streak);
  });
});

document.getElementById('share').addEventListener('click', async () => {
  const text = `기업 배틀 ${streak}연승`;
  const shareButton = document.getElementById('share');

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    }
    shareButton.textContent = '복사했습니다';
  } catch (error) {
    shareButton.textContent = '복사 실패';
  }

  setTimeout(() => {
    shareButton.textContent = '결과 공유하기';
  }, 1400);
});
