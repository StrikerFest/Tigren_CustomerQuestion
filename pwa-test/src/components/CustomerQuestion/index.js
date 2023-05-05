/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright  Copyright (c)  2023.  Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

import React, {  useContext } from 'react';
import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client';
import { ApolloProvider} from 'react-apollo';
import { QuestionProvider, QuestionContext } from './context/QuestionContext';

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
    const { setQuestionData } = useContext(QuestionContext);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {error.message}</p>;

    const handleQuestionClick = (question) => {
        setQuestionData(question);
        window.location.href = `https://pwa-test.local.pwadev:8525/tigren_question/edit/${question.question_id}`;
    };

    return (
        <ul>
            {data.customerQuestions.items.map(customerQuestion => (
                <li key={customerQuestion.question_id}>
                    <hr/>
                    Customer name: {customerQuestion.customer_name}
                    <br/>
                    Title: {customerQuestion.title}
                    <br/> Content: {customerQuestion.content}
                    <button onClick={() => handleQuestionClick(customerQuestion)}>
                        Edit question
                    </button>
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

                <QuestionProvider>
                    <QuestionList />
                </QuestionProvider>
            </div>
        </ApolloProvider>
    );
};

export default CustomerQuestion;
