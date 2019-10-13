var ISADMIN; //判断是否管理员
$.ajax({
    type: "get",
    url: "/judgmentIsAdmin",
    dataType: "json",
    success: function (response) {
        ISADMIN = response.content.isAdmin
        if(!ISADMIN){
            $('.isadmin').hide()
        }
    }
});

//初始化高德地图
var markers = [];
var map = new AMap.Map('container', {
    zoom: 8,//级别
    center: [106.550281, 29.563022],//中心点坐标
    viewMode: '3D'//使用3D视图
});
//获取项目列表
$.ajax({
    type: "get",
    url: "/findProjectList?start=1&display=10000",
    dataType: "json",
    success: function (response) {
        var data = response.content;
        data.forEach(function (item) {
            var markerObj = {};
            var position = [];
            if (item.longitude) {
                markerObj.add = item.construction_unit;
                markerObj.dataid = item.id;
                position.push(parseFloat(item.longitude));
                position.push(parseFloat(item.latitude));
                markerObj.position = position;
                markers.push(markerObj)
            };
        });
        createMarkers(markers)
    }
});
// 在高德地图上面生成自定义标签createMarkers方法
function createMarkers(markers) {
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

        var onMarkerClick = function (e) {
            //e.target就是被点击的Marker
            console.log(e.target.getPosition())
            $('.mark-wrap').removeClass('click');
            $('.bottom-arrow').removeClass('isclick');
            $(e.target.getContentDom()).find('.mark-wrap').addClass('click').find('.bottom-arrow').addClass('isclick');
            console.log($(e.target.getContentDom()).find('.mark-wrap').attr('dataid'))
            var projectId = $(e.target.getContentDom()).find('.mark-wrap').attr('dataid');

            //获取项目详情
            $.ajax({
                type: "get",
                url: "/findProjectInfo?projectId=" + projectId,
                dataType: "json",
                success: function (response) {
                    var data = response.content;
                    var getTpl = document.getElementById('demo-map-sidebar-jbxx').innerHTML
                        , view = document.getElementById('map-sidebar-jbxx-view');

                    layui.use('laytpl', function () {
                        var laytpl = layui.laytpl;
                        laytpl(getTpl).render(data, function (html) {
                            view.innerHTML = html;
                        });

                    });

                    $('.big-baoqi').show();
                    $('.map-sid-close').show();
                    $('.map-sidebar').addClass('ffbg')
                }
            });
            /////////over
        }
        mapMaker.on('click', onMarkerClick)

    })
};

//关闭侧边栏
$('.map-sid-close').click(function () {
    $('.map-sidebar').animate({
        right: "-340px",
    }, 700,function(){
        $(".big-baoqi").hide();
        $(".xzquyu").val("0");
        $(".xzgongdi").val("0");
        $('.xzgongdi').hide();
        $('.map-sid-close').hide();
        $('.map-sidebar').removeClass('ffbg');
        $('.map-sidebar').animate({right:0},700)
    });
});



//页面事件
$('.add-position-btn').click(function () {
    $('.add-position-alert').show();
    $('.addjd').val("")
    $('.addwd').val("")
});

$('.submit-c').click(function () {
    $('.add-position-alert').hide();
});

//为地图注册click事件获取鼠标点击出的经纬度坐标
map.on('click', function (e) {
    $('.addjd').val(e.lnglat.getLng())
    $('.addwd').val(e.lnglat.getLat())
});

///////////////////////////////////////////////

//获取区域信息
$.ajax({
    type: "get",
    url: "/findAreaList",
    dataType: "json",
    success: function (response) {
        var data = response.content;
        var ele = "";
        for(var i=0;i<data.length;i++){
            ele += '<option value='+data[i].id+'>'+data[i].region_name+'</option>'
        }
        $('.xzquyu').append(ele)
    }
});



$('body').on('click', '.j-lxsz', function () {
    var getTpl = document.getElementById('demo-map-huanjing').innerHTML
        , view = document.getElementById('mybody');
    layui.use('laytpl', function () {
        var laytpl = layui.laytpl;
        laytpl(getTpl).render({}, function (html) {
            $('body').append(getTpl)
        });

    });
})

$('body').on('click', '.alert-close', function () {
    $(this).parents('.alert-mask').remove()
})



$('.xzquyu').change(function (e) {
    currentVal = $(this).val()
    if (currentVal === "0") {
        $('.xzgongdi').hide();
        $('.map-sidebar').removeClass('ffbg')
    } else {
        $.ajax({
            type: "get",
            url: "/findProjectList?start=1&display=10&areaId="+currentVal,
            dataType: "json",
            success: function (response) {
                var data = response.content;

                var ele = "";
                for(var i=0;i<data.length;i++){
                    ele += '<option value='+data[i].id+'>'+data[i].name+'</option>'
                }
                $('.xzgongdi').append(ele)



            }
        });


        $('.xzgongdi').show();
        $('.map-sidebar').addClass('ffbg')

    }
})


$('body').on('change', '.xzgongdi', function () {
    var projectId = $(this).val();


    //获取项目详情
    $.ajax({
        type: "get",
        url: "/findProjectInfo?projectId=" + projectId,
        dataType: "json",
        success: function (response) {
            var data = response.content;
            var getTpl = document.getElementById('demo-map-sidebar-jbxx').innerHTML
                , view = document.getElementById('map-sidebar-jbxx-view');

            layui.use('laytpl', function () {
                var laytpl = layui.laytpl;
                laytpl(getTpl).render(data, function (html) {
                    view.innerHTML = html;
                });

            });

            $('.big-baoqi').show();
            $('.map-sid-close').show();

        }
    });


    /////////over


})

///修改经纬度
$('body').on('click', '.submit-s', function () {
    var projectId = $('.xzgongdi').val();
    var longitude = $('.addjd').val();
    var latitude = $('.addwd').val();

    $.ajax({
        type: "get",
        url: "/setLatitudeAndLongitude?projectId=" + projectId + "&longitude=" + longitude + "&latitude=" + latitude,
        dataType: "json",
        success: function (response) {
            // var data = response.content;
            alert(response.msg)

        }
    });


})


















