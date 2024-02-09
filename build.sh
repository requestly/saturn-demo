rm -rf static
rm asset-manifest.json
rm index.html

npm run build
mv -f build/* .

rm -rf build