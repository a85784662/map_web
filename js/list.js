var LISTTOTAL
var projectCode;//项目code
var KQJDETAIL;//考情就详情数组
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
            
        //获取头部统计数据（获取项目考勤统计接口）
        $.ajax({
            type: "get",
            url: "/getStatisticsInfo",
            dataType: "json",
            success: function (response) {
                if(ISADMIN){
                    $('.gd-total-nub').text(response.content.projectSize);
                }
                    $('.kqj-total-nub').text(response.content.attSize)
                
            }
        });
        
    }
});

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
                    var projectName = $('.list-input').val();
                    $.ajax({
                        type: "get",
                        url: '/findProjectList?start=' + obj.curr + '&display='+obj.limit+'&projectName=' + projectName,
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


//
$('body').on('click', '.detail-btn', function () {
    var projectid = $(this).attr("projectid");
    var procode = $(this).attr("procode")
    projectCode = procode;
    //获取项目详情
    $.ajax({
        type: "get",
        url: "/findProjectInfo?projectId=" + projectid,
        dataType: "json",
        success: function (response) {
            //var data = JSON.parse(response.content);
            var data = response.content;
            KQJDETAIL = response.content.attList;
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
        url: "/system/getEquipmentInfo?projectCode=" + procode,
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
    if(!projectCode){
        alert('没有项目code');
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
            url: "/system/getEquipmentInfoNew?type="+currentType+"&projectCode="+projectCode,
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
$('body').on('click', '.alert-close', function () {
    $(this).parents('.alert-mask2').hide()
})


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



$('.xzquyu').change(function (e) {
    currentVal = $(this).val();
    var projectName = $('.list-input').val();
    if(currentVal==='0'){
        if(projectName){

            var currentUrl = "/findProjectList?start=1&display=10&projectName="+projectName;
        }else{
            var currentUrl = "/findProjectList?start=1&display=10"; 
        }
        
    }else{
        if(projectName){

            var currentUrl = "/findProjectList?start=1&display=10&areaId="+currentVal+'&projectName=' + projectName;
        }else{
            var currentUrl = "/findProjectList?start=1&display=10&areaId="+currentVal;
        }
        
    }
        $.ajax({
            type: "get",
            url: currentUrl,
            dataType: "json",
            success: function (response) {
                /* var data = response.content;
                var ele = "";
                for(var i=0;i<data.length;i++){
                    ele += '<option value='+data[i].id+'>'+data[i].name+'</option>'
                }
                $('.xzgongdi').html("");
                $('.xzgongdi').append('<option value="0">选择工地</option>')
                $('.xzgongdi').append(ele) */
                ///////////////
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
                            if(currentVal==='0'){
                                var currentUr2 = '/findProjectList?start=' + obj.curr + '&display='+obj.limit+'&projectName=' + projectName;
                            }else{
                                var currentUr2 = '/findProjectList?start=' + obj.curr + '&display='+obj.limit+'&areaId=' + currentVal+'&projectName=' + projectName;
                            }
                            $.ajax({
                                type: "get",
                                url: currentUr2,
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

                ////////////////
            }
        });
        //$('.xzgongdi').show();
});
/////
//search
$('.list-button').click(function () {
    var  projectName = $('.list-input').val();
    currentVal = $('.xzquyu').val();
    
    if(currentVal==='0'){
        
        if(projectName){
            var currentUrl = "/findProjectList?start=1&display=10&projectName="+projectName;
        }else{
            var currentUrl = "/findProjectList?start=1&display=10";
        }
    }else{
        
        if(projectName){
            var currentUrl = "/findProjectList?start=1&display=10&areaId="+currentVal+'&projectName=' + projectName;
        }else{
            var currentUrl = "/findProjectList?start=1&display=10&areaId="+currentVal;
        }
    }
    $.ajax({
        type: "get",
        url: currentUrl,
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
                        console.log(obj)
                        if(currentVal==='0'){
                            var currentUr2 = '/findProjectList?start=' + obj.curr + '&display='+obj.limit+'&projectName=' + projectName;
                        }else{
                            var currentUr2 = '/findProjectList?start=' + obj.curr + '&display='+obj.limit+'&areaId=' + currentVal+'&projectName=' + projectName;
                        }
                        $.ajax({
                            type: "get",
                            url: currentUr2,
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

//查看考情机详情
$('body').on('click','.jbxx-cnt-item-a',function(){
    var kqjNo = parseInt($(this).attr("data-no"));
    var currentKqjdetail =  KQJDETAIL[kqjNo];
    var getTpl = document.getElementById('demo-map-kqjdetail').innerHTML
        layui.use('laytpl', function () {
            var laytpl = layui.laytpl;
            laytpl(getTpl).render(currentKqjdetail, function (html) {
                $('body').append(html)
            });

        }); 
});

//所有环境监测信息
$('body').on('click','.j-huanjin-a-detail',function(){
    var sourceId = $(this).attr("data-serialno").toString();
    $.ajax({
        type: "get",
        url: "/system/getEnvironmentByProject?projectCode="+projectCode+"&sourceId="+sourceId,
        dataType: "json",
        success: function (response) {
            var data = response.content;
            if(data.length>0){
                $('.alert-mask2').show();
            }else{
                alert(暂时没有数据)
                return
            }
            var getTpl = document.getElementById('demo-huanjing-detail').innerHTML
            var totalPages = response.totalPages
            ////////////

            layui.use(['laypage', 'layer','laytpl'], function () {
                var laytpl = layui.laytpl;
                laytpl(getTpl).render(data,function (html) {
                    $('.alert-wrap-view').html(html)
                });
                //
                var laypage = layui.laypage
                    , layer = layui.layer;
                    laypage.render({
                        elem: 'demo9'
                        , count: totalPages
                        , theme: '#3855ff'
                        , layout: ['prev', 'page', 'next', 'skip']
                        , jump: function (obj) {
                                $.ajax({
                                    type: "get",
                                    url: "/system/getEnvironmentByProject?projectCode="+projectCode+"&sourceId="+sourceId+"&page="+obj.curr,
                                    dataType: "json",
                                    success: function (response) {
            
                                        var data = response.content;
                                        var getTpl = document.getElementById('demo-huanjing-detail').innerHTML
                                        layui.use('laytpl', function () {
                                            var laytpl = layui.laytpl;
                                            laytpl(getTpl).render(data,function (html) {
                                                $('.alert-wrap-view').html(html)
                                            });
                                
                                        }); 
                                    }
                                });
                            
                            
                        }
                    });

            });
            ////
        }
    });

});


//所有塔机监测信息
$('body').on('click','.j-taji-a-detail',function(){
    var sourceId = $(this).attr("data-serialno")
    $.ajax({
        type: "get",
        url: "/system/getCraneByProject?projectCode="+projectCode+"&sourceId="+sourceId,
        dataType: "json",
        success: function (response) {
            var data = response.content;
            if(data.length>0){
                $('.alert-mask2').show();
            }else{
                alert(暂时没有数据)
                return
            }
            var getTpl = document.getElementById('demo-taji-detail').innerHTML
            var totalPages = response.totalPages
            ////////////

            layui.use(['laypage', 'layer','laytpl'], function () {
                var laytpl = layui.laytpl;
                laytpl(getTpl).render(data,function (html) {
                    $('.alert-wrap-view').html(html)
                });
                //
                var laypage = layui.laypage
                    , layer = layui.layer;
                    laypage.render({
                        elem: 'demo9'
                        , count: totalPages
                        , theme: '#3855ff'
                        , layout: ['prev', 'page', 'next', 'skip']
                        , jump: function (obj) {
                                $.ajax({
                                    type: "get",
                                    url: "/system/getCraneByProject?projectCode="+projectCode+"&sourceId="+sourceId+"&page="+obj.curr,
                                    dataType: "json",
                                    success: function (response) {
            
                                        var data = response.content;
                                        var getTpl = document.getElementById('demo-taji-detail').innerHTML
                                        layui.use('laytpl', function () {
                                            var laytpl = layui.laytpl;
                                            laytpl(getTpl).render(data,function (html) {
                                                $('.alert-wrap-view').html(html)
                                            });
                                
                                        }); 
                                    }
                                });
                            
                            
                        }
                    });

            });

            /////////////

        }
    });

});

//所有升降机监测信息
$('body').on('click','.j-shengjiangji-a-detail',function(){
    var sourceId = $(this).attr("data-serialno").toString();
    $.ajax({
        type: "get",
        url: "/system/getElevatorByProject?projectCode="+projectCode+"&sourceId="+sourceId,
        dataType: "json",
        success: function (response) {
            var data = response.content;
            if(data.length>0){
                $('.alert-mask2').show();
            }else{
                alert(暂时没有数据)
                return
            }
            var getTpl = document.getElementById('demo-shengjiangji-detail').innerHTML
            var totalPages = response.totalPages
            ///////
            layui.use(['laypage', 'layer','laytpl'], function () {
                var laytpl = layui.laytpl;
                laytpl(getTpl).render(data,function (html) {
                    $('.alert-wrap-view').html(html)
                });
                //
                var laypage = layui.laypage
                    , layer = layui.layer;
                    laypage.render({
                        elem: 'demo9'
                        , count: totalPages
                        , theme: '#3855ff'
                        , layout: ['prev', 'page', 'next', 'skip']
                        , jump: function (obj) {
                                $.ajax({
                                    type: "get",
                                    url: "/system/getElevatorByProject?projectCode="+projectCode+"&sourceId="+sourceId+"&page="+obj.curr,
                                    dataType: "json",
                                    success: function (response) {
            
                                        var data = response.content;
                                        var getTpl = document.getElementById('demo-shengjiangji-detail').innerHTML
                                        layui.use('laytpl', function () {
                                            var laytpl = layui.laytpl;
                                            laytpl(getTpl).render(data,function (html) {
                                                $('.alert-wrap-view').html(html)
                                            });
                                
                                        }); 
                                    }
                                });
                            
                            
                        }
                    });

            });

            /////////////

        }
    });

});





















