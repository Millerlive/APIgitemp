// 1.安装mysql   npm i mysql
// 2.导入
const mysql = require("mysql");
const express = require("express");
// 3.创建Mysql连接
// const connection = mysql.createConnection({
//   host: "localhost", //域名
//   user: "root", //用户名
//   password: "123456", //密码
//   database: "test",
// });
const connection = mysql.createConnection({
    host: 'bqsxjf2zgwcvnap1tuut-mysql.services.clever-cloud.com', //域名
    user: 'ujqvtqll8lirmdgr', //用户名
    password:'SP8d7lExEEq75G48gzik' , //密码
    database:'bqsxjf2zgwcvnap1tuut'
})
connection.connect((err) => {
  if (err) {
    console.log("error connecting", err.stack);
    return;
  }
  console.log("connected to database");
});
// connection.query('SQL',()=>{})

const app = express();
app.get("/", (req, res) => {
  let data = "null";
  connection.query("select id,name from emp", (err, result) => {
    if (err) {
      console.log("error", err.stack);
      res.send( 'error');
      return;
    }
    console.log(result);
    res.send(result);
  });
});
let num = 60
let min = 20
app.get("/emp", (req, res) => {
    // ?为占位符  一个？表示一个占位符，多个占位符的数据要放在数组中
//   connection.query("select * from emp where age> ? ",num, (err, result) => {
  connection.query("select * from emp where age> ? || age < ?",[num,min], (err, result) => {
    if (err) {
      console.log("error", err.stack);
      res.send( 'error');
      return;
    }
    console.log(result);
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("listening on 3001");
});
