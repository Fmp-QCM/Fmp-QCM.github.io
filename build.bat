@echo off

if "%~1" == "" goto :win

goto :%~1 2>nul || echo Error: No match for the argument.

exit /b

:win
    npm run "dist:win"
    exit /b 0

:mac
    npm run "dist:mac"
    exit /b 0

:linux
    npm run "dist:linux"
    exit /b 0

:all
    npm run "dist:all"
    exit /b 0
