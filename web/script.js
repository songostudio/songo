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

const titleElement = document.querySelector('.game-title');
const descriptionElement = document.querySelector('.game-desc');
const cards = document.querySelectorAll('.card');
const shareButton = document.getElementById('share');

let streak = 0;
let done = false;
let currentData = {
  a: null,
  b: null,
};

function renderRound(data) {
  const [left, right] = data.companies;
  currentData = { a: left, b: right };

  titleElement.textContent = data.title;
  descriptionElement.textContent = data.description;

  cards.forEach((card) => {
    const side = card.dataset.side;
    const company = side === 'a' ? left : right;
    const nameElement = card.querySelector('.co-name');
    const metaElement = card.querySelector('[data-meta]');

    nameElement.textContent = company.name;
    metaElement.textContent = company.summary;
    card.classList.remove('picked');
  });

  done = false;
  document.getElementById('streak').textContent = String(streak);
}

async function fetchRound() {
  try {
    const response = await fetch('http://localhost:8000/api/games/company-battle');

    if (!response.ok) {
      throw new Error('API error');
    }

    const data = await response.json();
    renderRound(data);
  } catch (error) {
    titleElement.textContent = '기업 배틀';
    descriptionElement.textContent = '서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.';

    cards.forEach((card) => {
      const side = card.dataset.side;
      const fallback = side === 'a'
        ? { name: '넥슨', summary: '매출 4.0조 · 직원 7,700명' }
        : { name: '크래프톤', summary: '매출 2.4조 · 직원 1,900명' };

      card.querySelector('.co-name').textContent = fallback.name;
      card.querySelector('[data-meta]').textContent = fallback.summary;
    });
  }
}

cards.forEach((card) => {
  card.addEventListener('click', () => {
    if (done || !currentData.a || !currentData.b) return;

    done = true;
    const pick = card.dataset.side;
    const win = currentData.a.score >= currentData.b.score ? 'a' : 'b';

    cards.forEach((item) => {
      item.classList.remove('picked');
    });

    card.classList.add('picked');
    streak = pick === win ? streak + 1 : 0;
    document.getElementById('streak').textContent = String(streak);
  });
});

shareButton.addEventListener('click', async () => {
  const text = `기업 배틀 ${streak}연승`;

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

fetchRound();
