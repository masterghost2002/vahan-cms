# API documentation
https://documenter.getpostman.com/view/22822173/2sA3JM7M3W
# Preview

# Tech Stack


https://github.com/masterghost2002/vahan-cms/assets/55751461/345c6c89-4c57-4ed0-ba00-e32684e0a70e


## Node.js ![Node.js](https://img.icons8.com/color/48/000000/nodejs.png)

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows for server-side scripting and runs on various platforms.

## TypeScript ![TypeScript](https://img.icons8.com/color/48/000000/typescript.png)

TypeScript is a superset of JavaScript that adds optional static typing to the language. It enhances code quality and developer productivity.

## React ![React](https://img.icons8.com/color/48/000000/react-native.png)

React is a JavaScript library for building user interfaces. It enables the creation of interactive UI components for web applications.

## Express ![Express](https://img.icons8.com/color/48/000000/express.png)

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

## PostgreSQL ![PostgreSQL](https://img.icons8.com/color/48/000000/postgreesql.png)

PostgreSQL is a powerful, open-source relational database system known for its reliability, robustness, and advanced features.

### Env required for server
```
DATABASE_URL='postgresql://test:test@postgres:5432/test?schema=public'
```
## Starting the server
1. cd into project
2. ``` yarn install ```
3. ``` yarn run dev ```
4. Go to port http://localhost:5000

### Env required for client
```
VITE_SERVER_URL='http://localhost:5000'
```

## Starting the client
1. cd into project
2. ``` cd web ```
4. ``` yarn install ```
4. ``` yarn run dev ```
5. Go to port http://localhost:173


### Running via Docker Image
```
docker run -e DATABASE_URL="" -d -p 80:5000 rakeshdhariwal657/vahan-cms
```
