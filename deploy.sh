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

# Copy master branch sources
mkdir ../tmp
rsync -Ra ./ ../tmp

# Get latest commit ID from master branch
head=$(git log --format="%h" -n 1)

# Set lists of deployment files
readarray -t files < deploy.list
readarray -t rmfiles < clean.list

# Switch to gh-pages + apply changes
git checkout --quiet gh-pages

# Overwrite master sources
rsync -a ../tmp/ ./

# Remove clean.list files
for file in ${rmfiles[@]}; do 
  if [ -f $file ]; then
    rm -f "$file"
  fi
done

# Remove major deployment files
if [[ "$user" != "mxklb" ]] ; then
  for file in ${files[@]}; do 
    if [ -f $file ]; then
      rm -f "$file"
    fi
  done
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
