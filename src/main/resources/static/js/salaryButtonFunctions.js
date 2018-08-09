$(".submit").click(function (e) {
    e.preventDefault();

    var salaryDate = null;
    var salaryAmount = null;
    var prepaidDate = null;
    var prepaidAmount = null;

    if ($('#salaryPrepaid').val() == 'Salary') {
        salaryDate = $('#date').val();
        salaryAmount = $('#amount').val();
    } else if ($('#salaryPrepaid').val() == 'Prepaid') {
        prepaidDate = $('#date').val();
        prepaidAmount = $('#amount').val();
    }

    wageData = JSON.stringify({salaryDate: salaryDate, salary: salaryAmount, prepaidDate: prepaidDate, prepaid: prepaidAmount});
    console.log(wageData);
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
});
