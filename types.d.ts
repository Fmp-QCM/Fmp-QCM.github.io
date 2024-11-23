interface Window {
    api: {
        decode(data: object): Promise<any>;
        encode(data: object): Promise<any>;
    };
}
