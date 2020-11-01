//console.log('js file is loading');

//const loc = 'Boston';
//const loc = 'fdsfsv';
const message1 = document.querySelector("#message-one");
const message2 = document.querySelector("#message-two");

const search = (loc) => {
    message1.textContent = 'fetching weather...';
    message2.textContent = '';

    fetch('http://localhost:3000/weather?address=' + loc)
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            message1.textContent = data.error;
            return;
        }
            //return console.log(data.error);
        //console.log(data);
        message1.textContent = data.forecast;
        message2.textContent = data.location;
    });
}


const weatherForm = document.querySelector('form');
const input = document.querySelector('input');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    search(input.value);
});