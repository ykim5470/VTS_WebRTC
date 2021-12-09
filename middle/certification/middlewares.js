// 로그인 체크 (임시)
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render("auth/login");
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

// 가이드 체크
exports.isLoggedInGuide = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.auth != "125") {
      res.redirect("/error");
    }
    return next();
  } else {
    res.render("auth/login");
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
