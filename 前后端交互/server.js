const express = require('express')
const app = express()


//req.body获取前端发来的json格式的数据
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'calculator'
});

conn.connect();

//跨域请求
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    next();
});

app.post('/insert', function (req, res) {
    
    var sql = "insert into cal(cal_time,cal_express,cal_result) values(?,?,?)";
    console.log(req.body);
    var params = req.body;
    var paramsArr = [];
    for (var obj in params){
        paramsArr.push(params[obj]);
    }

    conn.query(sql, paramsArr, function (err, result) {
        if (err) {
            console.log('insert error:', err.message);
            return;
        }
        console.log('insert success');
        
    })
   
});


app.get('/clear', function (req, res) {
    var sql = 'truncate table cal';
    conn.query(sql, function (err, result) {
        if (err) {
            console.log("clear error:", err.message);
            return;
        }
        res.send('clear success!');
        console.log("clear table");
    }) 

});


app.get('/ans', function (req, res) {
    var sql = 'select cal_time,cal_express,cal_result,cal_id from cal order by cal_id desc limit 10';
    conn.query(sql, function (err, result) {
        if (err) {
            console.log('select error:', err.message);
            return;
        }
       console.log("select success");
        if (result.length == 0) {
            res.send("");
            return console.log('数据为空'); 
        }

        //返回数据
        var dataObj = {
            "msg": "数据获取成功",
            "data": result
        };
        var dataStr = JSON.stringify(dataObj);
        res.send(dataStr);
        
    })
});


//获取storageir的数据
app.get('/storage', function (req, res) {
    var sql = 'select month,rate from storageir';
    conn.query(sql, function (err, result) {
        if (err) {
            console.log('select error:', err.message);
            return;
        }
        console.log("select success");

        var dataObj = {
            "data":result
        }
        var dataStr = JSON.stringify(dataObj);
        res.send(dataStr);

    });
});


//获取loanir的数据
app.get('/loan', function (req, res) {
    var sql = 'select month,rate from loanir';

    //以下代码同上 可封装
    conn.query(sql, function (err, result) {
        if (err) {
            console.log('select error:', err.message);
            return;
        }
        console.log("select success");

        var dataObj = {
            "data": result
        }
        var dataStr = JSON.stringify(dataObj);
        res.send(dataStr);

    });
});


app.post('/alterIR', function (req, res) { 
    // console.log(req.body);
    var sArr = req.body.storage;
    var lArr = req.body.loan;
    for (var i = 0; i < sArr.length; i++) {
        var sql = 'update storageir set rate = ? where id = ?';
        conn.query(sql, [sArr[i], i + 1], function (err, result) { 
            if (err) {
                console.log('update error:', err.message);
                return;
            }
        })
    }
    for (var i = 0; i < lArr.length; i++) {
        var sql = 'update loanir set rate = ? where id = ?';
        conn.query(sql, [lArr[i], i + 1], function (err, result) {
            if (err) {
                console.log('update error:', err.message);
                return;
            }
        })
    }
    console.log('update success!');
    res.send('update success!');
})


//监听8080端口
app.listen(8080, () => {
    console.log('8080端口正在监听中...');
});


// var mysql = require('mysql');
// var conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'calculator'
// });
// conn.connect();
// var values = ["123456", "8+2", "10"];
// var sql = 'insert into cal(cal_time,cal_express,cal_result) values (?,?,?)';

// conn.query(sql, values, function (err, rows, field) {
//     if (err) {
//         console.log('insert error:',err.message);
//         return;
//     }
//     console.log('insert success');

// });



