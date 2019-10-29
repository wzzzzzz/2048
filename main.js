var num=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var score=0;
var touchx=0;
var touchy=0;

var init=function(){
    gethighscore();
    //console.log(localStorage.highscore);
    if(localStorage.getItem("highscore")){
        document.getElementById("highscore").innerHTML="highest score:"+localStorage.highscore;
    }
    else {
        localStorage.setItem("highscore",0);
        document.getElementById("highscore").innerHTML="highest score:0";
    }

    var ele=document.getElementById("opps");
    ele.style.display="none";
    //初始化，随机两个位置出现2
    score=0;
    console.log("new game");
    for(var i=0;i<4;i++){
        for(j=0;j<4;j++){
            num[4*i+j]=0;
            var classname="n"+i+j;
            var ele=document.getElementsByClassName(classname)[0];
            ele.id="color0";
        }
    }
    //这里有问题，可能会重叠
    var n1=Math.floor(Math.random()*16);
    var n2=Math.floor(Math.random()*16);
    while(n2==n1){
        n2=Math.floor(Math.random()*16);
    }
    num[n1]=2;
    num[n2]=2;
    show();
};
document.getElementById("but").onclick=init;

var gethighscore=function(){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function()
    {
        if (xhr.readyState==4 && xhr.status==200)
        {
            xmlDoc=xhr.responseText;
        }
    }
    xhr.open("GET","score.txt",true);
    xhr.send();
}

var sendhighscore=function(score){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function()
    {
        if (xhr.readyState==4 && xhr.status==200)
        {
            xmlDoc=xhr.responseText;
        }
    }
    xmlhttp.open("POST","score.txt",true);
    xmlhttp.send(score);
}

var checklose=function(){
    //检查游戏是否输掉
    for(var i=0;i<4;i++){
        for(j=0;j<4;j++){
            if(num[4*i+j]==0){
                return;
            }
            if(i<3&&num[4*(i+1)+j]==num[4*i+j]){
                return;
            }
            if(i>0&&num[4*(i-1)+j]==num[4*i+j]){
                return;
            }
            if(j<3&&num[4*i+j+1]==num[4*i+j]){
                return;
            }
            if(j>0&&num[4*i+j-1]==num[4*i+j]){
                return;
            }
        }
    }
    //输了
    lose();
};

var keyevent=function(event){
    var code=event.keyCode||event.which;
    if(code==37||code==65){
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble=true;
        console.log("左");
        left();
    }
    if(code==38||code==87){
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble=true;
        console.log("上");
        up();
    }
    if(code==39||code==68){
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble=true;
        console.log("右");
        right();
    }
    if(code==40||code==83){
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble=true;
        console.log("下");
        down();
    }
};
//这里还是有问题，滑动切换页面禁止不了。qq和uc浏览器不可以，猎豹和火狐和chrome可以。
var touchevent=function(event){
        switch(event.type){
            case "touchstart":{
                touchx=event.touches[0].pageX;
                touchy=event.touches[0].pageY;
                //event.preventDefault();
                //document.getElementById("test0").innerHTML=touchx+" "+touchy;
                break;
            } 
            case "touchend":{
                var tx=event.changedTouches[0].pageX;
                var ty=event.changedTouches[0].pageY;
                //event.preventDefault();
                var xy=(tx-touchx)/(ty-touchy);
                if(tx-touchx>10&&(xy>=1||xy<-1)){
                    //document.getElementById("test2").innerHTML=tx+"右"+ty;
                    right();
                }
                else if(tx-touchx<-10&&(xy<-1||xy>1)){
                    //document.getElementById("test2").innerHTML=tx+"左"+ty;
                    left();
                }
                else if(ty-touchy>10&&(xy>=-1&&xy<1)){
                    //document.getElementById("test2").innerHTML=tx+"下"+ty;
                    down();
                }
                else if(ty-touchy<-10&&(xy>=-1&&xy<1)){
                    //document.getElementById("test2").innerHTML=tx+"上"+ty;
                    up();
                }
                break;
            }
            case "touchmove":{
                console.log(event.type);
                event.preventDefault();
                event.stopPropagation();
                event.cancelBubble=true;
                return false;
                console.log(event.type);
            }
        }
};

var body=document.getElementsByTagName("body")[0];
document.addEventListener("keydown",keyevent);

body.addEventListener("touchstart",touchevent,true);
body.addEventListener("touchend",touchevent,true);
body.addEventListener("touchmove",touchevent,true);
document.addEventListener("touchstart",touchevent,true);
document.addEventListener("touchend",touchevent,true);
document.addEventListener("touchmove",touchevent,true);
window.addEventListener("touchstart",touchevent,true);
window.addEventListener("touchend",touchevent,true);
window.addEventListener("touchmove",touchevent,true);


