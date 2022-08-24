## Usage

### Deployment

Install dependencies with:

```
npm install
```

and then deploy with:

```
serverless deploy
```

createUser
```
curl --location --request POST 'https://xxxxxx.execute-api.us-east-2.amazonaws.com/dev/create-user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"aa",
    "password":"123456"
}'
```

update user
```
curl --location --request PUT 'https://xxxxxxx.execute-api.us-east-2.amazonaws.com/dev/update-user/cfb584be-9d5e-41b2-9ef6-d6952640b21b' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"aa",
    "password":"123457"
}'
```

get All User
```
curl --location --request GET 'https://xxxxxx.execute-api.us-east-2.amazonaws.com/dev/get-user'
```

get User By id
```
curl --location --request GET 'https://xxxxxx.execute-api.us-east-2.amazonaws.com/dev/get-user/{id}'
```
