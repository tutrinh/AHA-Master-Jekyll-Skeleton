//Format for DataTables for row child (see more details)
function format ( d ) {
    // `d` is the original data object for the row
    var detailhtml;

    detailhtml = '\
    <div class="text-center">\
    <br/>\
    <a href="#" class="btn btn-sm btn-primary"> Assign to Instructor </a>\
    <a href="#" class="btn btn-sm btn-primary"> Assign to eCard Location </a>\
    <a href="#" class="btn btn-sm btn-primary"> Assign to Students </a>\
        </div>\
    ';

    return detailhtml
}


// Calling Accessible Menu
/*global jQuery */
if (jQuery) {
    (function ($) {
        "use strict";
        $(document).ready(function () {
            // initialize the megamenu
            //$('.dropdown').accessibleMegaMenu();

            $("div.megamenu").accessibleMegaMenu();

            // hack so that the megamenu doesn't show flash of css animation after the page loads.
            setTimeout(function () {
                //$('body').removeClass('init');

            }, 500);
        });
    }(jQuery));
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

jQuery( document ).ready(function( $ ) {

    if($.fn.smoothScroll){
        //Smooth Scroll Js
        // $('a').smoothScroll();
    }

    $('.fullHeight').setFullHeight();

    $(window).resize(function(){
        $('.fullHeight').setFullHeight();
    });

    //Chosen select
    jQuery("select.chosen-select").chosen({width:'100%',disable_search: false});

    if($.fn.chosen){
        if($('.chosen-select').length){
            jQuery('.chosen-select').on('change', function (evt, params) {
                var selectedValue = params.selected;
                var arr = [];
                console.log(this.value);
                arr.push(selectedValue);
                arr.push( $( ".chosen-select option:selected" ).text());
                $('#chosen-output').text(arr.join(", "));
                console.log($( ".chosen-select option:selected" ).text());//output the text value
            });
        }
    }

    //Datatables
    if($.fn.DataTable){




        //var table = $('.dataTable').DataTable();
        //Below example to turn off sort amount and searching
        var table = $('.dataTable').DataTable({"searching":false,"lengthChange": false,"info": false,"sDom": 'rtip',columnDefs: [{
            targets: "nosort",
            orderable: false
        }]});



       // $('.dataTables_length select.form-control').chosen();

        // Add event listener for opening and closing details
        $('.dataTable th.nosort').removeClass('sorting_asc');
        $('.dataTable tbody').on('click keypress', 'td.details-control', function (e) {

            console.log(e.which);
            console.log(e);

            if (e.which == 13 || e.type == 'click'){
                var $caret = $(this).find('span.caret');
                console.log($caret);

                var tr = $(this).closest('tr');

                var row = table.row( tr );

                if ( row.child.isShown() ) {
                    // This row is already open - close it
                    row.child.hide();
                    row.child()

                    setTimeout(function(){
                        tr.removeClass('shown');
                    },100);
                    $caret.removeClass('rotate');
                }
                else {
                    // Open this row
                    row.child( format(row.data()),'active' ).show();

                    setTimeout(function(){

                    tr.addClass('shown');
                    },100);
                    $caret.addClass('rotate');
                }

            }


        } );


    }

    //Datepicker call
    if($.fn.datepicker){
        if($('.datepicker').length){
            $('.datepicker').datepicker({
                autoclose: true
                //,endDate: '-1d'
            });
        }
    }

    //Radio button value
    $('.radio').on('toggle',function(e) {
        var $el = $(e.target);
        var elname = e.target.name;
        console.log($el.val());
        console.log(elname);
    });

    //Checkbox button value
    $('.checkbox').on('toggle',function(e) {
        var $el = $(e.target);
        var elname = e.target.name;
        console.log($el.val());
        console.log(elname);
        console.log($el.prop("checked"));
    });

    //Tooltips - Popover
    $('[data-toggle="popover"]').popover();

    //Sticky Admin Bar
    $(".makeSticky").sticky({topSpacing:0,zIndex:9999});


});

//MOBILE MENU
$(document).ready(function(){
    $('#mobileMenuClose').find('a').on('click',function (e) {
        e.preventDefault();
        var mainContent = $('#mainContentWrapper');
        if (mainContent.hasClass('openMenu')){
            mainContent.removeClass('openMenu').addClass('closeMenu');
        }else{
            mainContent.addClass('closeMenu');
        }
        mainContent.toggleClass('noScroll');
    });

    //Open Mobile Menu
    $('#openMobileMenu').on('click',function(e){
        e.preventDefault();
        var mainContent = $('#mainContentWrapper');

        if (mainContent.hasClass('closeMenu')){
            mainContent.removeClass('closeMenu').addClass('openMenu');
        }else{
            mainContent.addClass('openMenu');
        }
        mainContent.addClass('noScroll');
    });
});
