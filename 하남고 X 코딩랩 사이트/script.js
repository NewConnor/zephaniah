/* ==========================================
   1. 환경 설정 및 UI 제어
========================================== */
const ADMIN_AUTH_CODE = "1234";

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerText = '🙈';
  } else {
    input.type = 'password';
    btn.innerText = '👁️';
  }
}

function openAuthModal(mode) {
  const modal = document.getElementById('authModalOverlay');
  if (modal) modal.style.display = 'flex';
  switchAuthTab(mode);
}

function closeAuthModal(event) {
  if (event.target && event.target.id === 'authModalOverlay') {
    document.getElementById('authModalOverlay').style.display = 'none';
  }
}

function closeAuthModalDirect() {
  const modal = document.getElementById('authModalOverlay');
  if (modal) modal.style.display = 'none';
}

function switchAuthTab(mode) {
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const tabResetPw = document.getElementById('tabResetPw');
  
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const resetPwForm = document.getElementById('resetPwForm');

  if (tabLogin) tabLogin.classList.remove('active');
  if (tabRegister) tabRegister.classList.remove('active');
  if (tabResetPw) tabResetPw.classList.remove('active');

  if (loginForm) loginForm.style.display = 'none';
  if (registerForm) registerForm.style.display = 'none';
  if (resetPwForm) resetPwForm.style.display = 'none';

  if (mode === 'login') {
    if (tabLogin) tabLogin.classList.add('active');
    if (loginForm) loginForm.style.display = 'flex';
  } else if (mode === 'register') {
    if (tabRegister) tabRegister.classList.add('active');
    if (registerForm) registerForm.style.display = 'flex';
  } else if (mode === 'resetPw') {
    if (tabResetPw) tabResetPw.classList.add('active');
    if (resetPwForm) resetPwForm.style.display = 'flex';
  }
}

function handleRoleChange(role) {
  const studentIdInput = document.getElementById('regStudentId');
  const authCodeInput = document.getElementById('regAuthCode');

  if (role === '선생님') {
    if (studentIdInput) {
      studentIdInput.value = '';
      studentIdInput.placeholder = '학번 (선생님은 입력 불필요)';
      studentIdInput.disabled = true;
      studentIdInput.required = false;
    }
  } else {
    if (studentIdInput) {
      studentIdInput.placeholder = '학번 (예: 10101)';
      studentIdInput.disabled = false;
      studentIdInput.required = true;
    }
  }

  if (role === '회장' || role === '부회장') {
    if (authCodeInput) {
      authCodeInput.style.display = 'block';
      authCodeInput.required = true;
    }
  } else {
    if (authCodeInput) {
      authCodeInput.style.display = 'none';
      authCodeInput.required = false;
      authCodeInput.value = '';
    }
  }
}

/* ==========================================
   2. 메인 패널 데이터 (활동 갤러리 및 카테고리)
========================================== */
const categoryData = {
  '동아리 소개': {
    sidebarTitle: '동아리 부서 안내',
    items: [
      { name: '인공지능 부서', sub: 'AI 및 머신러닝 탐구', desc: '인공지능의 기본 원리와 기술을 공부하고, 직접 AI 관련 프로그램을 만들어보는 부서입니다.', tags: ['AI', 'Python', 'MachineLearning'] },
      { name: '피지컬AI 임베디드 부서', sub: '하드웨어 & 소프트웨어 융합', desc: '아두이노를 활용해 센서와 전자 부품을 연결하고 실제로 작동하는 장치를 제작하는 부서입니다.', tags: ['Arduino', 'IoT', 'Hardware'] },
      { name: '게임 제작 부서', sub: '웹 기반 인터랙티브 게임 개발', desc: 'HTML, CSS, JavaScript 등의 프로그래밍을 활용해 직접 게임을 제작하는 부서입니다.', tags: ['Game', 'JavaScript', 'HTML5'] },
      { name: '시큐어 코딩 부서', sub: '보안 프로그래밍', desc: '프로그램에서 발생할 수 있는 보안 취약점을 이해하고, 안전한 코드를 작성하는 방법을 배우며 보안을 고려한 프로그램을 제작합니다.', tags: ['Security', 'Python'] }
    ]
  },
  '주요 프로젝트': {
    sidebarTitle: '주요 프로젝트',
    items: [
      { name: '미정 (추후 공개)', sub: '프로젝트 준비 중', desc: '현재 세부 프로젝트 내용이 정해지지 않았습니다. 추후 공개될 예정입니다.', tags: ['ComingSoon'] }
    ]
  },
  '부원 모집': {
    sidebarTitle: '부원 모집 안내',
    items: [
      { name: '미정 (추후 공개)', sub: '모집 일정 준비 중', desc: '신입 부원 모집에 관한 세부 일정 및 안내 사항은 추후 공개됩니다.', tags: ['ComingSoon'] }
    ]
  },
  '활동 갤러리': {
    sidebarTitle: '활동 갤러리',
    items: [
      { name: '봉사활동 프로젝트', sub: '지역사회 & 기술 재능기부', desc: '코딩 기술을 활용하여 지역사회와 학교를 지원하는 봉사활동 프로젝트입니다.', tags: ['Volunteer', 'Project', 'VAR'] }
    ]
  },
  '이벤트/공지': {
    sidebarTitle: '이벤트 및 공지',
    items: [
      { name: '미정 (추후 공개)', sub: '공지사항 준비 중', desc: '현재 예정된 이벤트 및 세부 공지사항이 없습니다.', tags: ['ComingSoon'] }
    ]
  }
};

