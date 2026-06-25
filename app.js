const STORAGE_KEY = "fitlog.dailyWorkouts.v1";
const BOOKMARK_KEY = "fitlog.exerciseBookmarks.v1";

const categories = ["전체", "하체", "가슴", "등", "어깨", "팔", "복근", "유산소"];

const baseExercises = [
  ["leg-back-squat", "바벨 백스쿼트", "하체", true, 12, "대표적인 하체 복합 운동"],
  ["leg-front-squat", "프론트 스쿼트", "하체", false, 5, "코어와 대퇴사두 집중"],
  ["leg-zercher-squat", "저처 스쿼트", "하체", false, 2, "전면 코어 부하가 큰 스쿼트"],
  ["leg-barbell-split", "바벨 불가리안 스플릿 스쿼트", "하체", false, 4, "한쪽 다리 균형과 둔근 자극"],
  ["leg-dumbbell-split", "덤벨 불가리안 스플릿 스쿼트", "하체", true, 8, "덤벨을 활용한 편측 하체 운동"],
  ["leg-db-split-squat", "덤벨 스플릿 스쿼트", "하체", false, 3, "초보자도 접근하기 쉬운 편측 운동"],
  ["back-pullover-machine", "풀오버 머신", "등", false, 4, "광배근 고립 운동"],
  ["back-pullup", "풀업", "등", true, 20, "맨몸 등 운동"],
  ["back-pendlay-row", "펜들레이 로우", "등", false, 6, "수평 당기기 운동"],
  ["back-low-row", "로우 로우 머신", "등", false, 9, "등 중앙부 머신 운동"],
  ["back-cable-row", "시티드 케이블 로우", "등", true, 11, "케이블 수평 당기기"],
  ["back-onearm-row", "원암 로우 로우 머신", "등", false, 3, "좌우 균형 보완"],
  ["chest-bench", "벤치프레스", "가슴", true, 16, "가슴 대표 복합 운동"],
  ["chest-incline-db", "인클라인 덤벨 프레스", "가슴", false, 7, "윗가슴 자극"],
  ["shoulder-press", "숄더프레스", "어깨", true, 10, "어깨 수직 밀기"],
  ["arm-barbell-curl", "바벨 컬", "팔", false, 6, "이두근 운동"],
  ["core-crunch", "크런치", "복근", false, 14, "복직근 운동"],
  ["leg-goblet-squat", "덤벨 고블릿 스쿼트", "하체", true, 9, "초보자도 자세를 잡기 쉬운 스쿼트"],
  ["leg-dumbbell-squat", "덤벨 스쿼트", "하체", false, 7, "덤벨로 수행하는 하체 복합 운동"],
  ["leg-press", "레그 프레스", "하체", true, 15, "머신으로 하체를 강하게 미는 운동"],
  ["leg-extension", "레그 익스텐션", "하체", false, 11, "대퇴사두근 고립 운동"],
  ["leg-dumbbell-lunge", "덤벨 런지", "하체", true, 10, "하체 균형과 둔근을 함께 쓰는 운동"],
  ["leg-walking-lunge", "덤벨 워킹 런지", "하체", false, 6, "보행 패턴으로 이어가는 런지"],
  ["leg-step-up", "덤벨 스텝업", "하체", false, 5, "박스나 벤치를 활용한 편측 하체 운동"],
  ["leg-hack-squat", "핵 스쿼트 머신", "하체", false, 8, "머신 기반 대퇴사두 중심 스쿼트"],
  ["leg-romanian-deadlift", "루마니안 데드리프트", "하체", true, 12, "햄스트링과 둔근 후면 사슬 운동"],
  ["leg-lying-curl", "라잉 레그 컬", "하체", false, 7, "햄스트링 고립 운동"],
  ["leg-hip-thrust", "바벨 힙 쓰러스트", "하체", true, 13, "둔근을 강하게 쓰는 힙 익스텐션 운동"],
  ["leg-calf-raise", "스탠딩 카프 레이즈", "하체", false, 9, "종아리 비복근 중심 운동"],
  ["back-lat-pulldown", "랫 풀다운", "등", true, 16, "광배근 너비를 만드는 수직 당기기"],
  ["back-wide-pullup", "와이드 그립 풀업", "등", false, 9, "넓은 그립의 맨몸 등 운동"],
  ["back-close-pulldown", "클로즈 그립 랫 풀다운", "등", false, 8, "좁은 그립 수직 당기기"],
  ["back-straight-arm-pulldown", "스트레이트 암 풀다운", "등", false, 7, "팔을 편 채 광배근을 쓰는 운동"],
  ["back-vbar-pulldown", "브이바 풀다운", "등", false, 4, "중립 그립 케이블 풀다운"],
  ["back-chin-up", "친업", "등", true, 14, "등과 팔을 함께 쓰는 언더그립 당기기"],
  ["back-bent-over-db-row", "덤벨 벤트오버 로우", "등", true, 13, "덤벨로 수행하는 수평 당기기"],
  ["back-barbell-row", "바벨 로우", "등", true, 12, "등 두께를 만드는 바벨 로우"],
  ["back-tbar-row", "티바 로우", "등", false, 8, "상부 등과 광배근을 함께 쓰는 로우"],
  ["back-machine-row", "체스트 서포티드 머신 로우", "등", false, 7, "몸통을 고정하고 당기는 머신 로우"],
  ["back-deadlift", "데드리프트", "등", true, 10, "후면 사슬과 등 전체를 쓰는 복합 운동"],
  ["back-back-extension", "백 익스텐션", "등", false, 5, "척추기립근과 둔근 보조 운동"],
  ["chest-db-bench", "덤벨 벤치프레스", "가슴", true, 14, "덤벨로 수행하는 가슴 복합 운동"],
  ["chest-incline-bench", "인클라인 벤치프레스", "가슴", true, 10, "윗가슴 중심 바벨 프레스"],
  ["chest-db-fly", "덤벨 플라이", "가슴", false, 8, "가슴을 벌리고 모으는 고립 운동"],
  ["chest-pec-deck", "펙덱 플라이", "가슴", false, 11, "머신으로 수행하는 가슴 고립 운동"],
  ["chest-cable-fly", "스탠딩 케이블 플라이", "가슴", false, 6, "케이블 저항의 가슴 플라이"],
  ["chest-pushup", "푸시업", "가슴", true, 19, "맨몸 가슴 복합 운동"],
  ["chest-dip", "체스트 딥", "가슴", false, 5, "가슴 하부와 삼두를 함께 쓰는 딥"],
  ["chest-decline-bench", "디클라인 벤치프레스", "가슴", false, 4, "가슴 하부 중심 프레스"],
  ["chest-smith-bench", "스미스 머신 벤치프레스", "가슴", false, 6, "궤도가 고정된 머신 프레스"],
  ["chest-cable-crossover", "케이블 크로스오버", "가슴", true, 9, "가슴 수축감을 만들기 쉬운 케이블 운동"],
  ["shoulder-db-lateral-raise", "덤벨 레터럴 레이즈", "어깨", true, 18, "측면 삼각근 고립 운동"],
  ["shoulder-military-press", "밀리터리 프레스", "어깨", true, 11, "바벨 기반 수직 밀기"],
  ["shoulder-reverse-fly", "벤트오버 덤벨 리버스 플라이", "어깨", false, 9, "후면 삼각근 고립 운동"],
  ["shoulder-standing-db-press", "스탠딩 덤벨 숄더프레스", "어깨", false, 7, "서서 수행하는 덤벨 수직 밀기"],
  ["shoulder-seated-db-press", "시티드 덤벨 프레스", "어깨", true, 13, "앉아서 안정적으로 미는 어깨 운동"],
  ["shoulder-arnold-press", "아놀드 프레스", "어깨", false, 8, "회전 동작이 포함된 덤벨 프레스"],
  ["shoulder-face-pull", "케이블 페이스 풀", "어깨", true, 12, "후면 삼각근과 견갑 안정화 운동"],
  ["shoulder-front-raise", "덤벨 프론트 레이즈", "어깨", false, 5, "전면 삼각근 고립 운동"],
  ["shoulder-cable-reverse-fly", "케이블 리버스 플라이", "어깨", false, 4, "케이블로 수행하는 후면 어깨 운동"],
  ["shoulder-upright-row", "업라이트 로우", "어깨", false, 6, "어깨와 승모를 함께 쓰는 당기기"],
  ["arm-db-curl", "덤벨 컬", "팔", true, 15, "덤벨 이두근 고립 운동"],
  ["arm-hammer-curl", "해머 컬", "팔", true, 13, "상완근과 이두를 함께 쓰는 컬"],
  ["arm-incline-db-curl", "인클라인 덤벨 컬", "팔", false, 8, "긴 가동범위의 이두근 운동"],
  ["arm-cable-curl", "케이블 컬", "팔", false, 9, "장력 유지가 쉬운 케이블 컬"],
  ["arm-concentration-curl", "컨센트레이션 컬", "팔", false, 6, "이두 수축에 집중하는 덤벨 컬"],
  ["arm-preacher-curl", "EZ바 프리처 컬", "팔", true, 10, "팔꿈치를 고정한 이두근 운동"],
  ["arm-zottman-curl", "조트맨 컬", "팔", false, 4, "이두와 전완을 함께 쓰는 컬"],
  ["arm-rope-pushdown", "로프 트라이셉스 익스텐션", "팔", true, 14, "케이블 삼두근 고립 운동"],
  ["arm-skullcrusher", "EZ바 스컬크러셔", "팔", false, 8, "누워서 수행하는 삼두근 운동"],
  ["arm-close-grip-bench", "클로즈 그립 벤치프레스", "팔", false, 7, "삼두 중심의 좁은 그립 프레스"],
  ["arm-tricep-dip", "트라이셉스 딥", "팔", true, 12, "맨몸 삼두근 복합 운동"],
  ["arm-db-kickback", "덤벨 킥백", "팔", false, 5, "삼두 후면 수축 고립 운동"],
  ["arm-overhead-extension", "오버헤드 덤벨 익스텐션", "팔", false, 6, "삼두 장두를 늘려 쓰는 운동"],
  ["core-leg-raise", "라잉 레그 레이즈", "복근", true, 13, "하복부 중심 맨몸 운동"],
  ["core-cable-crunch", "케이블 크런치", "복근", false, 9, "중량을 더할 수 있는 복근 운동"],
  ["core-weighted-crunch", "웨이티드 크런치", "복근", false, 8, "부하를 더한 크런치"],
  ["core-hanging-leg-raise", "행잉 레그 레이즈", "복근", true, 11, "매달려 수행하는 고난도 복근 운동"],
  ["core-plank", "플랭크", "복근", true, 18, "코어 안정성 운동"],
  ["core-side-plank", "사이드 플랭크", "복근", false, 10, "측면 코어 안정성 운동"],
  ["core-russian-twist", "러시안 트위스트", "복근", false, 8, "회전 패턴의 복근 운동"],
  ["core-pallof-press", "팔로프 프레스", "복근", false, 5, "회전 저항 코어 운동"],
  ["core-bicycle-crunch", "바이시클 크런치", "복근", true, 12, "복직근과 복사근을 함께 쓰는 운동"],
  ["core-dead-bug", "데드 버그", "복근", false, 6, "허리 부담을 줄인 코어 조절 운동"],
  ["core-ab-rollout", "바벨 앱 롤아웃", "복근", false, 4, "전면 코어를 강하게 쓰는 롤아웃"],
  ["cardio-mountain-climber", "마운틴 클라이머", "유산소", true, 16, "코어와 심박을 함께 올리는 맨몸 운동"],
  ["cardio-burpee", "버피", "유산소", true, 14, "전신 고강도 유산소 운동"],
  ["cardio-jumping-jack", "점핑 잭", "유산소", false, 18, "상하체 협응을 쓰는 기본 유산소"],
  ["cardio-high-knees", "하이 니", "유산소", false, 13, "무릎을 높이 들어 심박을 올리는 운동"],
  ["cardio-jump-rope", "줄넘기", "유산소", true, 20, "전신 협응과 심폐지구력 운동"],
  ["cardio-squat-jump", "스쿼트 점프", "유산소", false, 9, "하체 파워와 심박을 함께 올리는 점프"],
  ["cardio-skater-jump", "스케이터 점프", "유산소", false, 7, "좌우 이동 패턴의 고강도 운동"],
  ["cardio-plank-jack", "플랭크 잭", "유산소", false, 6, "플랭크 자세에서 수행하는 유산소"],
  ["cardio-tuck-jump", "턱 점프", "유산소", false, 5, "점프 파워와 심박 상승 운동"],
  ["cardio-box-jump", "박스 점프", "유산소", false, 8, "하체 파워 기반 플라이오메트릭 운동"],
  ["cardio-running", "러닝", "유산소", true, 22, "지속 심폐지구력 운동"],
  ["cardio-cycling", "사이클", "유산소", false, 15, "관절 부담이 비교적 낮은 유산소"],
].map(([id, name, category, bookmarked, recentCount, description]) => ({
  id,
  name,
  category,
  bookmarked,
  recentCount,
  description,
}));

