import { gql } from '@apollo/client';

export const QUERY_STUDENT = gql`
    query Student($id: ID!, $firstname: String, $lastname: String) {
        student(id: $id, firstname: $firstname, lastname: $lastname) {
            id
            firstName
            lastName
            email
            openEmploy
            projects {
                id
                name
                baseLanguage
                openCollab
                description
            }
        }
    }
`;

export const QUERY_STUDENTS = gql`
    query Students {
        students {
            id
            firstName
            lastName
            email
            openEmploy
        }
    }
`;

export const QUERY_PROJECT = gql`
    query Project($id: ID!, $name: String) {
        project(id: $id, name: $name) {
            id
            name
            baseLanguage
            openCollab
            description
            student {
                id
                firstName
                lastName
                email
                openEmploy
            }
        }
    }
`;

export const QUERY_PROJECTS = gql`
    query Projects {
        projects {
            id
            name
            baseLanguage
            openCollab
            description
            student {
                id
                firstName
                lastName
                email
                openEmploy
            }
        }
    }
`;

export const QUERY_ME = gql`
    query me {
        me {
            id
            firstName
            lastName
            email
            openEmploy
            image
            projects {
                id
                name
                baseLanguage
                openCollab
                description
            }
        }
    }
`;