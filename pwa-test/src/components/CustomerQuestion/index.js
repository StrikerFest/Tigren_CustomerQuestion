/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright  Copyright (c)  2023.  Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

import React, { useState } from 'react';
import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: 'https://pwa-test.local.pwadev:8525/graphql',
    cache: new InMemoryCache()
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
    const { loading, error, data, refetch } = useQuery(GET_QUESTIONS, {
        variables: {
            pageSize: 5,
            currentPage: 1
        },
        fetchPolicy: 'network-only'
    });

    const handlePageChange = (pageNumber) => {
        refetch({ currentPage: pageNumber });
    };
    React.useEffect(() => {
        refetch();
    }, [refetch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {error.message}</p>;

    const handleQuestionClick = (question) => {
        setQuestionData(question);
        window.location.href = `https://pwa-test.local.pwadev:8525/tigren_question/edit/${question.question_id}`;
    };
    return (
        <div>
            <ul>
                {data.customerQuestions.items.map(customerQuestion => (
                    <li key={customerQuestion.question_id}>
                        <hr />
                        Customer name: {customerQuestion.customer_name}
                        <br />
                        Title: {customerQuestion.title}
                        <br /> Content: {customerQuestion.content}
                        <br />
                        <button onClick={() => handleQuestionClick(customerQuestion)}>
                            Edit question
                        </button>
                    </li>
                ))}
            </ul>
            Pagination
            <Pagination
                initialPageSize={data.customerQuestions.pageInfo.page_size}
                initialCurrentPage={data.customerQuestions.pageInfo.current_page}
                totalPages={data.customerQuestions.pageInfo.total_pages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

const Pagination = ({ initialPageSize, initialCurrentPage, totalPages, onPageChange }) => {
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [currentPage, setCurrentPage] = useState(initialCurrentPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        onPageChange(pageNumber);
    };

    const arr = [];
    for (let i = 1; i <= totalPages; i++) {
        arr.push(i);
    }
    return (
        <div>
            {arr.map(pageNumber => (
                <span
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    style={{ cursor: 'pointer' }}
                > {pageNumber} </span>
            ))}
        </div>
    );
};

const CustomerQuestion = () => {
    return (
        <ApolloProvider client={client}>
            <div>
                <h1>Question</h1>
                <hr />
                <QuestionList />
            </div>
        </ApolloProvider>
    );
};

export default CustomerQuestion;