const state = {
  route: "CalendarScreen",
  selectedDate: toDateKey(new Date()),
  calendarCursor: startOfMonth(new Date()),
  workouts: loadJson(STORAGE_KEY, {}),
  exercises: applyBookmarks(baseExercises),
  search: "",
  category: "전체",
  bookmarkOnly: false,
  sort: "default",
  selectedExerciseIds: new Set(),
  restDurationSeconds: 90,
  restRemainingSeconds: 90,
  restRunning: false,
  restEndsAt: null,
};

const app = document.querySelector("#app");

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function saveWorkouts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.workouts));
}

function saveBookmarks() {
  const bookmarks = Object.fromEntries(state.exercises.map((item) => [item.id, item.bookmarked]));
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
}

function applyBookmarks(exercises) {
  const bookmarks = loadJson(BOOKMARK_KEY, {});
  return exercises.map((exercise) => ({
    ...exercise,
    bookmarked: bookmarks[exercise.id] ?? exercise.bookmarked,
  }));
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function uid(prefix) {
  if (crypto.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getDailyWorkout(date = state.selectedDate) {
  return state.workouts[date] ?? {
    date,
    exercises: [],
    durationMinutes: 0,
    calories: 0,
    totalVolume: 0,
    timerElapsedSeconds: 0,
    timerRunning: false,
    timerStartedAt: null,
  };
}

function ensureDailyWorkout(date = state.selectedDate) {
  if (!state.workouts[date]) state.workouts[date] = getDailyWorkout(date);
  return state.workouts[date];
}

function recalcDaily(date = state.selectedDate) {
  const day = ensureDailyWorkout(date);
  day.totalVolume = day.exercises.reduce((sum, exercise) => sum + getExerciseVolume(exercise), 0);
  const completedSets = day.exercises.flatMap((exercise) => exercise.sets).filter((set) => set.completed).length;
  const elapsedSeconds = getWorkoutElapsedSeconds(day);
  day.durationMinutes =
    elapsedSeconds > 0 || day.timerRunning
      ? Math.ceil(elapsedSeconds / 60)
      : day.exercises.length
        ? Math.max(20, day.exercises.length * 12 + completedSets * 2)
        : 0;
  const bodyweightReps = day.exercises.reduce((sum, exercise) => {
    const hasWeight = exercise.sets.some((set) => Number(set.weight) > 0);
    return hasWeight ? sum : sum + exercise.sets.reduce((setSum, set) => setSum + Number(set.reps || 0), 0);
  }, 0);
  day.calories = Math.round(day.totalVolume > 0 ? day.totalVolume * 0.04 : bodyweightReps * 0.35);
  if (!day.exercises.length && !elapsedSeconds && !day.timerRunning) delete state.workouts[date];
  saveWorkouts();
}

function getWorkoutElapsedSeconds(day = getDailyWorkout()) {
  const base = Number(day.timerElapsedSeconds || 0);
  if (!day.timerRunning || !day.timerStartedAt) return base;
  const started = new Date(day.timerStartedAt).getTime();
  if (!Number.isFinite(started)) return base;
  return base + Math.max(0, Math.floor((Date.now() - started) / 1000));
}

function getExerciseVolume(exercise) {
  return exercise.sets.reduce((sum, set) => sum + Number(set.weight || 0) * Number(set.reps || 0), 0);
}

function getRepresentativeSet(exercise) {
  const best = [...exercise.sets].sort((a, b) => Number(b.weight) * Number(b.reps) - Number(a.weight) * Number(a.reps))[0];
  if (!best) return "기록 없음";
  const weight = Number(best.weight || 0);
  const reps = Number(best.reps || 0);
  return weight > 0 ? `${cleanNumber(weight)}kg x ${reps}회` : `${reps}회`;
}

function allSetsCompleted(exercise) {
  return exercise.sets.length > 0 && exercise.sets.every((set) => set.completed);
}

function formatMonth(date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

function formatDayTitle(dateKey) {
  const date = parseDateKey(dateKey);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function formatSummaryDate(dateKey) {
  const date = parseDateKey(dateKey);
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getMonth() + 1}월 ${date.getDate()}일 ${weekdays[date.getDay()]}, 운동 요약`;
}

function isFutureDate(dateKey) {
  return parseDateKey(dateKey).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0);
}

function cleanNumber(value) {
  return Number(value || 0).toLocaleString("ko-KR", { maximumFractionDigits: 1 });
}

function formatTimer(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(Number(totalSeconds || 0)));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}

function formatRestTimer(totalSeconds) {
  const safeSeconds = Math.max(0, Math.ceil(Number(totalSeconds || 0)));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (match) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return entities[match];
  });
}

function render() {
  recalcDaily(state.selectedDate);
  if (state.route === "CalendarScreen") renderCalendarScreen();
  if (state.route === "WorkoutEditorScreen") renderWorkoutEditorScreen();
  if (state.route === "ExerciseSelectScreen") renderExerciseSelectScreen();
  if (state.route === "WorkoutSummaryScreen") renderWorkoutSummaryScreen();
}

function topNav(title, { left = "‹", right = "오늘", onLeft = "calendar", onRight = "today" } = {}) {
  return `
    <header class="top-nav">
      <button class="icon-btn plain" data-action="${onLeft}" type="button">${left}</button>
      <div class="title-block">
        <span class="app-name">FitLog</span>
        <h1 class="top-title">${escapeHtml(title)}</h1>
      </div>
      <button class="icon-btn" data-action="${onRight}" type="button">${right}</button>
    </header>
  `;
}

function renderCalendarScreen() {
  const day = getDailyWorkout();
  app.innerHTML = `
    <section class="screen">
      ${topNav(formatMonth(state.calendarCursor), { left: "‹", right: "⌖", onLeft: "prev-month", onRight: "today" })}
      <div class="screen-body">
        ${CalendarMonth()}
        ${SummaryCard(day, true)}
        ${WorkoutList(day)}
      </div>
      <footer class="bottom-bar">
        <button class="ghost-btn" data-action="copy-routine" type="button">복사</button>
        <button class="danger-btn" data-action="delete-day" type="button">삭제</button>
      </footer>
    </section>
  `;
  bindCommonActions();
}

function CalendarMonth() {
  const cursor = state.calendarCursor;
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const start = new Date(first);
  start.setDate(1 - first.getDay());
  const todayKey = toDateKey(new Date());
  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = toDateKey(date);
    const hasWorkout = Boolean(state.workouts[key]?.exercises?.length);
    return `
      <button class="calendar-day ${date.getMonth() !== cursor.getMonth() ? "muted" : ""} ${key === state.selectedDate ? "selected" : ""} ${key === todayKey ? "today" : ""}" data-date="${key}" type="button">
        <span class="date-dot">${date.getDate()}</span>
        ${hasWorkout ? '<span class="workout-marker"></span>' : ""}
      </button>
    `;
  }).join("");

  return `
    <article class="calendar-card">
      <div class="weekday-row">
        ${["일", "월", "화", "수", "목", "금", "토"].map((day) => `<span>${day}</span>`).join("")}
      </div>
      <div class="calendar-grid">${days}</div>
    </article>
  `;
}

function SummaryCard(day, calendarMode = false) {
  return `
    <article class="summary-card">
      <div class="summary-head">
        <h2>${formatSummaryDate(state.selectedDate)}</h2>
        ${calendarMode ? '<button class="link-btn" data-action="summary" type="button">상세</button>' : ""}
      </div>
      <div class="summary-grid">
        <div class="metric"><strong>${day.durationMinutes}분</strong><span>총 운동 시간</span></div>
        <div class="metric"><strong>${day.exercises.length}개</strong><span>운동 개수</span></div>
        <div class="metric"><strong>${cleanNumber(day.totalVolume)}kg</strong><span>전체 볼륨</span></div>
        <div class="metric"><strong>${cleanNumber(day.calories)}kcal</strong><span>칼로리</span></div>
      </div>
    </article>
  `;
}

function WorkoutList(day) {
  if (!day.exercises.length) {
    return `
      <article class="empty-card">
        <h2>아직 기록이 없어요</h2>
        <p>운동 추가 버튼으로 오늘의 루틴을 만들고 세트별 무게와 반복 횟수를 기록해보세요.</p>
        <button class="primary-btn" data-action="editor" type="button">운동 기록 작성</button>
      </article>
    `;
  }
  return `
    <div class="section-row">
      <h2 class="section-title">수행 운동</h2>
      <button class="link-btn" data-action="editor" type="button">수정</button>
    </div>
    <div class="workout-list">
      ${day.exercises.map((exercise) => WorkoutListItem(exercise)).join("")}
    </div>
  `;
}

function WorkoutListItem(exercise, indexLabel = "") {
  return `
    <article class="workout-item">
      <div class="workout-main">
        <strong>${indexLabel}${escapeHtml(exercise.category)} | ${escapeHtml(exercise.name)} ${exercise.sets.length}세트</strong>
        <span>${getRepresentativeSet(exercise)}</span>
      </div>
      <div class="inline-actions">
        <span class="volume-pill">${cleanNumber(getExerciseVolume(exercise))}kg</span>
        ${allSetsCompleted(exercise) ? '<span class="check-pill">✓</span>' : ""}
      </div>
    </article>
  `;
}

function renderWorkoutEditorScreen() {
  const day = getDailyWorkout();
  app.innerHTML = `
    <section class="screen">
      ${topNav(formatDayTitle(state.selectedDate), { left: "‹", right: "요약", onLeft: "calendar", onRight: "summary" })}
      <div class="screen-body">
        ${WorkoutTimerCard(day)}
        ${RestTimerCard()}
        ${isFutureDate(state.selectedDate) ? '<p class="future-note">미래는 계획만 세울 수 있어요.</p>' : ""}
        <div class="exercise-stack">
          ${day.exercises.length ? day.exercises.map((exercise, index) => WorkoutExerciseCard(exercise, index)).join("") : `
            <article class="empty-card">
              <h2>운동을 추가해주세요</h2>
              <p>직접 추가 화면에서 운동을 선택하면 기본 3세트 카드가 생성됩니다.</p>
            </article>
          `}
        </div>
      </div>
      <footer class="bottom-bar">
        <button class="primary-btn" data-action="select-exercise" type="button">운동 추가</button>
        <button class="ghost-btn" data-action="load-routine" type="button">불러오기</button>
      </footer>
    </section>
  `;
  bindCommonActions();
  bindEditorActions();
}

function WorkoutTimerCard(day) {
  return `
    <article class="timer-card">
      <div>
        <span class="timer-label">운동 경과 시간</span>
        <strong id="workoutTimerText">${formatTimer(getWorkoutElapsedSeconds(day))}</strong>
      </div>
      <div class="timer-controls">
        <button class="${day.timerRunning ? "secondary-btn" : "primary-btn"}" data-action="${day.timerRunning ? "end-workout" : "start-workout"}" type="button">
          ${day.timerRunning ? "운동 종료" : "운동 시작"}
        </button>
        <button class="ghost-btn compact" data-action="reset-workout-timer" type="button">초기화</button>
      </div>
    </article>
  `;
}

function RestTimerCard() {
  return `
    <article class="rest-timer-card">
      <div class="rest-timer-head">
        <div>
          <span class="timer-label">세트 후 휴식</span>
          <strong id="restTimerText">${formatRestTimer(getRestRemainingSeconds())}</strong>
        </div>
        <span id="restTimerStatus" class="volume-pill">${state.restRunning ? "진행중" : "대기"}</span>
      </div>
      <div class="rest-adjust-grid">
        <button class="ghost-btn compact" data-rest-adjust="-10" type="button">-10초</button>
        <button class="ghost-btn compact" data-rest-adjust="-5" type="button">-5초</button>
        <button class="ghost-btn compact" data-rest-adjust="5" type="button">+5초</button>
        <button class="ghost-btn compact" data-rest-adjust="10" type="button">+10초</button>
      </div>
    </article>
  `;
}

function WorkoutExerciseCard(exercise, index) {
  return `
    <article class="exercise-card">
      <div class="exercise-title">
        <span class="order-badge">${index + 1}</span>
        <div>
          <h3>${escapeHtml(exercise.category)} | ${escapeHtml(exercise.name)}</h3>
          <p data-exercise-volume="${escapeHtml(exercise.id)}">총 볼륨 ${cleanNumber(getExerciseVolume(exercise))}kg</p>
        </div>
        <button class="icon-btn plain" data-info="${escapeHtml(exercise.exerciseId)}" type="button">ⓘ</button>
        <button class="icon-btn plain" data-remove-exercise="${escapeHtml(exercise.id)}" type="button">⋯</button>
      </div>
      <div class="card-actions">
        <button class="recent-btn" type="button">최근 기록</button>
        <span class="volume-pill">${exercise.sets.filter((set) => set.completed).length}/${exercise.sets.length} 완료</span>
      </div>
      <textarea class="memo-input" data-memo="${escapeHtml(exercise.id)}" placeholder="메모를 입력하세요.">${escapeHtml(exercise.memo || "")}</textarea>
      <div class="set-table">
        <div class="set-head"><span>세트</span><span>kg</span><span>회</span><span>완료</span></div>
        ${exercise.sets.map((set, setIndex) => SetInputRow(exercise.id, set, setIndex)).join("")}
      </div>
      <div class="set-controls">
        <button class="ghost-btn" data-add-set="${escapeHtml(exercise.id)}" type="button">세트추가</button>
        <button class="ghost-btn" data-delete-set="${escapeHtml(exercise.id)}" type="button">세트삭제</button>
      </div>
      <div class="set-controls">
        <button class="primary-btn" data-action="select-exercise" type="button">운동 추가</button>
        <button class="danger-btn" data-remove-exercise="${escapeHtml(exercise.id)}" type="button">운동 삭제</button>
      </div>
    </article>
  `;
}

function SetInputRow(exerciseId, set, index) {
  return `
    <div class="set-row">
      <strong>${index + 1}</strong>
      <input data-set-field="${escapeHtml(exerciseId)}:${escapeHtml(set.id)}:weight" value="${escapeHtml(set.weight)}" inputmode="decimal" type="number" min="0" step="0.5" aria-label="${index + 1}세트 kg" />
      <input data-set-field="${escapeHtml(exerciseId)}:${escapeHtml(set.id)}:reps" value="${escapeHtml(set.reps)}" inputmode="numeric" type="number" min="0" step="1" aria-label="${index + 1}세트 반복 횟수" />
      <button class="done-btn ${set.completed ? "done" : ""}" data-toggle-set="${escapeHtml(exerciseId)}:${escapeHtml(set.id)}" type="button">${set.completed ? "✓" : ""}</button>
    </div>
  `;
}

function renderExerciseSelectScreen() {
  const exercises = getFilteredExercises();
  app.innerHTML = `
    <section class="screen">
      ${topNav(formatDayTitle(state.selectedDate), { left: "‹", right: "＋", onLeft: "editor", onRight: "add-selected" })}
      <div class="screen-body">
        <div class="tabs">
          <button class="tab active" type="button">직접 추가</button>
          <button class="tab" disabled type="button">내 루틴</button>
          <button class="tab" disabled type="button">불러오기</button>
        </div>
        <article class="search-card">
          <div class="search-row">
            <input class="search-input" id="searchInput" value="${escapeHtml(state.search)}" placeholder="찾으시는 운동을 검색해보세요." type="search" />
            <button class="square-btn" type="button" disabled>⌗</button>
          </div>
          ${CategoryFilter()}
          <div class="filter-row">
            <label class="bookmark-only">
              <input id="bookmarkOnly" ${state.bookmarkOnly ? "checked" : ""} type="checkbox" />
              북마크만 보기
            </label>
            <select id="sortSelect" class="sort-select">
              <option value="default" ${state.sort === "default" ? "selected" : ""}>기본순</option>
              <option value="name" ${state.sort === "name" ? "selected" : ""}>이름순</option>
              <option value="recent" ${state.sort === "recent" ? "selected" : ""}>최근순</option>
            </select>
          </div>
        </article>
        <article class="list-card">
          ${exercises.length ? exercises.map(ExerciseListItem).join("") : `
            <div class="empty-card">
              <h2>검색 결과가 없어요</h2>
              <p>다른 운동명이나 부위 필터를 선택해보세요.</p>
            </div>
          `}
        </article>
      </div>
      <footer class="bottom-bar single">
        <button class="secondary-btn" data-action="clear-selection" type="button">＋</button>
        <button class="primary-btn" data-action="add-selected" ${state.selectedExerciseIds.size ? "" : "disabled"} type="button">
          ${state.selectedExerciseIds.size ? "선택한 운동 추가" : "운동을 선택해주세요"}
        </button>
      </footer>
    </section>
  `;
  bindCommonActions();
  bindSelectActions();
}

function CategoryFilter() {
  return `
    <div class="chips">
      ${categories.map((category) => `
        <button class="chip ${state.category === category ? "active" : ""}" data-category="${category}" type="button">${category}</button>
      `).join("")}
    </div>
  `;
}

function ExerciseListItem(exercise) {
  const selected = state.selectedExerciseIds.has(exercise.id);
  return `
    <button class="exercise-option ${selected ? "selected" : ""}" data-select-exercise-id="${escapeHtml(exercise.id)}" type="button">
      <span class="check-box">${selected ? "✓" : ""}</span>
      <span class="muscle-icon">${getCategoryIcon(exercise.category)}</span>
      <span class="option-text">
        <strong>${escapeHtml(exercise.name)}</strong>
        <span>${escapeHtml(exercise.category)} | ${escapeHtml(exercise.description)}</span>
      </span>
      <span class="mini-count">${exercise.recentCount || ""}</span>
      <span class="star-btn ${exercise.bookmarked ? "on" : ""}" data-bookmark="${escapeHtml(exercise.id)}">★</span>
    </button>
  `;
}

function getCategoryIcon(category) {
  const icons = { 하체: "⌁", 가슴: "▰", 등: "◧", 어깨: "△", 팔: "◔", 복근: "◇", 유산소: "↗" };
  return icons[category] || "●";
}

function getFilteredExercises() {
  let items = [...state.exercises];
  const keyword = state.search.trim().toLowerCase();
  if (keyword) items = items.filter((item) => item.name.toLowerCase().includes(keyword));
  if (state.category !== "전체") items = items.filter((item) => item.category === state.category);
  if (state.bookmarkOnly) items = items.filter((item) => item.bookmarked);
  if (state.sort === "name") items.sort((a, b) => a.name.localeCompare(b.name, "ko"));
  if (state.sort === "recent") items.sort((a, b) => b.recentCount - a.recentCount);
  return items;
}

function renderWorkoutSummaryScreen() {
  const day = getDailyWorkout();
  app.innerHTML = `
    <section class="screen">
      ${topNav(formatDayTitle(state.selectedDate), { left: "‹", right: "수정", onLeft: "calendar", onRight: "editor" })}
      <div class="screen-body compact-bottom">
        ${SummaryCard(day)}
        <div class="section-row">
          <h2 class="section-title">수행 운동 정보</h2>
          <span class="muted-text">${day.exercises.length}개</span>
        </div>
        <div class="summary-detail-list">
          ${day.exercises.length ? day.exercises.map((exercise, index) => `
            <article class="detail-item">
              <span class="detail-index">${index + 1}</span>
              <div class="workout-main">
                <strong>${escapeHtml(exercise.category)} | ${escapeHtml(exercise.name)} ${exercise.sets.length}세트</strong>
                <span>${getRepresentativeSet(exercise)}</span>
              </div>
              <div class="inline-actions">
                <span class="volume-pill">${cleanNumber(getExerciseVolume(exercise))}kg</span>
                ${allSetsCompleted(exercise) ? '<span class="check-pill">✓</span>' : ""}
              </div>
            </article>
          `).join("") : `
            <article class="empty-card">
              <h2>요약할 운동이 없어요</h2>
              <p>운동 기록 작성 화면에서 먼저 운동을 추가해주세요.</p>
            </article>
          `}
        </div>
      </div>
    </section>
  `;
  bindCommonActions();
}

function bindCommonActions() {
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.action));
  });
  document.querySelectorAll("[data-date]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedDate = button.dataset.date;
      state.calendarCursor = startOfMonth(parseDateKey(state.selectedDate));
      state.route = "CalendarScreen";
      render();
    });
  });
}

function bindEditorActions() {
  document.querySelectorAll("[data-set-field]").forEach((input) => {
    input.addEventListener("input", () => {
      const [exerciseId, setId, field] = input.dataset.setField.split(":");
      const exercise = findWorkoutExercise(exerciseId);
      const set = exercise?.sets.find((item) => item.id === setId);
      if (!set) return;
      set[field] = input.value;
      recalcDaily();
      updateEditorLiveTotals(exercise);
    });
  });
  document.querySelectorAll("[data-toggle-set]").forEach((button) => {
    button.addEventListener("click", () => {
      const [exerciseId, setId] = button.dataset.toggleSet.split(":");
      const exercise = findWorkoutExercise(exerciseId);
      const set = exercise?.sets.find((item) => item.id === setId);
      if (!set) return;
      set.completed = !set.completed;
      if (set.completed) startRestTimer();
      recalcDaily();
      renderWorkoutEditorScreen();
    });
  });
  document.querySelectorAll("[data-memo]").forEach((input) => {
    input.addEventListener("input", () => {
      const exercise = findWorkoutExercise(input.dataset.memo);
      if (!exercise) return;
      exercise.memo = input.value;
      recalcDaily();
    });
  });
  document.querySelectorAll("[data-add-set]").forEach((button) => {
    button.addEventListener("click", () => {
      const exercise = findWorkoutExercise(button.dataset.addSet);
      if (!exercise) return;
      exercise.sets.push(createBlankSet(exercise.sets.length + 1));
      recalcDaily();
      renderWorkoutEditorScreen();
    });
  });
  document.querySelectorAll("[data-delete-set]").forEach((button) => {
    button.addEventListener("click", () => {
      const exercise = findWorkoutExercise(button.dataset.deleteSet);
      if (!exercise || exercise.sets.length <= 1) return;
      exercise.sets.pop();
      recalcDaily();
      renderWorkoutEditorScreen();
    });
  });
  document.querySelectorAll("[data-remove-exercise]").forEach((button) => {
    button.addEventListener("click", () => {
      const day = ensureDailyWorkout();
      day.exercises = day.exercises.filter((exercise) => exercise.id !== button.dataset.removeExercise);
      recalcDaily();
      renderWorkoutEditorScreen();
    });
  });
  document.querySelectorAll("[data-info]").forEach((button) => {
    button.addEventListener("click", () => {
      const exercise = state.exercises.find((item) => item.id === button.dataset.info);
      if (exercise) alert(`${exercise.category} | ${exercise.name}\n${exercise.description}`);
    });
  });
  document.querySelectorAll("[data-rest-adjust]").forEach((button) => {
    button.addEventListener("click", () => {
      adjustRestTimer(Number(button.dataset.restAdjust));
      updateTimerDisplays();
    });
  });
}

function bindSelectActions() {
  const searchInput = document.querySelector("#searchInput");
  searchInput?.addEventListener("input", () => {
    state.search = searchInput.value;
    renderExerciseSelectScreen();
  });
  document.querySelector("#bookmarkOnly")?.addEventListener("change", (event) => {
    state.bookmarkOnly = event.target.checked;
    renderExerciseSelectScreen();
  });
  document.querySelector("#sortSelect")?.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderExerciseSelectScreen();
  });
  document.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      renderExerciseSelectScreen();
    });
  });
  document.querySelectorAll("[data-select-exercise-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (event.target.dataset.bookmark) return;
      toggleSelectedExercise(button.dataset.selectExerciseId);
      renderExerciseSelectScreen();
    });
  });
  document.querySelectorAll("[data-bookmark]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const exercise = state.exercises.find((item) => item.id === button.dataset.bookmark);
      if (!exercise) return;
      exercise.bookmarked = !exercise.bookmarked;
      saveBookmarks();
      renderExerciseSelectScreen();
    });
  });
}

function updateEditorLiveTotals(exercise) {
  const volumeEl = document.querySelector(`[data-exercise-volume="${CSS.escape(exercise.id)}"]`);
  if (volumeEl) volumeEl.textContent = `총 볼륨 ${cleanNumber(getExerciseVolume(exercise))}kg`;
}

function handleAction(action) {
  if (action === "calendar") state.route = "CalendarScreen";
  if (action === "editor") state.route = "WorkoutEditorScreen";
  if (action === "summary") state.route = "WorkoutSummaryScreen";
  if (action === "select-exercise") {
    state.route = "ExerciseSelectScreen";
    state.selectedExerciseIds.clear();
  }
  if (action === "prev-month") {
    state.calendarCursor.setMonth(state.calendarCursor.getMonth() - 1);
    state.route = "CalendarScreen";
  }
  if (action === "today") {
    state.selectedDate = toDateKey(new Date());
    state.calendarCursor = startOfMonth(new Date());
    state.route = "CalendarScreen";
  }
  if (action === "start-workout") {
    startWorkoutTimer();
  }
  if (action === "end-workout") {
    endWorkoutTimer();
  }
  if (action === "reset-workout-timer") {
    resetWorkoutTimer();
  }
  if (action === "delete-day") {
    if (state.workouts[state.selectedDate] && confirm("선택한 날짜의 운동 기록을 삭제할까요?")) {
      delete state.workouts[state.selectedDate];
      saveWorkouts();
    }
  }
  if (action === "copy-routine") {
    const day = getDailyWorkout();
    alert(day.exercises.length ? "복사 기능은 MVP에서 알림으로 처리됩니다." : "복사할 운동 기록이 없어요.");
    console.log("FitLog copy routine", state.selectedDate, day.exercises);
  }
  if (action === "load-routine") {
    alert("불러오기 기능은 준비중입니다.");
  }
  if (action === "clear-selection") {
    state.selectedExerciseIds.clear();
  }
  if (action === "add-selected") {
    addSelectedExercises();
    state.route = "WorkoutEditorScreen";
  }
  render();
}

function toggleSelectedExercise(id) {
  if (state.selectedExerciseIds.has(id)) {
    state.selectedExerciseIds.delete(id);
  } else {
    state.selectedExerciseIds.add(id);
  }
}

function addSelectedExercises() {
  if (!state.selectedExerciseIds.size) return;
  const day = ensureDailyWorkout();
  state.selectedExerciseIds.forEach((id) => {
    const exercise = state.exercises.find((item) => item.id === id);
    if (!exercise) return;
    day.exercises.push({
      id: uid("workout-exercise"),
      exerciseId: exercise.id,
      name: exercise.name,
      category: exercise.category,
      memo: "",
      sets: [createBlankSet(1), createBlankSet(2), createBlankSet(3)],
    });
  });
  state.selectedExerciseIds.clear();
  state.search = "";
  state.category = "전체";
  recalcDaily();
}

function createBlankSet(index) {
  return {
    id: uid(`set-${index}`),
    weight: "",
    reps: "",
    completed: false,
  };
}

function findWorkoutExercise(id) {
  return ensureDailyWorkout().exercises.find((exercise) => exercise.id === id);
}

function startWorkoutTimer() {
  const day = ensureDailyWorkout();
  if (day.timerRunning) return;
  day.timerRunning = true;
  day.timerStartedAt = new Date().toISOString();
  day.timerElapsedSeconds = Number(day.timerElapsedSeconds || 0);
  recalcDaily();
}

function endWorkoutTimer() {
  const day = ensureDailyWorkout();
  if (!day.timerRunning) return;
  day.timerElapsedSeconds = getWorkoutElapsedSeconds(day);
  day.timerRunning = false;
  day.timerStartedAt = null;
  recalcDaily();
}

function resetWorkoutTimer() {
  const day = ensureDailyWorkout();
  day.timerElapsedSeconds = 0;
  day.timerRunning = false;
  day.timerStartedAt = null;
  recalcDaily();
}

function startRestTimer() {
  state.restRemainingSeconds = state.restDurationSeconds;
  state.restRunning = true;
  state.restEndsAt = Date.now() + state.restRemainingSeconds * 1000;
}

function getRestRemainingSeconds() {
  if (!state.restRunning || !state.restEndsAt) return state.restRemainingSeconds;
  const remaining = Math.max(0, Math.ceil((state.restEndsAt - Date.now()) / 1000));
  if (remaining === 0) {
    state.restRunning = false;
    state.restEndsAt = null;
    state.restRemainingSeconds = 0;
  }
  return remaining;
}

function adjustRestTimer(seconds) {
  const next = Math.max(0, getRestRemainingSeconds() + seconds);
  state.restRemainingSeconds = next;
  if (state.restRunning) {
    state.restEndsAt = Date.now() + next * 1000;
    if (next === 0) {
      state.restRunning = false;
      state.restEndsAt = null;
    }
  }
}

function updateTimerDisplays() {
  const workoutText = document.querySelector("#workoutTimerText");
  const restText = document.querySelector("#restTimerText");
  const restStatus = document.querySelector("#restTimerStatus");
  const day = getDailyWorkout();
  if (workoutText) workoutText.textContent = formatTimer(getWorkoutElapsedSeconds(day));
  if (restText) restText.textContent = formatRestTimer(getRestRemainingSeconds());
  if (restStatus) restStatus.textContent = state.restRunning ? "진행중" : "대기";
  if (day.timerRunning) {
    day.durationMinutes = Math.ceil(getWorkoutElapsedSeconds(day) / 60);
    saveWorkouts();
  }
}

setInterval(updateTimerDisplays, 1000);

render();
