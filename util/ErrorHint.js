
const ErrorHint = {
    argsfail: {errcode:10001,messag:"参数不正确请重新输入"}
    ,delsucc: {errcode:0,message:"删除成功"}
    ,delfail: {errcode:10002,message:"错误异常请检查后再尝试"}
    ,exception: {errcode:10003,message:"服务器繁忙，请稍后再试"}
    ,notfound:{errcode:10004,message:"url请求错误请检查后再尝试"}
    ,addsucc: {errcode:0,message:'添加成功'}
    ,addfail:{errcode:10005,message:'添加失败请检查后再尝试'}
    ,getsucc: {errcode:0,message:'获取成功'}
    ,getfail:{errcode:10006,message:'获取失败请检查后再尝试'}
    ,updsucc: {errcode:0,message:'编辑成功'}
    ,updfail:{errcode:10007,message:'编辑失败请检查后再尝试'}
}

module.exports = ErrorHint;