import { RequestType } from "./request.type";
import RequestBuilder from "./request.builder"
import Axios, { AxiosInstance } from "axios";

export default class Request<T> {
    
    axiosInstance: AxiosInstance;
    endPoint: string;
    config: any;
    requestType: RequestType;
    baseUrl: string;
    payload?: any;

    constructor(builder: RequestBuilder<T>){
        this.baseUrl=builder.getBaseUrl();
        this.axiosInstance=Axios.create({baseURL: this.baseUrl});;
        this.endPoint=builder.getEndPoint();
        this.config=builder.getConfig();
        this.requestType=builder.getRequestType();
        this.payload=builder.getPayload();
    }
    
    async execute(): Promise<T> {
        switch(this.requestType) {
            case RequestType.GET:
                return this.getRequest();
            case RequestType.POST:
                return this.postRequest();
            case RequestType.PUT:
                return this.putRequest();
            case RequestType.DELETE:
                return this.deleteRequest();
            case RequestType.PATCH:
                return this.patchRequest();
        }
    }

    toJson(): string{
        return JSON.stringify(this);
    }

    private async getRequest(): Promise<T> { 
        const response= await this.axiosInstance.get(this.endPoint,this.config);
        return <T>(response.data);
    }

    private async postRequest(): Promise<T> {
        const response= await this.axiosInstance.post(this.endPoint,this.payload,this.config);
        return <T>(response.data); 
    }

    private async putRequest(): Promise<T> {
        const response= await this.axiosInstance.put(this.endPoint,this.payload,this.config);
        return <T>(response.data);  
    }

    private async deleteRequest(): Promise<T> {
        const response= await this.axiosInstance.delete(this.endPoint,this.config);
        return <T>(response.data); 
    }

    private async patchRequest(): Promise<T> {
        const response= await this.axiosInstance.patch(this.endPoint,this.payload,this.config);
        return <T>(response.data); 
    }
}