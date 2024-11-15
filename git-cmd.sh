#!/bin/bash

if [[ $- != *i* ]]; then
  echo "This script needs to be run in an interactive shell."
  echo -e "Starting a shell with the flag \033[93-i\033[0m."
  exec bash -i "$0"
  exit 1
fi

set +H

function _help_ {
    echo -e "\033[94mGit-cmd!\033[93m\033[3m Faster git execution"
    echo -e "   \033[0mtype:"
    echo -e "      \033[91mexit\033[0m,\033[91m quit \033[90m:\033[0m to quit Git-cmd."
    echo -e "       \033[93mcls\033[0m,\033[93m clr  \033[90m:\033[0m to clear the console."
    echo -e "         \033[93m$\033[0m,\033[93m #    \033[90m:\033[0m to execute a shell command."
    echo -e "         \033[93m?\033[0m,\033[93m-?    \033[90m:\033[0m to show this help."
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

    echo -e "\033[92m┌──(\033[94m$(whoami)@$(hostname)\033[92m)―[\033[33m$(pwd | sed "s|$HOME|~|")\033[92m]\033[0m"
    
    read -e -p "$(echo -e "\033[92m└─(\033[93m$branch\033[92m) \033[96mgit \033[91m>\033[0m ")" cmd

    if [[ -n "$cmd" ]]; then
        history -s "$cmd"
    fi

    case $cmd in
        'exit'|'quit')
            echo -e "\033[94mExiting...\033[0m"
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
