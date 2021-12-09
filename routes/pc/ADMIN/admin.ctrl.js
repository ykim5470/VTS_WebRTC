const { Op } = require("sequelize");
const Models = require("../../../models");

const output = {

  login: async (req, res) => {
    res.render("common/pc/bo/ES-MMS/login");
  },

  PC_CO_LIN0003: async (req, res) => {
    res.render("common/pc/home/PC-CO-LIN0003");
  },

  testtest: async (req, res) => {
    const id = req.params.id;
    try {
      const users = await Models.User.findAll({
        limit: req.query.limit,
        offset: req.offset,
        attributes: ["id", "email", "confirm", "nick", "approvalid", "createdAt"],
        where: { auth: 121 },
      });

      console.log("====================");
      console.log(users);
      console.log("====================");

      res.send(users);
    } catch (error) {
      console.log(error);
    }
  },

  testtest2: async (req, res) => {
    const id = req.params.id;
    try {
      const users = await Models.User.findAll({
        limit: req.query.limit,
        offset: req.offset,
        attributes: ["id", "email", "confirm", "nick", "approvalid", "createdAt", "cmpRgsName", "cmpRgsNmb"],
        where: { auth: 155 },
      });
      
      console.log("====================");
      console.log(users);
      console.log("====================");

      res.send({users, usermys});
    } catch (error) {
      console.log(error);
    }
  },

  approvalid_fail: async (req, res) => {
    res.render("common/pc/bo/ES-MMS/p_auth", { user: req.user });
  },

  guideList: async (req, res) => {
    try {
      const users = await Models.User.findAll({
        limit: req.query.limit,
        offset: req.offset,
        attributes: ["id", "email", "confirm", "nick", "createdAt"],
        where: { auth: 121 },
        raw: true,
      });

      console.log("====================");
      const users_length = users.length;
      console.log(users_length);
      console.log("====================");

      res.render("common/pc/bo/ES-MMS/p_100.html", { users_length, user: req.user });
    } catch (error) {
      console.log(error);
    }
  },

  guideDetail: async (req, res) => {
    const users = await Models.User.findOne({
      attributes: ["id", "email", "confirm", "nick", "approvalid", "createdAt", "updatedAt"],
      where: { id: req.params.id },
    });

    const guideLicensePic = await Models.UserMy.findOne({
      attributes: ["guideLicense"],
      where: { id: req.params.id },
      raw: true,
    });

    const memos = await Models.UserMemo.findAll({
      where: { user_id: req.params.id },
      order: [["createdAt", "desc"]],
    });

    const LicenseIMG = guideLicensePic.guideLicense;
    console.log(LicenseIMG)

    res.render("common/pc/bo/ES-MMS/p_101.html", { users, LicenseIMG, memos, user: req.user });
  },

  storeList: async (req, res) => {
    try {
      const users = await Models.User.findAll({
        limit: req.query.limit,
        offset: req.offset,
        attributes: ["id", "email", "confirm", "nick", "createdAt"],
        where: { auth: 155 },
        raw: true,
      });

      console.log("====================");
      const users_length = users.length;
      console.log(users_length);
      console.log("====================");

      res.render("common/pc/bo/ES-MMS/p_200.html", { users_length, user: req.user });
    } catch (error) {
      console.log(error);
    }
  },

  storeDetail: async (req, res) => {
    const users = await Models.User.findOne({
      attributes: ["id", "email", "confirm", "nick", "approvalid", "createdAt", "updatedAt"],
      where: { id: req.params.id },
    });

    const memos = await Models.UserMemo.findAll({
      where: { user_id: req.params.id },
      order: [["createdAt", "desc"]],
    });

    res.render("common/pc/bo/ES-MMS/p_201.html", { users, memos, user: req.user });
  },

  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  // confirm checking sample

  BO_MAIN: async (req, res) => {
    res.render("common/pc/bo/main");
  },

  BO_SAMPLE: async (req, res) => {
    res.render("common/pc/bo/p_100");
  },

  authList: async (req, res) => {
    try {
      const user = await Models.User.findAll({
        attributes: ["id", "email", "auth", "confirm", "nick"],
        where: {
          auth: {
            [Op.or]: [121, 155],
          },
        },
        raw: true,
      });

      console.log("====================");
      console.log(user);
      console.log("====================");
      console.log("====================");

      res.render("common/pc/bo/test.html", { user });
    } catch (error) {
      console.log(error);
    }
  },

  confirm: async (req, res, next) => {
    try {
      await Models.User.update(
        {
          confirm: 99,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.redirect("/admin/list");
    } catch (error) {
      console.log(error);
    }
  },

  return: async (req, res, next) => {
    try {
      await Models.User.update(
        {
          confirm: 44,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.redirect("/admin/list");
    } catch (error) {
      console.log(error);
    }
  },

  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
};

const process = {
  listCheck: async (req, res) => {
    const confirmData = req.body.con;
    console.log("=============");
    console.log(confirmData);
    console.log("=============");

    try {
      if (confirmData == 00) {
        const user = await Models.User.findAll({
          attributes: ["id", "email", "auth", "confirm", "nick"],
          where: {
            auth: {
              [Op.or]: [121, 155],
            },
          },
          raw: true,
        });

        console.log("====================");
        console.log(user);
        console.log("====================");

        res.render("common/pc/bo/test.html", { user });
      } else if (confirmData == 10) {
        const user = await Models.User.findAll({
          attributes: ["id", "email", "auth", "confirm", "nick"],
          where: {
            confirm: 10,
            auth: {
              [Op.or]: [121, 155],
            },
          },
          raw: true,
        });

        console.log("====================");
        console.log(user);
        console.log("====================");

        res.render("common/pc/bo/test.html", { user });
      } else if (confirmData == 99) {
        const user = await Models.User.findAll({
          attributes: ["id", "email", "auth", "confirm", "nick"],
          where: {
            confirm: 99,
            auth: {
              [Op.or]: [121, 155],
            },
          },
          raw: true,
        });

        console.log("====================");
        console.log(user);
        console.log("====================");

        res.render("common/pc/bo/test.html", { user });
      } else if (confirmData == 44) {
        const user = await Models.User.findAll({
          attributes: ["id", "email", "auth", "confirm", "nick"],
          where: {
            confirm: 44,
            auth: {
              [Op.or]: [121, 155],
            },
          },
          raw: true,
        });

        console.log("====================");
        console.log(user);
        console.log("====================");

        res.render("common/pc/bo/test.html", { user });
      } else {
        res.render("오류입니다.");
      }
    } catch (error) {
      console.log(error);
    }
  },

  confirmCheck: async (req, res) => {
    const { confirmCheck01, reason01, memo01, reason02, memo02 } = req.body;

    console.log("----------------------------");
    console.log(confirmCheck01);
    console.log(reason01);
    console.log(memo01);
    console.log(reason02);
    console.log(memo02);
    console.log(req.params.id);
    console.log(req.user.nick);
    console.log("----------------------------");

    const checkValue = confirmCheck01;

    try {
      if (checkValue == "승인") {
        await Models.User.update(
          {
            confirm: 99,
            approvalid: req.user.nick,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        await Models.UserMemo.create({
          confirm: 99,
          approvalid: req.user.nick,
          user_id: req.params.id,
        });

        res.redirect("/admin/guideList");
      } else if (checkValue == "반려") {
        const reason = reason01;
        const memo = memo01;

        console.log(reason);
        console.log(memo);

        await Models.User.update(
          {
            confirm: 44,
            approvalid: req.user.nick,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        await Models.UserMemo.create({
          confirm: 44,
          reason: reason,
          memo: memo,
          approvalid: req.user.nick,
          user_id: req.params.id,
        });

        res.redirect("/admin/guideList");
      } else if (checkValue == "승인취소") {
        const reason = reason02;
        const memo = memo02;

        console.log(reason);
        console.log(memo);

        await Models.User.update(
          {
            confirm: 54,
            approvalid: req.user.nick,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        await Models.UserMemo.create({
          confirm: 54,
          reason: reason,
          memo: memo,
          approvalid: req.user.nick,
          user_id: req.params.id,
        });

        res.redirect("/admin/guideList");
      }
    } catch (error) {
      console.log(error);
    }
  },

};

module.exports = {
  output,
  process,
};
