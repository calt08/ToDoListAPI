# ToDoListAPI


sequelize scripts executed:
```
npm install --save -g sequelize-cli sequelize sqlite3

npx sequelize-cli init 

npx sequelize-cli model:generate --name User --attributes email:string,password:string

npx sequelize-cli model:generate --name Item --attributes ownerId:integer,description:string,status:boolean,dueDate:date

npx sequelize-cli db:migrate 

```

Run Server

```
npm start
```

