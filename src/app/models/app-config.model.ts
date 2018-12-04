export interface IAppConfig {
    env: {
        name: string;
    };
    apiServer: {
        url: string
    };
    auth : {
        google: {
            client_id: string,
            redirect_uri: string,
        }
    }
}