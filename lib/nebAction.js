var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
var nebPay = new NebPay();

$("#search_value").attr("disabled", true)
$("#search").attr("disabled", true)


//to check if the extension is installed
//if the extension is installed, var "webExtensionWallet" will be injected in to web page
if (typeof (webExtensionWallet) === "undefined") {
    //alert ("Extension wallet is not installed, please install it first.")
    $('#myModal').modal('toggle')
    $('#search-area').addClass("hide")
    $("#noExtension").removeClass("hide")
} else {
    $("#search_value").attr("disabled", false)
    $("#search").attr("disabled", false)
}


var dappAddress = "n1fwkf7AgDvYDt8JM1q59W4DE7R6jokQTLE";

// 搜索功能
$("#search").click(function () {
    // $("#search_value").val() 搜索框内的值
    // $("#add-form").addClass("hide")
    var location = $("#location").val()
    // console.log("asdasd", location == "")
    if (location == "") {
        $("#myModal3").modal('show')
    } else {
        var to = dappAddress;
        var value = "0";
        var callFunction = "get";
        var callArgs = "[\"" + location + "\"]"; //in the form of ["args"]
        nebPay.simulateCall(to, value, callFunction, callArgs, {    //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
            listener: cbSearch      //指定回调函数
        });
        $('#add-area').removeClass('hide')
    }
})

// //test
// var dic = {}
// $("#search2").click(function () {
//     var item = $("#location").val().trim() //搜索框内的值
//     dic[item] = []
//     localStorage.setItem('key', JSON.stringify(dic))
// })


//return of search,
function cbSearch(resp) {
    var result = resp.result
    console.log("return of rpc call: " + JSON.stringify(result))

    if (result == 0) {//empty input
        $("#myModal3").modal('show')
        $("#cards-deck").empty()
    }
    else if (result == -1) {//empty item
        $("#myModal2").modal('show')
        $("#cards-deck").empty()
        $('#loading-text').text('嘘～这里还没人发现iTasty情报呢～来：')
    } else {
        //if result is not null, then it should be "return value" or "error message"
        try {
            result = JSON.parse(result)
        } catch (err) {
            //result is the error message
        }

        if (result.length != 0) {      //"return value"
            $("#cards-deck").empty()
            result.forEach(function (item, index) {
                $("#cards-hub").removeClass('hide')
                var card = $("<div class='card'></div>")
                // var map = $("<div class='map'></div>")
                var body = $("<div class='card-body'></div>")
                var title = $("<h5 class='card-title'></h5>")
                var cat = item.category
                if (cat == '主食') {
                    var category = $("<span class='label label-main'></span>")
                } else if (cat == '小吃') {
                    var category = $("<span class='label label-snack'></span>")
                } else if (cat == '甜品') {
                    var category = $("<span class='label label-sweet'></span>")
                } else if (cat == '饮品') {
                    var category = $("<span class='label label-drink'></span>")
                } else {
                    var category = $("<span class='label label-others'></span>")
                }
                category.text(item.category)
                var location = $("<p class='card-location'><span class='label label-category'></span></p>")
                title.text(item.name)
                title.append(category)
                var tags = item.tags.split(' ')
                tags.forEach(function (i, index) {
                    var tag = $("<span class='label label-pill label-tags'></span>")
                    tag.text(i)
                    title.append(tag)
                })
                location.text(item.location)
                location.append($("<i class='fa fa-map-o'></i>"))
                location.attr('data-toggle', "tooltip")
                location.attr('data-placement', "bottom")
                location.attr('title', "点击打开地图导航至此处")
                location.click(function () {
                    window.open('http://uri.amap.com/navigation?from=,,我的位置' + '&to=' + String(item.longitude) + ',' + String(item.latitude) + ',' + item.location)
                })
                title.attr('data-toggle', "tooltip")
                title.attr('data-placement', "bottom")
                title.attr('title', "点击打开地图导航至此处")
                title.click(function () {
                    window.open('http://uri.amap.com/navigation?from=,,我的位置' + '&to=' + String(item.longitude) + ',' + String(item.latitude) + ',' + item.name)
                })
                var recommend = $("<p class='card-recommand'></p>")
                recommend.text(item.recommend)

                body.append(title)
                body.append(category)
                body.append($("<p class='card-rec'><i class='fa fa-cutlery'></i>&nbsp推荐美食</p>"))
                body.append(recommend)
                body.append($("<p class='card-loc'><i class='fa fa-map-marker'></i>&nbsp地址(点击地址导航至此处)</p>"))
                body.append(location)
                var footer = $("<div class='card-footer'></div>")
                footer.text('Created by:' + item.finder)
                // card.append(map)
                card.append(body)
                card.append(footer)
                $("#cards-deck").append(card)
                $('#loading-text').text('到底了～没有想要的？来：')
            })
        } else {        //"error message"
            $(".add_banner").addClass("hide");
            $(".result_faile").addClass("hide");

            $("#search_banner").text($("#search_value").val())
            $("#search_result").text(result)
            $("#search_result_author").text("")

            $(".result_success").removeClass("hide");
        }

    }

}

