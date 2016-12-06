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
cd source

# Get latest commit ID from master branch
head=$(git log --format="%h" -n 1)

# Copy some deployment files to tmp folder
IFS=$'\n' read -d '' -r -a files < deploy.list
if [[ "$user" == "mxklb" ]] ; then
  for file in ${files[@]}; do
    dir=$(dirname "$file")
    mkdir -p "../tmp/$dir"
    cp -r "$file" "../tmp/$file"
  done 
fi

# Switch to gh-pages + apply changes
git checkout --quiet gh-pages

# Copy or remove deployment files
if [[ "$user" == "mxklb" ]] ; then
  for file in ${files[@]}; do 
    cp "../tmp/$file" "$file"
  done
else
  for file in ${files[@]}; do rm -f "$file"; done
fi

# Stage all
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
