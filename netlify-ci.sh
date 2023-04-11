#!/usr/bin/env sh

# Create the 'build' dir if it does not exist
rm -rf build
mkdir build

# Copy necessary files and dirs to 'build'
cp  -R content src index.html build
rm -rf build/src/dev

# Create files defining Netlify's redirect/rewrite rules
touch build/_blank
echo "
/content/* /_blank 404
/src/* /_blank 404
/*   /index.html   200
" > build/_redirects
