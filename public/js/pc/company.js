$(document).ready(function () {
  var search_var = $("input.search_val").val();
  $(".inc_name").click(function() {
    window.open('about:blank', '_self').close();
    console.log($(this).parent().prev().text())
    $(opener.document).find("#inc_num02").val($(this).parent("td").prev().text())
    $(opener.document).find("#inc_num02").prev().find(".inc_check").addClass("on")
    $(opener.document).find("#name_04").val($(this).text())
    $(opener.document).find("#signFrm02").find(".inc_box").addClass("pass")
    $(opener.document).find("#signFrm02").find(".compa_box").addClass("pass")
    function check_submit(){
      if( $(opener.document).find("#signFrm02 .name_box").hasClass("pass") === true && $(opener.document).find("#signFrm02 .email_box").hasClass("pass") === true && $(opener.document).find("#signFrm02 .pass_box").hasClass("pass") === true && $(opener.document).find("#signFrm02 .terms_box").hasClass("pass") === true && $(opener.document).find("#signFrm02 .inc_box").hasClass("pass") === true && $(opener.document).find("#signFrm02 .compa_box").hasClass("pass") === true){
        $(opener.document).find("#signFrm02 button.sign_com_btn").attr('disabled', false);
      }
    }
    check_submit();
  });

  $(".close_btn").click(function () {
    window.open("about:blank", "_self").close();
  });
});

// search_input
function search_input(){
  console.log("ok");

  // 경우의 수 = 1
  // ------------------------------------------------------------------------------------------
  // select 값
  var target_option = document.getElementById("option01");
  var target = target_option.options[target_option.selectedIndex].value;

  // input값
  var search_var = $("input.search_val").val();
  console.log(search_var);
  if (target == "사업자 번호") {
    window.location.href = "http://localhost:19082/store/signup/bsnsrc/search?nmb=" + search_var;
  } else if (target == "사업체명") {
    window.location.href = "http://localhost:19082/store/signup/bsnsrc/search?name=" + search_var;
  }
  // ------------------------------------------------------------------------------------------

  //

//   // 경우의 수 = 2
//   // ------------------------------------------------------------------------------------------
//   let test = {};

//   if (target == "사업자 번호") {
//     test = "?nmb=" + search_var;
//   } else if (target == "사업체명") {
//     test = "?name=" + search_var;
//   }
//   if (test) {
//     console.log("test : " + test);
//     fetch(`/store/signup/bsnsrc/search${test}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("사업자 있음");
//         // console.log(data.cmpRgsNmb);
//         console.log(data);
//         const count = Object.keys(data).length;
//         // $(".search_t")
//         //   .find("tbody")
//         //   .html("<tr><td class='inc_number'>" + data[0].cmpRgsName + "</td><td><div class='inc_name'>" + data[0].cmpRgsNmb + "</div></td><td>" + data[0].nick + "</td></tr>");
//         for (i = 0; i < count; i++) {
//           console.log("------------------");
//           console.log(i);
//           console.log(count)

//           var search_t = document.getElementById("search_t");
//           var row = search_t.insertRow(search_t.tbody.rows.length);
//           var cell1 = row.insertCell(0);
//           var cell2 = row.insertCell(1);
//           var cell3 = row.insertCell(2);
//           cell1.innerHTML = data[i].cmpRgsNmb
//           cell2.innerHTML = data[i].cmpRgsName
//           cell3.innerHTML = data[i].nick
//           // $(".search_t")
//           //   .find("tbody")
//           //   .html("<tr><td class='inc_number'>" + data[count].cmpRgsName + "</td><td><div class='inc_name'>" + data[count].cmpRgsNmb + "</div></td><td>" + data[count].nick + "</td></tr>");
//         }
//       });
//   }
};