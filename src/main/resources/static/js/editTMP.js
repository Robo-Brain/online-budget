var amount = 0;
var salaryTotal = 0;
var prepaidTotal = 0;

var tmpVal = [{}];

function appendTMPTable() {

    tmpVal = tmp.slice(0);
    tmpVal.sort(function(a,b) {
        return a.index - b.index;
    });

    for (i = 0; i < tmpVal.length; i++) {

        amount += parseInt(tmpVal[i].amount);

        $("#tmpTable").append(
            "<div id='" + tmpVal[i].id + "' class='divTableRow " + tmpVal[i].id + " " + tmpVal[i].salaryPrepaid + " tmp'>" +
                "<div class='divTableCell left name'>" +
                    "<input type='text' class='name " + tmpVal[i].salaryPrepaid + ' ' + tmpVal[i].id +"' id='name' name='name' value='" + tmpVal[i].name + "' />" +
                    "<input type='hidden' id='id' name='id' value='" + tmpVal[i].id + "' />" +
                    "<input type='hidden' id='spendName' name='spendName' value='" + tmpVal[i].name + "' />" +
                    "<input type='hidden' class='index " + tmpVal[i].id + "' id='indexEntry' name='indexEntry' value='" + tmpVal[i].index + "' />" +
                "</div>" +
                "<div class='divTableCell amount'>" +
                    "<span class='hiddenMobileLabels'>Amount: <br /></span><input type='text' class='amount " + tmpVal[i].id + "' id='amount' name='amount' value='" + tmpVal[i].amount + "' autocomplete='off' /> ₽" +
                "</div>" +
                "<div class='divTableCell switcher'>" +
                    "<span class='hiddenMobileLabels'>Salary: <br /></span>" +
                    "<label class='switch'>" +
                        "<input type='checkbox' id='salaryPrepaid' class='salaryPrepaid " + tmpVal[i].salaryPrepaid + ' ' + tmpVal[i].id + "' name='salaryPrepaid" + tmpVal[i].id +"' />" +
                        "<span class='slider salaryPrepaid'></span>" +
                    "</label>" +
                "</div>" +
                "<div class='divTableCell withdraw switcher'>" +
                    "<span class='hiddenMobileLabels'>Withdraw: <br /></span>" +
                    "<label class='switch'>" +
                        "<input type='checkbox' id='withdraw' class='withdraw " + tmpVal[i].withdraw + ' ' + tmpVal[i].id + "' name='withdraw" + tmpVal[i].id +"' />" +
                        "<span class='slider'></span>" +
                    "</label>" +
                "</div>" +
                "<div class='divTableCell del'>" +
                    "<button class='delButton' id='" + tmpVal[i].id + "'>del</button>" +
                "</div>" +
                "<div class='swipeDelete "+ tmpVal[i].id + "' id='"+ tmpVal[i].id + "'><span>Delete?</span></div>" +
            "</div>");

        $('.salaryPrepaid.true').prop('checked', true);
        $('.salaryPrepaid.false').prop('unchecked', false);
        $('.withdraw.true').prop('checked', true);
        $('.withdraw.false').prop('unchecked', false);

        preTotal(tmpVal[i].salaryPrepaid, tmpVal[i].amount);
    }
    $("#tmpAmount").append(
        "<div class='divTableRow result'>" +
            "<div class='divTableCell nope'></div>" +
            "<div class='divTableCell salaryOverload'>" +
                salaryTotal.toLocaleString('ru-RU',{style:'currency', currency:'RUB'}) +
                "<span class='tooltipSalary' title='Costs exceed the last salary!'></span>" +
            "</div>" +
            "<div class='divTableCell nope'></div>" +
            "<div class='divTableCell nope'></div>" +
            "<div class='divTableCell nope'></div>" +
        "</div>" +
        "<div class='divTableRow result'>" +
            "<div class='divTableCell nope'></div>" +
            "<div class='divTableCell prepaidOverload'>" +
                prepaidTotal.toLocaleString('ru-RU',{style:'currency', currency:'RUB'}) +
                "<span class='tooltipPrepaid' title='Costs exceed the last prepaid!'></span>" +
            "</div>" +
            "<div class='divTableCell finalAmount'> ∑ " +
                amount.toLocaleString('ru-RU',{style:'currency', currency:'RUB'}) +
            "</div>" +
            "<div class='divTableCell nope'>" +
            "<div class='divTableCell nope'>" +
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
        // $(".tooltipSalary").tooltip({
        //     tooltipClass: "tooltipOverload",
        //     position: { my: "left-10 center-26", at: "left center" },
        //     show: {
        //         delay: 500
        //     }
        // }).tooltip("open");
        // $( "body" ).click(function() {
        //     $( ".tooltipSalary" ).tooltip( "close" );
        // });
    } else {}
    if ( prepaid <= prepaidTotal) {
        $(".prepaidOverload").toggleClass("overlimit");
        // $(".tooltipPrepaid").tooltip({
        //     tooltipClass: "tooltipOverload",
        //     position: { my: "left-10 center-24", at: "left center" },
        //     show: {
        //         delay: 500
        //     }
        // }).tooltip("open");
        // $( "body" ).click(function() {
        //     $( ".tooltipPrepaid" ).tooltip( "close" );
        // });
    } else {}
}

