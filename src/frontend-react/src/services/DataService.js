import { BASE_API_URL } from "./Common";
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
    ChatWithLLM: async function (id, chat_data) {
        return await axios.post(BASE_API_URL + "/chat/" + id, chat_data);
    },
}

export default DataService;