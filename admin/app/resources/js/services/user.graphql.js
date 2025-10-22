import { apolloClient } from "../apollo"; // tu cliente Apollo configurado
import { gql } from "@apollo/client/core";

class UserGraphqlService {
    // Listar usuarios
    async getUsers() {
        const GET_USERS = gql`
            query {
                users {
                    data {
                        id
                        name
                        email
                        phone
                    }
                    paginatorInfo {
                        currentPage
                        lastPage
                        total
                    }
                }
            }
        `;
        const response = await apolloClient.query({ query: GET_USERS });
        return response.data.users;
    }

    // Obtener usuario por ID
    async getUser(id) {
        const GET_USER = gql`
            query getUser($id: ID!) {
                user(id: $id) {
                    id
                    name
                    email
                    phone
                }
            }
        `;
        const response = await apolloClient.query({
            query: GET_USER,
            variables: { id }
        });
        return response.data.user;
    }

    // Crear usuario
    async createUser(data) {
        const CREATE_USER = gql`
            mutation createUser($name: String!, $email: String!, $phone: String) {
                createUser(name: $name, email: $email, phone: $phone) {
                    id
                    name
                    email
                    phone
                }
            }
        `;
        const response = await apolloClient.mutate({
            mutation: CREATE_USER,
            variables: data
        });
        return response.data.createUser;
    }

    // Actualizar usuario
    async updateUser(id, data) {
        const UPDATE_USER = gql`
            mutation updateUser($id: ID!, $name: String, $email: String, $phone: String) {
                updateUser(id: $id, name: $name, email: $email, phone: $phone) {
                    id
                    name
                    email
                    phone
                }
            }
        `;
        const response = await apolloClient.mutate({
            mutation: UPDATE_USER,
            variables: { id, ...data }
        });
        return response.data.updateUser;
    }
}

export default new UserGraphqlService();
