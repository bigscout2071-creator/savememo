# GitHub Secrets 설정 가이드

SaveMemo 프로젝트의 자동 배포 및 환경변수 관리를 위해 다음 Secrets를 설정해야 합니다.

## 설정 방법

1. GitHub Repository 접속
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret** 클릭
4. 아래의 각 Secret을 추가

---

## 필수 Secrets

### 1. Supabase 설정
```
SUPABASE_URL
값: https://your-project.supabase.co
```

```
SUPABASE_ANON_KEY
값: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (Supabase에서 복사)
```

### 2. Railway 배포
```
RAILWAY_TOKEN
값: [Railway.app에서 발급받은 토큰]
```

획득 방법:
- railway.app 로그인 → Account Settings → API Tokens
- New Token 생성

### 3. GitHub 토큰 (선택)
```
GH_TOKEN
값: ${{ secrets.GITHUB_TOKEN }}
(자동으로 제공됨)
```

---

## 검증 (선택사항)

### Secrets 테스트
```bash
# 로컬에서 테스트
export SUPABASE_URL="..."
export SUPABASE_ANON_KEY="..."
node backend/create-table.js
```

---

## Security Best Practices

✅ 주기적으로 토큰 갱신
✅ 불필요한 권한 제거
✅ 공개 저장소에서는 민감 정보 노출 금지
✅ 배포 후 로그에서 Secrets 확인 안 함

---

## 자동화된 워크플로우

| 워크플로우 | 트리거 | 필요 Secret |
|----------|--------|-----------|
| Frontend Deploy | main 푸시 | - |
| Backend Deploy | backend/** 변경 | RAILWAY_TOKEN |
| CI Tests | PR/Push | - |
| DB Migration | 수동/migrations 변경 | SUPABASE_URL, SUPABASE_ANON_KEY |
| Monitoring | 5분마다 | - |

---

모든 Secrets가 설정되면 다음을 테스트하세요:
1. git push → 자동 배포 확인
2. GitHub Actions 탭에서 워크플로우 실행 상태 확인
3. 배포된 URL에서 앱 접속 확인
