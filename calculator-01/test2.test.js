const { JSDOM } = require("jsdom");

const jsDomInstance = new JSDOM(`
<!DOCTYPE html>
<html lang="en">
<body>
    <div class="container">
        <div class="calculator">
            <div class="display-screen">
                <div id="overdisplay"></div>
                <div id="display"></div>
            </div>

            <div class="buttons">
                <table>
                    <tr>
                        <td><button class="btn-operator" id="(">(</button></td>
                        <td><button class="btn-operator" id=")">)</button></td>
                        <td><button class="btn-operator" id="clear">c</button></td>


                        <td><button class="btn-operator" id="backspace"><=</button>
                        </td>


                    </tr>
                    <tr>
                        <td><button class="btn-operator" id="fun1">1/x</button></td>
                        <td><button class="btn-operator" id="fun2">x²</button></td>
                        <td><button class="btn-operator" id="fun3">√x</button></td>
                        <td><button class="btn-operator base" id="/">&divide;</button></td>
                    </tr>
                    <tr>
                        <td><button class="btn-number" id="7">7</button></td>
                        <td><button class="btn-number" id="8">8</button></td>
                        <td><button class="btn-number" id="9">9</button></td>
                        <td><button class="btn-operator base" id="*">&times;</button></td>

                    </tr>
                    <tr>
                        <td><button class="btn-number" id="4">4</button></td>
                        <td><button class="btn-number" id="5">5</button></td>
                        <td><button class="btn-number" id="6">6</button></td>
                        <td><button class="btn-operator base" id="-">-</button></td>

                    </tr>
                    <tr>
                        <td><button class="btn-number" id="1">1</button></td>
                        <td><button class="btn-number" id="2">2</button></td>
                        <td><button class="btn-number" id="3">3</button></td>
                        <td><button class="btn-operator base" id="+">+</button></td>

                    </tr>
                    <tr>
                        <td><button class="btn-operator" id="reverse">±</button></td>
                        <td><button class="btn-number" id="0">0</button></td>
                        <td><button class="btn-operator" id=".">.</button></td>
                        <td><button class="btn-equal" id="equal">=</button></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</body>
</html>
`)

const window = jsDomInstance.window;
const document = window.document;
global.document = document;
const { start } = require("./test2");

test("start", () => {
    start();
})

test("1 + 2 = 3", () => {
    document.querySelector('#display').innerText = "";
    const button = document.getElementById("1");
    const mockClick = jest.fn();
    button.addEventListener("click", mockClick);
    button.click();
    expect(document.querySelector('#display').innerText).toBe("1")
})

test("7 * 8 = 56", () => {
    document.querySelector('#display').innerText = "";
    const button = document.getElementById("7");
    const mockClick = jest.fn();
    button.addEventListener("click", mockClick);
    button.click();
    const button1 = document.getElementById("*");
    button1.click();

    const button2 = document.getElementById("8");
    button2.click();

    const button3 = document.getElementById("equal");
    button3.click();
    expect(document.querySelector('#display').innerText).toBe(56);
    

})


test("reverse", () => {
    document.querySelector('#display').innerText = "";
    const button = document.getElementById("1");
    const mockClick = jest.fn();
    button.addEventListener("click", mockClick);
    button.click();
    const button1 = document.getElementById("reverse");
    // button1.addEventListener("click", mockClick);
    button1.click();

    
    expect(document.querySelector('#display').innerText).toBe(-1);


})


test("7 * (2 + 3) = 35", () => {
    document.querySelector('#display').innerText = "";
    const button = document.getElementById("7");
    const mockClick = jest.fn();
    button.addEventListener("click", mockClick);
    button.click();
    const button1 = document.getElementById("*");
    button1.click();

    const button2 = document.getElementById("(");
    button2.click();

    const button3 = document.getElementById("2");
    button3.click();

    const button4 = document.getElementById("+");
    button4.click();
    const button5 = document.getElementById("3");
    button5.click();
    const button6 = document.getElementById(")");
    button6.click();
    const button7 = document.getElementById("equal");
    button7.click();
    expect(document.querySelector('#display').innerText).toBe(35);

})


test("3² = 9", () => {
    document.querySelector('#display').innerText = "";
    const button = document.getElementById("3");
    const mockClick = jest.fn();
    button.addEventListener("click", mockClick);
    button.click();
    const button1 = document.getElementById("fun2");
    // button1.addEventListener("click", mockClick);
    button1.click();


    expect(document.querySelector('#display').innerText).toBe(9);


})


test("1 / 4 = 0.25", () => {
    document.querySelector('#display').innerText = "";
    const button = document.getElementById("4");
    const mockClick = jest.fn();
    button.addEventListener("click", mockClick);
    button.click();
    const button1 = document.getElementById("fun1");
    // button1.addEventListener("click", mockClick);
    button1.click();


    expect(document.querySelector('#display').innerText).toBe(0.25);


})


test("√4 = 0.25", () => {
    document.querySelector('#display').innerText = "";
    const button = document.getElementById("4");
    const mockClick = jest.fn();
    button.addEventListener("click", mockClick);
    button.click();
    const button1 = document.getElementById("fun3");
    // button1.addEventListener("click", mockClick);
    button1.click();


    expect(document.querySelector('#display').innerText).toBe(2);


})


test("null",() => {
    document.querySelector("#display").innerText = "";
    const button = document.getElementById("equal");
    const mockClick = jest.fn();
    button.addEventListener("click", mockClick);
    button.click();
    expect(document.getElementById("display").innerText).toBe("");
})



