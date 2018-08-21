function saveTMPTable() {

    var formArr = [];
    var formData = {};

    for (i = 0; i < tmpVal.length; i++) {
        var id = tmpVal[i].id;

        var formName = $('.name.' + id).val();
        var formAmount = $('.amount.' + id).val();
        var formSalaryPrepaid = $('.salaryPrepaid.' + id).is(':checked');
        var formWithdraw = $('.withdraw.' + id).is(':checked');
        var formIndex = $('.index.' + id).val();

        formData = {id : id, name: formName, amount : formAmount, salaryPrepaid: formSalaryPrepaid, withdraw: formWithdraw, index: formIndex};

        formArr.push(formData);
    }

    console.log(formArr);

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "post",
        url: "/saveTMP",
        dataType : 'json',
        data : JSON.stringify(formArr),
        success: $(document).ajaxStop(function(){
            window.location.reload();
        })
    });

}


function addNewSpend(name, amount, salaryPrepaid, withdraw) {
    var newSpend = {name: name, amount: amount, salaryPrepaid: salaryPrepaid, withdraw: withdraw};
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "post",
        url: "/addNewSpend",
        data : JSON.stringify(newSpend),
        success: $(document).ajaxStop(function(){
            window.location.reload();
        })
    });
}

