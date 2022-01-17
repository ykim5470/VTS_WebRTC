const dotenv = require("dotenv");
dotenv.config();

const form = {
  mailForm: (mailHash, timeHash, form) => {
    const mail = {
      subject: "[VTS] 회원가입 인증",
      TEST: `<div><a href="${process.env.OPEN_SERVER_HOST}/auth/email?id=${timeHash}"><img src="https://www.saraminimage.co.kr?url=http://www.vreducation.kr/img/20210401_saramin.png"></a></div>`,
      html: `
      <div style="font-family:'Malgun Gothic', sans-serif; padding:20px;">
        <h1 style="font-family:'Malgun Gothic', sans-serif; font-size: 23px;margin: 0;font-weight:bold;">Enjoy Street</h1>
        <h2 style="font-family:'Malgun Gothic', sans-serif; font-weight: normal;font-size: 18px;margin:9px 0 0;">이메일 인증을 진행해 주세요.</h2>
        <p style="font-family:'Malgun Gothic', sans-serif; font-size: 15px;width: 100%;margin: 9px 0 0;display: inline-block;">ENJOY STREET 서비스의 모든 기능을 사용하기 위해서 이메일 인증이 필요합니다.<br>아래의 버튼을 눌러 이메일 인증을 완료해 주세요.</p>
        <a href="${process.env.OPEN_SERVER_HOST}/auth/email?id=${timeHash}" style="font-family:'Malgun Gothic', sans-serif; text-decoration: none;color: #fff;background: #5f63ff;display: inline-block;font-size: 15px;margin: 15px 0 50px;padding: 8px 15px;border-radius: 5px;">이메일 인증</a>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;display: block;font-size: 15px;">감사합니다.</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;display: block;font-size: 15px;">ENJOY STREET 드림</p>
        <div style="font-family:'Malgun Gothic', sans-serif; display: block;width: 100%;margin: 15px 0 0;height: 1px;background: #ccc;"></div>
        <p style="font-family:'Malgun Gothic', sans-serif; font-size: 15px;margin: 10px 0 0;color: #929292;">만약 버튼이 정상적으로 클릭되지 않는다면, 아래의 링크를 복사해서 접속해 주세요.</p>
        <a href="#" style="font-family:'Malgun Gothic', sans-serif; font-size: 15px; margin: 0;color: #929292;">${process.env.OPEN_SERVER_HOST}/auth/email?id=${timeHash}</a>
        <p style="font-family:'Malgun Gothic', sans-serif; margin-top: 50px;font-size: 12px;margin: 50px 0 0;">본 메일은 발신전용 메일이며 문의에 대해 회신 되지 않습니다.</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 40px 0 0;font-size: 12px;">주식회사 브이알에듀&nbsp; |  대표 김재헌&nbsp; |  사업등록번호 485-88-00534</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;font-size: 12px;">개인정보보호 책임자 김재헌&nbsp; |  통신판매업신고번호 제2020-서울강남-03050호&nbsp;관광사업자  |  등록번호 제2021-07호</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;font-size: 12px;">04542 서울특별시 중구 청계천로 100 시그니쳐타워 9층 932호</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;font-size: 12px;">Tel. 070-8221-1839&nbsp;Fax. 02-6322-2736&nbsp;E-Mail. help@enjoystreet.com</p>
      </div>
      `,
      // 가맹점 별도로 안내하는 페이지를 인증 때 전송할지 확인 필요
      storeHtml: `
      <div style="font-family:'Malgun Gothic', sans-serif; padding:20px;">
        <h1 style="font-family:'Malgun Gothic', sans-serif; font-size: 23px;margin: 0;font-weight:bold;">Enjoy Street</h1>
        <h2 style="font-family:'Malgun Gothic', sans-serif; font-weight: normal;font-size: 18px;margin:9px 0 0;">이메일 인증을 진행해 주세요.</h2>
        <p style="font-family:'Malgun Gothic', sans-serif; font-size: 15px;width: 100%;margin: 9px 0 0;display: inline-block;">ENJOY STREET 서비스의 모든 기능을 사용하기 위해서 이메일 인증이 필요합니다.<br>아래의 버튼을 눌러 이메일 인증을 완료해 주세요.</p>
        <a href="${process.env.OPEN_SERVER_HOST}/auth/email?id=${timeHash}" style="font-family:'Malgun Gothic', sans-serif; text-decoration: none;color: #fff;background: #5f63ff;display: inline-block;font-size: 15px;margin: 15px 0 50px;padding: 8px 15px;border-radius: 5px;">이메일 인증</a>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;display: block;font-size: 15px;">감사합니다.</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;display: block;font-size: 15px;">ENJOY STREET 드림</p>
        <div style="font-family:'Malgun Gothic', sans-serif; display: block;width: 100%;margin: 15px 0 0;height: 1px;background: #ccc;"></div>
        <p style="font-family:'Malgun Gothic', sans-serif; font-size: 15px;margin: 10px 0 0;color: #929292;">만약 버튼이 정상적으로 클릭되지 않는다면, 아래의 링크를 복사해서 접속해 주세요.</p>
        <a href="#" style="font-family:'Malgun Gothic', sans-serif; font-size: 15px; margin: 0;color: #929292;">${process.env.OPEN_SERVER_HOST}/auth/email?id=${timeHash}</a>
        <p style="font-family:'Malgun Gothic', sans-serif; margin-top: 50px;font-size: 12px;margin: 50px 0 0;">본 메일은 발신전용 메일이며 문의에 대해 회신 되지 않습니다.</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 40px 0 0;font-size: 12px;">주식회사 브이알에듀&nbsp; |  대표 김재헌&nbsp; |  사업등록번호 485-88-00534</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;font-size: 12px;">개인정보보호 책임자 김재헌&nbsp; |  통신판매업신고번호 제2020-서울강남-03050호&nbsp;관광사업자  |  등록번호 제2021-07호</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;font-size: 12px;">04542 서울특별시 중구 청계천로 100 시그니쳐타워 9층 932호</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;font-size: 12px;">Tel. 070-8221-1839&nbsp;Fax. 02-6322-2736&nbsp;E-Mail. help@enjoystreet.com</p>
      </div>
      `,
      // 가이드 별도로 안내하는 페이지를 인증 때 전송할지 확인 필요
      guideHtml: `
      <div style="font-family:'Malgun Gothic', sans-serif; padding:20px;">
        <h1 style="font-family:'Malgun Gothic', sans-serif; font-size: 23px;margin: 0;font-weight:bold;">Enjoy Street</h1>
        <h2 style="font-family:'Malgun Gothic', sans-serif; font-weight: normal;font-size: 18px;margin:9px 0 0;">이메일 인증을 진행해 주세요.</h2>
        <p style="font-family:'Malgun Gothic', sans-serif; font-size: 15px;width: 100%;margin: 9px 0 0;display: inline-block;">ENJOY STREET 서비스의 모든 기능을 사용하기 위해서 이메일 인증이 필요합니다.<br>아래의 버튼을 눌러 이메일 인증을 완료해 주세요.</p>
        <a href="${process.env.OPEN_SERVER_HOST}/auth/email?id=${timeHash}" style="font-family:'Malgun Gothic', sans-serif; text-decoration: none;color: #fff;background: #5f63ff;display: inline-block;font-size: 15px;margin: 15px 0 50px;padding: 8px 15px;border-radius: 5px;">이메일 인증</a>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;display: block;font-size: 15px;">감사합니다.</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;display: block;font-size: 15px;">ENJOY STREET 드림</p>
        <div style="font-family:'Malgun Gothic', sans-serif; display: block;width: 100%;margin: 15px 0 0;height: 1px;background: #ccc;"></div>
        <p style="font-family:'Malgun Gothic', sans-serif; font-size: 15px;margin: 10px 0 0;color: #929292;">만약 버튼이 정상적으로 클릭되지 않는다면, 아래의 링크를 복사해서 접속해 주세요.</p>
        <a href="#" style="font-family:'Malgun Gothic', sans-serif; font-size: 15px; margin: 0;color: #929292;">${process.env.OPEN_SERVER_HOST}/auth/email?id=${timeHash}</a>
        <p style="font-family:'Malgun Gothic', sans-serif; margin-top: 50px;font-size: 12px;margin: 50px 0 0;">본 메일은 발신전용 메일이며 문의에 대해 회신 되지 않습니다.</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 40px 0 0;font-size: 12px;">주식회사 브이알에듀&nbsp; |  대표 김재헌&nbsp; |  사업등록번호 485-88-00534</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;font-size: 12px;">개인정보보호 책임자 김재헌&nbsp; |  통신판매업신고번호 제2020-서울강남-03050호&nbsp;관광사업자  |  등록번호 제2021-07호</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;font-size: 12px;">04542 서울특별시 중구 청계천로 100 시그니쳐타워 9층 932호</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;font-size: 12px;">Tel. 070-8221-1839&nbsp;Fax. 02-6322-2736&nbsp;E-Mail. help@enjoystreet.com</p>
      </div>
      `,
    };
    const Fails = {
      subject: "[VTS] 비밀번호 재설정",
      TEST: `<div><a href="${process.env.OPEN_SERVER_HOST}/m/auth/reset-password/${mailHash}/${timeHash}"><img src="https://www.saraminimage.co.kr?url=http://www.vreducation.kr/img/20210401_saramin.png"></a></div>`,
      html: `
      <div style="font-family:'Malgun Gothic', sans-serif; padding:20px;">
        <h1 style="font-family:'Malgun Gothic', sans-serif; font-size: 23px;margin: 0;font-weight:bold;">Enjoy Street</h1>
        <h2 style="font-family:'Malgun Gothic', sans-serif; font-weight: normal;font-size: 18px;margin:9px 0 0;">비밀번호 재설정</h2>
        <p style="font-family:'Malgun Gothic', sans-serif; font-size: 15px;width: 100%;margin: 9px 0 0;display: inline-block;">ENJOY STREET 서비스의 모든 기능을 사용하기 위한 비밀번호를 초기화 합니다.<br>비밀번호 재설정 페이지에서 새로운 비밀번호를 입력해주세요</p>
        <a href="${process.env.OPEN_SERVER_HOST}/m/auth/reset-password/${mailHash}/${timeHash}" style="font-family:'Malgun Gothic', sans-serif; text-decoration: none;color: #fff;background: #5f63ff;display: inline-block;font-size: 15px;margin: 15px 0 50px;padding: 8px 15px;border-radius: 5px;">비밀번호 재설정하기</a>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;display: block;font-size: 15px;">감사합니다.</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;display: block;font-size: 15px;">ENJOY STREET 드림</p>
        <div style="font-family:'Malgun Gothic', sans-serif; display: block;width: 100%;margin: 15px 0 0;height: 1px;background: #ccc;"></div>
        <p style="font-family:'Malgun Gothic', sans-serif; font-size: 15px;margin: 10px 0 0;color: #929292;">만약 버튼이 정상적으로 클릭되지 않는다면, 아래의 링크를 복사해서 접속해 주세요.</p>
        <a href="#" style="font-family:'Malgun Gothic', sans-serif; font-size: 15px; margin: 0;color: #929292;">${process.env.OPEN_SERVER_HOST}/m/auth/reset-password/${mailHash}/${timeHash}</a>
        <p style="font-family:'Malgun Gothic', sans-serif; margin-top: 50px;font-size: 12px;margin: 50px 0 0;">본 메일은 발신전용 메일이며 문의에 대해 회신 되지 않습니다.</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 40px 0 0;font-size: 12px;">주식회사 브이알에듀&nbsp; |  대표 김재헌&nbsp; |  사업등록번호 485-88-00534</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;font-size: 12px;">개인정보보호 책임자 김재헌&nbsp; |  통신판매업신고번호 제2020-서울강남-03050호&nbsp;관광사업자  |  등록번호 제2021-07호</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;font-size: 12px;">04542 서울특별시 중구 청계천로 100 시그니쳐타워 9층 932호</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;font-size: 12px;">Tel. 070-8221-1839&nbsp;Fax. 02-6322-2736&nbsp;E-Mail. help@enjoystreet.com</p>
      </div>
      `,
    };
    const dormant = {
      subject: "[VTS] 휴먼계정 인증",
      html: `<div><a href="${process.env.OPEN_SERVER_HOST}/auth/email?id=${timeHash}"><img src="https://www.saraminimage.co.kr?url=http://www.vreducation.kr/img/20210401_saramin.png"></a></div>`,
    };
    const store = {
      subject: "[VTS] 판매점 입점 권한 승인완료",
      html: `
      <div style="font-family:'Malgun Gothic', sans-serif; padding:20px;">
        <h1 style="font-family:'Malgun Gothic', sans-serif; font-size: 23px;margin: 0;font-weight:bold;">Enjoy Street</h1>
        <h2 style="font-family:'Malgun Gothic', sans-serif; font-weight: normal;font-size: 18px;margin:9px 0 0;">판매점 입점 권한 승인완료</h2>
        <p style="font-family:'Malgun Gothic', sans-serif; font-size: 15px;width: 100%;margin: 9px 0 0;display: inline-block;">ENJOY STREET 판매점 권한 승인이 완료되었습니다.<br>ENJOY STREET 의 파트너로 즐거운 서비스를 이용하시기 바랍니다.</p>
        <a href="#" style="font-family:'Malgun Gothic', sans-serif; text-decoration: none;color: #fff;background: #5f63ff;display: inline-block;font-size: 15px;margin: 15px 0 50px;padding: 8px 15px;border-radius: 5px;">ENJOY STREET 바로가기</a>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;display: block;font-size: 15px;">감사합니다.</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;display: block;font-size: 15px;">ENJOY STREET 드림</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin-top: 50px;font-size: 12px;margin: 50px 0 0;">본 메일은 발신전용 메일이며 문의에 대해 회신 되지 않습니다.</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 40px 0 0;font-size: 12px;">주식회사 브이알에듀&nbsp; |  대표 김재헌&nbsp; |  사업등록번호 485-88-00534</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;font-size: 12px;">개인정보보호 책임자 김재헌&nbsp; |  통신판매업신고번호 제2020-서울강남-03050호&nbsp;관광사업자  |  등록번호 제2021-07호</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;font-size: 12px;">04542 서울특별시 중구 청계천로 100 시그니쳐타워 9층 932호</p>
        <p style="font-family:'Malgun Gothic', sans-serif; margin: 0;font-size: 12px;">Tel. 070-8221-1839&nbsp;Fax. 02-6322-2736&nbsp;E-Mail. help@enjoystreet.com</p>
      </div>
      `,
      attachments: [
        {
          filename: "attachment_test.xlsx",
          streamSource: "public/file/attachment_test.xlsx",
        },
      ],
    };
    if (form == "email") {
      return mail;
    } else if (form == "pwFinds") {
      return Fails;
    } else if (form == "dormant") {
      return dormant;
    } else if (form == "store") {
      return store;
    }
  },
};

module.exports = {
  form,
};
