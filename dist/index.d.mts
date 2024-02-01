import { Client } from 'xmlrpc';

type OdooConfig = {
    url: string;
    port?: number;
    db: string;
    username: string;
    password: string;
    secure?: boolean;
};
type ExecuteKwParams = {
    model: string;
    method: string;
    params: any[];
};
type AbstractExecuteParams = {
    endpoint: string;
    client: Client;
    params: any[];
};
type RenderReportParams = {
    report: string;
    params: any[];
};
type GetAllContactsParams = {
    fields?: any[];
    isCompany?: boolean;
};
type GetAllCompaniesParams = {
    fields?: any[];
};
type GetContactParams = {
    name: string;
    fields?: any[];
    isCompany?: boolean;
};
type GetCompanyParams = {
    name: string;
    fields?: any[];
};
type SaveContactParams = {
    name: string;
    phone: string;
    email: string;
    company: string;
    company_id?: number;
    title: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
    };
};
type SaveCompanyParams = {
    name: string;
    phone: string;
    email: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
    };
};

declare class Odoo {
    config: OdooConfig;
    host: string;
    port: number;
    db: string;
    username: string;
    password: string;
    secure: boolean;
    uid: number;
    constructor(config: OdooConfig);
    private getClient;
    private methodCall;
    connect(): Promise<number>;
    execute<T = any>({ client, endpoint, params }: AbstractExecuteParams): Promise<T>;
    execute_kw<T = any>({ model, method, params, }: ExecuteKwParams): Promise<T>;
    exec_workflow<T = any>({ model, method, params, }: ExecuteKwParams): Promise<T>;
    render_report<T = any>({ report, params, }: RenderReportParams): Promise<T>;
    getAllContacts<T = any>({ fields, isCompany }: GetAllContactsParams): Promise<T>;
    getAllCompanies<T = any>({ fields, }: GetAllCompaniesParams): Promise<T>;
    getContact<T = any>({ name, fields, isCompany }: GetContactParams): Promise<T>;
    getCompany<T = any>({ name, fields, }: GetCompanyParams): Promise<T>;
    saveContact<T = any>({ name, phone, email, company, title, company_id, address, }: SaveContactParams): Promise<T>;
    saveCompany<T = any>({ name, phone, email, address, }: SaveCompanyParams): Promise<T>;
}

export { Odoo as default };
