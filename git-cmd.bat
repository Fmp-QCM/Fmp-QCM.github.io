@echo off
setlocal EnableDelayedExpansion
chcp 65001 >nul

call :_help_
echo.

:loop
    call :git-branch
    set "_cmd_="

    echo [92m┌──([94m%USERNAME%@%USERDOMAIN%[92m)―[[33m!cd:%USERPROFILE%=~![92m][0m
    set /p _cmd_="[92m└─([93m!branch![92m) [96mgit [91m>[0m "
    
    if "!_cmd_!" equ "exit" goto :end
    call :case 
    
    echo.
    goto :loop


:end
    echo [94mExiting...[0m
    endlocal
    Exit /b


:case _cmd_
    call :!_cmd_! 2>nul || goto :def-case
    exit /b

    :def-case
        if "!_cmd_:~0,1!" equ "$" (
            !_cmd_:~1! & exit /b
        )
        git !_cmd_!
        exit /b 0
    
    :cls
    :clr
        cls
        exit /b 0
    :?
    :-?
        call :_help_
        exit /b 0

:git-branch
    set "branch=*"
    for /f "delims=" %%i in (' git branch --list 2^>nul ') do (
        set "branch=%%i"
        if "!branch:~0,1!" == "*" (
            set "branch=!branch:~2!"
            exit /b
        )
    ) 
    exit /b

:_help_
    echo [94mGit-cmd![93m[3m Faster git execution
    echo    [0mtype:
    echo       [91mexit[0m,[91m quit [90m:[0m to quit Git-cmd.
    echo        [93mcls[0m,[93m clr  [90m:[0m to clear the console.
    echo          [93m$[0m,[93m #    [90m:[0m to execute a shell command.
    echo          [93m?[0m,[93m-?    [90m:[0m to show this help.
    exit /b
