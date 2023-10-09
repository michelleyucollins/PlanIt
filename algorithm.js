const numevents = 3;
const eventname = ["Assignment", "Exam", "Quiz"];
const dates = ["09/11","07/11","09/10"];
const times = ["09:00","08:00","13:00"]
const currdate = new Date();
const difficulty = [1, 4, 2];
const courseweight = [20, 50, 3];

/*finding available time slots*/
var hoursleft = 0;
var hoursoccupied = [new Array(18)].map(e => Array(7));
var events = [new Array(18)].map(e => Array(7));

for (i=0; i<18; i++){
    for (j=0; j<7; j++){
        if (i<6){
            var schetime = toString(6+i)+'am';
        } else if (i == 6){
            var schetime = '12pm';
        } else{
            var schetime = toString(i-6)+'pm';
        }
        var scheday = 'day'+j;
        events[i][j] = document.querySelectorAll('.'+schetime+'#'+scheday+'div div');
        if (events[i][j] != NULL){
            hoursoccupied[i][j] = true;
        }else{
            hoursoccupied[i][j] = false;
            hoursleft += 1;
        }
    }
}

/*finding available days to work for an event*/
function hrsToWork(current){
    var hrsTillEvent = new Array(numevents);
    for (i = 0; i < numevents; i++){
        var eventdate = new Date(current.getYear(), dates[i].substring(0,2)*1, dates[i].substring(3,5)*1);
        eventdate.setTime(times[i].substring(3,5)*(1000 * 60)+times[i].substring(0,2)*(1000 * 60 * 60));
        var disthrs = Math.ceil(Math.abs(eventdate - current)/ (1000 * 60 * 60 * 24)*18);
        hrsTillEvent[i] = disthrs;
    }
    return hrsTillEvent;
}


function defineType(n){
    if (eventname[n].includes("Exam")){
        return 10;
    } else if (eventname[n].includes("Project")){
        return 9;
    } else if (eventname[n].includes("Quiz")){
        return 6;
    } else if (eventname[n].includes("Assignment")){
        return 5;
    } else if (eventname[n].includes("Chore")){
        return 1;
    } else{
        return 5;
    }
}

function diffParam(n){
    if (difficulty[n]!=null){
        avgdiff = ((defineType(n)+difficulty[n])/2);
        diffProb = avgdiff/10;
        return diffProb;
    }else{
        avgdiff = ((defineType(n)+5)/2);
        diffProb = avgdiff/10;
        return diffProb;
    }
}

function importance(){
    let diffProb = new Array(numevents-1);
    let totalProb = new Array(numevents-1);
    for (let i = 0; i < numevents; i++) {
        diffProb[i] = diffParam();
        if (courseweight[i] != null){
            totalProb[i] = diffProb*courseweight[i]/100;
        }else{
            totalProb[i] = diffProb*0.1;
        }
    }
    let impProb = new Array(numevents-1);
    let total = 0;
    for (let i = 0; i < numevents; i++) {
        total = total+totalProb[i];
    }
    for (let i = 0; i < numevents; i++) {
        impProb = totalProb[i]/total;
    }
    let hourdisb = new Array(numevents-1);
    for (let i = 0; i < numevents; i++) {
        hourdisb = impProb[i]*hoursleft;
    }

    return impProb;
}

function weekschedule(mondate){
    var dailyschedule =  [new Array(18)].map(e => Array(7));
    for (i = 0; i<7; i++){
        var curr  = new Date();
        curr.setTime(mondate.getTime()+i*24*60*60*1000);
        var hrforaday = hrsToWork(curr);
        var availablehrs = new Array();
        for (n=0; n<18; n++){
            if (hoursoccupied[n][i] == false){
                availablehrs.push(n);
            }
        }
        var likelyhood = new Array(numevents);
        var hrspent = new Array(numevents);
        var totalhr = 0;
        for (j = 0; j< numevents; j++){
            totalhr += hrforaday[j];
        }
        for (j = 0; j< numevents; j++){
            likelyhood[j] = (totalhr-hrforaday[j])/totalhr*importance()[j]; 
            hrspent[j] = Math.round(likelyhood[j]*totalhr*2)/2; 
        }
        
        var hrsoccupied = [new Array(18)].map(e => Array(7).fill(false));;
        for (j = 0; j< numevents; j++){
            for (n=0; n<18; n++){
                if (hoursoccupied[n][i] == false && hrsoccupied == false){
                    if(hrspent[j]>=1){
                        dailyschedule[n][i] = toString(j);
                        hrspent[j] -= 1;
                        hrsoccupied[n][i] = true;
                    }else if (hrspent[j]>=0.5&&j<numevents-1){
                        dailyschedule[n][i] = toString(j)+','+toString(j+1);
                        hrspent[j] -= 0.5;
                        hrspent[j+1] -=0.5;
                        hrsoccupied[n][i] = true;
                    }else if (hrspent[j]>=0.5){
                        dailyschedule[n][i] = toString(j);
                        hrspent[j] -= 0.5;
                        hrsoccupied[n][i] = true;
                    }
                }
            }
        }
    }
    return dailyschedule;
}

function addWeekPlan(mondate){
    var schedule = weekschedule(mondate);
    for (i=0; i<18; i++){
        for(j=0; j<7; j++){
            if (i<6){
                var schetime = toString(6+i)+'am';
            } else if (i == 6){
                var schetime = '12pm';
            } else{
                var schetime = toString(i-6)+'pm';
            }
            var scheday = 'day'+j;
            var eve = document.querySelector('.'+schetime+'#'+scheday+' .hourevents');
            if (schedule!=null){
                addNewEvent(eve, schedule[i][j]);
            }
        }
    }
}

function addNewEvent(eve, str){
    const div1 = document.createElement('div');
    const p2 = document.createElement('p');
    if (str.includes(',')){
        const div2 = document.createElement('div');
        const p2 = document.createElement('p');
        p1.textcontent = str.substring(0, str.indexOf(","))
        p2.textcontent = str.substring(str.indexOf(",")+1)
        div2.appendChild(p2);
        div1.appendChild(p1);
        eve.appendChild(div1);
        eve.appendChild(div2);
    }
    div1.appendChild(p1);
    eve.appendChild(div1);
}

