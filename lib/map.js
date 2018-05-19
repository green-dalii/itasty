var map = new AMap.Map('add-map', {
    resizeEnable: true,
    zoom: 13,
    // center: [116.39,39.9]
});
AMap.plugin('AMap.Geocoder', function () {
    var geocoder = new AMap.Geocoder({
        city: $('#inputLocation').val().split('/')[1]//城市，默认：“全国”
    });
    var marker = new AMap.Marker({
        map: map,
        bubble: true
    })
    map.on('click', function (e) {
        marker.setPosition(e.lnglat);
        geocoder.getAddress(e.lnglat, function (status, result) {
            if (status == 'complete') {
                document.getElementById('input').value = result.regeocode.formattedAddress
                $('#inputStreet').val(result.regeocode.formattedAddress)
            }
        })
    })

});