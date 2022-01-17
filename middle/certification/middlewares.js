const e = require("express");

// 로그인 체크
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/guide/login");
  }
};

// 사용자 체크
exports.isLoggedInUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.auth != "0") {
      res.redirect("/error");
    }
    return next();
  } else {
    res.render("auth/login");
  }
};

// 가이드 권한 체크
exports.isLoggedInGuide = (req, res, next) => {

  console.log("-------------------------------")
  console.log("isLoggedInGuide : ")
  console.log("-------------------------------")
  if (req.isAuthenticated()) {
    if (req.user.auth == "121" || req.user.auth == "125") {
      console.log("good");
      return next();
    } else {
      console.log("auth : "+req.user.auth)
      return res.redirect("/");
    }
  } else {
    return res.redirect("/");
  }
};

// 판매자 체크(대표, 직원)
exports.isLoggedInStore = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.auth != "151" || req.user.auth != "155") {
      res.redirect("/error");
    }
    return next();
  } else {
    res.render("auth/login");
  }
};

// 시스템 관리자 체크
exports.isLoggedInStore = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.auth != "177") {
      res.redirect("/error");
    }
    return next();
  } else {
    res.render("auth/login");
  }
};

// 로그인 상태
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};

// 이메일 체크
exports.isStatusCheck = (req, res, next) => {
  const { email, auth, confirm, status, nick } =  req.user;
  console.log("-------------------------------")
  console.log("isStatusCheck : ")
  console.log("-------------------------------")
  console.log(email);
  console.log(auth);
  console.log(confirm);
  console.log(status);
  console.log(nick);
  try {
    if (status == "700") {
      console.log("good");
      next();
    } else {
      console.log("status : " + status);
      return res.redirect("/signup/result/" + email);
    }
  } catch (error) {
    console.log("error : " + error);
    return res.redirect("/");
  }
};

// 승인 체크
exports.isConfirmCheck = (req, res, next) => {
  console.log("-------------------------------")
  console.log("isConfirmCheck : ")
  console.log("-------------------------------")
  const { email, auth, confirm, status, nick } =  req.user;
  console.log(email);
  console.log(auth);
  console.log(confirm);
  console.log(status);
  console.log(nick);
  try {
    if (confirm == 99) {
      console.log("good");
      next();
    } else {
      console.log("confirm : " + confirm);
      console.log("승인받으세요");
      return res.redirect("/admin/authentication");
    }
  } catch (error) {
    console.log("error : " + error);
    return res.redirect("/");
  }
};

// 디바이스 체크
exports.diviceCheck = (req, res, next) => {
  console.log("-------------------------------")
  console.log("diviceCheck : ")
  console.log("-------------------------------")
  const osName = userDevice.os.name;
  const PC = ["Windows", "Mac OS"];
  if (osName == PC[0] || osName == PC[1]) {
    console.log("PC");
    console.log(PC[0]);
    console.log(PC[1]);
    console.log(osName);
    res.redirect("/device");
  } else {
    console.log("Mobile");
    next();
  }
};