function selectCategory(categoryName) {
  const data = categoryData[categoryName];
  if (!data) return;

  const sidebarTitle = document.getElementById('sidebarTitle');
  if (sidebarTitle) sidebarTitle.innerText = data.sidebarTitle;

  const clubList = document.getElementById('clubList');
  if (!clubList) return;
  clubList.innerHTML = '';

  data.items.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = `club-item ${index === 0 ? 'active' : ''}`;
    li.innerText = item.name;
    li.onclick = function () {
      updateDetail(item.name, item.sub, item.desc, item.tags, this);
    };
    clubList.appendChild(li);
  });

  const first = data.items[0];
  updateDetail(first.name, first.sub, first.desc, first.tags, clubList.children[0]);
  
  const preview = document.getElementById('previewContainer');
  if (preview) preview.scrollIntoView({ behavior: 'smooth' });
}

function updateDetail(title, sub, desc, tags, element) {
  if (element) {
    document.querySelectorAll('.club-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');
  }

  const clubTitle = document.getElementById('clubTitle');
  const clubSub = document.getElementById('clubSub');
  const clubDesc = document.getElementById('clubDesc');
  const tagsContainer = document.getElementById('clubTags');

  if (clubTitle) clubTitle.innerText = title;
  if (clubSub) clubSub.innerText = sub;
  if (clubDesc) clubDesc.innerText = desc;

  if (tagsContainer) {
    tagsContainer.innerHTML = '';
    tags.forEach(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'tag';
      tagSpan.innerText = tag;
      tagsContainer.appendChild(tagSpan);
    });
  }
}

/* ==========================================
   3. 커뮤니티 모달 및 폼 제출 바인딩
========================================== */
function openCommunityModal() {
  const modal = document.getElementById('commModalOverlay');
  if (modal) modal.style.display = 'flex';
  if (window.renderPosts) window.renderPosts();
}

function closeCommunityModal(event) {
  if (event.target && event.target.id === 'commModalOverlay') {
    document.getElementById('commModalOverlay').style.display = 'none';
  }
}

function closeCommunityModalDirect() {
  const modal = document.getElementById('commModalOverlay');
  if (modal) modal.style.display = 'none';
}

function closeWriteForm() {
  const form = document.getElementById('writeFormContainer');
  if (form) form.style.display = 'none';

  const title = document.getElementById('postTitle');
  const content = document.getElementById('postContent');
  if (title) title.value = '';
  if (content) content.value = '';
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* 폼 이벤트 바인딩 */
document.addEventListener('DOMContentLoaded', () => {
  const resetPwForm = document.getElementById('resetPwForm');
  if (resetPwForm) {
    resetPwForm.onsubmit = function(e) {
      if (window.handleResetPw) window.handleResetPw(e);
    };
  }
});