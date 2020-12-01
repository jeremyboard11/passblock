$(document).ready(function(){

    var gUrl = "http://192.168.0.103:5000";

    // select first box
    $(".code-box").first().focus();

    updateTries();

    async function checkCode(code){
        $("#message").slideDown(100);
        var response = await $.get(gUrl+"/code/guess", {code: code})
        .done(data => {
            console.log(data);
            $("#message").slideUp(100);

            if(data.win){
                $("#message-res-lose").hide(0);
                $("#message-res-win").html(data.message);
                $("#message-res-win").slideDown(100);
                $("#win-code").html(data.giftcard);
                $("#win-cardnum").slideDown(100);
            }else{
                $("#message-res-win").hide(0);
                $("#message-res-lose").html(data.message);
                $("#message-res-lose").slideDown(100);
                $("#win-cardnum").slideUp(100);
            }

            updateTries();

            return data;
        });
    }

    async function updateTries(){
        var response = await $.get(gUrl+"/code/tries")
        .done(data => {
            $("#tries-count").html(data.tries+" tries so far");
        });
    }

    $("#go").on("click", function(){
        var code = "";
        $(".code-box").each(function(i,b){
            code = code+$(b).val();
        });
        var ready = false;
        if(code.length == $("#code-div").children().length){ready = true}
        if(ready)
        {
            checkCode(code);
        }
    });

    $(".code-box").keyup(function(e){
        var val = $(this).val();
        if(val && val.length == 1){
            $(this).next(".code-box").focus();
        }
        $(this).val(e.key);
    });

});