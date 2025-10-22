import { apolloClient } from "../apollo";
import { gql } from "@apollo/client/core";

class UserGraphqlService {
    async getUsers() {
        const GET_USERS = gql`
            query {
                users {
                    id
                    name
                    email
                    phone
                    created_at
                    updated_at
                }
            }
        `;
        const response = await apolloClient.query({
            query: GET_USERS,
            fetchPolicy: "no-cache",
        });

        return response.data.users;
    }
    async getUser(id) {
        const GET_USER = gql`
            query Users($id: ID) {
                user(id: $id) {
                    id
                    name
                    email
                    phone
                    created_at
                    updated_at
                }
            }
        `;

        const response = await apolloClient.query({
            query: GET_USER,
            variables: { id: id || null },
        });

        return response.data.user;
    }

    async createUser(data) {
        const CREATE_USER = gql`
            mutation createUser($input: CreateUserInput!) {
                createUser(input: $input) {
                    code
                    status
                    message
                    data {
                        id
                        name
                        email
                        phone
                    }
                }
            }
        `;
        const response = await apolloClient.mutate({
            mutation: CREATE_USER,
            variables: { input: data },
        });
        return response.data.createUser;
    }

    async updateUser(id, data) {
        const UPDATE_USER = gql`
            mutation updateUser($id: ID!, $input: UpdateUserInput!) {
                updateUser(id: $id, input: $input) {
                    code
                    status
                    message
                    data {
                        id
                        name
                        email
                        phone
                        created_at
                        updated_at
                    }
                }
            }
        `;
        const response = await apolloClient.mutate({
            mutation: UPDATE_USER,
            variables: { id, input: data },
        });
        return response.data.updateUser;
    }

    async deleteUser(id) {
        const DELETE_USER = gql`
            mutation deleteUser($id: ID!) {
                deleteUser(id: $id) {
                    code
                    status
                    message
                    data
                }
            }
        `;
        const response = await apolloClient.mutate({
            mutation: DELETE_USER,
            variables: { id },
        });
        return response.data.deleteUser;
    }
}

export default new UserGraphqlService();
