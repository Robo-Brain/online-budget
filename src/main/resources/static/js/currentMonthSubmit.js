function submitMonth() {

    var formArr = [];
    var formData = {};

    for (i = 0; i < curMonth.length; i++) {
        var id = curMonth[i].id;

        var formId = $('.id.' + id).val();
        var spendId = $('.spendId.' + id).val();
        var formAmount = $('.amount.' + id).val();

        formData = {id : formId, spendId: spendId, amount : formAmount};
        formArr.push(formData);
    }


    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "post",
        url: "/saveExistingMonth",
        dataType : 'json',
        data : JSON.stringify(formArr),
        success: $(document).ajaxStop(function(){
            window.location.reload();
        })
    });

}