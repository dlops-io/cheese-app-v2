import { BASE_API_URL, uuid } from "./Common";
import axios from 'axios';

const DataService = {
    Init: function () {
        // Any application initialization logic comes here
    },
    GetPodcasts: async function (limit) {
        return await axios.get(BASE_API_URL + "/podcasts?limit=" + limit);
    },
    GetNewsletters: async function (limit) {
        return await axios.get(BASE_API_URL + "/newsletters?limit=" + limit);
    },
    GetChats: async function (limit) {
        return await axios.get(BASE_API_URL + "/chats?limit=" + limit);
    },
    GetChat: async function (id) {
        return await axios.get(BASE_API_URL + "/chat/" + id);
    },
    StartChatWithLLM: async function (message) {
        // Generate unique id
        var id = uuid();
        var now = Date.now();
        now = parseInt(now / 1000);
        message["id"] = uuid();

        return await axios.post(BASE_API_URL + "/chat/" + id, message);
    },
    ChatWithLLM: async function (id, message) {
        message["id"] = uuid();
        return await axios.post(BASE_API_URL + "/chat/" + id, message);
    },
}

export default DataService;