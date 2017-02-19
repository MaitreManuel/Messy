function spin(spin) {
    if(spin == true) {
        $('#closeButton').css('display', 'none');
        $('.box-message').css('display', 'none');
        document.getElementById("overlay").style.width = "100%";
        $('#loader').css('display', 'block');
    } else {
        document.getElementById("overlay").style.width = "0%";
        $('#loader').css('display', 'none');
    }
}

function openOverlay() {
    $('#closeButton').css('display', 'block');
    $('.box-message').css('display', 'block');
    document.getElementById("overlay").style.width = "100%";
    document.getElementById('message').value = "";

}

function closeOverlay() {
    document.getElementById("overlay").style.width = "0%";
}
