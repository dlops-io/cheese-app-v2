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
        return await axios.get(BASE_API_URL + "/llm/chats?limit=" + limit);
    },
    GetChat: async function (chat_id) {
        return await axios.get(BASE_API_URL + "/llm/chats/" + chat_id);
    },
    StartChatWithLLM: async function (message) {
        return await axios.post(BASE_API_URL + "/llm/chats/", message);
    },
    ContinueChatWithLLM: async function (chat_id, message) {
        return await axios.post(BASE_API_URL + "/llm/chats/" + chat_id, message);
    },
    GetChatMessageImage: function (image_path) {
        return BASE_API_URL + "/llm/" + image_path;
    },
}

export default DataService;