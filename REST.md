products - collection

CRUD: (Create, Read, Update, Delete)
GET /products -> list products
GET /products/:id -> product with id
POST /products -> create new product
PUT /products/:id -> update existing product
DELETE /products -> remove all products!
DELETE /products/:id -> remove by id
PATCH /products/:id -> partial update

Удобство API (lvl0 REST)
/users
/users/:userId
/users/:userId/repos
/users/:userId/repos/:repoId
/users/:userId/repos/:repoId/issues
/users/:userId/repos/:repoId/issues/:issueId
/users/:userId/repos/:repoId/issues/:issueId/comments
/users/:userId/repos/:repoId/issues/:issueId/comments/:commentId

1. GET /users -> 100 (0-10 public repos)
2. GET /users/1/repos -> 0


POST /users/:userId/repos/:repoId/issues/:issueId/comments/:commentId/likes
DELETE /users/:userId/repos/:repoId/issues/:issueId/comments/:commentId/likes/:likeId
