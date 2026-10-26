@echo off
REM ---------------------------------------------------------------
REM git-push.bat - stage everything, commit, push main.
REM Message comes from .claude\commit-msg.txt (gitignored); aborts
REM if it's missing. Does NOT push if the commit fails.
REM Output -> .claude\git-out.log, ending === DONE rc=N ===
REM Same pattern as medvolunteer\.claude\git-push.bat.
REM ---------------------------------------------------------------
setlocal
set "REPO=C:\Users\smmcn\Projects\envolv-www"
set "LOG=%REPO%\.claude\git-out.log"
set "MSG=%REPO%\.claude\commit-msg.txt"

cd /d "%REPO%"

echo. > "%LOG%"
echo === git-push  %DATE% %TIME% >> "%LOG%"
if not exist "%MSG%" goto nomsg

git rev-parse --abbrev-ref HEAD >> "%LOG%" 2>&1
git add -A >> "%LOG%" 2>&1
echo --- staged --- >> "%LOG%"
git diff --cached --stat >> "%LOG%" 2>&1
git commit -F "%MSG%" >> "%LOG%" 2>&1
if errorlevel 1 goto commitfail

echo --- push --- >> "%LOG%"
git push origin main >> "%LOG%" 2>&1
set PUSH_RC=%ERRORLEVEL%
git log --oneline -3 >> "%LOG%" 2>&1
echo === DONE rc=%PUSH_RC% === >> "%LOG%"
exit /b %PUSH_RC%

:nomsg
echo ABORT: no commit message file at %MSG% >> "%LOG%"
echo === DONE rc=99 === >> "%LOG%"
exit /b 99

:commitfail
echo COMMIT rc nonzero - nothing to commit or commit failed. NOT PUSHING. >> "%LOG%"
echo === DONE rc=2 === >> "%LOG%"
exit /b 2
