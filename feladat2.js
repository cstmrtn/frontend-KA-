function jogsivan(){
    let vnev = document.getElementById('vnev').value;
    let knev = document.getElementById('knev').value;
    let kedvenc = document.getElementById('number').value;
    let result = document.getElementById('result');
    result.innerHTML = `Van jogosítványa: ${vnev} ${knev} ${kedvenc}.`
}

function nincsjogsi(){
    let vnev = document.getElementById('vnev').value;
    let knev = document.getElementById('knev').value;
    let kedvenc = document.getElementById('number').value;
    let result = document.getElementById('result');
    result.innerHTML = `Nincs jogosítványa: ${vnev} ${knev} ${kedvenc}.`
}