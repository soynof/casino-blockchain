class AnyService {
    static async LogMessageToConsole(message, channel){
        console.log(`${channel}: ${message}`);
    }
}

export default AnyService;