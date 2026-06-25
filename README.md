# FitLog 운동 기록 MVP

FitLog는 모바일 운동 기록 앱의 핵심 UX를 웹에서 실행할 수 있도록 구현한 정적 MVP입니다. Burnfit의 브랜드, 로고, 고유 자산은 사용하지 않았고, 운동 기록 앱에서 흔히 쓰이는 정보 구조를 바탕으로 독자적인 밝은 미니멀 UI로 제작했습니다.

## 구현 화면

- `CalendarScreen`: 월간 캘린더, 운동 기록 날짜 표시, 날짜별 요약
- `WorkoutEditorScreen`: 운동 카드, 메모, 3세트 기본 입력, 세트 추가/삭제, 완료 체크
- `ExerciseSelectScreen`: 직접 추가 탭, 검색, 부위 필터, 북마크, 정렬, 운동 선택
- `WorkoutSummaryScreen`: 하루 전체 요약과 운동별 볼륨 상세

## 데이터 저장

- 웹 MVP이므로 `AsyncStorage` 대신 브라우저 `localStorage`를 사용합니다.
- 저장 키:
  - `fitlog.dailyWorkouts.v1`
  - `fitlog.exerciseBookmarks.v1`
- 새로고침 후에도 날짜별 운동 기록과 북마크가 유지됩니다.
- 기록은 접속한 브라우저/기기마다 따로 저장됩니다.

## 로컬 실행

정적 파일만으로 실행할 수 있습니다.

```bash
python -m http.server 4173
```

PC 브라우저에서는 아래 주소를 엽니다.

```text
http://127.0.0.1:4173/index.html
```

## 같은 Wi-Fi 모바일 접속

PC와 휴대폰이 같은 Wi-Fi에 연결되어 있으면 휴대폰 브라우저에서 PC의 IPv4 주소로 접속합니다.

```text
http://192.168.45.24:4173/index.html
```

PC의 Wi-Fi IP가 바뀐 경우 `ipconfig`로 IPv4 주소를 다시 확인한 뒤 `http://새IP:4173/index.html` 형식으로 접속하면 됩니다.

## 다른 Wi-Fi 또는 LTE 접속

다른 Wi-Fi나 LTE에서는 로컬 IP로 접속할 수 없으므로 공개 터널 또는 정적 호스팅이 필요합니다.

GitHub Pages 배포 URL:

```text
https://munho1219-oss.github.io/fitlog-pages/
```

현재 열린 임시 공개 터널 주소:

```text
https://0c49e09dbb917c.lhr.life/index.html
```

이 주소는 터널 터미널 세션이 켜져 있는 동안만 유지됩니다. 터미널을 닫거나 PC가 절전/종료되면 접속이 끊깁니다.

새 임시 공개 URL이 필요하면 아래 명령을 실행합니다.

```bash
ssh -o StrictHostKeyChecking=accept-new -R 80:localhost:4173 nokey@localhost.run
```

더 오래 유지되는 주소가 필요하면 GitHub Pages, Netlify, Vercel 같은 정적 호스팅에 `index.html`, `styles.css`, `app.js`를 배포하면 됩니다.

## 주요 기능

- 날짜 선택 및 월간 캘린더 이동
- 운동 기록이 있는 날짜에 파란 바 표시
- 운동 검색, 부위 필터링, 북마크 토글
- 선택한 운동을 기록 작성 화면에 추가
- 세트별 kg, 반복 횟수 입력
- 세트 완료 체크
- 운동 시작부터 종료까지 실제 경과 시간 기록
- 세트 완료 시 1분 30초 휴식 타이머 자동 시작
- 휴식 타이머 -10초, -5초, +5초, +10초 조절
- 운동별 총 볼륨 자동 계산
- 하루 전체 볼륨, 운동 시간, 칼로리 요약
- 선택 날짜 운동 기록 삭제
- 복사/불러오기 MVP 알림 처리

## 운동 데이터 검토 기준

- 운동 데이터는 한 사이트의 목록을 그대로 복사하지 않고, ACE Fitness Exercise Library와 Muscle & Strength Exercise Library의 부위 분류를 교차 확인해 구성했습니다.
- 하체, 등, 가슴, 어깨, 팔, 복근은 Muscle & Strength의 부위별 운동 페이지와 ACE의 body part 분류를 기준으로 분류했습니다.
- 유산소는 Health, Prevention, Verywell Health 등 여러 자료에서 반복적으로 유산소 또는 고강도 심폐 운동으로 소개되는 동작만 넣었습니다.
- 앱에는 외부 이미지나 고유 자산을 넣지 않았고, 운동명과 간단한 한국어 설명만 사용합니다.
