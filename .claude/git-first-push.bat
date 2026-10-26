@echo off
REM ---------------------------------------------------------------
REM git-first-push.bat - ONE-OFF: first commit of envolv-www and
REM first push to https://github.com/envolvapp/envolv-www
REM
REM Safe to re-run: skips any step that is already done.
REM   1. removes the stale .git\index.lock left over from 2026-07-13
REM   2. if there are no commits yet: switches the unborn branch to
REM      main, stages everything (.gitignore applies), commits with
REM      .claude\commit-msg.txt
REM   3. adds the origin remote if missing, checks auth, pushes main
REM
REM All output lands in .claude\git-out.log, ending with
REM === DONE rc=N ===  Runs native Windows git on purpose: the
REM Linux mount is not trusted for git (see medvolunteer CLAUDE.md).
REM ---------------------------------------------------------------
setlocal
set "REPO=C:\Users\smmcn\Projects\envolv-www"
set "LOG=%REPO%\.claude\git-out.log"
set "MSG=%REPO%\.claude\commit-msg.txt"
set "REMOTE=https://github.com/envolvapp/envolv-www.git"

cd /d "%REPO%"

echo. > "%LOG%"
echo === git-first-push  %DATE% %TIME% >> "%LOG%"
git --version >> "%LOG%" 2>&1

if exist ".git\index.lock" del /f ".git\index.lock"
if exist ".git\index.lock" goto lockfail
echo index.lock: none >> "%LOG%"

git rev-parse --verify -q HEAD >nul 2>&1
if not errorlevel 1 goto havecommit

echo. >> "%LOG%"
echo --- first commit --- >> "%LOG%"
if not exist "%MSG%" goto nomsg
git symbolic-ref HEAD refs/heads/main >> "%LOG%" 2>&1
git add -A >> "%LOG%" 2>&1
echo --- staged --- >> "%LOG%"
git diff --cached --stat >> "%LOG%" 2>&1
git commit -F "%MSG%" >> "%LOG%" 2>&1
if errorlevel 1 goto commitfail
goto remote

:havecommit
echo HEAD already exists - skipping the commit step >> "%LOG%"

:remote
echo. >> "%LOG%"
echo --- remote --- >> "%LOG%"
git remote get-url origin >nul 2>&1
if errorlevel 1 git remote add origin %REMOTE% >> "%LOG%" 2>&1
git remote set-url origin %REMOTE% >> "%LOG%" 2>&1
git remote -v >> "%LOG%" 2>&1

echo. >> "%LOG%"
echo --- ls-remote auth check --- >> "%LOG%"
git ls-remote origin >> "%LOG%" 2>&1

echo. >> "%LOG%"
echo --- push --- >> "%LOG%"
git push -u origin main >> "%LOG%" 2>&1
set PUSH_RC=%ERRORLEVEL%

echo. >> "%LOG%"
echo --- result --- >> "%LOG%"
git log --oneline -3 >> "%LOG%" 2>&1
git status --short --branch >> "%LOG%" 2>&1
echo === DONE rc=%PUSH_RC% === >> "%LOG%"
exit /b %PUSH_RC%

:lockfail
echo ABORT: could not delete .git\index.lock >> "%LOG%"
echo === DONE rc=97 === >> "%LOG%"
exit /b 97

:nomsg
echo ABORT: no commit message file at %MSG% >> "%LOG%"
echo === DONE rc=99 === >> "%LOG%"
exit /b 99

:commitfail
echo COMMIT FAILED - not pushing >> "%LOG%"
echo === DONE rc=2 === >> "%LOG%"
exit /b 2
