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
4. 캐릭터 착용 아이템
5. 캐릭터 인벤

질문과 답변

1. ### **암호화 방식**

   - 비밀번호를 DB에 저장할 때 Hash를 이용했는데, Hash는 단방향 암호화와 양방향 암호화 중 어떤 암호화 방식에 해당할까요?
     -> <span style = "color: gray">**단방향 암호화**, 양방향 암호화의 경우 암호화와 복호화 두 가지를 통해 암호화된 패스워드와 실제 패스워드 두 가지가 필요할 때 사용하는 것이지만
     단방향 암호화의 경우 암호화 하나만 사용한다.
     해시 함수의 경우 단방향 암호화를 통해 암호화된 패스워드만 저장하고 원래의 패스워드는 사용하지 않는다.</span>
   - 비밀번호를 그냥 저장하지 않고 Hash 한 값을 저장 했을 때의 좋은 점은 무엇인가요?
     -> <span style = "color: gray">해시 함수로 암호화해서 저장할 경우, 실제 암호화되지 않은 패스워드가 저장되기 때문에 유출될 경우를 대비하기에 좋다.</span>

2. **인증 방식**

   - JWT(Json Web Token)을 이용해 인증 기능을 했는데, 만약 Access Token이 노출되었을 경우 발생할 수 있는 문제점은 무엇일까요?
     -> <span style = "color: gray"> Access Token을 통해 승인되지 않은 사용자가 인증이 필요한 API를 사용하면서 기밀이 유출될 수 있다. </span>
   - 해당 문제점을 보완하기 위한 방법으로는 어떤 것이 있을까요?
     -> <span style = "color: gray"> 토큰의 만료 시간을 줄이는 것, 그리고 토큰이 다른 곳으로 유출 될 경우 폐기가 될 수 있도록 하는 것 </span>

3. **인증과 인가**

   - 인증과 인가가 무엇인지 각각 설명해 주세요.
     -> <span style = "color: gray">인증은 서비스를 이용하려는 사용자가 인증된 신분을 가진 사람인 지 검증하는 작업
     인가는 인증된 사용자가 어떠한 서비스에 접속할 때 접속 가능한 사용자인지 허가하는 것 (관리자와 일반 사용자의 차이)</span>
   - 위 API 구현 명세에서 인증을 필요로 하는 API와 그렇지 않은 API의 차이가 뭐라고 생각하시나요?
     -> <span style = "color: gray">인증이 필요한 API: 캐릭터 생성과 삭제, 인증이 필요하다는 건 사용하려는 API가 인증된 신분을 가져야 한다는 것을
     알 수 있다. 만일 인증되지 않은 사용자가 인증 하지 않고, 캐릭터를 생성 또는 삭제하는 것은 문제가 될 수 있다. (캐릭터의 계정에 대한 인증이 필요)
     인증이 필요하지 않은 API: 회원가입, 완전히 새로운 계정을 만들어내는 API로, 회원가입을 통해 서버의 관리자가 되는 경우가 아닌 이상 인증이 필요할 것인가 라 생각할 수 있다. </span>
   - 아이템 생성, 수정 API는 인증을 필요로 하지 않는다고 했지만 사실은 어느 API보다도 인증이 필요한 API입니다. 왜 그럴까요?
     -> <span style = "color: gray">캐릭터 생성만큼은 아니지만, 그래도 아이템 생성, 삭제도 필요하다고 생각한다.
     아이템이 생성, 수정, 삭제 된다는 건 캐릭터가 착용 중인 아이템, 인벤토리에 존재하는 아이템이 갑자기 사라지거나, power가 100인 사기템이 갑자기 power가 1이 되버리는 문제가 생길 수 있는 것이다.
     이러한 문제를 막기 위해 인증 관련 API가 반드시 필요하다고 생각한다. (단 관리자 수준의 인증이 필요하다 생각한다.)</span>

4. **Http Status Code**

   - 과제를 진행하면서 사용한 Http Status Code를 모두 나열하고, 각각이 의미하는 것과 어떤 상황에 사용했는지 작성해 주세요.
     -> <span style="color: blue">200</span>: 요청이 성공적으로 처리 되었다.
     <span style="color: red">400</span>: 클라이언트의 요청이 잘못되었다, <span style="color: red">404</span>: 데이터가 존재하지 않는다
     <span style="color: red">500</span>: 서버에 오류 발생

5. **게임 경제**
   - 현재는 간편한 구현을 위해 캐릭터 테이블에 money라는 게임 머니 컬럼만 추가하였습니다.
     - 이렇게 되었을 때 어떠한 단점이 있을 수 있을까요?
       -> <span style = "color: gray">잘 모르겠다. 당연히 테이블에 money라는 속성이 추가되어야 한다 생각했었다.
       그래도 만일 단점이 있다 생각한다면, money로 할 수 있는 액티브인 거래와 거래 내역에서 문제가 생기지 않을까 생각한다.</span>
     - 이렇게 하지 않고 다르게 구현할 수 있는 방법은 어떤 것이 있을까요?
       -> <span style = "color: gray">잘 모르겠다. 코드로 어떻게 한다 한들, 결국엔 테이블에 money 속성이 있어야 하지 않나 생각한다.</span>
   - 아이템 구입 시에 가격을 클라이언트에서 입력하게 하면 어떠한 문제점이 있을 수 있을까요?
     -> <span style = "color: gray">간단하게 하면 10000원짜리 물건을 클라이언트가 "이거 10원정도 밖에 안할 거 같은데 10원에 살게요" 하면 판매자가 군말 없이 파는 방식이다.
     그런 것도 있고, 거래소라는 서버에 클라이언트가 직접 들어가 판매가를 조정하는 방식이기 때문에, 문제가 발생할 수 있는 거라 생각한다.</span>

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
