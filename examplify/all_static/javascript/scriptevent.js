const formsubmit = document.getElementById('submit');
/*event editors*/
/*directs user back to previous page after submitting the form*/
formsubmit.onclick = function(event){
    event.preventDefault();
    //data processing will need to be put here
    window.location.replace("calender.html");
};