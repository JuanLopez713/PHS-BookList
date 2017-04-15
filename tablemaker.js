//          //PARSE THE CRV
$(function () {

    var results = Papa.parse("BookList2016.csv", {
        header: true,
        download: true,
        complete: function (results) {
            console.log("Remote file parsed!", results.data);
            $.each(results.data, function (i, el) {
                var row = $("<tr/>");
                row.append($("<td/>").text());
                $.each(el, function (j, cell) {
                    row.append($("<td/>").text(cell));
                });
                $("#books tbody").append(row);
            });
            var str = $('#books td:nth-child(4)').text();
            str.prepend(("https://www.google.com/#q=").text());
            $('#books td:nth-child(4)').append("test");
        }
    });

});


//          if (!RegExp.escape) {
//              RegExp.escape = function (s) {
//                  return s.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
//              };
//          }


//          //MAKE SEARCH, SEARCH ALL
//          var $table = $('#books');
//          var bands = [];
//          $table.find('td:nth-child(3)').each(function () {
//              var text = $.trim($(this).text()).toLowerCase();
//              if ($.inArray(text, bands) == -1) {
//                  bands.push(text);
//              }
//          }).get();
//
//          ///SEARCH THIS TABLE
//          $(' #search ').click(function () {
//              var parts = $(' #emp_search ').val().split(/\s+/);
//              var bns = [],
//                  i = 0,
//                  idx;
//              while (i < parts.length) {
//                  idx = $.inArray(parts[i].toLowerCase(), bands);
//                  if (idx >= 0) {
//                      bns.push(parts.splice(i, 1)[0]);
//                  } else {
//                      i++;
//                  }
//              }
//              var nameexp = parts.length ? new RegExp(parts.join('|'), 'im') : false;
//              var bnexp = bns.length ? new RegExp(bns.join('|'), 'im') : false;
//              $("#books").find("tr").slice(1).each(function (index) {
//                  var $this = $(this);
//                  var name = $.trim($this.children().not(':nth-child(11)').text());
//                  var band = $.trim($this.children(':nth-child(11)').text());
//                  $(this).toggle((!nameexp || nameexp.test(name)) && (!bnexp || bnexp.test(band)));
//              });
//          });



function searchTable() {
    // Declare variables 
    var input, filter, table, tr, td, i, x, multi, y, filtered;
    input = document.getElementById("emp_search");
    filter = input.value.toUpperCase();
    multi = filter.split(" ");
    table = document.getElementById("books");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query

    for (i = 0; i < tr.length; i++) {
filtered = false;
        for (x = 0; x < 9; x++) {
            

            td = tr[i].getElementsByTagName("td")[x];
            for (y = 0; y < multi.length; y++) {
                if (td) {

                    if (td.innerHTML.toUpperCase().indexOf(multi[y]) > -1) {

                        filtered = true;

                    }

                }
            }
        }
        if (filtered) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";

        }
    }

    tr[0].style.display = "";
}


////PRESS ENTER TO SEARCH
//$(document).ready(function () {
//    $('#emp_search').keypress(function (e) {
//        if (e.keyCode == 13)
//            $('#search').click();
//    });
//});








//CLICK ROW TO LINK
/*  
  $(' #books td:nth-child(4) ').click( function() {

      window.location.href = "http://www.google.com";

  });

       */





/*TO KEEP HEADER FIXED*/
