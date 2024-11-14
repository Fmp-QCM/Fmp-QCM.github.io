@echo off
echo Enter a git command to execute, or type "exit" to quit:

:loop

set /p _cmd_="git > "

if "%_cmd_%"=="exit" ( 
    goto :end 
) else if "%_cmd_%"=="cls" (
    cls
) else git %_cmd_%

echo.

goto :loop

:end
echo Exiting...
