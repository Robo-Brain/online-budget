function addWage(date, amount, salaryPrepaid) {

    if (salaryPrepaid == true || salaryPrepaid =='true') {
        var salaryDate = date;
        var salaryAmount = amount;
        var prepaidDate = null;
        var prepaidAmount = null;
    } else {
        var prepaidDate = date;
        var prepaidAmount = amount;
        var salaryDate = null;
        var salaryAmount = null;
    }

    wageData = JSON.stringify({salaryDate: salaryDate, salary: salaryAmount, prepaidDate: prepaidDate, prepaid: prepaidAmount});

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "post",
        url: "/saveNewSalary",
        dataType : 'json',
        data : wageData,
        success: $(document).ajaxStop(function(){
            window.location.reload();
        })
    })
}