# odoo-ts

Node.js TypeScript client library for [odoo](https://www.odoo.com/) ERP using xmlrpc.

## Node version

Works better with NodeJS v11.16 and further

## Installation

```sh
$ npm install odoo-ts
```

## Methods

### odoo.connect(callback)

### odoo.execute_kw(model,method,params,callback)

### odoo.exec_workflow(model,method,params,callback)

### odoo.render_report(report,params,callback)

## Usage

```js
import Odoo from "odoo-api-ts";
```

### Configuration

```js
import Odoo from "odoo-api-ts";

var odoo = new Odoo({
  url: "<url>",
  port: "<port>",
  db: "<database>",
  username: "<username>",
  password: "<api key>",
});
```

### Logging in

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);
  } catch (err) {
    console.log(err);
  }
})();
```

### Module Specific Usage

#### Contacts & Companies

##### Get All Contacts

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    const contacts = await odoo.getAllContacts({});
    console.log(contacts);
  } catch (err) {
    console.log(err);
  }
})();
```

##### Get Contact(s) by name

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    const contacts = await odoo.getContact({ name: "Mark" });
    console.log(contacts);
  } catch (err) {
    console.log(err);
  }
})();
```

##### Get All Companies

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    const companies = await odoo.getAllCompanies({});
    console.log(companies);
  } catch (err) {
    console.log(err);
  }
})();
```

##### Get Company(ies) by name

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    const companies = await odoo.getCompany({ name: "Odoo" });
    console.log(companies);
  } catch (err) {
    console.log(err);
  }
})();
```

##### Save Contact

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    var contact = await odoo.saveContact({
      name: "TS Test",
      phone: "12345678903",
      email: "ts@npm.org",
      company: "Odoo",
      title: "developer",
    });
    console.log(contact);
  } catch (err) {
    console.log(err);
  }
})();
```

##### Save Company

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    var company = await odoo.saveCompany({
      name: "Test Company",
      phone: "1234567801123",
      email: "test@company.com",
    });
    console.log(company);
  } catch (err) {
    console.log(err);
  }
})();
```

### Basic API Access

#### List Records

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    const companyIds = await odoo.execute_kw({
      model: "res.partner",
      method: "search",
      params: [[[["is_company", "=", true]], 0, 5]],
    });
  } catch (err) {
    console.log(err);
  }
})();
```

#### Pagination

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    const companyIds = await odoo.execute_kw({
      model: "res.partner",
      method: "search",
      params: [
        [
          [["is_company", "=", true]],
          0, //offset
          5, //limit
        ],
      ],
    });
  } catch (err) {
    console.log(err);
  }
})();
```

#### Count records

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    const count = await odoo.execute_kw({
      model: "res.partner",
      method: "search_count",
      params: [[[["is_company", "=", true]]]],
    });
  } catch (err) {
    console.log(err);
  }
})();
```

#### Read records

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    const companyIds = await odoo.execute_kw({
      model: "res.partner",
      method: "search",
      params: [[[["is_company", "=", true]], 0, 1]],
    });

    const companies = await odoo.execute_kw({
      model: "res.partner",
      method: "read",
      params: [[companyIds]],
    });

    console.log("Result: ", companies);
  } catch (err) {
    console.log(err);
  }
})();
```

#### Read records filtered by fields

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    const companyIds = await odoo.execute_kw({
      model: "res.partner",
      method: "search",
      params: [[[["is_company", "=", true]], 0, 1]],
    });

    const companies = await odoo.execute_kw({
      model: "res.partner",
      method: "read",
      params: [[companyIds, ["name", "country_id", "comment"]]],
    });

    console.log("Result: ", companies);
  } catch (err) {
    console.log(err);
  }
})();
```

#### Listing record fields

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    const companies = await odoo.execute_kw({
      model: "res.partner",
      method: "fields_get",
      params: [[[[], [], [], ["string"]]]],
    });

    console.log("Result: ", companies);
  } catch (err) {
    console.log(err);
  }
})();
```

#### Search and read

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    const companies = await odoo.execute_kw({
      model: "res.partner",
      method: "search_read",
      params: [
        [[["is_company", "=", true]], ["name", "country_id", "comment"], 0, 5],
      ],
    });

    console.log("Result: ", companies);
  } catch (err) {
    console.log(err);
  }
})();
```

#### Create records

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    const company = await odoo.execute_kw({
      model: "res.partner",
      method: "create",
      params: [[[{ name: "New Partner" }]]],
    });

    console.log("Result: ", company);
  } catch (err) {
    console.log(err);
  }
})();
```

#### Update records

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    const result = await odoo.execute_kw({
      model: "res.partner",
      method: "write",
      params: [[238, { name: "New Partner Updated" }]],
    });

    console.log("Result: ", result);
  } catch (err) {
    console.log(err);
  }
})();
```

#### Delete records

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    const company = await odoo.execute_kw({
      model: "res.partner",
      method: "unlink",
      params: [[[238]]],
    });

    console.log("Result: ", company);
  } catch (err) {
    console.log(err);
  }
})();
```

#### Report printing

```js
(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    const invoiceIds = await odoo.execute_kw({
      model: "account.move", //Since Odoo 13, account.invoice has been replaced by account.move
      method: "search",
      params: [[[["move_type", "=", "in_invoice"]]]],
    });

    console.log("invoiceIds: ", invoiceIds);

    const [reportId] = await odoo.execute_kw({
      model: "ir.actions.report",
      method: "search",
      params: [[[["report_type", "=", "qweb-pdf"]]]],
    });

    // I don't find the action to get pdf in doc
  } catch (err) {
    console.log(err);
  }
})();
```

## Reference

- [Odoo Technical Documentation](https://www.odoo.com/documentation/8.0)
- [Odoo Web Service API](https://www.odoo.com/documentation/8.0/api_integration.html)

## License

Copyright 2024 Reyem Technlogies Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
