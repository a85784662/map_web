var markers = [
    { add: "重庆市万州区", position: [106.550281, 29.562022], dataid: "d1" },
    { add: "重庆市渝北区", position: [106.550281, 29.561012], dataid: "d2" },
    { add: "重庆市渝中区", position: [106.550281, 29.560002], dataid: "d3" },
    { add: "重庆市江北区", position: [106.550281, 29.564032], dataid: "d4" }
]

var map = new AMap.Map('container', {
    zoom: 16,//级别
    center: [106.550281, 29.563022],//中心点坐标
    viewMode: '3D'//使用3D视图
});

markers.forEach((marker, index) => {
    var markerContent = `<div dataid="${marker.dataid}" class="mark-wrap">${marker.add}<span class="jiantou"><i class="bottom-arrow"></i></span></div>`

    var mapMaker = new AMap.Marker({
        position: marker.position,
        // 将 html 传给 content
        content: markerContent,
        // 以 icon 的 [center bottom] 为原点
        offset: new AMap.Pixel(-13, -30)
    });

    map.add(mapMaker);


    /* var infoWindow = new AMap.InfoWindow({ //创建信息窗体
        isCustom: true,  //使用自定义窗体
        content:'<div class="self-a-c">信息窗体</div>', //信息窗体的内容可以是任意html片段
        offset: new AMap.Pixel(16, -45)
    }); */
    var onMarkerClick = function (e) {
        //e.target就是被点击的Marker
        //infoWindow.open(map, e.target.getPosition());//打开信息窗体
        console.log(e.target.getPosition())
        //console.log(e.target.getContentDom());
        $('.mark-wrap').removeClass('click');
        $('.bottom-arrow').removeClass('isclick');
        $(e.target.getContentDom()).find('.mark-wrap').addClass('click').find('.bottom-arrow').addClass('isclick');
        console.log($(e.target.getContentDom()).find('.mark-wrap').attr('dataid'))
        $('.map-sidebar').animate({
            right: "0",
        }, 800);
    }
    mapMaker.on('click', onMarkerClick)

})

$('.map-sid-close').click(function () {
    $('.map-sidebar').animate({
        right: "-340px",
    }, 700);
})





/* var map = new AMap.Map('container', {
    zoom:11,//级别
    center: [106.550281,29.563022],//中心点坐标
    viewMode:'3D'//使用3D视图
});

 // 点标记显示内容，HTML要素字符串
 var markerContent = `
    <div class="mark-wrap">重庆市万州区
    <span class="jiantou"><i class="bottom-arrow"></i></span>
    </div>
 `

 var marker = new AMap.Marker({
    position: [106.550281,29.563022],
    // 将 html 传给 content
    content: markerContent,
    // 以 icon 的 [center bottom] 为原点
    offset: new AMap.Pixel(-13, -30)
});


///////////////////////////
var infoWindow = new AMap.InfoWindow({ //创建信息窗体
    isCustom: true,  //使用自定义窗体
    content:'<div class="self-a-c">信息窗体</div>', //信息窗体的内容可以是任意html片段
    offset: new AMap.Pixel(16, -45)
});
var onMarkerClick  =  function(e) {
    infoWindow.open(map, e.target.getPosition());//打开信息窗体
    //e.target就是被点击的Marker
    console.log(e.target)
} 




// 将 markers 添加到地图
map.add(marker);


marker.on('click',onMarkerClick);//绑定click事件 */


//页面事件
$('.add-position-btn').click(function () {
    $('.add-position-alert').show();
    $('.addjd').val("")
    $('.addwd').val("")
})

$('.submit-c').click(function () {
    $('.add-position-alert').hide();
})

//为地图注册click事件获取鼠标点击出的经纬度坐标
map.on('click', function (e) {
    $('.addjd').val(e.lnglat.getLng())
    $('.addwd').val(e.lnglat.getLat())
});





































