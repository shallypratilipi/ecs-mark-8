git clone https://github.com/Pratilipi-Growth/ecs-mark-8.git
cd ecs-mark-8
npm install

REALM=PROD_BRIDGE LANGUAGE=hi npm run build
REALM=PROD_BRIDGE LANGUAGE=bn npm run build
REALM=PROD_BRIDGE LANGUAGE=kn npm run build
REALM=PROD_BRIDGE LANGUAGE=ta npm run build
REALM=PROD_BRIDGE LANGUAGE=te npm run build
REALM=PROD_BRIDGE LANGUAGE=mr npm run build
REALM=PROD_BRIDGE LANGUAGE=ml npm run build
REALM=PROD_BRIDGE LANGUAGE=gu npm run build

cp -Rv ./dist/hi ./../old_build/
cp -Rv ./dist/bn ./../old_build/
cp -Rv ./dist/kn ./../old_build/
cp -Rv ./dist/ta ./../old_build/
cp -Rv ./dist/te ./../old_build/
cp -Rv ./dist/mr ./../old_build/
cp -Rv ./dist/ml ./../old_build/
cp -Rv ./dist/gu ./../old_build/

cd ..
rm -rf ecs-mark-8
