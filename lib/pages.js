// "use strict";
// hide #back-top first
  
    // hide #back-top first
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
    $('#back-top a').on("click", function(){
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

// 添加情报
$("#add-form-button").click(function () {
    $("#add-form").removeClass("hide")
    $('#myModal2').modal('hide')
    $('#inputLocation').val($("#location").val())
    $('#inputLocation')[0].readOnly = true
    $('html,body').animate({ scrollTop: $('#add-form').offset().top }, 500);
})
$("#add-btn").click(function () {
    $("#add-form").removeClass("hide")
    $('#inputLocation').val($("#location").val())
    $('#inputLocation')[0].readOnly = true
    $('html,body').animate({ scrollTop: $('#add-form').offset().top }, 500);
})
//let it go
$("#let-it-go").click(function(){
    $('#myModal2').modal('hide')
    $('#add-area').removeClass('hide')
})