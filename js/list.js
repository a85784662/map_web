var LISTTOTAL, projectName = ""
var bigprojectId;//工地ID
$.ajax({
    type: "get",
    url: "/findProjectList?start=1&display=10",
    dataType: "json",
    success: function (response) {

        LISTTOTAL = response.paging.total
        var data = response.content
        var getTpl = document.getElementById('demo-my-li-table').innerHTML
            , view = document.getElementById('my-li-table-view');

        layui.use('laytpl', function () {
            var laytpl = layui.laytpl;
            laytpl(getTpl).render(data, function (html) {
                view.innerHTML = html;
            });

        });


        layui.use(['laypage', 'layer'], function () {
            var laypage = layui.laypage
                , layer = layui.layer;

            //完整功能
            laypage.render({
                elem: 'demo7'
                , count: LISTTOTAL
                , theme: '#3855ff'
                , layout: ['prev', 'page', 'next', 'limit', 'skip']
                , jump: function (obj) {
                    $.ajax({
                        type: "get",
                        url: '/findProjectList?start=' + obj.curr + '&display=10&projectName=' + projectName,
                        dataType: "json",
                        success: function (response) {

                            var data = response.content
                            var getTpl = document.getElementById('demo-my-li-table').innerHTML
                                , view = document.getElementById('my-li-table-view');

                            layui.use('laytpl', function () {
                                var laytpl = layui.laytpl;
                                laytpl(getTpl).render(data, function (html) {
                                    view.innerHTML = html;
                                });

                            });


                        }
                    });



                }
            });

        });


    }
});
//search
$('.list-button').click(function () {
    projectName = $('.list-input').val();
    $.ajax({
        type: "get",
        url: '/findProjectList?start=1&display=10&projectName=' + projectName,
        dataType: "json",
        success: function (response) {
            LISTTOTAL = response.paging.total;
            var data = response.content
            var getTpl = document.getElementById('demo-my-li-table').innerHTML
                , view = document.getElementById('my-li-table-view');

            layui.use('laytpl', function () {
                var laytpl = layui.laytpl;
                laytpl(getTpl).render(data, function (html) {
                    view.innerHTML = html;
                });

            });


            layui.use(['laypage', 'layer'], function () {
                var laypage = layui.laypage
                    , layer = layui.layer;

                //完整功能
                laypage.render({
                    elem: 'demo7'
                    , count: LISTTOTAL
                    , theme: '#3855ff'
                    , layout: ['prev', 'page', 'next', 'limit', 'skip']
                    , jump: function (obj) {
                        $.ajax({
                            type: "get",
                            url: '/findProjectList?start=' + obj.curr + '&display=10&projectName=' + projectName,
                            dataType: "json",
                            success: function (response) {

                                var data = response.content
                                var getTpl = document.getElementById('demo-my-li-table').innerHTML
                                    , view = document.getElementById('my-li-table-view');

                                layui.use('laytpl', function () {
                                    var laytpl = layui.laytpl;
                                    laytpl(getTpl).render(data, function (html) {
                                        view.innerHTML = html;
                                    });

                                });


                            }
                        });



                    }
                });

            });


        }
    });



})



//
$('body').on('click', '.detail-btn', function () {
    var projectid = $(this).attr("projectid");
    bigprojectId = projectid;
    //获取项目详情
    $.ajax({
        type: "get",
        url: "/findProjectInfo?projectId=" + projectid,
        dataType: "json",
        success: function (response) {
            //var data = JSON.parse(response.content);
            var data = response.content
            var getTpl = document.getElementById('demo-map-gdxiangqing').innerHTML
            layui.use('laytpl', function () {
                var laytpl = layui.laytpl;
                laytpl(getTpl).render(data, function (html) {
                    $('body').append(html)
                });

            });

            //获取设备信息统计
    $.ajax({
        type: "get",
        url: "/system/getEquipmentInfo?projectId=" + projectid,
        dataType: "json",
        success: function (response) {
            var getTpl = document.getElementById('gd-online-demo2').innerHTML
                , view = document.getElementById('gd-online-view2');

            layui.use('laytpl', function () {
                var laytpl = layui.laytpl;
                laytpl(getTpl).render(response, function (html) {
                    view.innerHTML = html;
                });

            });

        }
    });

        }
    });
    /////////over
    





});


$('body').on('click', '.j-lxsz', function () {
    if(!bigprojectId){
        alert('没有项目ID');
        return;
    }
    var currentType = $(this).attr('data-type');
    if(currentType=="1"){
        var getTpl = document.getElementById('demo-map-huanjing').innerHTML
    }else if(currentType=="2"){
        var getTpl = document.getElementById('demo-map-taji').innerHTML
    }else if(currentType=="3"){
        var getTpl = document.getElementById('demo-map-shenjiangji').innerHTML
    }

    $.ajax({
            type: "get",
            url: "/system/getEquipmentInfoNew?type="+currentType+"&projectCode="+bigprojectId,
            dataType: "json",
            success: function (response) {
                layui.use('laytpl', function () {
                    var laytpl = layui.laytpl;
                    laytpl(getTpl).render(response, function (html) {
                        $('body').append(html)
                    });

                });

            }
        });

    
})

$('body').on('click', '.alert-close', function () {
    $(this).parents('.alert-mask').remove()
})




























