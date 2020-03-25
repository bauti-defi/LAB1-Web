import config from './config.settings.json'


export default class Config {
    
    private static instance: any=undefined;

    static getInstance(): any {
        if(!this.instance){
            this.instance=config.requestBuilderConfig;
        }
        return this.instance;
    }
}