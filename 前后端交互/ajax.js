const btn = document.getElementById("equal");
const btnClear = document.getElementById("cleardb");
const btnAns = document.getElementById("ans");

const history = document.getElementById("history");
const lastAnsDisplay = document.getElementById("lastAnsDisplay");

const overdis = document.getElementById('overdisplay');
const dis = document.getElementById('display');

const olList = document.getElementsByTagName('ol');

const btnStorage = document.getElementById('storage');
const btnLoan = document.getElementById('loan');

var flag_btnStorage = 0;
var flag_btnLoan = 0;

var flag_btnLive = 0;
var flag_btnDir = 0;

const getMoney = document.getElementById('money');
const getMonth = document.getElementById('month');

const output = document.getElementById('output');

const getres = document.getElementById('getres');

const ansbtn = document.getElementById('ansbtn');

const slist = document.getElementsByClassName('std');
const llist = document.getElementsByClassName('ltd');

let stdArr = new Array(7);
let ltdArr = new Array(5);

let SmonthArr = [];
let SrateArr = [];

let LmonthArr = [];
let LrateArr = [];


//add
btn.addEventListener("click", () => {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:8080/insert");

    xhr.setRequestHeader("Content-Type", "application/JSON");
    const dataObj = {
        time: '1',
        expression: overdis.innerHTML,
        result: dis.innerHTML
    }
    dataStr = JSON.stringify(dataObj);
    xhr.send(dataStr);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {

            }
        }
    }
});


//clear
btnClear.addEventListener('click', () => {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:8080/clear');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                alert('清除数据库完成！');
            }
        }
    }


});



//ans
btnAns.addEventListener('click', () => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/ans');
    xhr.send();

    // xhr.addEventListener('loadend', () => {
    //     console.log(xhr.response);
    //     resp = xhr.response.msg;
    //     console.log(resp);
    // })


    //设置响应报文的类型为json
    xhr.responseType = 'json';


    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //每次查询历史记录都 先将ol数组清空
                for (var i = 0; i < olList.length; i++) {
                    olList[i].innerHTML = "";
                }
                //将LastAns清空
                lastAnsDisplay.innerHTML = "";

                if (xhr.response == null) {
                    return;
                }

                console.log(xhr.response);


                //得到数据列表
                var resp = xhr.response.data;

                //获取数据库最新的cal_result
                var lastAns = resp[0].cal_result;
                lastAnsDisplay.innerHTML = lastAns;



                //遍历列表
                for (var i = 0; i < resp.length; i++) {
                    //获取每行数据的json对象
                    // console.log(resp[i]);
                    olList[i].innerHTML = resp[i].cal_express + resp[i].cal_result;
                }

            }
        }
    }
});



// 利率计算器

//获取 存 的利率表
btnStorage.addEventListener('click', () => {

    flag_btnStorage = 1;
    flag_btnLoan = 0;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/storage');
    xhr.send();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log(xhr.response);

                //获取列表
                var resp = xhr.response.data;
                //创建数组
                if (SmonthArr == [] && SrateArr == []) {
                    SmonthArr = new Array(resp.length);
                    SrateArr = new Array(resp.length);
                }
                for (var i = 0; i < resp.length; i++) {

                    //将数据添加进 month数组 和 rate数组
                    SmonthArr[i] = resp[i].month;
                    SrateArr[i] = resp[i].rate;
                }

                for (var i = 0; i < SmonthArr.length; i++) {
                    console.log(SmonthArr[i]);
                }
                for (var i = 0; i < SrateArr.length; i++) {
                    console.log(SrateArr[i]);
                }

            }
        }
    }
});


//获取 贷 的利率表
btnLoan.addEventListener('click', () => {

    flag_btnStorage = 0;
    flag_btnLoan = 1;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/loan');
    xhr.send();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log(xhr.response);

                //获取列表
                var resp = xhr.response.data;

                if (LmonthArr == [] && LrateArr == []) {
                    LmonthArr = new Array(resp.length);
                    LrateArr = new Array(resp.length);
                }

                for (var i = 0; i < resp.length; i++) {

                    //将数据添加进 month数组 和 rate数组 
                    LmonthArr[i] = resp[i].month;
                    LrateArr[i] = resp[i].rate;
                }


                // for (var i = 0; i < LmonthArr.length; i++) {
                //     console.log(LmonthArr[i]);
                // }
                // for (var i = 0; i < LrateArr.length; i++) {
                //     console.log(LrateArr[i]);
                // }
            }
        }
    }
});



function GetRate(month, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (month < arr[i]) {
            break;
        }
    }
    return i - 1;
}

getres.onclick = () => {
    var money = parseInt(getMoney.value);

    var month = parseInt(getMonth.value);
    if (month < 0) {
        alert("请输入大于零的数！");
        return;
    }
    // console.log(typeof(money));

    // console.log(flag_btnStorage);
    // console.log(flag_btnLoan);

    if (flag_btnStorage == 0 && flag_btnLoan == 0) {
        alert("请选择'存'或者'贷'!");
        return;
    }
    var index = 0;
    var rate = 0;
    if (flag_btnStorage == 1) {

        if (flag_btnLive == 0 && flag_btnDir == 0) {
            alert("请选择'定期'或'活期'!");
            return;
        }

        if (flag_btnLive == 1) {
            rate = SrateArr[0];
        }
        else {
            index = GetRate(month, SmonthArr);
            console.log(index);
            rate = SrateArr[index];
        }
    }

    if (flag_btnLoan == 1) {
        if (month < 6) {
            alert("请输入大于六的数！");
            return;
        }
        index = GetRate(month, LmonthArr);
        rate = LrateArr[index];
    }

    rate /= 100;
    console.log(money);
    console.log(rate);
    var ans = money * month * rate;
    console.log(ans);

    // output.removeAttribute('readonly');

    output.value = jg(ans);

    // output.setAttribute('readonly', 'readonly');

};


ansbtn.addEventListener('click', () => {

    for (var i = 0; i < stdArr.length; i++){
        stdArr[i] = slist[i].value;

        //设置强制保留两位小数
        slist[i].value = Number.parseFloat(slist[i].value).toFixed(2);
        // console.log(stdArr[i]);
    }
    for (var i = 0; i < ltdArr.length; i++) {
        ltdArr[i] = llist[i].value;

        llist[i].value = Number.parseFloat(llist[i].value).toFixed(2);
        // console.log(ltdArr[i]);
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/alterIR");
    //设置格式
    xhr.setRequestHeader("Content-Type", "application/JSON");
    var dataObj = {
        storage: stdArr,
        loan: ltdArr
    };
    var dataStr = JSON.stringify(dataObj);
    xhr.send(dataStr);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                alert("修改利率成功！");

             }
         }
    }
})

















