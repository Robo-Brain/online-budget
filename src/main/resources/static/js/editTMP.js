var amount = 0;
var salaryTotal = 0;
var prepaidTotal = 0;

function appendTMPTable() {
    for (i = 0; i < tmpVal.length; i++) {
        amount += parseInt(tmpVal[i].amount);
        $("#tmpTable").append(
            "<div class='divTableRow " + tmpVal[i].id + " " + tmpVal[i].salaryPrepaid + "'>" +
            "<div class='divTableCell name'>" +
            "<input type='text' id='name' name='name' value='" + tmpVal[i].name + "' />" +
            "<input type='hidden' id='id' name='id' value='" + tmpVal[i].id + "' />" +
            "<input type='hidden' id='spendName' name='spendName' value='" + tmpVal[i].name + "' />" +
            "</div>" +
            "<div class='divTableCell amount'><input type='text' id='amount' name='amount' value='" + tmpVal[i].amount + "' autocomplete='off' /> ₽</div>" +
            "<div class='divTableCell salaryPrepaid'>" +
            "<select class='salaryPrepaid" + i +"' id='salaryPrepaid' name='salaryPrepaid" + i +"'>" +
            "<option value='true'>Salary</option>" +
            "<option value='false'>Prepaid</option>" +
            "</select>" +
            "</div>" +
            "<div class='divTableCell withdraw'>" +
            "<select class='withdraw" + i +"' id='withdraw' name='withdraw" + i +"'>" +
            "<option value='true'>Withdraw</option>" +
            "<option value='false'>NOT Withdraw</option>" +
            "</select>" +
            "</div>" +
            "<div class='divTableCell del'><button class='delButton' id='" + tmpVal[i].id + "'>del</button></div>" +
            "</div>");
        $('.salaryPrepaid' + i + ' option[value="' + tmpVal[i].salaryPrepaid +'"]').prop("selected", true);
        $('.withdraw' + i + ' option[value="' + tmpVal[i].withdraw +'"]').prop("selected", true);

        preTotal(tmpVal[i].salaryPrepaid, tmpVal[i].amount);
    }
    $("#tmpTable").append(
        "<div class='divTableRow'>" +
            "<div style='border: none' class='divTableCell'></div>" +
            "<div style='border: inset; background-color: #FFC9BF' class='divTableCell salaryOverload'>" +
                salaryTotal.toLocaleString('ru-RU',{style:'currency', currency:'RUB'}) +
                "<span class='tooltipSalary' title='Costs exceed the last salary!'></span>" +
            "</div>" +
            "<div style='border: none' class='divTableCell'></div>" +
            "<div style='border: none' class='divTableCell'></div>" +
            "<div style='border: none' class='divTableCell'></div>" +
        "</div>" +
        "<div class='divTableRow'>" +
            "<div style='border: none' class='divTableCell'></div>" +
            "<div style='border: inset; background-color: #8CF8FF' class='divTableCell prepaidOverload'>" +
                prepaidTotal.toLocaleString('ru-RU',{style:'currency', currency:'RUB'}) +
                "<span class='tooltipPrepaid' title='Costs exceed the last prepaid!'></span>" +
            "</div>" +
            "<div class='divTableCell finalAmount'> ∑ " +
                amount.toLocaleString('ru-RU',{style:'currency', currency:'RUB'}) +
            "</div>" +
            "<div style='border: none' class='divTableCell'></div>" +
            "<div style='border: none' class='divTableCell'></div>" +
        "</div>"
    );
}

function preTotal(salaryPrepaid, amount) {
    if (salaryPrepaid == true || salaryPrepaid == 'true') {
        salaryTotal +=  parseInt(amount);
    } else {
        prepaidTotal +=  parseInt(amount);
    }
}

function overloadTooltip() {
    salary = (parseInt(lastWage.salary) || 0);
    prepaid = (parseInt(lastWage.prepaid) || 0);
    if (salary <= salaryTotal) {
        $(".salaryOverload").toggleClass("overlimit");
        $(".tooltipSalary").tooltip({
            tooltipClass: "tooltipOverload",
            position: { my: "left-10 center-26", at: "left center" },
            show: {
                delay: 500
            }
        }).tooltip("open");
        $( "body" ).click(function() {
            $( ".tooltipSalary" ).tooltip( "close" );
        });
    } else {

    }
    if ( prepaid <= prepaidTotal) {
        $(".prepaidOverload").toggleClass("overlimit");
        $(".tooltipPrepaid").tooltip({
            tooltipClass: "tooltipOverload",
            position: { my: "left-10 center-24", at: "left center" },
            show: {
                delay: 500
            }
        }).tooltip("open");
        $( "body" ).click(function() {
            $( ".tooltipPrepaid" ).tooltip( "close" );
        });
    } else {

    }
}

function delTMPFunc(i) {
    var id = i;
    $("#dialog-confirm").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Delete items": function() {
                $( this ).dialog( "close" );
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "post",
                    url: "/deleteSpend",
                    data : id,
                    success: $(document).ajaxStop(function(){
                        window.location.reload();
                    })
                });
            },
            Cancel: function() {
                $( this ).dialog( "close" );
                $(this).remove();
            }
        }
    });
}