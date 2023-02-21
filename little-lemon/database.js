import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'create table if not exists menu (id integer primary key not null, name text, price text, category text, image text, description blob);'
                );
            },
            function (error) {
              reject(error.message);
          },
          function () {
              resolve(true);
              console.log('Created database OK');
          }
        );
    });
}

export async function getMenuItems() {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('select * from menu', [], (_, { rows }) => {
                resolve(rows._array);
            });
        });
    });
}


export async function saveMenuItems(menuItems) {
    
    return new Promise((resolve, reject) => {
      db.transaction(
          (tx) => {
            tx.executeSql(`insert into menu (name, price, category, image, description) values ${menuItems.map((item) =>
              `('${item.name}', '${item.price}', '${item.category}', '${item.image}', "${item.description}" )`).join(', ')}`);
              
          },
          function (error) {
            reject(error.message);
            console.error(error)
        },
        function () {
            resolve(true);
            console.log('saved items');
        }
      );
  });
    
}


export async function filterByQueryAndCategories(query, activeCategories) {
   return new Promise((resolve, reject) => {
     db.transaction((tx) =>{
       if(query.length !==0){
         tx.executeSql(`select * from menu where name like '%${query}%' and category in (?, ?, ?)`,activeCategories, (_, { rows }) => {
           resolve(rows._array);
         });
       } else{
       tx.executeSql('select * from  menu  where category in (?, ?, ?, ?)',activeCategories, (_, { rows }) => {
         resolve(rows._array);
       });
     }
     });
   });
 }
