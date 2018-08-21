$('#actionForm').submit(function(e) {
    e.preventDefault();

    var formArr = [];
    var formData = {};
    var formId;
    var formDate;
    var formSpendId;
    var formAmount;

    $.each(this, function(i, v){
        var input = $(v);

        if (input.attr("name") == 'undefined' || input.attr("name") == undefined){
            console.log('fkin bttn again tryin to get into JSON!');
        } else if(input.attr("id") == 'id') {
            formId = input.val();
        } else if(input.attr("id") == 'spendId') {
            formSpendId = input.val();
        } else if(input.attr("name") == 'amount') {
            formAmount = input.val();
            formData = {id : formId, spendId : formSpendId, amount : formAmount};
            formArr.push(formData);
        }
    });

    console.log(">>> " + JSON.stringify(formArr));

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
});
