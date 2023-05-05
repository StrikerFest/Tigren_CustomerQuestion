/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright  Copyright (c)  2023.  Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

import React from 'react';
import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client';
import { ApolloProvider, Query } from 'react-apollo';

const client = new ApolloClient({
    uri: 'https://pwa-test.local.pwadev:8525/graphql',
    cache: new InMemoryCache(),
});

const GET_QUESTIONS = gql`
    query GetQuestions($pageSize: Int!, $currentPage: Int!) {
        customerQuestions(page_size: $pageSize, current_page: $currentPage) {
            items {
                question_id
                customer_name
                title
                content
                created_at
                updated_at
            }
            total_count
            pageInfo {
                current_page
                page_size
                total_pages
            }
        }
    }
`;

const QuestionList = () => {
    const { loading, error, data } = useQuery(GET_QUESTIONS, {
        variables: {
            pageSize: 10,
            currentPage: 1,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {error.message}</p>;

    return (
        <ul>
            {data.customerQuestions.items.map(customerQuestion => (
                <li key={customerQuestion.question_id}>
                    Customer name: {customerQuestion.customer_name}<br/>Title: {customerQuestion.title}<br/> Content: {customerQuestion.content} <hr/>
                </li>
            ))}
        </ul>
    );
};

const CustomerQuestion = () => {
    return (
        <ApolloProvider client={client}>
            <div>
                <h1>Question</h1>
                <hr/>
                <QuestionList />
            </div>
        </ApolloProvider>
    );
};

export default CustomerQuestion;
