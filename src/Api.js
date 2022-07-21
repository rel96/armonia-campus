import { axios } from "axios";

const display = () => {
    return axios.get(url + "/articles?sort=createdAt");
};

const create = (article) => {
    return axios.post(url + "/articles", article);
};

const remove = (id) => {
    return axios.delete(url + `/articles/${id}`);
};

export default {
    books: {
        display,
        create,
        remove,
    }
};