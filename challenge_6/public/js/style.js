const formNewCar = document.getElementById('form-new-car');
const nameNewCar = document.getElementById('name');
const rentNewCar = document.getElementById('rent');
const sizeNewCar = document.getElementById('size');
const imgNewCar = document.getElementById('image');
const btnNewCar = document.getElementById('submit-new-car');

formNewCar.addEventListener('change', function() {
    if(nameNewCar.value && rentNewCar.value && sizeNewCar.value && imgNewCar.value) {
        btnNewCar.removeAttribute('disabled');
    } else {
        btnNewCar.setAttribute('disabled', true);
    }
})