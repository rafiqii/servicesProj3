
export function addDays(days: number): Date {
    var date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}

export function getDate(date:Date):string{
    let stringfiedDate= date.getFullYear()+ "-"+ date.getMonth()+"-"+date.getDay;
    return stringfiedDate;
}
export function getHours(time:string):number{
    return parseInt(time.substring(0,time.indexOf(":")));
}
export function getMinutes(time:string):number{
    return parseInt(time.substring(time.indexOf(":")+1,time.length));
}
export function givenTimeInMinutes(time:string):number{
    let hours:number=getHours(time);
    let minutes:number=getMinutes(time);

    return minutes+60*hours;
}