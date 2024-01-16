const getTime = function (time, arr) {
    const computed = {}
    const weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    function getYmd(time) {
        let date = new Date(time)
        return [date.getFullYear(), date.getMonth(), date.getDate()]
    }

    let date = new Date(time);              //2023-04-05T16:00:00.000Z
    let now = new Date(Date.now())
    // console.log(time,now);
    computed.year = date.getFullYear() +    "年"
    computed.month = date.getMonth() + 1 +  "月"     //通常小1 所以加上
    computed.day = date.getDate() +         "日"     ////当月第几天
    computed.hour =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    computed.minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

    computed.week = weekDay[date.getDay()]         //星期几

    date = getYmd(date);
    now = getYmd(now);
    for(let i=0;i<3;i++){
        if(date[i]===now[i]){
            if(i===1){
                if(date[2]===now[2]){
                    computed.week = "今天"
                }else if(date[2]===(now[2]+1)){
                    computed.week = "明天"
                }else if(date[2]===(now[2]+2))
                computed.week = "后天"
            }
        }else{
            break
        }
    }
    return arr.map(item => computed[item] || item).join("")
}
// console.log(getTime(1680796800000,["week", "month", "day", "hour", "minute"]));
// console.log(getTime(1681003800000, ["week", "month", "day", "hour", "minute"]));
module.exports = getTime