function delTMPFunc(i, a) {
    var id = i;

    if (a == 'yes' || a == null || a == undefined) {
        $("#dialog-confirm").dialog({}).remove();
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
    }

    $("#dialog-confirm").dialog({
        classes: {
            "ui-dialog": "ui-dialogNew"
        },
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Delete spend": function() {
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
                $(this).dialog( "close" );
                $(this).remove();
            }
        }
    });
}

function addNewSPendMobile() {
    $("#mobileAddSpend").dialog({
        classes: {
            "ui-dialog": "ui-dialogMobile"
        },
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Add": function() {
                $( this ).dialog( "close" );
                addNewSpend($('#mobileName').val(), $('#mobileAmount').val(), $('#mobileSalaryPrepaid').is(':checked'), $('#mobileWithdraw').is(':checked'));
            },
            Cancel: function() {
                $(this).dialog( "close" );
                $(this).remove();
            }
        }
    });
}


$(function() {
    if(screen.width<2100) {
        $("#tmpTable").sortable( "disable" )
    } else {
        var indexNum = 1;
        $("#tmpTable").sortable({
            sort: function() {
                if ($(this).hasClass("cancel")) {
                    $(this).sortable("cancel");
                }
            },
            axis         : "y",
            opacity      : 0.6,
            revert       : 600,
            scroll       : true,
            connectWith  : "#tmpTable",
            stop         : function(){
                $('.divTableRow.tmp input#indexEntry').each(function () {
                    $(this).val(indexNum);
                    indexNum++;
                });
                saveTMPTable();
            }
        });
    $( "#tmpTable" ).disableSelection();
    }
});

$(".unstuck").click(function (u) {
    u.preventDefault();
    var indexNum = 1;

    $("#tmpTable").sortable({
        sort: function() {
            if ($(this).hasClass("cancel")) {
                $(this).sortable("cancel");
            }
        },
        axis         : "y",
        opacity      : 0.6,
        revert       : 600,
        scroll       : true,
        connectWith  : "#tmpTable",
        stop         : function(){
            $('.divTableRow.tmp input#indexEntry').each(function () {
                $(this).val(indexNum);
                indexNum++;
            });
            saveTMPTable();
        }
    });
    $( "#tmpTable" ).disableSelection();
});

$(function() {
    if(screen.width<1000) {
        id = 0;

        $(".divTableRow").swipe({
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                id = $(this).attr('id');

                if (direction == 'left') {
                    $(".swipeDelete").css("visibility", "hidden");
                    $(".swipeDelete").css("opacity", "0");

                    $(".swipeDelete." + id).css("visibility", "visible");
                    $(".swipeDelete." + id).css("opacity", "0.9");
                }
            }
        });

        $(".swipeDelete").swipe({
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                if (direction == 'left') {
                    $(this).addClass('swipeConfirmDelete', 800, "swing");
                } else if (direction == 'right') {
                    $(".swipeDelete").css("visibility", "hidden");
                    $(".swipeDelete").css("opacity", "0");
                }

            }
        });

        $('.swipeDelete').click(function (s) {
            s.preventDefault();
            if ($(this).hasClass('swipeConfirmDelete')) {
                delTMPFunc(id, 'yes');
            } else {
                $(".swipeDelete").css("visibility", "hidden");
                $(".swipeDelete").css("opacity", "0");
            }
        });

        $('body').click(function () {
            $(".swipeDelete").css("visibility", "hidden");
            $(".swipeDelete").css("opacity", "0");

            $('.swipeDelete').removeClass('swipeConfirmDelete', 800, "swing");
        })
    }

});