var intervalQuery
var serialNumber
//提交信息
$("#btn-submit").click(function () {
    var to = dappAddress
    var location = $('#inputLocation').val()
    var street = $('#inputStreet').val()
    var lng = localStorage.getItem('add_lng')
    var lat = localStorage.getItem('add_lat')
    var name = $('#inputName').val()
    var category = $('#inputCategory').val()
    var recommend = $('#inputRecommand').val()
    var tags = $('#inputTag').val()
    if (street == "") {
        $('#inputStreet').addClass('input-error')
    } else if (name == "") {
        $('#inputStreet').removeClass('input-error')
        $('#inputName').addClass('input-error')
        $('#inputName').attr('placeholder', '请输入店名')
    } else if (recommend == "") {
        $('#inputName').removeClass('input-error')
        $('#inputRecommand').addClass('input-error')
    } else {
        $('#inputStreet').removeClass('input-error')
        $('#inputName').removeClass('input-error')
        $('#inputRecommand').removeClass('input-error')
        var value = "0";
        var callFunction = "save"
        var callArgs = "[\"" + location + "\",\"" + street + "\",\"" + lng + "\",\"" + lat + "\",\"" + name + "\",\"" + category + "\",\"" + recommend + "\",\"" + tags + "\"]"
        $("#myModal6").modal('hide')
        $("#myModal4").modal('show')
        serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: cbPush
        });
        intervalQuery = setInterval(function () {
            funcIntervalQuery();
        }, 10000);
    }
    // $("#add-form").addClass('hide')
})

function funcIntervalQuery() {
    try {
        nebPay.queryPayInfo(serialNumber)   //search transaction result from server (result upload to server by app)
            .then(function (resp) {
                console.log("tx result: " + resp)   //resp is a JSON string
                var respObject = JSON.parse(resp)
                if (respObject.code === 0) {
                    $("#myModal4").modal('hide')
                    $("#myModal6").modal('hide')
                    $("#myModal8").modal('show')
                    clearInterval(intervalQuery)
                }
            })
            .catch(function (err) {
                null;
                // console.log(err);
                // $("#myModal4").modal('hide')
                // $("#myModal6").modal('hide')
                // $("#myModal5").modal('show')
                // clearInterval(intervalQuery)
                // try{
                //     console.log('*************ERROR!!', err)
                // }catch(e){
                //     console.log(e)
                // }
                
            });
    }catch(err){
        // clearInterval(intervalQuery)
        // $("#myModal4").modal('hide')
        // $("#myModal6").modal('hide')
        // $("#myModal5").modal('show')
        console.log('*************ERROR222!!', err)
    }
    
}

function cbPush(resp) {
    var result = JSON.stringify(resp)
    if(result.split(':')[0] == '"Error'){
        $("#myModal4").modal('hide')
        $("#myModal6").modal('hide')
        $("#myModal5").modal('show')
        clearInterval(intervalQuery)
    }else{
        console.log("response of push: ", result, result.split(':')[0])
    }
    // $('#myModal6').modal('hide')
    // $("#myModal4").modal('show')
    // setTimeout(function () {
    //     $("#myModal4").modal('hide')
    // }, 1500)
    // try {
    //     var reponse = JSON.parse(resp.result)
    //     if (Response.execute_err == "") {
    //         console.log('*************correct!!')
    //         $("#myModal4").modal('hide')
    //         $("#myModal7").modal('show')
    //     }
    // } catch (err) {
    //     $("#myModal4").modal('hide')
    //     $("#myModal5").modal('show')
    //     console.log('*************ERROR!!', err)
    // }
}