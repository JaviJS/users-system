// import { apolloClient } from "../apollo";
// import { gql } from "@apollo/client/core";

// class UserGraphqlService {
//     // Listar usuarios
//     async getUsers() {
//         const GET_USERS = gql`
//             query {
//                 users {
//                     id
//                     name
//                     email
//                     phone
//                     created_at
//                     updated_at
//                 }
//             }
//         `;
//         const response = await apolloClient.query({ query: GET_USERS });
//         return response.data.users;
//     }

//     // Obtener usuario por ID
//     async getUser(id) {
//         const GET_USER = gql`
//             query getUser($id: ID!) {
//                 user(id: $id) {
//                     id
//                     name
//                     email
//                     phone
//                 }
//             }
//         `;
//         const response = await apolloClient.query({
//             query: GET_USER,
//             variables: { id }
//         });
//         return response.data.user;
//     }

//     // Crear usuario
//     async createUser(data) {
//         const CREATE_USER = gql`
//             mutation createUser($name: String!, $email: String!, $phone: String) {
//                 createUser(name: $name, email: $email, phone: $phone) {
//                     id
//                     name
//                     email
//                     phone
//                 }
//             }
//         `;
//         const response = await apolloClient.mutate({
//             mutation: CREATE_USER,
//             variables: data
//         });
//         return response.data.createUser;
//     }

//     // Actualizar usuario
//     async updateUser(id, data) {
//         const UPDATE_USER = gql`
//             mutation updateUser($id: ID!, $name: String, $email: String, $phone: String) {
//                 updateUser(id: $id, name: $name, email: $email, phone: $phone) {
//                     id
//                     name
//                     email
//                     phone
//                 }
//             }
//         `;
//         const response = await apolloClient.mutate({
//             mutation: UPDATE_USER,
//             variables: { id, ...data }
//         });
//         return response.data.updateUser;
//     }
// }

// export default new UserGraphqlService();
import { apolloClient } from "../apollo";
import { gql } from "@apollo/client/core";

class UserGraphqlService {
    // -------------------
    // Listar usuarios
    // -------------------
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
        const response = await apolloClient.query({ query: GET_USERS });
        return response.data.users;
    }

    // -------------------
    // Obtener usuario por ID o email
    // -------------------
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

    // -------------------
    // Actualizar usuario
    // -------------------
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

    // -------------------
    // Eliminar usuario
    // -------------------
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
