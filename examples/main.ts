import Odoo from "../src/index";

var odoo = new Odoo({
  url: '<url>',
  port: <port>,
  db: '<database>',
  username: "<username>",
  password: "<api key>",
});

(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    const companyIds = await odoo.execute_kw({
      model: "res.partner",
      method: "search",
      params: [[[["is_company", "=", true]], 0, 5]],
    });

    const companies = await odoo.execute_kw({
      model: "res.partner",
      method: "read",
      params: [[companyIds, ["name", "country_id", "comment"]]],
    });

    console.log("Result: ", companies);

    var a = await odoo.getAllContacts({});
    console.log(a);

    var m = await odoo.getContact({ name: "Andreia" });
    console.log(m);

    var n = await odoo.saveContact({
      name: "TS Test 2",
      phone: "12345678903",
      email: "ts@npm.org",
      company: "Odoo",
      title: "developer",
    });
    console.log(n);

    var c = await odoo.saveCompany({
      name: "Test Company",
      phone: "1234567801123",
      email: "test@company.com",
    });
    console.log(c);
  } catch (err) {
    console.log(err);
  }
})();
