import RequestBuilder from "./api/request.builder"

const ENDPOINT:string = 'auth/login'

export const logIn =  async (email:string, password:string): Promise<string> => {

    const dto: logInDTO = {email, password}

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

interface logInDTO {
    readonly email: string;
    readonly password:string;
}