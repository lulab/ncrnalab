function change(e){
    var path=$('#hidden').val();
    var strJSON="\"{name:'"+path+"result.json'}\"";
    window.alert(strJSON);
    var obj = eval("("+strJSON+")");
    var list= obj["data"];
    var n=0;
    //substitute each element by ID corresponding to the search ID (Max 10)
    for (var i=0; i<10; i++){
        if (list[i]["ID"]==e){
            n=i;
            break;
        }
    }
    $('#change_add').html("n");

}
