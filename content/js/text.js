/**
 * Created by Administrator on 2017/11/11.
 */
var theight = 270; //翻页高度
var sheight = 530;
var subPosNum = 0;
var subPos; //页数
var imgData;
var imgDatalength;//图片数
var imgIndex = 0;//图片序号
var fullpicStat  = 0;//全屏状态 0否1是
document.onirkeypress = grabEvent;
document.onkeydown = grabEvent;
function grabEvent(event){
    var keyval = event.which;
    switch(keyval){
        case 37://left
            changLr(-1);
            return false;
            break;
        case 39://right
            changLr(1);
            return false;
            break;
        case 38://up
            changUP(-1);
            return false;
            break;
        case 40://down
            changUP(1);
            return false;
            break;
        case 27://esc
            return false;
            break;
        case 8://back
            if(fullpicStat==1){
                fullpic();
            }else{
                history.back();
            }
            return false;
            break;
        case 13:
            fullpic();
            return false;
            break;
    }
    return false;
}
function setPos(){
    aHeight = $("#contentb").height();
    subPos = Math.ceil(aHeight/theight);
    subPos = subPos>imgDatalength?subPos:imgDatalength;
    smheight = 1/subPos*sheight;
    ssmheight = 1/subPos*sheight;
    if(subPos<=0&&imgDatalength==1){
        $(".scroll").hide();
        return;
    }
    $(".anchor").height(smheight);
    $("#imgIndex").html((imgIndex+1)+"/"+imgDatalength+"(按确认看大图)");
}
function changUP(num){
    if(fullpicStat==1)return false;
    if((subPosNum+num)>=0&&(subPosNum+num)<subPos){
        subPosNum+=num;
        $(".anchor").css("top",ssmheight*subPosNum);
        $("#contentb").css("top",-theight*subPosNum);
        if((imgIndex+num)<imgData.length&&(imgIndex+num)>=0){
            imgIndex+=num;
            loadImg("#pic>img",1.07);
            $("#imgIndex").html((imgIndex+1)+"/"+imgDatalength+"(按确认看大图)");
        }
    }
}
function loadImg(dom,num){  //处理图片横宽比如何显示的问题
    var obj=new Image();
    obj.src= imgData[imgIndex].src;
    if((obj.width/obj.height)>num){
        $(dom).attr({
            "width":"100%",
            "height":"auto"
        })
    }else{
        $(dom).attr({
            "height":"100%",
            "width":"auto"
        })
    }
    $(dom).attr("src",obj.src);
}
function changLr(num){
    if(fullpicStat==0)return false;
    if((imgIndex+num)>=0&&(imgIndex+num)<imgDatalength){
        imgIndex+=num;
        fullpic(1);
        loadImg("#pic>img",1.07);
    }
}
function fullpic(num){
    var fullpic = $("#full-pic");
    $("#pages").html((imgIndex+1)+"/"+imgDatalength)
    if(num){
        loadImg("#full-pic>img",1.78);
        return false;
    }else{
        loadImg("#full-pic>img",1.78);
        if(fullpicStat==0){
            fullpic.show();
            fullpicStat = 1;
        }else{
            fullpic.hide();
            fullpicStat = 0;
        }
    }
}
$(function(){
    imgData = $("#contentb img");
    imgDatalength = imgData.length;
    if(imgData.length){
        $("#contentb img").remove();
        //$("#pic>img").attr("src",imgData[imgIndex].src);
        loadImg("#pic>img",1.07);
    }else{
        $("#pic").hide();
        $(".content").css("width","1280px");
        $("#contentb").css("width","1160px");
    }
    setPos();
});