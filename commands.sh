source /Users/dhanush/Desktop/firstAPP/firstAPP_env/bin/activate
nvm use 20.2.0
npm run build
npm start
npm install <name> -force
npx create-react-app <my-app>


cd /Users/dhanush/Desktop/firstAPP/firstAPP-new/firstapp_api
cd /Users/dhanush/Desktop/firstAPP/firstAPP-new/firstapp_ui

pip freeze > requirements.txt 
pip install -r requirements.txt

git status
git add .
git commit -m 'commit'
git push -u origin main
git pull origin main
git clone <http url>
git remote add origin https://github.com/DhanushReddy24/firstAPP-new.git

django-admin startproject <projectname>
python manage.py startapp <appname>
python manage.py createsuperuser
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
python manage.py runserver 0:8000
python manage.py migrate auth zero --skip-checks

curl -X GET http://127.0.0.1:8000/sample/sample_1/
curl -X POST -H "Content-Type: application/json" -d '{
        "username": "dhanush2001",
        "firstname": "Dhanush",
        "lastname": "Reddy",
        "age": 22,
        "address": "Nizamabad",
    }' http://127.0.0.1:8000/sample/sample_1/


lsof -i :3000
kill 12345
kill -9 12345

######################################################################################

{
    "username": "firstAPP",
    "password": "firstAPP@2023"
}


{
    "first_name": "Dhanush",
    "last_name": "Reddy",
    "email": "reddydhanushreddy2424@gmail.com",
    "username": "dhanush2424",
    "password": "Reddy@2424",
    "re_password": "Reddy@2424"
}

let [authTokens, setAuthTokens] = useState(
    {"refresh": "", "access": ""}
  );