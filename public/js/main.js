$(document).ready(function(){

    var inDevelopment = 0;

    if(!inDevelopment){
        var gUrl = "https://codecrack.herokuapp.com";
    }else{
        var gUrl = "http://192.168.0.103:5000";
    }

    // select first box
    $(".code-box").first().focus();

    updateTries();

    function sIfy(num){
        if(num > 999){
            return Math.round(num/1000 * 10) / 10+"K";
        }else{
            return num
        }
    }

    async function checkCode(){
        var code = "";
        $(".code-box").each(function(i,b){
            code = code+$(b).val();
        });

        if(code.length == $("#code-div").children().length){ready = true}else{ready = false}
        if(ready)
        {
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
    }

    async function updateTries(){
        var response = await $.get(gUrl+"/code/tries")
        .done(data => {
            $("#tries-count").html(sIfy(data.tries)+" tries so far");
        });
    }

    

    $("#go").on("click", function(){
        checkCode();
    });

    $(".code-box").keyup(function(e){
        var val = $(this).val();
        
        // enter
        if(e.which == 13){
            checkCode();
        }
        
        // backspace
        if(e.which == 8){
            if($(this).val() == ""){
                $(this).prev(".code-box").focus();
            }else{
                $(this).val("");
            }
        }

        // normal characters
        if(e.keyCode >= 48 && e.keyCode <= 90){
            // next box
            if(val && val.length == 1){
                $(this).next(".code-box").focus();
            }
            // set value
            $(this).val(e.key);
        }
    });

});