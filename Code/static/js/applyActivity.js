$(document).ready(function(){

    $(window).resize(function() {
        loadingMove();
    })
    var currentCampus="zhuhai";
    var apply={
        zhuhai:{
            limited:{
                desk:'?',
                beachDesk:'?',
                tent:'?'
            },
            available:{
                desk:'?',
                beachDesk:'?',
                tent:'?'
            }
        },
        north:{
            limited:{
                desk:'?',
                beachDesk:'?',
                tent:'?'
            },
            available:{
                desk:'?',
                beachDesk:'?',
                tent:'?'
            }
            
        },
        south:{
            limited:{
                desk:'?',
                beachDesk:'?',
                tent:'?'
            },
            available:{
                desk:'?',
                beachDesk:'?',
                tent:'?'
            }
        },
        east:{
            limited:{
                desk:'?',
                beachDesk:'?',
                tent:'?'
            },
            available:{
                desk:'?',
                beachDesk:'?',
                tent:'?'
            }
        },
    }

    //上传图片的定位
    loadingMove();
    
    //定义input框的所需判断类型
    function inputType(){}

    inputType.prototype.target = new Object();

    inputType.prototype.false = function(){
        this.target.css("border","2px solid rgb(217,79,83)");
    }

    inputType.prototype.true = function(){
        this.target.css("border","2px solid green");
    }

    inputType.prototype.data_number = function(limited){
        var val = this.target.val();
        var temp = number(val).toString();
        if (limited)
            temp = (Number(val) <= limited) && Boolean(temp);
        this[temp]();
        this.target.attr("data-number", String(temp));
        
        return Boolean(temp);
    }

    inputType.prototype.data_text = function(){
        var val = this.target.val();
        var temp = string(val).toString();
        this[temp]();
        this.target.attr("data-text", temp);
        return temp == "true";
    }

    inputType.prototype.data_time = function(){
        var val = this.target.val();
        var temp = time(val).toString();
        this[temp]();
        this.target.attr("data-time", temp);
        return temp == "true";
    }

    inputType.prototype.data_file = function(){
        var val = this.target.val();
        var temp = string(val).toString();
        this[temp]();
        this.target.attr("data-file", temp);
        return temp == "true";
    }

    //活动类型变化
    $(document).on("change","#type",function(){
        var kind = $(this).children("option:checked").val();
        num = false;
        if (kind == "academic") {
            var dom = "";
                dom += '<label for="academicKind" style="display:block">讲座类别</label>'
                dom += '<select name="academicKind" class="form-control" style="width:100%">';
                dom += '<option value="technology">科技类</option>';
                dom += '<option value="culture">人文类</option>';
                dom += '<option value="career">职场类</option>';
                dom += '<option value="internationalCommunication">国际交流类</option>';
                dom += '<option value="newsMedia">新媒体传播类</option>';
                dom += '<option value="other">其他类</option>';
                dom += '</select>';
            $('.welfareTime').html(dom).attr('data-kind','academicKind');
        }
        else if (kind == "publicWelfare" || kind == "welfareSport"){
            var dom = "";
                dom += '<label for="welfareTime">公益时长</label>'
                dom += '<input type="text" id="welfareTime" name="maxTime" placeholder="最长公益时长" class="form-control" data-number="false">';
            $('.welfareTime').html(dom).attr('data-kind','welfareTime');
            
            var target = new inputType();
            target.target = $(".welfareTime input");
            target.target.removeAttr("disabled");
            target.target.attr("data-number","false");
            target.false();
        }
        else if (kind == "unWelfareSport"){
            var dom = "";
                dom += '<label for="unWelfareSportKind" style="display:block">是否有体育盖章</label>'
                dom += '<select name="unWelfareSportKind" class="form-control" style="width:100%">';
                dom += '<option value="no">否</option>';
                dom += '<option value="yes">是</option>';
                dom += '</select>';
            $('.welfareTime').html(dom).attr('data-kind','unWelfareSport');
        }
        else if (kind == "other") {
            var dom = "";
                dom += '<label for="welfareTime">公益时长</label>'
                dom += '<input type="text" id="welfareTime" name="maxTime" placeholder="最长公益时长" class="form-control" data-number="false">';
            $('.welfareTime').html(dom).attr('data-kind','ohter');
            var target = new inputType();
            target.target = $(".welfareTime input");
            target.target.attr("disabled","disabled");
            target.target.attr("data-number","true");
            target.true();
        }
    })

    //学术活动类型变化
    var num = false;
    $(document).on("change",".welfareTime[data-kind='academicKind']", function(){
        var kind = $(this).find('select').children("option:checked").val()
        if (kind == "other") {
            $(this).children("select").css('width','50%');
            var dom = "";
                dom += '<input type="text" id="detailKind" name="detailKind" placeholder="详细类别" class="form-control" data-text="false" style="width:50%">';
            if (!num) {
                $(this).append(dom);
                num = true;
            }
        }
        else if (kind != "other"){
            num = false;
            $(this).children("select").css('width','100%');
            $(this).find("input").remove();
        }
    })

    //体育活动是否有盖章
    $(document).on("change",".welfareTime[data-kind='unWelfareSport']", function(){
        var yesOrNo = $(this).find('select').children("option:checked").val();
        if (yesOrNo == "yes") {
            $(this).children("select").css('width','50%');
            var dom = "";
                dom += '<input type="text" id="gaizhang" name="maxTime" placeholder="个数" class="form-control" data-text="false" style="width:50%">';
            if (!num) {
                $(this).append(dom);
                num = true;
            }
        }
        else if (yesOrNo != "no"){
            num = false;
            $(this).children("select").css('width','100%');
            $(this).find("input").remove();
        }
    })

    //表单判断开始
    var flag = false;
    function panduan(){
        var returnVal = true;
        $("#activityForm input[data-number], #activityForm input[data-text], #activityForm input[data-time], #activityForm input[data-file]").each(function(){
            var target = new inputType();
            target.target = $(this);
            var num = target.target.attr("data-number");
            var text = target.target.attr("data-text");
            var time = target.target.attr("data-time");
            var file = target.target.attr("data-file");
            
            if (num != undefined) {
                if (!Boolean(target.data_number())) returnVal = false;
            }
            else if (text != undefined) {
                if (!Boolean(target.data_text())) returnVal = false;
            }
            else if (time != undefined) {
                if (!Boolean(target.data_time())) returnVal = false;
            }
            else if (file != undefined) {
                if (!Boolean(target.data_file())) returnVal = false;
            }
        })
        return Boolean(returnVal);
    }

    $(document).on("blur","input[data-number]",function(){
        var target = new inputType();
        target.target = $(this);
        var limited,max;
        if(target.target.attr('data-type') == 'numberDesk' ||
            target.target.attr('data-type') == 'numberBeachDesk' ||
            target.target.attr('data-type') == 'numberTent') {
            var inventory = target.target.attr('data-type') == 'numberDesk'?'deskInventory':'beachInventory';
            if (target.target.attr('data-type') == 'numberDesk') {
                inventory = 'deskInventory';
                max = $('.maxDesk').html();
            }
            else if (target.target.attr('data-type') == 'numberBeachDesk') {
                inventory = 'beachDeskInventory';
                max = $('.maxBeachDesk').html();
            }
            else if (target.target.attr('data-type') == 'numberTent') {
                inventory = 'tentInventory';
                max = $('.maxTent').html();
            }
            var number =  Number(target.target.parent().find('.'+inventory).text());
            
            if (!isNaN(number)) {
                limited = number>max?max:number;
            }
            else {
                limited= max;
            }
        }
        target.data_number(limited);
    })

    $(document).on("blur","input[data-text]",function(){
        var target = new inputType();
        target.target = $(this);
        target.data_text();
    })

    $(document).on("blur","input[data-time]",function(){
        var target = new inputType();
        target.target = $(this);
        target.data_time();
    })

    $(document).on("blur","input[data-file]",function(){
        var target = new inputType();
        target.target = $(this);
        target.data_file();
    })

    //tinymec非空判断
    function boolTinymec(){
        var text = tinyMCE.activeEditor.getContent();
        return Boolean(text);
    }
   

    //submit
    $("#submit").click(function(){
        waitStart();
        if (!panduan() || !boolTinymec()) {
            waitStop();
            $(".tip").css("display","block");
            alerts("提交失败！");

            return false;
        }
        
        else{
            if (flag) { 
                alerts("要提交申请请重刷页面！");
                waitStop();
                return false;
            }
            else{
                $(".tip").css("display","none");
                flag = true;
                waitStop();
                alerts("成功提交");
                return true;
            }
        }
    })

    var submissionCount = 0;

    // 增加子申请
    $(".addApply button").click(function(){
        submissionCount += 1;;
        temp += '</div>';
        var temp = '<div class="form-group col-md-12 sonApply" style="display: none">';
        temp += getDomByType('', 'classroom')
        $(this).parent().before(temp);
        addNameToSubmission();
        displaySubmission([1,1,1,1,0,1], submissionCount);
        $(this).parent().prev().slideToggle();
    })
    //删除子申请
    $(document).on("click",".reduceApply",function(){
        var dom = $(this).parent().parent();
        $(this).parent().parent().slideToggle(400, function() {
            dom.remove();
            addNameToSubmission();
            submissionCount -= 1;
        });
    })
    //获取桌椅数量和合法地点
    $(document).on("blur",'.sonApply input[data-time]',function(){
        if ($(this).attr('data-time') == "true") {
            var type = $(this).parents('.sonApply')
                        .find('.mainKind').attr('data-value');
            var which = $(this).attr('data-type');
            if (which == 'start') {
                var next = $(this).next();
                if (next.attr('data-time') == "true") {
                    var start = $(this).val();
                    var end = next.val();
                }
                    
            }
            else if (which == 'end') {
                var prev = $(this).prev();
                if (prev.attr('data-time') == "true") {
                    var start = prev.val();
                    var end = $(this).val();
                }
            }
            if (start && end) {
                if (type != 'chair') {
                    var url = "";
                    url += "/activity/getAvailableLocation/?startTime="+start+":00&endTime="+end+":00&campus="+currentCampus+"&type="+type;
                    getValidLocation($(this), url);
                }
                else {
                    var url = "";
                    url += "/activity/getAvailableNumber/?startTime="+start+":00&endTime="+end+":00&campus="+currentCampus+"&type="+type;
                    getValidNumber($(this), url);
                } 
            }

        }
    })
    function getValidLocation(target,url) {
        var that = target;
        $.getJSON(url,function(data){
            var dom = "";
            if (data == []){
                that.parents('.sonApply').find('.applyLocation > select').html("<option>没有搜到可用场地</option>")
            }  
            else {
                var index = 0;
                var _id,_name;
                for (var i = 0; i < data.length; i++) {
                    var id = data[i]['locationid'];
                    if (id == 0) id = "";
                    if (data[i]['name'] == '宿舍楼下海报'){
                        index = i;
                        _id = data[i]['id'];
                        _name = data[i]['name'];
                    }
                    else
                        dom += '<option name="locationList" type="checkbox" value="'+data[i]['id']+'" >'+data[i]['name']+id+'</option>';

                }
                that.parents('.sonApply').find('.applyLocation > select').html("").append(dom);
                if (index != 0) {
                    _dom = '<option name="locationList" type="checkbox" value="'+_id+'" >'+_name+'</option>';
                    that.parents('.sonApply').find('.applyLocation > select').prepend(_dom)
                }

            }
            // $('.applyLocation > div').html("").append(dom)
        })
    }
    function getValidNumber(target,url) {
        var that = target;
        $.getJSON(url,function(data){

            apply[currentCampus]['available']['desk'] = data['available']['desk'];
            apply[currentCampus]['available']['beachDesk'] = data['available']['beachDesk'];
            apply[currentCampus]['available']['tent'] = data['available']['tent'];
            apply[currentCampus]['limited']['desk'] = Number(data['limit']['desk']) == 0?'库存':data['limit']['desk'];
            apply[currentCampus]['limited']['beachDesk'] = Number(data['limit']['beachDesk']) == 0?'库存':data['limit']['beachDesk'];
            apply[currentCampus]['limited']['tent'] = Number(data['limit']['tent']) == 0?'库存':data['limit']['tent'];
            limitedDesk(currentCampus);
        })
    }
    function limitedDesk(campus){
        $('.maxDesk').html(apply[currentCampus]['available']['desk']);
        $('.maxBeachDesk').html(apply[currentCampus]['available']['beachDesk']);
        $('.maxTent').html(apply[currentCampus]['available']['tent']);
        $('.deskInventory').html(apply[currentCampus]['limited']['desk']);
        $('.beachDeskInventory').html(apply[currentCampus]['limited']['beachDesk']);
        $('.tentInventory').html(apply[currentCampus]['limited']['tent'])
    }

    //子申请项变化
    $(document).on("change",".sonApply .mainKind",function(){
        var temp = $(this).children("option:checked").text();
        var tempTable = '';
        var index = $(this).attr('data-index');
        var campus = $("#campus").children("option:checked").text();
        if (temp == "课室申请") {
            sonApplyChange($(this),getDomByType(tempTable, 'classroom'));
            displaySubmission([1,1,1,1,0,1], index);
            
        }
        else if (temp == "桌椅申请") {
            sonApplyChange($(this),getDomByType(tempTable, 'chair'));
            displaySubmission([1,1,1,1,1,1,1,1], index);
            limitedDesk(campus);
        }
        else if (temp == "宣传品申请") {
            sonApplyChange($(this),getDomByType(tempTable, 'poster'));
            displaySubmission([1,1,1,1,0,1], index);
        }
        else if (temp == "校区场地申请") {
            sonApplyChange($(this),getDomByType(tempTable, 'location'));
            displaySubmission([1,1,1,1,0,1], index);
        }
        else if (temp == "学生活动中心申请") {
            sonApplyChange($(this),getDomByType(tempTable, 'actionCenter'));
            displaySubmission([1,1,1,1,0,1], index);
        }
        else if (temp == "校团委功能室申请") {
            sonApplyChange($(this),getDomByType(tempTable, 'functionRoom'));
            displaySubmission([1,1,1,1,0,1], index);
        }
        upLoadChange();
        addNameToSubmission();
    });
    function upLoadChange(){
        var campus = $("#campus").children("option:checked").text();
        $(".sonApply").each(function(){
            var tmp = $(this).find(".mainKind").children("option:checked").text();
            if (tmp == "课室申请") {
                $(this).find(".newUploadBtn").html("课室申请表上传");
                // if (campus == "珠海校区") {
                //     var dom = "";
                //         dom += '<option selected="selected" value="普通教学楼课室">普通教学楼课室</option>';
                //         dom += '<option value="图书馆地下多功能室">图书馆地下多功能室</option>';
                //         dom += '<option value="F520/519室">F520/519室</option>';
                // }
                // else if (campus == "北校区") {
                //     var dom = "";
                //         dom += '<option selected="selected" value="新教学楼">新教学楼</option>';
                //         dom += '<option value="第一、二、三课室">第一、二、三课室</option>';
                //         dom += '<option value="第七至十三课室">第七至十三课室</option>';
                // }
                // $(this).find(".applyPosition").append(dom);
            }
            else if (tmp == "桌椅申请")
                $(this).find(".newUploadBtn").html("桌椅等物资申请表上传");
            else if (tmp == "宣传品申请") {
                $(this).find(".newUploadBtn").html("宣传品申请表上传");
                // if (campus == "珠海校区") {
                //     var dom = "";
                //         dom += '<option selected="selected" value="田径场横幅(条幅)">田径场横幅(条幅)</option>';
                //         dom += '<option value="荔园球场横幅(条幅)">荔园球场横幅(条幅)</option>';
                //         dom += '<option value="宿舍楼下海报">宿舍楼下海报</option>';
                    
                // }
                // else if (campus == "北校区") {
                //     var dom = "";
                //         dom += '<option selected="selected" value="田径场">田径场</option>';
                //         dom += '<option value="校道两侧">校道两侧</option>';
                //         dom += '<option value="篮球场">篮球场</option>';
                // }
                // $(this).find(".applyPosition").append(dom);
            }
            else if (tmp == "校区场地申请") {
                $(this).find(".newUploadBtn").html("校园场地申请表上传");
                // if (campus == "珠海校区") {
                //     var dom = "";
                //         dom += '<option selected="selected" value="岁月湖饭堂">岁月湖饭堂</option>';
                //         dom += '<option value="榕园饭堂">榕园饭堂</option>';
                //         dom += '<option value="荔园饭堂">荔园饭堂</option>';
                //         dom += '<option value="珠影门口">珠影门口</option>';
                //         dom += '<option value="榕园广场">榕园广场</option>';
                //         dom += '<option value="风雨球场前舞台">风雨球场前舞台</option>';
                //         dom += '<option value="体育馆内">体育馆内</option>';
                //         dom += '<option value="田径场">田径场</option>';
                // }
                // else if (campus == "北校区") {
                //     var dom = "";
                //         dom += '<option selected="selected" value="学一饭堂">学一饭堂</option>';
                //         dom += '<option value="校友会堂">校友会堂</option>';
                //         dom += '<option value="篮球足球场">篮球足球场</option>';
                //         dom += '<option value="体育馆">体育馆</option>';
                // }
                // $(this).find(".applyPosition").append(dom);
            }
            else if (tmp == "学生活动中心申请") {
                $(this).find(".newUploadBtn").html("活动中心申请表上传");
                // if (campus == "珠海校区") {
                //     var dom = "";
                //         dom += '<option selected="selected" value="榕园正厅">榕园正厅</option>';
                //         dom += '<option value="榕园偏厅">榕园偏厅</option>';
                // }
                // else if (campus == "北校区") {
                //     var dom = "";
                //         dom += '<option selected="selected" value="讲学厅">讲学厅</option>';
                //         dom += '<option value="排练厅">排练厅</option>';
                // }
                // $(this).find(".applyPosition").append(dom);
            }
            else if (tmp == "校团委功能室申请") {
                $(this).find(".newUploadBtn").html("校区场地申请表上传");
                // if (campus == "珠海校区") {
                //     var dom = "";
                //         dom += '<option selected="selected" value="榕园4号329会议室">榕园4号329会议室</option>';
                // }
                // else if (campus == "北校区") {
                //     var dom = "";
                //         dom += '<option selected="selected" value="会议室">会议室</option>';
                // }
                // $(this).find(".applyPosition").append(dom);
            }
        })
    }
    function addNameToSubmission() {
        $('.sonApply').each(function(index) {
            $(this).attr('id', 'submission' + (index + 1));
            $(this).find('select').each(function() {
                $(this).attr('name', 'submission-' + (index + 1) + '-' + $(this).attr('data-type'));
                $(this).attr('data-index', (index + 1))
            });
            $(this).find('input').each(function() {
                $(this).attr('name', 'submission-' + (index + 1) + '-' + $(this).attr('data-type'));
            });
        })
    }

    function getDomByType(table, check) {
        var campus = $("#campus").children("option:checked").text();
        var dom = '';
        dom += '<div class="col-md-4">';
        dom += '<select data-type="type" data-value="' + check + '" class="form-control mainKind">';
        if (check == 'classroom') {
            dom += '<option value="classroom" selected="selected">课室申请</option>';
            dom += '<option value="chair">桌椅申请</option>';
            dom += '<option value="poster">宣传品申请</option>';
            dom += '<option value="location">校区场地申请</option>';
            dom += '<option value="actionCenter">学生活动中心申请</option>';
            dom += '<option value="functionRoom">校团委功能室申请</option>';
        }
        else if (check == 'chair') {
            dom += '<option value="classroom" >课室申请</option>';
            dom += '<option value="chair" selected="selected">桌椅申请</option>';
            dom += '<option value="poster">宣传品申请</option>';
            dom += '<option value="location">校区场地申请</option>';
            dom += '<option value="actionCenter">学生活动中心申请</option>';
            dom += '<option value="functionRoom">校团委功能室申请</option>';
        }
        else if (check == 'poster') {
            dom += '<option value="classroom" >课室申请</option>';
            dom += '<option value="chair">桌椅申请</option>';
            dom += '<option value="poster" selected="selected">宣传品申请</option>';
            dom += '<option value="location">校区场地申请</option>';
            dom += '<option value="actionCenter">学生活动中心申请</option>';
            dom += '<option value="functionRoom">校团委功能室申请</option>';
        }
        else if (check == 'location') {
            dom += '<option value="classroom" >课室申请</option>';
            dom += '<option value="chair">桌椅申请</option>';
            dom += '<option value="poster">宣传品申请</option>';
            dom += '<option value="location" selected="selected">校区场地申请</option>';
            dom += '<option value="actionCenter">学生活动中心申请</option>';
            dom += '<option value="functionRoom">校团委功能室申请</option>';
        }
        else if (check == 'actionCenter') {
            dom += '<option value="classroom" >课室申请</option>';
            dom += '<option value="chair">桌椅申请</option>';
            dom += '<option value="poster">宣传品申请</option>';
            dom += '<option value="location">校区场地申请</option>';
            dom += '<option value="actionCenter" selected="selected">学生活动中心申请</option>';
            dom += '<option value="functionRoom">校团委功能室申请</option>';
        }
        else if (check == 'functionRoom') {
            dom += '<option value="classroom" >课室申请</option>';
            dom += '<option value="chair">桌椅申请</option>';
            dom += '<option value="poster">宣传品申请</option>';
            dom += '<option value="location">校区场地申请</option>';
            dom += '<option value="actionCenter">学生活动中心申请</option>';
            dom += '<option value="functionRoom" selected="selected">校团委功能室申请</option>';
        }
        dom += '</select>';
        dom += '</div>';

        dom += '<div style="height:34px">' + table + '</div>';

        dom += '<div class="newSubmission1 newSubmission">';
        dom += '<input data-type="file" type="file" class="originalUpload" style="display:none">';
        dom += '<button type="button" class="btn btn-default newUploadBtn">课室申请表上传</button>'
        dom += '<input type="text" class="form-control newUploadInput sonNewUploadInput" disabled data-file="false">'
        dom += '</div>';

        dom += '<div>';
        dom += '<label>使用时间<span class="necessary">(必填)</span></label>';
        dom += '<input data-type="start" type="text" class="inputCss sUseTime" placeholder="格式:1999-01-01 01:01" data-time="false">到';
        dom += '<input data-type="end" type="text" class="inputCss eUseTime" placeholder="格式:1999-01-01 01:01" data-time="false">';
        dom += '</div>';

        if (check != 'chair') {

            dom += '<div class="applyLocation">';
            dom += '<div class="necessary" style="margin-bottom:12px">请输入开始时间和结束时间以获取能使用的地点</div>'
            dom += '<label>申请地点<span class="necessary">(必填)<br/>(按住Ctrl多选)</span></label>';
            // dom += '<div>请输入开始时间和结束时间以获取能使用的地点</div>'
            dom += '<select data-type="locationList" class="form-control applyPosition" multiple="multiple" style="width:50%;display:inline-block;margin-left:1rem">';
            // if (campus == "珠海校区") {
            //         dom += '<option value="普通教学楼课室">普通教学楼课室</option>';
            //         dom += '<option value="图书馆地下多功能室">图书馆地下多功能室</option>';
            //         dom += '<option value="F520/519室">F520/519室</option>';
            // }
            // else if (campus == "北校区") {
            //         dom += '<option value="新教学楼">新教学楼</option>';
            //         dom += '<option value="第一、二、三课室">第一、二、三课室</option>';
            //         dom += '<option value="第七至十三课室">第七至十三课室</option>';
            // }
            dom += '</select>';
            // dom += '<div class="attention">注意事项</div>';
            dom += '</div>';

            dom += '<div>';
            dom += '<label>申请数量<span class="necessary">(必填)</span></label>';
            dom += '<input data-type="number" type="text" class="inputCss placeOrNum" data-number="false">';
            dom += '</div>';
        } else {
            dom += '<div>';
            dom += '<div class="necessary" style="margin-bottom:12px">请输入开始时间和结束时间以获取数量</div>'
            dom += '<label>桌子数量<span class="necessary">(必填)</span></label>';
            dom += '<input data-type="numberDesk" type="text" class="inputCss placeOrNum" data-number="false" placeholder="数量">';
            dom += '<span class="necessary">库存:<span class="maxDesk">50</span>(最大数量不能超过<b class="deskInventory">'+apply[currentCampus]["limited"]["desk"]+'</b>)</span>'
            dom += '</div>';

            dom += '<div>';
            dom += '<label>沙滩椅数量<span class="necessary">(必填)</span></label>';
            dom += '<input data-type="numberBeachDesk" type="text" class="inputCss placeOrNum" data-number="false" placeholder="数量">';
            dom += '<span class="necessary">库存:<span class="maxBeachDesk">30</span>(最大数量不能超过<b class="beachDeskInventory">'+apply[currentCampus]["limited"]["beachDesk"]+'</b>)</span>'
            dom += '</div>';

            dom += '<div>';
            dom += '<label>帐篷数量<span class="necessary">(必填)</span></label>';
            dom += '<input data-type="numberTent" type="text" class="inputCss placeOrNum" data-number="false" placeholder="数量">';
            dom += '<span class="necessary">库存:<span class="maxTent">30</span>(最大数量不能超过<b class="tentInventory">'+apply[currentCampus]["limited"]["tent"]+'</b>)</span>'
            dom += '</div>';

            dom += '<div>';
            dom += '<label>其他物资<span class="necessary">(必填)</span></label>';
            dom += '<input data-type="other" type="text" class="inputCss placeOrNum" data-text="false" placeholder="物资名字和数量">';
            dom += '</div>';
        }

        dom += '<div>';
        dom += '<button type="button" class="reduceApply btn btn-danger">减少</button>';
        dom += '</div>';

        return dom;
    }

    function displaySubmission(array, index) {
        $('#submission' + index).find('input').each(function(index) {
            if (array[index]) {
                $(this).parent().show();
            } else {
                $(this).parent().hide();
            }
        });
        $('#submission' + index).find('select').each(function() {
            var value = $(this).attr('data-value');
            $(this).find('option').each(function() {
                if ($(this).val() == value) {
                    $(this).attr('selected', 'selected');
                }
            });
        });
    }
    

    //添加附件按钮变更
    $(document).on("click", ".newUploadBtn", function(){
        $(this).prev().click();
    })
    $(document).on("change", ".originalUpload", function(){
        var array = $(this).val().split('\\');
        var length = array.length - 1;
        var txt = array[length];
        $(this).next().next().val(txt);
    })

    //富文本编辑器设置
    $(function() {
    tinymce.init({
        selector: "textarea",
        language: "zh_CN",
        skin: "lightgray",
        plugins: [
            "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker",
            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
            "table contextmenu directionality emoticons template textcolor paste fullpage textcolor"
        ],
    });
    var uploading = false;
    $('#uploadFrame').load(function() {
        if (uploading) {
            $('#uploadMessage').hide().html($(this).contents().find('body').html()).slideDown(500);
            uploading = false;
        };
        $('#uploadMessage>p').each(function(){
            var src = $(this).html();
            tinyMCE.execCommand("mceReplaceContent",false,"<img src='"+src+"' width='250px' >");
        })

        $('#uploadMessage').hide().html("上传成功").slideDown(500);
    });

    $('#uploadPictures').submit(function() {
        $('#uploadMessage').text('上传图片中...');
        uploading = true;
        $("#uploadMessage").css("height","100px");
        // $(".content").css("margin-top",$(".shangChuan").height() + 50);
        
    });
    
    

    var total = 0;
    $('#attach').click(function() {
        total += 1;
        var submission = "";
        submission += '<div class="newSubmissions" display="none">';
        submission += '<input name="attachment-' + total + '-file" type="file" style="display:none" class="originalUpload">';
        submission += '<button type="button" class="btn btn-default newUploadBtn">文件上传</button>';
        submission += '<input type="text" class="form-control newUploadInput sonNewUploadInput inputFile" readonly="readonly" data-file="false" name="attachment-' + total + '-description"></div>';
        // submission += '<input class="form-control inputFile" placeholder="文件描述"  name="attachment-' + total + '-description" type="text"></div>';
        $('.formDownLoad').before(submission);
        $(".newSubmissions").last().slideToggle();
        return false;
    });

    $('#reduce').click(function() {
        total -= 1;
        $('.newSubmissions').last().slideToggle(300, function() {
            $(this).remove();
        });
        return false;
    })

    var a_uploading = false;
    $('#activityForm').submit(function() {
        $('#activityMessage').text('申请提交中...');
        a_uploading = true;
    });

    $('#uploadActivity').load(function() {
        if (a_uploading) {
            $('#activityMessage').html($(this).contents().find('body').html());
        }
    });

    function deskAndChair(){
        $(".deskInventory").html(apply[currentCampus]["desk"]);
        $(".beachDeskInventory").html(apply[currentCampus]["beachDesk"]);
        $(".tentInventory").html(apply[currentCampus]["tent"]);
    }
    $('#campus').change(function() {
        var options = $(this).find('option');
        currentCampus = $(this).children("option:checked").val();
        deskAndChair();
        for (var i = 0; i < options.length; i++) {
            if (options[i].selected) {
                var value = options[i].value;
                $.getJSON('/student/societies/',
                {
                    'campus' : value,
                }, function(data) {
                    if (data['success']) {
                        $('#applyTable').empty();
                        if (data['tables'].length > 0) {
                            for (var j = 0; j < data['tables'].length; j++) {
                                var dom = '<option value="' + data['tables'][j].url + '">' + data['tables'][j].description + '</option>';
                                $('#applyTable').append(dom);
                            }
                        }
                        $('#selectSocieties').empty();
                        if (data['sid'].length > 0) {
                            for (var j = 0; j < data['sid'].length; j++) {
                                var dom = '<option value="' + data['sid'][j].sid + '">' + data['sid'][j].name + '</option>';
                                $('#selectSocieties').append(dom);
                            }
                            $.getJSON('/student/teacher/',
                            {
                                'societiesID' : data['sid'][0].sid,
                            }, function(cdata) {
                                if (cdata['success']) {
                                    $('#selectTeacher').empty();
                                    if (cdata['tno'].length > 0) {
                                        for (var j = 0; j < cdata['tno'].length; j++) {
                                            var dom = '<option value="' + cdata['tno'][j].tno + '">' + 
                                            cdata['tno'][j].name + '</option>';
                                            $('#selectTeacher').append(dom);
                                        }
                                    } else {
                                        $('#selectTeacher').append('<option value="none">社团暂无老师</option>');
                                    }
                                }
                            });
                        } else {
                            $('#selectSocieties').append('<option value="none">校区暂无社团</option>');
                            $('#selectTeacher').append('<option value="none">社团暂无老师</option>');
                        }
                    }
                });
                break;
            }
        }
    });

    $('#selectSocieties').change(function() {
        var options = $(this).find('option');
        for (var i = 0; i < options.length; i++) {
            if (options[i].selected) {
                var value = options[i].value;
                $.getJSON('/student/teacher/',
                {
                    'societiesID' : value,
                }, function(data) {
                    if (data['success']) {
                        $('#selectTeacher').empty();
                        if (data['tno'].length > 0) {
                            for (var j = 0; j < data['tno'].length; j++) {
                                var dom = '<option value="' + data['tno'][j].tno + '">' + data['tno'][j].name + '</option>';
                                $('#selectTeacher').append(dom);
                            }
                        } else {
                            $('#selectTeacher').append('<option value="none">社团暂无老师</option>');
                        }
                    }
                });
                break;
            }
        }
    });

    $('#applyTable').change(function() {
        var options = $(this).find('option');
        for (var i = 0; i < options.length; i++) {
            if (options[i].selected) {
                var value = options[i].value;
                $('#tableUrl').attr('href', value);
                break;
            }
        }
    });
});

    function sonApplyChange(object, string){
        object.parent().parent().html(string);
    }

    optionList = [];
    $('#selectSocieties').ready(function() {
        $('#selectSocieties').find('option').each(function() {
            optionList.push($(this));
        });
    });

    $('#searchSocieties').change(function() {
        var content = $(this).val();
        $('#selectSocieties').empty();
        for (var i = 0; i < optionList.length; i++) {
            var value = optionList[i].text();
            if (value.search(content) !== -1) {
                $('#selectSocieties').append(optionList[i]);
            }
        }
    });

    function clearSelect() {
        $('#selectSocieties').find('option:selected').removeAttr('selected');
    }
});
    function loadingMove(){
        $(".shangChuan").css("position","absolute");
        $(".shangChuan").css("width","64%");
        $(".shangChuan").css("margin-top",$(".contents").height()+$(".shangChuan").height()+50+$(".content h2").height());
        $(".content").css("margin-top", 50);
    }
