creds (login, password) -> token

Cookies (httponly)
In Memory (LocalStorage)

post (file)
Header: Token
Cookie: ...

backend -> db (token)
index.php  | -> cache (redis)
upload.php |

nginx | apache

