# CONFIGURATION:

# - REGION: us-east-1

# - LOCAL ENDPOINT: http://localhost:8000

# Ensure that DynamoDB Local is running.

# to run

docker run -d -p 8000:8000 amazon/dynamodb-local

# ================= CREATE TABLES

# CREATE USERS

aws dynamodb create-table --table-name users \
 --attribute-definitions AttributeName=id,AttributeType=N \
 --key-schema AttributeName=id,KeyType=HASH \
 --billing-mode PAY_PER_REQUEST \
 --region us-east-1 --endpoint-url http://localhost:8000

# CREATE USER BALANCES TABLE

aws dynamodb create-table --table-name user_balances \
 --attribute-definitions \
 AttributeName=userId,AttributeType=N \
 AttributeName=currencyCode,AttributeType=S \
 --key-schema \
 AttributeName=userId,KeyType=HASH \
 AttributeName=currencyCode,KeyType=RANGE \
 --billing-mode PAY_PER_REQUEST \
 --region us-east-1 --endpoint-url http://localhost:8000

# CREATE TRANSACTIONS TABLE

aws dynamodb create-table --table-name transactions \
 --attribute-definitions \
 AttributeName=userId,AttributeType=N \
 AttributeName=idempotencyId,AttributeType=S \
 --key-schema \
 AttributeName=userId,KeyType=HASH \
 AttributeName=idempotencyId,KeyType=RANGE \
 --billing-mode PAY_PER_REQUEST \
 --region us-east-1 --endpoint-url http://localhost:8000 \
 --global-secondary-indexes '[
{
"IndexName": "userId-index",
"KeySchema": [{"AttributeName": "userId", "KeyType": "HASH"}],
"Projection": {"ProjectionType": "ALL"}
},
{
"IndexName": "idempotencyId-index",
"KeySchema": [{"AttributeName": "idempotencyId", "KeyType": "HASH"}],
"Projection": {"ProjectionType": "ALL"}
}
]'

# ================Verify Tables

aws dynamodb list-tables --region us-east-1 --endpoint-url http://localhost:8000

# ================ Make Dummy Users

aws dynamodb put-item --table-name users --item '{
"id": {"N": "1"},
"name": {"S": "John Doe"},
"email": {"S": "johndoe@example.com"}
}' --region us-east-1 --endpoint-url http://localhost:8000

aws dynamodb put-item --table-name users --item '{
"id": {"N": "2"},
"name": {"S": "Jane Smith"},
"email": {"S": "janesmith@example.com"}
}' --region us-east-1 --endpoint-url http://localhost:8000

# ================ run

npm run start

# or

npm run dev

# =============== Postman requests

# Get User Balance

GET http://localhost:5000/users/1/balance

# Credit User Account

POST http://localhost:5000/transactions/credit
{
"idempotencyId": "123fddsd5fhdlfddjffk8f3",
"userId": 1,
"type": "CREDIT",
"amount": 100
}

# Debit User Account

POST http://localhost:5000/transactions/debit
{
"idempotencyId": "7dkkkk890d12",
"userId": 1,
"type": "DEBIT",
"amount": 100
}
