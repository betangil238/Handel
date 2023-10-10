/*Ocultar container 1 al dar click en un chat individual - Cel view*/
var chat = false;

$("button").click(ocultarContainer()) {
    var  btn =  chat === false ?  true  :  false ;
    btn === true ? $("#containerHiden").hide(): $("showContainer").show();
};