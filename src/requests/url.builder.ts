import RequestBuilder from './request.builder';
import Config  from './Config';

export default class UrlBuilder<T>{

    private callingBuilder: RequestBuilder<T>;

    constructor(callingBuilder: RequestBuilder<T>){
        this.callingBuilder=callingBuilder;
    }

    set(baseUrl: string): RequestBuilder<T>{
        this.callingBuilder.setBaseUrl(baseUrl);
        return this.callingBuilder;
    }

    load(urlName: string): RequestBuilder<T>{
        this.callingBuilder.setBaseUrl(Config.getInstance().baseUrl[urlName]);
        return this.callingBuilder;
    }
}