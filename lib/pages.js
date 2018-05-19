// "use strict";
// hide #back-top first

// hide #back-top first
// var AMap = require('https://webapi.amap.com/maps?v=1.4.2&key=6afd74f46ef9252cfba561a9cb134f25&callback=init')
$("#back-top").hide();

// fade in #back-top

$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('#back-top').fadeIn();
    } else {
        $('#back-top').fadeOut();
    }
});

// scroll body to 0px on click
$('#back-top a').on("click", function () {
    $('body,html').animate({
        scrollTop: 0
    }, 800);
    return false;
});

// 添加情报
$("#add-form-button").click(function () {
    // $("#add-form").removeClass("hide")
    $('#inputLocation').val($("#location").val())
    $('#myModal2').modal('hide')
    $("#myModal6").modal('show')
    $('#inputLocation')[0].readOnly = true
    // var AMap = JSON.parse(localStorage.getItem('AMap'))
    
    // var map = JSON.parse(localStorage.getItem('map'))
    // console.log('~~~~~~~~~~',map)
    // var AMap = JSON.parse(localStorage.getItem('AMap'))
    // $('html,body').animate({ scrollTop: $('#add-form').offset().top }, 500);
})
$("#add-btn").click(function () {
    $('#inputLocation').val($("#location").val())
    $("#myModal6").modal('show')
    $('#inputLocation')[0].readOnly = true
    // $('html,body').animate({ scrollTop: $('#add-form').offset().top }, 500);
})
//let it go
$("#let-it-go").click(function () {
    $('#myModal2').modal('hide')
    $('#add-area').removeClass('hide')
})