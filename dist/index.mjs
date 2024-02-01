// src/index.ts
import { createClient, createSecureClient } from "xmlrpc";
var Odoo = class {
  config;
  host;
  port;
  db;
  username;
  password;
  secure;
  uid = 0;
  constructor(config) {
    this.config = config;
    const { hostname, port, protocol } = new URL(config.url);
    this.host = hostname;
    this.port = config.port || Number(port);
    this.db = config.db;
    this.username = config.username;
    this.password = config.password;
    this.secure = true;
    if (protocol !== "https:") {
      this.secure = false;
    }
    this.uid = 0;
  }
  getClient(path) {
    const createClientFn = this.secure ? createSecureClient : createClient;
    return createClientFn({
      host: this.host,
      port: this.port,
      path
    });
  }
  methodCall(client, method, params = []) {
    return new Promise((resolve, reject) => {
      client.methodCall(method, params, (err, value) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        if (value.length == 1)
          return resolve(value[0]);
        else if (value.length > 0)
          return resolve(value);
        else if (["read", "search", "search_read"].includes(params[4]))
          return reject("Not found");
        else
          return resolve(value);
      });
    });
  }
  connect() {
    const client = this.getClient("/xmlrpc/2/common");
    return new Promise((resolve, reject) => {
      client.methodCall(
        "authenticate",
        [this.db, this.username, this.password, {}],
        (error, value) => {
          if (error) {
            return reject(error);
          }
          if (!value) {
            return reject(new Error("No UID returned from authentication."));
          }
          this.uid = value;
          return resolve(this.uid);
        }
      );
    });
  }
  async execute({ client, endpoint, params }) {
    try {
      const value = await this.methodCall(client, endpoint, [
        this.db,
        this.uid,
        this.password,
        ...params
      ]);
      return Promise.resolve(value);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async execute_kw({
    model,
    method,
    params
  }) {
    const client = this.getClient("/xmlrpc/2/object");
    return this.execute({
      client,
      endpoint: "execute_kw",
      params: [model, method, ...params]
    });
  }
  async exec_workflow({
    model,
    method,
    params
  }) {
    const client = this.getClient("/xmlrpc/2/object");
    return this.execute({
      client,
      endpoint: "exec_workflow",
      params: [model, method, ...params]
    });
  }
  async render_report({
    report,
    params
  }) {
    const client = this.getClient("/xmlrpc/2/report");
    return this.execute({
      client,
      endpoint: "render_report",
      params: [report, ...params]
    });
  }
  async getAllContacts({
    fields = ["name", "phone", "email", "company_name", "function"],
    isCompany = false
  }) {
    return this.execute_kw({
      model: "res.partner",
      method: "search_read",
      params: [
        [
          [["is_company", "=", isCompany]],
          fields
        ]
      ]
    });
  }
  async getAllCompanies({
    fields = ["name", "phone", "email", "country_id"]
  }) {
    return this.getAllContacts({
      fields,
      isCompany: true
    });
  }
  async getContact({
    name,
    fields = ["name", "phone", "email", "company_name", "function"],
    isCompany = false
  }) {
    return this.execute_kw({
      model: "res.partner",
      method: "search_read",
      params: [
        [
          [["is_company", "=", isCompany], ["name", "like", name]],
          fields
        ]
      ]
    });
  }
  async getCompany({
    name,
    fields = ["name", "phone", "email", "country_id"]
  }) {
    return this.getContact({
      name,
      fields,
      isCompany: true
    });
  }
  async saveContact({
    name,
    phone,
    email,
    company,
    title,
    company_id,
    address
  }) {
    var contact = {
      name,
      phone,
      email,
      company_name: company,
      company_id: company_id || null,
      function: title
    };
    try {
      const record = await this.execute_kw({
        model: "res.partner",
        method: "search",
        params: [
          [[["is_company", "=", false], ["name", "=", name]]]
        ]
      });
      this.execute_kw({
        model: "res.partner",
        method: "write",
        params: [[record, contact]]
      });
      return Promise.resolve(record);
    } catch (err) {
      if (err === "Not found") {
        return this.execute_kw({
          model: "res.partner",
          method: "create",
          params: [[[contact]]]
        });
      } else
        return Promise.reject("Error");
    }
  }
  async saveCompany({
    name,
    phone,
    email,
    address
  }) {
    const contact = {
      name,
      phone,
      email,
      is_company: true
    };
    try {
      const record = await this.execute_kw({
        model: "res.partner",
        method: "search",
        params: [
          [[["is_company", "=", true], ["name", "=", name]]]
        ]
      });
      this.execute_kw({
        model: "res.partner",
        method: "write",
        params: [[record, contact]]
      });
      return Promise.resolve(record);
    } catch (err) {
      if (err === "Not found") {
        return this.execute_kw({
          model: "res.partner",
          method: "create",
          params: [[[contact]]]
        });
      } else
        return Promise.reject("Error");
    }
  }
};
var src_default = Odoo;
export {
  src_default as default
};
//# sourceMappingURL=index.mjs.map