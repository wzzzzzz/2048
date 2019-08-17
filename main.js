var num=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var score=0;

var init=function(){
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
    console.log(n1);
    console.log(n2);
    show();
};
document.getElementById("but").onclick=init;

var checklose=function(){
    //检查游戏是否输掉
    for(var i=0;i<4;i++){
        for(j=0;j<4;j++){
            if(num[4*i+j]==0){
                return;
            }
            if(i<3&&num[i+1][j]==num[i][j]){
                return;
            }
            if(i>0&&num[i-1][j]==num[i][j]){
                return;
            }
            if(j<3&&num[i][j+1]==num[i][j]){
                return;
            }
            if(j>0&&num[i][j-1]==num[i][j]){
                return;
            }
        }
    }
    //输了
    lose();
};

var keyevent=function(){
    var code=event.which || event.keyCode;
    if(code==37||code==65){
        console.log("左");
        left();
    }
    if(code==38||code==87){
        console.log("上");
        up();
    }
    if(code==39||code==68){
        console.log("右");
        right();
    }
    if(code==40||code==83){
        console.log("下");
        down();
    }
};
//为啥这里一定要放到后面？不是声明提前吗？？？？？？？？？？？？？？？？？？？？？
var body=document.getElementsByTagName("body")[0];
document.addEventListener("keyup",keyevent);

var up=function(){
    //键盘上，每一列往上移，并向上加，加的时候检查，检查完渲染
    for(var j=0;j<4;j++){
        for(var i=0;i<4;i++){
            if(num[4*i+j]==0){
                for(var k=i;k<4;k++){
                    if(num[4*k+j]!=0){
                        num[4*i+j]=num[4*k+j];
                        num[4*k+j]=0;
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
            }
        }
        for(var i=0;i<4;i++){
            if(num[4*i+j]==0){
                for(k=i;k<4;k++){
                    if(num[4*k+j]!=0){
                        num[4*i+j]=num[4*k+j];
                        num[4*k+j]=0;
                        break;
                    }
                }
            }
        }
    }
    console.log(num);
    add();
    show();
};
var down=function(){
    //键盘下，每一列往下移，并向下加，加的时候检查，检查完渲染
    for(var j=0;j<4;j++){
        for(var i=3;i>=0;i--){
            if(num[4*i+j]==0){
                for(var k=i;k>=0;k--){
                    if(num[4*k+j]!=0){
                        num[4*i+j]=num[4*k+j];
                        num[4*k+j]=0;
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
            }
        }
        for(var i=3;i>=0;i--){
            if(num[4*i+j]==0){
                for(var k=i;k>=0;k--){
                    if(num[4*k+j]!=0){
                        num[4*i+j]=num[4*k+j];
                        num[4*k+j]=0;
                        break;
                    }
                }
            }
        }
    }
    console.log(num);
    add();
    show();
};
var left=function(){
    //键盘左，每一行左移，并向左加，加的时候检查，检查完渲染
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(num[4*i+j]==0){
                for(var k=j;k<4;k++){
                    if(num[4*i+k]!=0){
                        num[4*i+j]=num[4*i+k];
                        num[4*i+k]=0;
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
            }
        }
        for(var j=0;j<4;j++){
            if(num[4*i+j]==0){
                for(var k=j;k<4;k++){
                    if(num[4*i+k]!=0){
                        num[4*i+j]=num[4*i+k];
                        num[4*i+k]=0;
                        break;
                    }
                }
            }
        }
    }
    console.log(num);
    add();
    show();
};
var right=function(){
    //键盘右，每一行右移，并向右加，加的时候检查，检查完渲染
    for(var i=0;i<4;i++){
        for(var j=3;j>=0;j--){
            if(num[4*i+j]==0){
                for(var k=j;k>=0;k--){
                    if(num[4*i+k]!=0){
                        num[4*i+j]=num[4*i+k];
                        num[4*i+k]=0;
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
            }
        }
        for(var j=3;j>=0;j--){
            if(num[4*i+j]==0){
                for(var k=j;k>=0;k--){
                    if(num[4*i+k]!=0){
                        num[4*i+j]=num[4*i+k];
                        num[4*i+k]=0;
                        break;
                    }
                }
            }
        }
    }
    console.log(num);
    add();
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
                //这里有问题，不知道能不能生成更大的数还是只能生成2？？？？？？？？？？？？？？？？？？？？？
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
    var ele=document.getElementById("opps");
    ele.style.display="block";
    ele.innerHTML="you win!";
};

var lose=function(){
    var ele=document.getElementById("opps")
    ele.style.display="block";
    ele.innerHTML="you lose!";
};
