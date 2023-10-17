const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
const overdisplay = document.querySelector('#overdisplay');


function jg(num) {
    // console.log(parseFloat(num.toFixed(7)));
    if ((num | 0) == num) return num;
    return parseFloat(num.toFixed(9));
} 

function start() {


    buttons.forEach((item) => {
        item.onclick = () => {
            if (item.id == 'clear') {
                display.innerText = '';
                overdisplay.innerText = '';
            }
            else if (item.id == 'backspace') {

                var str = display.innerText.toString();
                display.innerText = str.substr(0, str.length - 1);
            }
            else if (display.innerText != '' && item.id == 'equal') {

                overdisplay.innerText = display.innerText + "=";
                var ans = eval(display.innerText);
                // console.log(ans);
                display.innerText = jg(ans);


            }
            else if (display.innerText == '' && item.id == 'equal') {
                display.innerText = '';
            }
            else if (display.innerText != '' && item.id == 'reverse') {
                if (display.innerText != '0') {
                    display.innerText = eval(display.innerText * -1);
                }
            }
            else if (item.id >= '0' && item.id <= '9') {
                if (display.innerText == '0') {
                    display.innerText = item.id;
                }
                else {
                    display.innerText += item.id;
                }
            }
            else if (item.className == 'btn-operator base') {

                if (display.innerText == '') {
                    if (item.id == '-')
                        display.innerText = item.id;
                }
                else {
                    str = display.innerText;
                    if (str[str.length - 1] >= '0' && str[str.length - 1] <= '9')
                        display.innerText += item.id;
                }
            }
            else if (item.id == '.') {
                str = display.innerText;
                if (str[str.length - 1] >= '0' && str[str.length - 1] <= '9') {
                    display.innerText += item.id;
                }
            }
            else if (item.id == '(' || item.id == ')') {
                display.innerText += item.id;
            }
            else if (item.id == 'fun1') {
                var ans = eval(1 / display.innerText);
                overdisplay.innerText = "1/" + display.innerText + "=";
                display.innerText = jg(ans);

            }
            else if (item.id == 'fun2') {
                overdisplay.innerText = display.innerText + "²=";
                display.innerText = jg(eval(display.innerText * display.innerText));

            }
            else if (item.id == 'fun3') {
                var tmp = Number(display.innerText);
                tmp = Math.sqrt(tmp);
                overdisplay.innerText = "√" + display.innerText + "=";
                display.innerText = jg(tmp);

            }
        }
    })
}

start();
    

module.exports = {
    start
}
