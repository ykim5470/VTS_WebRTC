const Models = require("../../../models");
const output = {
  PC_CO_LIN0002: async (req, res) => {
    res.render("common/pc/home/PC-CO-LIN0002", { user: req.user });
  },
  PC_CO_MEM0003: async (req, res) => {
    res.render("common/pc/home/PC-CO-MEM0003", { user: req.user });
  },
  company: async (req, res) => {
    res.render("common/pc/home/PC-CO-MLP0001");
  },
  companySearch: async (req, res) => {
    try {
      console.log("-------------------------");
      let name = req.query.name;
      let nmb = req.query.nmb;
      if (!name == "" && !nmb == "") {
        console.log("둘다존재");
        console.log(nmb);
        console.log(name);
        const exUser = await Models.UserMy.findAll({
          attributes: ["cmpRgsNmb", "cmpRgsName", "nick"],
          where: {
            [Op.or]: [
              {
                cmpRgsName: {
                  [Op.like]: "%" + name + "%",
                },
              },
              {
                cmpRgsNmb: {
                  [Op.like]: "%" + nmb + "%",
                },
              },
            ],
          },
        });
        console.log(exUser);
        // res.send(exUser);
        res.render("common/pc/home/PC-CO-MLP0001", { exUser: exUser, company: nmb });
      } else if (name) {
        console.log("name : " + name);
        const exUser = await Models.UserMy.findAll({
          attributes: ["cmpRgsNmb", "cmpRgsName", "nick"],
          where: {
            cmpRgsName: {
              [Op.like]: "%" + name + "%",
            },
          },
        });
        console.log(exUser);
        // res.send(exUser);
        res.render("common/pc/home/PC-CO-MLP0001", { exUser: exUser, company: name });
      } else if (nmb) {
        console.log("nmb : " + nmb);
        const exUser = await Models.UserMy.findAll({
          attributes: ["cmpRgsNmb", "cmpRgsName", "nick"],
          where: {
            cmpRgsNmb: {
              [Op.like]: "%" + nmb + "%",
            },
          },
        });
        console.log(exUser);
        // res.send(exUser);
        res.render("common/pc/home/PC-CO-MLP0001", { exUser: exUser, company: nmb });
      } else {
        // 값이 없을 때
        res.render("common/pc/home/PC-CO-MLP0001");
      }
    } catch (error) {
      res.render("common/pc/home/PC-CO-MLP0001");
    }
  },

  products_list: async (req, res) => {
    try {
      const products = await Models.Products.findAll({
        limit: req.query.limit,
        offset: req.offset,
        order: [["createdAt", "desc"]],
      });
      res.render("common/pc/bo/pro/products.html", { products });
    } catch (e) {
      console.log(e);
    }
  },

  products_detail: async (req, res) => {
    const product = await Models.Products.findOne({
      where: {
        id: req.params.id,
      },
      include: ["Memo"],
    });

    res.render("common/pc/bo/pro/detail.html", { product: product });
  },

  write: (req, res) => {
    res.render("common/pc/bo/pro/form.html");
  },

  edit: async (req, res) => {
    try {
      const product = await Models.Products.findOne({
        where: { id: req.params.id },
        order: [["createdAt", "desc"]],
      });

      res.render("common/pc/bo/pro/form.html", { product });
    } catch (e) {}
  },

  delete: async (req, res) => {
    await Products.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.redirect("/store/products");
  },

  delete_memo: async (req, res) => {
    try {
      await Models.ProductsMemo.destroy({
        where: {
          id: req.params.memo_id,
        },
      });
      // console.log("게시물ID : " + req.params.product_id);
      // console.log("댓글ID : " + req.params.memo_id);
      // console.log("aaaa : " + aaaa);
      res.redirect("/store/products/detail/" + req.params.product_id);
    } catch (e) {
      console.log(e);
    }
  },

  confirm: async (req, res, next) => {
    try {
      await Models.Products.update(
        {
          status: 1,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.redirect("/store/products");
    } catch (error) {
      console.log(error);
    }
  },

  return: async (req, res, next) => {
    try {
      await Models.Products.update(
        {
          status: 2,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.redirect("/store/products");
    } catch (error) {
      console.log(error);
    }
  },
};

const process = {
  storeAdminRegister: async (req, res, next) => {
    const { name_01, name_02, inc_num, email_01, email_02, password } = req.body;

    const email = email_01 + "@" + email_02;

    console.log("================================");
    const { i_year_01, i_month_01, i_day_01, gender_01, ph_num_01 } = req.body;
    console.log("year : " + i_year_01);
    console.log("month : " + i_month_01);
    console.log("day : " + i_day_01);
    console.log("gender : " + gender_01);
    console.log("ph_num : " + ph_num_01);
    const l_birthday = `${i_year_01}-${i_month_01}-${i_day_01}`;

    console.log("================================");

    try {
      const exUser = await Models.User.findOne({ where: { email } });
      if (exUser) {
        return res.redirect("/join?error=exist");
      }

      console.log("name_01 : " + name_01);
      console.log("name_02 : " + name_02);
      console.log("inc_num : " + inc_num);
      console.log("email_01 : " + email_01);
      console.log("email_02 : " + email_02);
      console.log("password : " + password);

      const hash = await bcrypt.hash(password, 12);
      await Models.User.create({
        email,
        nick: name_01,
        password: hash,
        auth: "155",
        status: "704",
        confirm: "10",
      });
      await Models.UserMy.create({
        email,
        mail: email,
        nick: name_01,
        cmpRgsName: name_02,
        cmpRgsNmb: inc_num.replace(/\-/g, ""),
        gender: gender_01,
        l_birthday,
        ph_num: ph_num_01,
      });

      await Models.UserPwCh.create({
        email,
        mail: email,
        password: hash,
        connectIp: userIp,
      });

      return next();
    } catch (error) {
      console.error(error);
      return next(error);
    }
  },
  storeAdminEmail: async (req, res, next) => {
    const Reason = "email";
    const { email_01, email_02 } = await req.body;
    const emailChack_01 = (await email_01) + "@" + email_02;
    console.log("email_01 : " + email_01);
    console.log("email_02 : " + email_02);
    console.log("emailChack_01 : " + emailChack_01);
    const mailHash = await secret.auth.emailEncoding(emailChack_01);
    try {
      const emailAuth = await Models.UserMy.findOne({ where: { mail: emailChack_01 } });
      if (emailAuth) {
        await Models.UserToken.create({
          mail: emailChack_01,
          authKinds: Reason,
          emailAuth: "300",
          emailToken: mailHash,
          emailTime: sequelize.literal("CURRENT_TIMESTAMP"),
        });

        await handle_status.authChack.tokenLog(emailChack_01, Reason);
        const { subject, html, attachments } = await Form.form.mailForm(emailChack_01, mailHash, Reason);
        await handle_email.mail.EmailVerification(emailChack_01, subject, html, attachments);
        res.render("common/pc/home/PC-CO-MEM0005", { email: emailChack_01, use: "판매점" });
      } else {
        res.status(404).send("no user");
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  storeEmployeeRegister: async (req, res, next) => {
    const { name_03, name_04, inc_num02, email_03, email_04, password_02 } = req.body;

    console.log("================================");
    const { i_year_02, i_month_02, i_day_02, gender_02, ph_num_02 } = req.body;
    console.log("year : " + i_year_02);
    console.log("month : " + i_month_02);
    console.log("day : " + i_day_02);
    console.log("gender : " + gender_02);
    console.log("ph_num : " + ph_num_02);
    const l_birthday = `${i_year_02}-${i_month_02}-${i_day_02}`;

    console.log("================================");

    const email = email_03 + "@" + email_04;
    try {
      const exUser = await Models.User.findOne({ where: { email } });
      if (exUser) {
        return res.redirect("/join?error=exist");
      }

      console.log("name_03 : " + name_03);
      console.log("name_04 : " + name_04);
      console.log("inc_num02 : " + inc_num02);
      console.log("email_03 : " + email_03);
      console.log("email_04 : " + email_04);
      console.log("password_02 : " + password_02);

      const hash = await bcrypt.hash(password_02, 12);
      await Models.User.create({
        email: email,
        nick: name_03,
        password: hash,
        auth: "151",
        status: "704",
        confirm: "10",
      });
      await Models.UserMy.create({
        email: email,
        mail: email,
        nick: name_03,
        cmpRgsName: name_04,
        cmpRgsNmb: inc_num02,
        gender: gender_02,
        l_birthday,
        ph_num: ph_num_02,
      });

      await Models.UserPwCh.create({
        email: email,
        mail: email,
        password: hash,
        connectIp: userIp,
      });

      return next();
    } catch (error) {
      console.error(error);
      return next(error);
    }
  },
  storeEmployeeEmail: async (req, res, next) => {
    const Reason = "email";
    const { email_03, email_04 } = await req.body;
    const emailChack_02 = (await email_03) + "@" + email_04;
    console.log("email_03 : " + email_03);
    console.log("email_04 : " + email_04);
    console.log("emailChack_02 : " + emailChack_02);
    const mailHash = await secret.auth.emailEncoding(emailChack_02);
    try {
      const emailAuth = await Models.UserMy.findOne({ where: { mail: emailChack_02 } });
      if (emailAuth) {
        await Models.UserToken.create({
          mail: emailChack_02,
          authKinds: Reason,
          emailAuth: "300",
          emailToken: mailHash,
          emailTime: sequelize.literal("CURRENT_TIMESTAMP"),
        });

        await handle_status.authChack.tokenLog(emailChack_02, Reason);
        const { subject, html } = await Form.form.mailForm(emailChack_02, mailHash, Reason);
        await handle_email.mail.EmailVerification(emailChack_02, subject, html);
        res.render("common/pc/home/PC-CO-MEM0005", { email: emailChack_02, use: "판매점" });
      } else {
        res.status(404).send("no user");
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  storelogin: (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
      if (authError) {
        console.error(authError);
        res.send(loginError.message);
      }
      if (!user) {
        console.log(info.message); // localstrategy.js에서 넘어오는 숫자 값 출력 됨
        const errorCode = info.message;
        console.log(errorCode);
        return res.render("common/pc/home/PC-CO-LIN0002", { errorCode: errorCode });
      }
      return req.login(user, async (loginError) => {
        if (loginError) {
          console.log(loginError.message);
          res.send(loginError.message);
        }
        await handle_status.authChack.loginLog(user.email);
        return next();
      });
    })(req, res, next);
  },

  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

  post_write: async (req, res) => {
    try {
      await Models.Products.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        status: 0,
      });

      res.redirect("/store/products");
    } catch (e) {
      console.log(e);
    }
  },

  post_edit: async (req, res) => {
    try {
      await Models.Products.update(
        {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
        },
        {
          where: { id: req.params.id },
        }
      );

      res.redirect("/store/products/detail/" + req.params.id);
    } catch (e) {
      console.log(e);
    }
  },

  post_delete: async (req, res) => {
    try {
      const product = await Models.Products.findByPk(req.params.id);
      // create + as에 적은 내용 ( Products.js association 에서 적은 내용 )
      await product.createMemo(req.body);
      res.redirect("/store/products/detail/" + req.params.id);
    } catch (e) {
      console.log(e);
    }
  },

  post_summernote: (req, res) => {
    res.send("/uploads/STORE/product/" + req.file.filename);
  },


};

module.exports = {
  output,
  process,
};
