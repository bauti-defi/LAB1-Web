import RequestBuilder from "./api/request.builder"

const ENDPOINT:string = 'admin/register'

export const register =  async (email:string, password:string, name:string): Promise<any> => {

    const dto: registerDTO = {email, password, name}

    const request = RequestBuilder.create<string>()
    .baseURL()
    .load('testHostBauti')
    .config()
    .load('basicConfig')
    .post()
    .endPoint(ENDPOINT)
    .payLoad(dto)
    .build();

    return await request.execute()
}

interface registerDTO {
    readonly email: string;
    readonly password:string;
    readonly name: string;
}