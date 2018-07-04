git clone https://github.com/Pratilipi-Growth/ecs-mark-8.git
cd ecs-mark-8
npm install

LANGUAGE=hi npm run build
LANGUAGE=bn npm run build
LANGUAGE=kn npm run build
LANGUAGE=ta npm run build
LANGUAGE=te npm run build
LANGUAGE=mr npm run build
LANGUAGE=ml npm run build
LANGUAGE=gu npm run build

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