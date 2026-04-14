# SaveMemo GitHub Pages Deployment

## 현재 배포 상태

- ✅ Frontend 코드: GitHub에 배포 완료
- ✅ gh-pages 브랜치: dist 폴더 배포 완료
- ⏳ GitHub Pages: 설정 필요

## 🔧 GitHub Pages 수동 설정

GitHub 저장소 Settings → Pages에서:

1. **Source 선택**
   - Deploy from branch 선택
   - Branch: `gh-pages`
   - Folder: `/ (root)`
   - **Save** 클릭

2. **Custom domain** (선택사항)
   - 도메인 없으면 건너뛰어도 됨

3. **HTTPS** (선택사항)
   - "Enforce HTTPS" 체크 권권장

## 🚀 배포 확인

설정 후 **2-5분 내에** 다음 URL에서 라이브 앱을 볼 수 있습니다:

👉 https://bigscout2071-creator.github.io/savememo/

## 🔍 상태 확인

1. GitHub 저장소 → Settings → Pages
   - "Your site is live at..." 메시지 확인
2. Actions 탭에서 배포 상태 확인
3. 위 URL로 접속 테스트
