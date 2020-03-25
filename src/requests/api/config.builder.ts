import RequestBuilder from "./request.builder";
import deepmerge from 'deepmerge';
import Config from "./config";

export default class ConfigBuilder<T> {

    private fieldName: string ;
    private callingRequest: RequestBuilder<T>;

    constructor(callingRequest: RequestBuilder<T>) {
        this.callingRequest=callingRequest;
    }

    setFieldName(fieldName: string): void {
        this.fieldName=fieldName;
        this.setField(this.callingRequest,fieldName);
    }

    set(config: any): RequestBuilder<T>{
        this.callingRequest.setConfig(config);
        return this.callingRequest;
    }

    load(configName: string): RequestBuilder<T>{
        this.callingRequest.setConfig(Config.getInstance().config[configName]);
        return this.callingRequest;
    }

    merge(config: any): RequestBuilder<T>{
        this.callingRequest.setConfig(deepmerge(this.callingRequest.getConfig(),config));
        return this.callingRequest;
    }

    pull(configName: string): RequestBuilder<T> {
        this.callingRequest.setConfig(deepmerge(this.callingRequest.getConfig(),Config.getInstance().config[configName]));
        return this.callingRequest;
    }

    add(key: string, value: string): ConfigBuilder<T> {
        this.callingRequest.getConfig()[this.fieldName][key]=value;
        return this;
    }

    and(): RequestBuilder<T> {
        return this.callingRequest;
    }

    private setField(callingRequest: RequestBuilder<T>, fieldName: string): void {
        if(!callingRequest.getConfig()[fieldName]){
            callingRequest.getConfig()[fieldName]={};
        }
    }
}