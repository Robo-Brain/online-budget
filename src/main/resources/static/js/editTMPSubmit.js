$('#tmpForm').submit(function(e) {
    e.preventDefault();
    var formArr = [];
    var formData = {};
    var formId;
    var formSpendId;
    var formAmount;
    var formName;
    var formSalaryPrepaid;
    var formWithdraw;

    $.each(this, function(i, v){
        var input = $(v);

        if (input.attr("name") == 'undefined' || input.attr("name") == undefined){
            console.log('fkin bttn again tryin to get into JSON!');
        } else if(input.attr("name") == 'id') {
            formId = input.val();
        } else if(input.attr("name") == 'spendId') {
            formSpendId = input.val();
        } else if(input.attr("name") == 'amount') {
            formAmount = input.val();
        } else if(input.attr("name") == 'name') {
            formName = input.val();
        }else if(input.attr("id") == 'salaryPrepaid') {
            formSalaryPrepaid = $(this).is(':checked');
        }else if(input.attr("id") == 'withdraw') {
            formWithdraw = $(this).is(':checked');
            formData = {id : formId, name: formName, amount : formAmount, salaryPrepaid: formSalaryPrepaid, withdraw: formWithdraw};
            formArr.push(formData);
        }
    });

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
    })
});

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

