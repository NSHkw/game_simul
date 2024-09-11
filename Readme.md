## 전체 API

### 회원가입 및 로그인 API

| 기능     | API URL              | Method | Request Header | Request                                                                    | Response                                                                                                 | Response Header | Descript                           |
| -------- | -------------------- | ------ | -------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | --------------- | ---------------------------------- |
| 회원가입 | /api/account/sign-up | POST   |                | {<br>"login_id": "string", "password": "Integer", "gender" : "string"<br>} | {<br>"accountId": "Integer"<br>"login_id": "string", "gender" : "string" "message": "회원가입 완료"<br>} |                 | 응답 시 password는 출력하지 않는다 |
| 로그인   | /api/account/sign-in | POST   |                | {<br>"login_id": "string", "password": "Integer"<br>}                      | {<br>"mesaage": "로그인 완료"<br>}                                                                       |                 |                                    |

### 캐릭터 관련 API

| 기능           | API URL            | Method | Request Header | Request                                             | Response                                                                                                  | Response Header | Descript                                  |
| -------------- | ------------------ | ------ | -------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------- | ----------------------------------------- |
| 캐릭 생성      | /api/char          | POST   |                | {<br>"name": "string", "account_id": "integer"<br>} | {<br>"message": "캐릭터 생성 완료"<br>}                                                                   |                 | JWT 필요                                  |
| 캐릭 삭제      | /api/char/:char_id | DELETE |                |                                                     | {<br>"message": "캐릭터 삭제 완료"<br>}                                                                   |                 | JWT 인증 필요                             |
| 캐릭 상세 조회 | /api/char/:char_id | GET    |                |                                                     | {<br>"data": {<br>"name": "string", "money": "Integer", "health": "Integer", "power": "Integer"<br>}<br>} |                 | 로그인한 경우 "money" 속성도 볼 수 있도록 |
| 캐릭 목록 조회 | /api/char          | GET    |                |                                                     | { <br>"characters": [{ "charId": "integer", "name": "string", "money": "integer" }]<br>}                  |                 |                                           |

### 게임 내 아이템 API

| 기능             | API URL             | Method | Request Header | Request                                                                                             | Response                                                                                          | Response Header | Descript |
| ---------------- | ------------------- | ------ | -------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------- | -------- |
| 아이템 생성      | /api/item           | POST   |                | {<br>"itemName": "String", "description": "String", "itemStat": "Json", "itemPrice": "Integer"<br>} | { <br>"message": "아이템 생성 완료" <br>}                                                         |                 |          |
| 아이템 수정      | /api/item/:itemCode | PUT    |                | {<br>"itemCode": "Integer", <br>"itemName": "String", "description": "String"<br>}                  | { <br>"message": "아이템 수정 완료" <br>}                                                         |                 |          |
| 아이템 목록 조회 | /api/item           | GET    |                |                                                                                                     | { <br>"items": [{ "itemCode": "integer", "itemName": "string", "description": "string"<br>}]<br>} |                 |          |
| 아이템 상세 조회 | /api/item/:itemCode | GET    |                |                                                                                                     | { <br>"item": { "itemCode": "integer", "itemName": "string", "description": "string"<br>}<br>}    |                 |          |
| 아이템 삭제      | /api/item/:itemCode | DELETE |                |                                                                                                     | { <br>"message": "아이템 삭제 완료" <br>}                                                         |                 |          |

### 캐릭터 내 아이템 API

| 기능                | API URL                     | Method | Request Header | Request                           | Response                                                                                        | Response Header | Descript |
| ------------------- | --------------------------- | ------ | -------------- | --------------------------------- | ----------------------------------------------------------------------------------------------- | --------------- | -------- |
| 착용 중 아이템 조회 | /api/char/:char_id/equipped | GET    |                |                                   | { <br>"equippedItems": [{ "itemCode": "integer", "itemName": "string", "slot": "string" }]<br>} |                 |          |
| 아이템 착용         | /api/char/:char_id/equip    | POST   |                | { <br>"itemCode": "integer"<br>}  | { <br>"message": "아이템 착용 완료" <br>}                                                       |                 |          |
| 아이템 해제         | /api/char/:char_id/unequip  | POST   |                | { <br>"itemCode": "integer" <br>} | { <br>"message": "아이템 해제 완료" <br>}                                                       |                 |          |

### 캐릭터 인벤토리 API

| 기능                    | API URL                      | Method | Request Header | Request                                                                        | Response                                                                                          | Response Header | Descript |
| ----------------------- | ---------------------------- | ------ | -------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | --------------- | -------- |
| 인벤토리 내 아이템 조회 | /api/char/:char_id/inventory | GET    |                |                                                                                | { <br>"inventory": [{ "itemCode": "integer", "itemName": "string", "quantity": "integer" }] <br>} |                 |          |
| 아이템 획득             | /api/char/:char_id/inventory | POST   |                | {<br>"itemCode": "Integer", "itemName": "string", "quantity": "integer"<br>}   | {<br>"message": "${itemName}을 ${quantity}만큼 획득"<br>}                                         |                 |          |
| 아이템 버리기           | /api/char/:char_id/inventory | DELETE |                | { <br>"itemCode": "integer", "itemName": "string", "quantity": "integer" <br>} | { <br>"message": "${itemName}을 ${quantity}만큼 버렸습니다"<br>}                                  |                 |          |
|                         |                              |        |                |                                                                                |                                                                                                   |                 |          |

## 전체 테이블

### Account 테이블

| 변수명     | 타입    | NULL     | default        |
| ---------- | ------- | -------- | -------------- |
| account_id | Integer | Not Null | AUTO_INCREMENT |
| login_id   | String  | Not Null |                |
| password   | String  | Not Null |                |
| gender     | String  | Not Null |                |

### Character 테이블

| 변수명     | 타입    | NULL     | default                 |
| ---------- | ------- | -------- | ----------------------- |
| charid     | Integer | Not Null | AUTO_INCREMENT          |
| name       | String  | Not Null |                         |
| account_id | Integer | Not Null |                         |
| money      | Integer | Not Null | 10000                   |
| stat       | Json    | Not Null | health: 500, power: 100 |

### Item 테이블

| 변수명      | 타입    | NULL     | default        |
| ----------- | ------- | -------- | -------------- |
| itemCode    | Integer | Not Null | AUTO_INCREMENT |
| itemName    | String  | Not Null |                |
| description | String  | Null     | 'ITEM'         |
| stat        | Json    | Not Null |                |
| item_price  | Integer | Not Null |                |

### Character-Item 테이블

| 변수명  | 타입    | NULL     | default |
| ------- | ------- | -------- | ------- |
| char_id | Integer | Not Null |         |
| item_id | Integer | Not Null |         |

### Character-Inventory 테이블

| 변수명   | 타입    | NULL     | default    |
| -------- | ------- | -------- | ---------- |
| charId   | Integer | Not Null |            |
| itemId   | Integer | Not Null |            |
| quantity | Integer | Not Null | 1, MAX(10) |
