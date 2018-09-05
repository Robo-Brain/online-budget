var amount = 0;
var salaryTotal = 0;
var prepaidTotal = 0;

var isMobile = false; //initiate as false
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}



var tmpVal = [{}];

function appendTMPTable() {
    tmpVal = tmp.slice(0);
    tmpVal.sort(function(a,b) {
        return a.index - b.index;
    });

    for (i = 0; i < tmpVal.length; i++) {

        amount += parseInt(tmpVal[i].amount);

        $("#tmpTable").append(
            "<div id='" + tmpVal[i].id + "' class='divTableRow click " + tmpVal[i].id + " " + tmpVal[i].salaryPrepaid + " tmp'>"
                + "<div class='divTableCell left name'>" +
                    "<input type='text' class='tmp name " + tmpVal[i].salaryPrepaid + ' ' + tmpVal[i].id +"' value='" + tmpVal[i].name + "' />" +
                    "<input type='hidden' value='" + tmpVal[i].id + "' />" +
                    "<input type='hidden' id='spendName'  value='" + tmpVal[i].name + "' />" +
                    "<input type='hidden' class='tmp index " + tmpVal[i].id + "' id='indexEntry' value='" + tmpVal[i].index + "' />" +
                "</div>" +
                "<div class='divTableCell amount'>" +
                    "<input type='text' class='tmp amount " + tmpVal[i].id + "' id='amount' value='" + tmpVal[i].amount + "' autocomplete='off' /> ₽" +
                "</div>" +
                "<div class='divTableCell salaryPrepaid switcher'>" +
                    "<span class='hiddenMobileLabels'>Salary: <br /></span>" +
                    "<label class='switch'>" +
                        "<input type='checkbox' id='salaryPrepaid' class='tmp salaryPrepaid " + tmpVal[i].salaryPrepaid + ' ' + tmpVal[i].id + "' />" +
                        "<span class='slider salaryPrepaid'></span>" +
                    "</label>" +
                "</div>" +
                "<div class='divTableCell withdraw switcher'>" +
                    "<span class='hiddenMobileLabels'>Withdraw: <br /></span>" +
                    "<label class='switch'>" +
                        "<input type='checkbox' id='withdraw' class='tmp withdraw " + tmpVal[i].withdraw + ' ' + tmpVal[i].id + "' />" +
                        "<span class='slider'></span>" +
                    "</label>" +
                "</div>" +
                "<div class='divTableCell del'>" +
                    "<button class='delButton' id='" + tmpVal[i].id + "'>del</button>" +
                "</div>"

            + "<div class='clickDelete " + tmpVal[i].id + "'>"
                + "<div class='confirm'><span>Delete?</span></div>"
                + "<div id='"+ tmpVal[i].id + "' class='yes'><span>YES</span></div>"
                + "<div id='"+ tmpVal[i].id + "' class='no'><span>NO</span></div>"
            + "</div>"


            + "</div>");

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

    if (a == 'yes') {
        console.log(id);
        $("#dialog-confirm").dialog({}).remove();
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "post",
            // url: "/deleteSpend",
            data : id,
            success: $(document).ajaxStop(function(){
                // window.location.reload();
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
    // if(screen.width<1100 || isMobile) {
    //     $("#tmpTable").sortable( "disable" )
    // } else {
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
    // }
});

// $(".unstuck").click(function (u) {
//     u.preventDefault();
//     var indexNum = 1;
//
//     $("#tmpTable").sortable({
//         sort: function() {
//             if ($(this).hasClass("cancel")) {
//                 $(this).sortable("cancel");
//             }
//         },
//         axis         : "y",
//         opacity      : 0.6,
//         revert       : 600,
//         scroll       : true,
//         connectWith  : "#tmpTable",
//         stop         : function(){
//             $('.divTableRow.tmp input#indexEntry').each(function () {
//                 $(this).val(indexNum);
//                 indexNum++;
//             });
//             saveTMPTable();
//         }
//     });
//     $( "#tmpTable" ).disableSelection();
// });

$(function() {
    if(screen.width<3100 || isMobile) {
        id = 0;

        $('.yes').click(function () {
            id = $(this).attr('id');
            delTMPFunc(id, 'yes');
        });
        $('.no').click(function () {
            id = $(this).attr('id');
            console.log(id);
            $('.clickDelete.' + id).hide(500);
            setTimeout( "$('.clickDelete.' + id).show();", 3000);
        });

    }
});
