function saveTMPTable() {

    var formArr = [];
    var formData = {};

    for (i = 0; i < tmpVal.length; i++) {
        var id = tmpVal[i].id;

        var formName = $('.tmp.name.' + id).val();
        var formAmount = $('.tmp.amount.' + id).val();
        var formSalaryPrepaid = $('.tmp.salaryPrepaid.' + id).is(':checked');
        var formWithdraw = $('.tmp.withdraw.' + id).is(':checked');
        var formIndex = $('.tmp.index.' + id).val();

        formData = {id : id, name: formName, amount : formAmount, salaryPrepaid: formSalaryPrepaid, withdraw: formWithdraw, index: formIndex};

        formArr.push(formData);
    }

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


function addNewSpend(name, amount, salaryPrepaid, withdraw, applyToCurrentMonth) {
    var newSpend = {name: name, amount: amount, salaryPrepaid: salaryPrepaid, withdraw: withdraw, applyToCurrentMonth: applyToCurrentMonth};
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

