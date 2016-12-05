#!/bin/bash
# Script used by travis to push build folder content to gh-pages branch

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

# Clone master branch from user repo
git clone --quiet "https://$user:${GH_TOKEN}@github.com/$user/$repo.git" --branch=master source
mkdir tmp
cd source

cp -rf . ../tmp/

# Get latest commit ID from master branch
head=$(git log --format="%h" -n 1)

# Switch to gh-pages and overwrite
git checkout --quiet gh-pages
cp -rf ../tmp/* .

# Remove development file
deploy.sh
travis.yml

# Remove CNAME for all others
if [[ "$user" != "mxklb" ]] ; then
  rm CNAME
  google8da70c8cfa316fbd.html
  js/ga.js
fi

ls -la

exit 0

# Add everything
git add -A

# Check for changes
status=$(git status)
echo "$status";

# Setup travis git user, commit and push changes
if [[ $status != *"nothing to commit"* ]] ; then
  git config user.name "travis"
  git config user.email "travis@email.com" 
  git commit -m "CI Deployment to Github Pages ($user@$head)"
  git push --force --quiet "https://${GH_TOKEN}@$remote" gh-pages:gh-pages > /dev/null 2>&1
fi
