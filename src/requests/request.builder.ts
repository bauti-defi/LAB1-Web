import { RequestType } from "./request.type";
import ConfigBuilder from "./config.builder";
import UrlBuilder from "./url.builder";
import Request from './request';

export default class RequestBuilder<T> {

    private request_type: RequestType=undefined;
    private configuration: any={};
    private end_point: string='';
    private pay_load: any={};
    private baseUrl: string;

    static create<T>(): RequestBuilder<T>{
        return new RequestBuilder<T>();
    }

    fromJson(json:string): RequestBuilder<T>{
        const pojo=JSON.parse(json);
        this.request_type=RequestType[RequestType[pojo.requestType]];
        this.configuration=pojo.config;
        this.end_point=pojo.endPoint;
        this.pay_load=pojo.payload;
        this.baseUrl=pojo.baseUrl;
        return this;
    }

    get(): RequestBuilder<T> {
        this.request_type=RequestType.GET;
        return this;
    }

    post(): RequestBuilder<T> {
        this.request_type=RequestType.POST;
        return this;
    }

    put(): RequestBuilder<T> {
        this.request_type=RequestType.PUT;
        return this;
    }

    patch(): RequestBuilder<T> {
        this.request_type=RequestType.PATCH;
        return this;
    }

    delete(): RequestBuilder<T> {
        this.request_type=RequestType.DELETE;
        return this;
    }

    baseURL(): UrlBuilder<T>{
        return new UrlBuilder<T>(this);
    }

    endPoint(endPoint: string): RequestBuilder<T> {
        this.end_point=endPoint;
        return this;
    }

    headers(): ConfigBuilder<T> {
        return this.configField('headers');
    }

    params(): ConfigBuilder<T> {
        return this.configField('params');
    }

    configField(fieldName: string): ConfigBuilder<T> {
        const builder= new ConfigBuilder<T>(this);
        builder.setFieldName(fieldName);
        return builder;
    }

    config(): ConfigBuilder<T> {
        return new ConfigBuilder<T>(this);
    }

    payLoad(load: any): RequestBuilder<T> {
        this.pay_load=load;
        return this;
    }

    getRequestType(): RequestType{
        return this.request_type;
    }

    getConfig(): any {
        return this.configuration;
    }

    getEndPoint(): string {
        return this.end_point;
    }

    getPayload(): any{
        return this.pay_load;
    }

    getBaseUrl(): string {
        return this.baseUrl;
    }

    setConfig(config: any): void {
        this.configuration=config;
    }

    setBaseUrl(baseUrl: string): void {
        this.baseUrl=baseUrl;
    }

    build(): Request<T>{
        return new Request<T>(this);
    }
}