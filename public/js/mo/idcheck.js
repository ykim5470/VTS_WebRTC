const idCheck = false;
function dupCheck() {
  var getMail = RegExp(/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/);

  var email_01 = $("input[name='email_01").val();
  var email_02 = $("input[name='email_02").val();
  var check_email = email_01 + "@" + email_02;

  if ((email_01 == "" && email_02 == "") || email_01 == "" || email_02 == "") {
    $("#signFrm .email_box").removeClass("pass");
    $("#signFrm .email_box .email_check").removeClass("on");
    $("#signFrm .email_box .err_msg").text("필수입력 항목 입니다.").show();
    window.alert("ID를 입력해주세요");
    check_submit();
  } else if (!getMail.test(check_email)) {
    $("#signFrm .email_box").removeClass("pass");
    $("#signFrm .email_box .email_check").removeClass("on");
    $("#signFrm .email_box .err_msg").text("이메일 형식을 확인하세요.").show();
    check_submit();
  }

  fetch(`/m/dupCheck/${check_email}`)
    .then((res) => res.json())
    .then((data) => {
      if (check_email == data.email) {
        $("#signFrm .email_box .email_check").removeClass("on");
        $("#signFrm .email_box").removeClass("pass");
        $("#signFrm .email_box .err_msg").text("이미 사용중인 이메일 입니다.").show();
        check_submit();
      }
    })
    .catch(function (err) {
      if(!getMail.test(check_email)){
        $("#signFrm .email_box .email_check").removeClass("on");
      }else{
        $("#signFrm .email_box .email_check").addClass("on");
        $("#signFrm .email_box").addClass("pass");
        $("#signFrm .email_box .err_msg").hide();
      }
      check_submit();
    });
}

function dupEmpCheck() {
  var getMail = RegExp(/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/);

  var email_03 = $("input[name='email_03").val();
  var email_04 = $("input[name='email_04").val();
  var check_email = email_03 + "@" + email_04;

  if ((email_03 == "" && email_04 == "") || email_03 == "" || email_04 == "") {
    $("#signFrm02 .email_box").removeClass("pass");
    $("#signFrm02 .email_box .email_check").removeClass("on");
    $("#signFrm02 .email_box .err_msg").text("필수입력 항목 입니다.").show();
    window.alert("ID를 입력해주세요");
    check_submit();
  } else if (!getMail.test(check_email)) {
    $("#signFrm02 .email_box").removeClass("pass");
    $("#signFrm02 .email_box .email_check").removeClass("on");
    $("#signFrm02 .email_box .err_msg").text("이메일 형식을 확인하세요.").show();
    check_submit();
  }

  fetch(`/m/dupCheck/${check_email}`)
    .then((res) => res.json())
    .then((data) => {
      if (check_email == data.email) {
        $("#signFrm02 .email_box .email_check").removeClass("on");
        $("#signFrm02 .email_box").removeClass("pass");
        $("#signFrm02 .email_box .err_msg").text("이미 사용중인 이메일 입니다.").show();
        check_submit();
      }
    })
    .catch(function (err) {
      if(!getMail.test(check_email)){
        $("#signFrm02 .email_box .email_check").removeClass("on");
      }else{
        $("#signFrm02 .email_box .email_check").addClass("on");
        $("#signFrm02 .email_box").addClass("pass");
        $("#signFrm02 .email_box .err_msg").hide();
      }
      check_submit();
    });
}

// var test_inc_num = "1232367899";
function companyCheck() {
  var inc_input_num = $("#signFrm #inc_num").val().replace(/\-/g, "");
  if ($("#signFrm #inc_num").val() == "") {
    $(this).focus();
    $("#signFrm .inc_box .inc_check").removeClass("on");
    $("#signFrm .inc_box .err_msg").text("사업자 번호를 확인하세요.").show();
    $("#signFrm button.sign_com_btn").attr("disabled", true);
    $("#signFrm .inc_box").removeClass("pass");
  } else if ($("#signFrm #inc_num").val().length < 12) {
    $(this).focus();
    $("#signFrm .inc_box .inc_check").removeClass("on");
    $("#signFrm .inc_box .err_msg").text("사업자 번호를 확인하세요.").show();
    $("#signFrm .inc_box").removeClass("pass");
    $("#signFrm button.sign_com_btn").attr("disabled", true);
    check_submit();
  }
  console.log(inc_input_num)

  fetch(`/m/companyCheck/${inc_input_num}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("중복 있음")
      console.log(data.cmpRgsNmb)
      if (inc_input_num == data.cmpRgsNmb) {
        $(this).focus();
        $("#signFrm .inc_box .inc_check").removeClass("on");
        $("#signFrm .inc_box .err_msg").text("이미 등록된 사업자 번호 입니다..").show();
        $("#signFrm .inc_box").removeClass("pass");
        $("#signFrm button.sign_com_btn").attr("disabled", true);
        check_submit();
      }
    })
    .catch(function (err) {
      console.log("중복 없음")
      $("#signFrm .inc_box .inc_check").addClass("on");
      $("#signFrm .inc_box .err_msg").hide();
      $("#signFrm .inc_box").addClass("pass");
      check_submit();
    });
}
