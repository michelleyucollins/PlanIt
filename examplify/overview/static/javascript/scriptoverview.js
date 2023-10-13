// Get references to HTML elements
const coverview1 = document.querySelectorAll('#important div');
const coverview2 = document.querySelectorAll('#upcoming div');
const coverview3 = document.querySelectorAll('#starred div');

const colorarr = [["#B9E1EE", "#71BDCE", "#398799"], ['#D3D1EF', '#BAB6E7', '#5F59A1'],['#F5D4EC', '#F1B1DF', '#94497F'],['#FADDC2', '#F8C08D', '#B37841']]

//for task 1: '#B9E1EE', '#71BDCE', '#398799'
//for task 2 '#D3D1EF', '#BAB6E7', '#5F59A1'
//for task 3: '#F5D4EC', '#F1B1DF', '#94497F'
//for task 4: '#FADDC2', '#F8C08D', '#B37841'
//color3 will always be dark color that is paired with white text

function getRandomColor(color1, color2, color3) {
    let m = Math.random() * 3;
    if (m < 1){
        return {bg:color1, txt:"#4C4C4C"};
    }else if (m < 2){
        return {bg:color2, txt:"#4C4C4C"};
    }else{
        return {bg:color3, txt:"#FFFFFF"};
    }
}

coverview1.forEach(function(element) {
    let {bg, txt} = getRandomColor("#B9E1EE", "#71BDCE", "#398799");
    element.style.backgroundColor = bg;
    element.style.color = txt;
});


coverview2.forEach(function(element) {
    let {bg, txt} = getRandomColor('#D3D1EF', '#BAB6E7', '#5F59A1');
    element.style.backgroundColor = bg;
    element.style.color = txt;
});

coverview3.forEach(function(element) {
    let {bg, txt} = getRandomColor("#F5D4EC", "#F1B1DF", "#94497F");
    element.style.backgroundColor = bg;
    element.style.color = txt;
});

