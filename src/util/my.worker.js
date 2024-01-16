
function fun(n){
    return n<=2?1:fun(n-1)+fun(n-2)
}
onmessage = function(event){
    // console.log('收到数据'+event.data);
    // var number = event.data;
    // var result = fun(number);
    // postMessage(result);
    // console.log('计算完成结果'+result);

    // event.data.target
    // console.log("收到数据",event.data);

      postMessage((event.data.target).slice(7, -2).split(",")[5])
    //   console.log(result);
    // operate(result)
    //   postMessage(operate(event.data))
    //   const observer = new MutationObserver(function (mutations) {
    //     mutations.forEach((mutation) => {
    //       if (mutation.attributeName === "style") {
    //         var matrix = window
    //           .getComputedStyle(parent)
    //           .getPropertyValue("transform")
    //           .slice(7, -2)
    //           .split(",");
    //         operate(matrix)
    //       }
    //     });
    //   });
    //   observer.observe(parent, { attributes: true });
}

