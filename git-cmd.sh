#!/bin/bash

if [[ $- != *i* ]]; then
  echo "This script needs to be run in an interactive shell."
  echo -e "Starting a shell with the flag [93-i[0m."
  exec bash -i "$0"
  exit 1
fi

set +H

function _help_ {
    echo -e "[94mGit-cmd![93:5;3m Faster git execution"
    echo -e "   [0mtype:"
    echo -e "      [91mexit[0m,[91m quit [90m:[0m to quit Git-cmd."
    echo -e "       [93mcls[0m,[93m clr  [90m:[0m to clear the console."
    echo -e "         [93m$[0m,[93m #    [90m:[0m to execute a shell command."
    echo -e "         [93m?[0m,[93m-?    [90m:[0m to show this help."
}

function git-branch {
    branch="*"
    branch_output=$(git branch --list 2>/dev/null)
    while IFS= read -r line; do
        branch="$line"
        if [[ "${branch:0:1}" == "*" ]]; then
            branch="${branch:2}"
            break
        fi
    done <<< "$branch_output"
}

_help_
echo

history -c

while true; do
    git-branch
    cmd=""

    echo -e "[92m┌──([94m$(whoami)@$(hostname)[92m)―[[33m$(pwd | sed "s|$HOME|~|")[92m][0m"
    
    read -e -p "$(echo -e "[92m└─([93m$branch[92m) [96mgit [91m>[0m ")" cmd

    if [[ -n "$cmd" ]]; then
        history -s "$cmd"
    fi

    case $cmd in
        'exit'|'quit')
            echo -e "[94mExiting...[0m"
            exit 0
            ;;
        'cls'|'clr')
            clear
            ;;
        '?'|'-?')
            _help_
            ;;
        \$*|\#*)
            ${cmd:1}
            ;;
        *)
            git $cmd
            ;;
    esac
    echo
done