var up=function(){
    var flag=false;
    //键盘上，每一列往上移，并向上加，加的时候检查，检查完渲染
    for(var j=0;j<4;j++){
        for(var i=0;i<4;i++){
            if(num[4*i+j]==0){
                for(var k=i;k<4;k++){
                    if(num[4*k+j]!=0){
                        num[4*i+j]=num[4*k+j];
                        num[4*k+j]=0;
                        flag=true;
                        break;
                    }
                }
            }
        }
        for(var i=0;i<4;i++){
            if(num[4*i+j]!=0 && i<3 && num[4*(i+1)+j]==num[4*i+j]){
                num[4*(i+1)+j]*=2;
                num[4*i+j]=0;
                score+=num[4*(i+1)+j];
                flag=true;
            }
        }
        for(var i=0;i<4;i++){
            if(num[4*i+j]==0){
                for(k=i;k<4;k++){
                    if(num[4*k+j]!=0){
                        num[4*i+j]=num[4*k+j];
                        num[4*k+j]=0;
                        flag=true;
                        break;
                    }
                }
            }
        }
    }
    if(flag==true){
        add();
    }
    show();
};
var down=function(){
    var flag=false;
    //键盘下，每一列往下移，并向下加，加的时候检查，检查完渲染
    for(var j=0;j<4;j++){
        for(var i=3;i>=0;i--){
            if(num[4*i+j]==0){
                for(var k=i;k>=0;k--){
                    if(num[4*k+j]!=0){
                        num[4*i+j]=num[4*k+j];
                        num[4*k+j]=0;
                        flag=true;
                        break;
                    }
                }
            }
        }
        //从下往上加
        for(var i=3;i>=0;i--){
            if(num[4*i+j]!=0 && i>0 && num[4*(i-1)+j]==num[4*i+j]){
                num[4*i+j]*=2;
                num[4*(i-1)+j]=0;
                score+=num[4*i+j];
                flag=true;
            }
        }
        for(var i=3;i>=0;i--){
            if(num[4*i+j]==0){
                for(var k=i;k>=0;k--){
                    if(num[4*k+j]!=0){
                        num[4*i+j]=num[4*k+j];
                        num[4*k+j]=0;
                        flag=true;
                        break;
                    }
                }
            }
        }
    }
    if(flag==true){
        add();
    }
    show();
};
var left=function(){
    var flag=false;
    //键盘左，每一行左移，并向左加，加的时候检查，检查完渲染
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(num[4*i+j]==0){
                for(var k=j;k<4;k++){
                    if(num[4*i+k]!=0){
                        num[4*i+j]=num[4*i+k];
                        num[4*i+k]=0;
                        flag=true;
                        break;
                    }
                }
            }
        }
        for(var j=0;j<4;j++){
            if(num[4*i+j]!=0 && j<3 && num[4*i+j+1]==num[4*i+j]){
                num[4*i+j+1]*=2;
                num[4*i+j]=0;
                score+=num[4*i+j+1];
                flag=true;
            }
        }
        for(var j=0;j<4;j++){
            if(num[4*i+j]==0){
                for(var k=j;k<4;k++){
                    if(num[4*i+k]!=0){
                        num[4*i+j]=num[4*i+k];
                        num[4*i+k]=0;
                        flag=true;
                        break;
                    }
                }
            }
        }
    }
    if(flag==true){
        add();
    }
    show();
};
//偶然出现了一次加了两步的情况？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
var right=function(){
    var flag=false;
    //键盘右，每一行右移，并向右加，加的时候检查，检查完渲染
    for(var i=0;i<4;i++){
        for(var j=3;j>=0;j--){
            if(num[4*i+j]==0){
                for(var k=j;k>=0;k--){
                    if(num[4*i+k]!=0){
                        num[4*i+j]=num[4*i+k];
                        num[4*i+k]=0;
                        flag=true;
                        break;
                    }
                }
            }
        }
        for(var j=3;j>0;j--){
            if(num[4*i+j]!=0 && j>0 && num[4*i+j-1]==num[4*i+j]){
                num[4*i+j-1]*=2;
                num[4*i+j]=0;
                score+=num[4*i+j-1];
                flag=true;
            }
        }
        for(var j=3;j>=0;j--){
            if(num[4*i+j]==0){
                for(var k=j;k>=0;k--){
                    if(num[4*i+k]!=0){
                        num[4*i+j]=num[4*i+k];
                        num[4*i+k]=0;
                        flag=true;
                        break;
                    }
                }
            }
        }
    }
    if(flag==true){
        add();
    }
    show();
};

//每一步都增加一个新的数字
var add=function(){
    var blank=0;
    for(var i=0;i<16;i++){
        if(num[i]==0){
            blank++;
        }
    }
    var rand=Math.ceil(Math.random()*blank);
    for(i=0;i<16;i++){
        if(num[i]==0){
            rand--;
            if(rand==0){
                num[i]=2;
                break;
            }
        }
    }
};

var show=function(){
    //更新渲染
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var str="color"+num[4*i+j];
            var classname="n"+i+j;
            var ele=document.getElementsByClassName(classname)[0];
            ele.id=str;
            ele.innerHTML=num[4*i+j];
            if(num[4*i+j]==2048){
                win();
            }
        }
    }
    document.getElementById("score").innerHTML="score:"+score;
    checklose();
};

var win=function(){
    sendhighscore();
    var ele=document.getElementById("opps");
    ele.style.display="block";
    ele.innerHTML="you win!";
};

var lose=function(){
    sendhighscore();
    var ele=document.getElementById("opps")
    ele.style.display="block";
    ele.innerHTML="you lose!";
};