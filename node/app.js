var express=require('express');

var bodyparser=require('body-parser');

var fs=require('fs')

var app=express();

app.use(express.static('wwwroot'));

app.use(bodyparser.urlencoded({extended:true}))

app.post('/register',function(req,res){
    console.log(req.body);
    var str={
        user:req.body.user,
        psw:req.body.psw,
        gender:req.body.gender,
        yx:req.body.yx,
        type:req.body.type
    }
    // 判断存储信息的文件是否存在
    fs.exists('./message',function(exist){
        if(!exist){
            fs.mkdir('./message',function(err){
                if(!err){
                    fs.appendFile('./message/user',JSON.stringify(str)+',',function(err){
                        if(!err){
                            res.send({message:'注册成功'})
                        }else{
                            res.send({message:'注册失败'})
                        }
                    })
                }else{
                    res.send({message:'创建文件失败'})
                }
            })
        }else{
                  fs.appendFile('./message/user',JSON.stringify(str)+',',function(err){
                        if(!err){
                            res.send({message:'注册成功'})
                        }else{
                            res.send({message:'信息存储失败'})
                        }
                    })
        }
    })

    // 不存在创建文件 添加

    // 存在，直接添加


    // ===============================================================
})

app.post('/login',function(req,res){
    console.log(req.body)
    // 读取文件夹信息 存在
     fs.exists('./message/user',function(exist){
         if(exist){
            fs.readFile('./message/user','utf8',function(err,data){
                if(!err){
                    data=data.slice(0,-1);
                    data='['+data+']';
                    data=JSON.parse(data)
                    for(var i=0;i<data.length;i++){
                        var v=data[i];
                        console.log(v.user)
                        if(v.user==req.body.user){
                            if(v.psw==req.body.psw){
                                res.send({message:'登录成功'})
                                return;
                            }else{
                                res.send({message:'密码错误'});
                                return;
                            }
                        }
                    }
                    console.log('1')
                    res.send({message:'帐号不存在'})
                }else{
                    res.send({message:'读取文件失败'})
                }
            })

         }else{
             res.send({message:'帐号不存在'})
         }
     })


    // 不存在 则帐号不存在
})
app.listen(3000,function(){
    console.log('连接服务器成功')
})