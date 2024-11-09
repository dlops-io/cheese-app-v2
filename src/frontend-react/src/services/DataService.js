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
    GetChats: async function (model, limit) {
        return await axios.get(BASE_API_URL + "/" + model + "/chats?limit=" + limit);
    },
    GetChat: async function (model, chat_id) {
        return await axios.get(BASE_API_URL + "/" + model + "/chats/" + chat_id);
    },
    StartChatWithLLM: async function (model, message) {
        return await axios.post(BASE_API_URL + "/" + model + "/chats/", message);
    },
    ContinueChatWithLLM: async function (model, chat_id, message) {
        return await axios.post(BASE_API_URL + "/" + model + "/chats/" + chat_id, message);
    },
    GetChatMessageImage: function (model, image_path) {
        return BASE_API_URL + "/" + model + "/" + image_path;
    },
}

export default DataService;