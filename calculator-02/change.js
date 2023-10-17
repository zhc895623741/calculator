const btnIR = document.getElementById('IR');

const btnBack = document.getElementById('back');

const btnAlter = document.getElementById('alter');

const pageIR = document.querySelector('.interestRate');
const pageAlterIR = document.querySelector('.alterInterestRate');
const pageContainer = document.querySelector('.container');


const live = document.getElementById('live');
const dir = document.getElementById('dir');

const storage = document.getElementById('storage');
const loan = document.getElementById('loan');

const clearNum = document.getElementById('clearNum');

const retIR = document.getElementById('retIR');

btnIR.onclick = function () { 
    pageContainer.style.display = 'none';
    pageIR.style.display = 'block';
    pageAlterIR.style.display = 'none';
    
}

btnBack.onclick = function () {
    pageContainer.style.display = 'block';
    pageIR.style.display = 'none';
    pageAlterIR.style.display = 'none';
    

}

btnAlter.onclick = function () {
    pageContainer.style.display = 'none';
    pageIR.style.display = 'none';
    pageAlterIR.style.display = 'block';
}

retIR.onclick = function () { 
    pageContainer.style.display = 'none';
    pageIR.style.display = 'block';
    pageAlterIR.style.display = 'none';
}


storage.onclick = function () {
    //background-color: #fcfcfc;
    //color: #4c4c4c;

    // background = color: #cdcbcb;
    // color: #ff8500;
    loan.style.backgroundColor = '#fcfcfc';
    loan.style.color = '#4c4c4c';
    this.style.backgroundColor = '#cdcbcb';
    this.style.color = '#ff8500';

    live.style.display = 'block';
    dir.style.display = 'block';
 }


loan.onclick = function () {
    
    storage.style.backgroundColor = '#fcfcfc';
    storage.style.color = '#4c4c4c';
    this.style.backgroundColor = '#cdcbcb';
    this.style.color = '#ff8500';

    live.style.display = 'none';
    dir.style.display = 'none';
}







live.onclick = function () {

    flag_btnLive = 1;
    flag_btnDir = 0;
    this.style.backgroundColor = '#ffd5d8';
    this.style.color = '#a20c0c';

    dir.style.backgroundColor = '#f9f9f9';
    dir.style.color = '#3f3f3f';
}

dir.onclick = function () { 

    flag_btnDir = 1;
    flag_btnLive = 0;

    this.style.backgroundColor = '#ffd5d8';
    this.style.color = '#a20c0c';

    live.style.backgroundColor = '#f9f9f9';
    live.style.color = '#3f3f3f';
}





clearNum.onclick = () => {
    getMoney.value = "";
    getMonth.value = "";
    output.value = "";
}
