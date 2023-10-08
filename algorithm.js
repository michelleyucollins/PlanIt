const numevents = 3;
const eventname = ["Assignment", "Exam", "Quiz"];
const date = "9/11";
const difficulty = [1, 4, 2];
const courseweight = [20, 50, 3];
const hoursleft = 30;

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
    avgdiff = ((defineType(n)+difficulty)/2);
    diffProb = avgdiff/10;
    return diffProb;
}

function importance(){
    let diffProb = new Array(numevents-1);
    let totalProb = new Array(numevents-1);
    for (let i = 0; i < numevents; i++) {
        diffProb[i] = diffParam();
        totalProb[i] = diffProb*courseweight/100;
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
}