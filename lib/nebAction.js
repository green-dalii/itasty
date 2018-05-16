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


var dappAddress = "n1w2zmZRcMK4TGmRpbn9da6UQkb5Wf1ZZ2u";

// 搜索功能: 查找Super-Dictionary 中有没有该词条
$("#search").click(function () {
    // $("#search_value").val() 搜索框内的值
    $("#add-form").addClass("hide")
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

    if (result == 0) {
        $("#myModal3").modal('toggle')
    }
    else if (result == -1) {
        $("#myModal2").modal('toggle')
    } else {
        //if result is not null, then it should be "return value" or "error message"
        try {
            result = JSON.parse(result)
        } catch (err) {
            //result is the error message
        }

        if (result.length != 0) {      //"return value"
            // $(".add_banner").addClass("hide");
            // $(".result_faile").addClass("hide");

            // $("#search_banner").text($("#search_value").val())
            // $("#search_result").text(result.value)
            // $("#search_result_author").text(result.author)

            // $(".result_success").removeClass("hide");
            // var deck = $("#cards-deck")
            $("#cards-deck").empty()
            result.forEach(function (item, index) {
                console.log('WWWWWW')
                $("#cards-hub").removeClass('hide')
                var card = $("<div class='card'></div>")
                var map = $("<div class='map'></div>")
                var body = $("<div class='card-body'></div>")
                
                var title = $("<h5 class='card-title'></h5>")
                title.text(item.name)

                var recommend = $("<p class='card-text'></p>")
                recommend.text(item.recommend)
                
                var category = $("<p class='card-text'></p>")
                category.text(item.category)
                
                body.append(title)
                body.append(recommend)
                body.append(category)

                var footer = $("<div class='card-footer'><small class='text-muted'>Last updated 3 mins ago</small></div>")

                card.append(map)
                card.append(body)
                card.append(footer)
                $("#cards-deck").append(card)
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

// 添加信息功能: 像super-dictionary 中添加词条
// $("#add").click(function () {
//     $(".result_faile").addClass("hide");
//     $('html, body').animate({
//         scrollTop: $("#add-form").offset().top
//     }, 1000);
//     $(".add_banner").removeClass("hide");

//     $("#add_value").val("")

// })

// $("#push").click(function () {

//     var to = dappAddress;
//     var value = "0";
//     var callFunction = "save"
//     var callArgs = "[\"" + $("#search_value").val() + "\",\"" + $("#add_value").val() + "\"]"

//     nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
//         listener: cbPush
//     });
// });

//提交信息
$("#btn-submit").click(function () {
    var to = dappAddress
    var location = $('#inputLocation').val()
    var street = $('#inputStreet').val()
    var name = $('#inputName').val()
    var category = $('#inputCategory').val()
    var recommend = $('#inputRecommand').val()
    var tags = $('#inputTag').val()
    var value = "0";
    var callFunction = "save"
    var callArgs = "[\"" + location + "\",\"" + street + "\",\"" + name + "\",\"" + category + "\",\"" + recommend + "\",\"" + tags + "\"]"
    nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
        listener: cbPush
    });
    $("#add-form").addClass('hide')
})

function cbPush(resp) {
    console.log("response of push: " + resp)
    $("#myModal4").modal('show')
    setTimeout(function () {
        $("#myModal4").modal('hide')
    }, 3000)
    var reponse = JSON.parse(resp.result)
    if (Response.execute_err == "") {
        $("#push-loading").addClass('hide')
        $("#push-success").removeClass('hide')
        $("#push-ok-btn").attr("disabled", false)
    } else {
        $("#myModal4").modal('hide')
        $("#myModal5").modal('toggle')
    }
}