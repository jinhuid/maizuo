const getTime = function (time, arr) {
    const computed = {}
    const weekDay = "日一二三四五六"
    let date = new Date(time);              //2023-04-05T16:00:00.000Z
    computed.year = date.getFullYear() + "年"
    computed.month = date.getMonth() + 1 + "月"                     //通常小1 所以加上
    computed.day = date.getDate() + "日"                            ////当月第几天
    computed.hour = date.getHours().toString().padStart(2, '0');
    computed.minute = date.getMinutes().toString().padStart(2, '0')
    computed.week = '星期' + weekDay.charAt(date.getDay())          //星期几

    const now = Date.now()

    const timeDiff = (time - now) / 1000
    if (timeDiff >= -86400 && timeDiff < 0) {
        computed.week = "今天"
    } else if (timeDiff >= 0 && timeDiff < 86400) {
        computed.week = "明天"
    } else if (timeDiff >= 86400 && timeDiff < 86400 * 2) {
        computed.week = "后天"
    }
    return arr.map(item => computed[item] || item).join("")
}
// console.log(getTime(1680796800000, ["week", "month", "day", "hour", ':', "minute"]));
// console.log(getTime(1681003800000, ["week", "month", "day", "hour", "minute"]));
module.exports = getTime