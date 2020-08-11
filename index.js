window.onload = function() {
    const flipcard = document.querySelector('.tarjeta');    

    flipcard.addEventListener('click', function() {
        flipcard.classList.toggle('flip');
    });
};