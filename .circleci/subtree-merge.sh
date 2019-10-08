#!/bin/bash
#
# subtree-merge.sh -- Behaves like `git subtree push` but merges changes with the remote.
#

set -xeuo pipefail

if [ "$#" -le 1 ]; then
    echo "Usage: $0 PREFIX REMOTE REMOTE_BRANCH"
    exit 1
fi

prefix="$1"
remoteUrl="$2"
remoteBranch="$3"
remoteName="tmp-$RANDOM"

# On exit, return HEAD to the original position, and remove the temporary remote
oldHead="$(git symbolic-ref -q --short HEAD || git rev-parse HEAD)"
git remote add "$remoteName" "$remoteUrl"
trap "git reset --hard && git checkout '$oldHead' && git remote rm '$remoteName'" EXIT

# Create a branch with just the changes in $prefix
splitRef="$(git subtree split --prefix="$prefix")"

# Merge those changes into the remote repo
git fetch "$remoteName"
git checkout "$remoteName/$remoteBranch"
git merge -m "Auto-merge updated translations" --allow-unrelated-histories -X theirs "$splitRef"
git push "$remoteName" "HEAD:$remoteBranch"
