## Development Steps
### Env required
```
DATABASE_URL='postgresql://test:test@postgres:5432/test?schema=public'
JWT_SECRET='thisisecret'
SALT_SECRET='thisissecret'
```
1. cd into project
2. ``` yarn install ```
3. ``` npx primsa generate ```
4. ``` npx prisma migrate dev ```
5. ``` yarn run seed```
7. ``` yarn run dev ```
6. ``` cd ./web && yarn run build ```
8. Access by going to http://localhost:5000

### Running via Docker Image
```
docker run -e DATABASE_URL="" -d -p 80:5000 rakeshdhariwal657/grouple 
```
