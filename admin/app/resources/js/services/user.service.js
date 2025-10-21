import axios from "axios";

class UserService {
    async getUsers() {
        return axios.get("/users").then((response) => {
            return response.data;
        });
    }
    async getUser(id) {
        return axios.get("/users/" + id).then((response) => {
            return response.data;
        });
    }
    async createUser(data) {
        return axios.post("/users", data).then((response) => {
            return response.data;
        });
    }
    async updateUser(id, data) {
        console.log(id, data);
        return axios.put("/users/" + id, data).then((response) => {
            return response.data;
        });
    }
    // async updatePassword(config, data) {
    //     return api
    //         .put("/api/v2/external_users/update_password", data, config)
    //         .then((response) => {
    //             return response.data;
    //         });
    // }
}

export default new UserService();
