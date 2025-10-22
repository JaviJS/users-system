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
        return axios.put("/users/" + id, data).then((response) => {
            return response.data;
        });
    }
    async deleteUser(id) {
        return axios.delete("/users/" + id).then((response) => {
            return response.data;
        });
    }
}

export default new UserService();
