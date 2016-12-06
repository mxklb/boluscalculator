#!/bin/bash
# Script used by travis to push static side on master to gh-pages branch

# Get repo url (should be https://github.com/user/repo.git)
url=$(git config remote.origin.url)

# Remove 'https://' prefix and '.git' suffix
remote=$(echo "${url:8:-4}")
echo "Deploying to $remote into branch gh-pages"

# Extract user & repo names
set -- "$remote" 
IFS="/"; declare -a split=($*) 
user="${split[1]}"
repo="${split[2]}"

# Clone master branch from user repo and make a copy + remove git folder
git clone --quiet "https://$user:${GH_TOKEN}@github.com/$user/$repo.git" --branch=master source
mkdir tmp
cp -a source/. tmp/
rm -R tmp/.git

# Get latest commit ID from master branch
cd source
head=$(git log --format="%h" -n 1)

# Remove development files
cd ../tmp
rm deploy.sh
rm travis.yml

# Remove CNAME for all others
if [[ "$user" != "mxklb" ]] ; then
  rm CNAME
  rm google8da70c8cfa316fbd.html
  rm js/ga.js
fi

git init
git config user.name "travis"
git config user.email "travis@email.com"
git add .
git commit -m "Deployed from travis to gh-pages ($user@$head)"
status=$(git status)
echo "$status";
git push --force --quiet "https://${GH_TOKEN}@github.com/$user/$repo" master:gh-pages > /dev/null 2>&1
