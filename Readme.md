## 만든 기능

1. 계정
   - 회원가입 - 테스트 완료
   - 로그인 - 테스트는 됐지만, 인증 미들웨어를 거치면서 다른 기능에서 문제가 생김
   - 계정 내 모든 캐릭터 조회 - 테스트 완료
2. 캐릭터
   - 계정 내 캐릭터 생성 - 테스트 완료
   - 계정 내 캐릭터 삭제 - 테스트 완료 (삭제 이후 charId가 trash가 되는데 이 부분을 생각해야 할 듯)
   - 계정 내 캐릭터 상세 보기 - 인증 미들웨어 문제로 money, stat을 따로 보여주는 부분은 구현을 못함
3. 게임 내 아이템
   - 아이템 생성 - 테스트 완료
   - 아이템 수정 - 테스트 완료
   - 아이템 목록 조회 - 테스트 완료
   - 아이템 상세 조회 - 테스트 완료
   - 아이템 삭제 - 테스트 완료
4. ## 캐릭터 착용 아이템
5. 캐릭터 인벤

## 전체 API

### 회원가입 및 로그인 API

| 기능                   | API URL              | Method | Request Header | Request                                                                    | Response                                                                                                 | Response Header | Descript                           |
| ---------------------- | -------------------- | ------ | -------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | --------------- | ---------------------------------- |
| 회원가입               | /api/account/sign-up | POST   |                | {<br>"login_id": "string", "password": "Integer", "gender" : "string"<br>} | {<br>"accountId": "Integer"<br>"login_id": "string", "gender" : "string" "message": "회원가입 완료"<br>} |                 | 응답 시 password는 출력하지 않는다 |
| 로그인                 | /api/account/sign-in | POST   |                | {<br>"login_id": "string", "password": "Integer"<br>}                      | {<br>"mesaage": "로그인 완료"<br>}                                                                       |                 |                                    |
| 계정 내 캐릭 목록 조회 | /api/char            | GET    |                |                                                                            | { <br>"characters": [{ "charId": "integer", "name": "string" }]<br>}                                     |                 |                                    |

### 캐릭터 관련 API

| 기능           | API URL            | Method | Request Header                | Request                                             | Response                                                                                                  | Response Header | Descript                                  |
| -------------- | ------------------ | ------ | ----------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------- | ----------------------------------------- |
| 캐릭 생성      | /api/char          | POST   | Authorization: Bearer `token` | {<br>"name": "string", "account_id": "integer"<br>} | {<br>"message": "캐릭터 생성 완료"<br>}                                                                   |                 | JWT 필요                                  |
| 캐릭 삭제      | /api/char/:char_id | DELETE | Authorization: Bearer `token` |                                                     | {<br>"message": "캐릭터 삭제 완료"<br>}                                                                   |                 | JWT 인증 필요                             |
| 캐릭 상세 조회 | /api/char/:char_id | GET    | Authorization: Bearer `token` |                                                     | {<br>"data": {<br>"name": "string", "money": "Integer", "health": "Integer", "power": "Integer"<br>}<br>} |                 | 로그인한 경우 "money" 속성도 볼 수 있도록 |

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

| 변수명   | 타입    | NULL     | default |
| -------- | ------- | -------- | ------- |
| charId   | Integer | Not Null |         |
| itemId   | Integer | Not Null |         |
| quantity | Integer | Not Null |         |
