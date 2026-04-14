# SaveMemo 자동 배포 가이드

모든 CI/CD 파이프라인이 설정되었습니다. 다음 단계를 따르세요.

---

## 📋 빠른 시작

### Step 1: GitHub Secrets 설정
[DEPLOYMENT_SECRETS.md](./DEPLOYMENT_SECRETS.md)를 참고하여 필요한 Secrets를 설정하세요.

### Step 2: 배포 확인
```bash
git add .
git commit -m "Enable auto-deployment"
git push origin main
```

GitHub Actions 탭에서 워크플로우 실행을 확인하세요.

---

## 🚀 자동 배포 플로우

### Frontend (GitHub Pages)
```
main 브랜치 푸시
  ↓
GitHub Actions 트리거 (deploy.yml)
  ↓
npm install & npm run build
  ↓
dist 폴더 → gh-pages 브랜치
  ↓
GitHub Pages 자동 배포
  ↓
🌐 https://bigscout2071-creator.github.io/savememo/
```

### Backend (Railway)
```
backend/** 변경 감지
  ↓
GitHub Actions 트리거 (backend-deploy.yml)
  ↓
Railway CLI 실행
  ↓
RAILWAY_TOKEN으로 인증
  ↓
자동 배포 & 재시작
  ↓
✅ Backend Online
```

### DB 마이그레이션
```
migrations/** 변경 OR 수동 트리거
  ↓
GitHub Actions 트리거 (db-migration.yml)
  ↓
Supabase 연결
  ↓
테이블 자동 생성/업데이트
  ↓
✅ Database 준비 완료
```

### 모니터링
```
매 5분마다 자동 실행
  ↓
Frontend/Backend/DB 상태 확인
  ↓
상태 보고서 생성
  ↓
📊 Artifacts에서 확인
```

### CI/CD 테스트
```
PR 생성 또는 main 푸시
  ↓
TypeScript 컴파일 확인
  ↓
빌드 테스트
  ↓
Health Check 실행
  ↓
✅ 배포 전 검증 완료
```

---

## 📊 실시간 상태 확인

### GitHub Actions 대시보드
저장소 → **Actions** 탭에서:
- ✅ 모든 워크플로우 실행 상태
- 📋 각 Job별 로그
- ⏱️ 실행 시간 통계

### 배포 현황
- **Frontend**: https://github.com/bigscout2071-creator/savememo/deployments
- **Backend**: Railway Dashboard (https://railway.app)

---

## ⚙️ 워크플로우 상세

### 1. Frontend 배포 (deploy.yml)
- **트리거**: main 브랜치 푸시
- **시간**: ~3-5분
- **실패 시**: 자동 롤백 안 함 (수동 복구 필요)

### 2. Backend 배포 (backend-deploy.yml)
- **트리거**: backend/** 변경
- **시간**: ~5-10분
- **환경변수**: Railway에서 자동 로드

### 3. CI 테스트 (ci-tests.yml)
- **트리거**: PR & main 푸시
- **검사**: TypeScript, Build, Health Check
- **실패**: PR Merge 차단

### 4. DB 마이그레이션 (db-migration.yml)
- **트리거**: 수동 또는 migrations/** 변경
- **작업**: 테이블 생성/업데이트
- **실패**: 수동 개입 필요

### 5. 모니터링 (monitoring.yml)
- **트리거**: 5분마다 자동
- **검사**: Ping 테스트
- **보고서**: Artifacts 저장

---

## 🔍 문제 해결

### Build 실패
```
GitHub Actions → 실패한 Job → Logs 확인
→ 에러 메시지에서 원인 파악
→ 로컬에서 재현 & 고쳐서 push
```

### Deployment 안 됨
1. Railway Token 유효성 확인
2. Supabase URL/Key 확인
3. Branch 및 path 설정 확인

### DB 테이블 안 만들어짐
1. Supabase Secrets 확인
2. 수동 실행: GitHub Actions → db-migration.yml → Run workflow

---

## 📝 주요 파일

| 파일 | 설명 |
|-----|------|
| `.github/workflows/deploy.yml` | Frontend GitHub Pages 배포 |
| `.github/workflows/backend-deploy.yml` | Backend Railway 배포 |
| `.github/workflows/ci-tests.yml` | 자동 테스트 & 린트 |
| `.github/workflows/db-migration.yml` | DB 마이그레이션 |
| `.github/workflows/monitoring.yml` | 배포 모니터링 |
| `DEPLOYMENT_SECRETS.md` | Secrets 설정 가이드 |
| `Procfile` | Railway 배포 설정 |

---

## ✨ 모든 설정 완료! 🎉

다음 단계:
1. ✅ GitHub Secrets 추가
2. ✅ git push 테스트
3. ✅ Actions 탭에서 진행 상황 모니터링
4. ✅ 배포 URL 접속 확인
