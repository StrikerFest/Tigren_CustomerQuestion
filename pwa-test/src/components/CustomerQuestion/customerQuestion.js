/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright  Copyright (c)  2023.  Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

import React, {useState ,useEffect} from 'react';
import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client';
import { ApolloProvider, useMutation } from 'react-apollo';
import { backgroundColor } from 'tailwindcss/lib/plugins';

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

const CREATE_QUESTION = gql`
    mutation CreateQuestion($input: CreateQuestionInput!) {
        createQuestion(input: $input) {
            question {
                question_id
                created_at
                updated_at
                customer_name
                title
                content
            }
        }
    }
`;

const UPDATE_QUESTION = gql`
    mutation updateQuestion($id: ID!, $input: UpdateQuestionInput!) {
        updateQuestion(id: $id, input: $input) {
                question_id
                created_at
                updated_at
                customer_name
                title
                content
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
    console.log("DATA",data);
    return (
        <ul>
            {data.customerQuestions.items.map(customerQuestion => (
                <li key={customerQuestion.question_id}>
                    <hr/>
                    Customer name: {customerQuestion.customer_name}<br/>Title: {customerQuestion.title}<br/> Content: {customerQuestion.content}
                    <QuestionEdit question={customerQuestion}/>
                    <hr/>
                </li>
            ))}
        </ul>
    );
};


const QuestionCreate = () => {
    const [formValues, setFormValues] = useState({
        customer_name: '',
        title: '',
        content: ''
    });

    const [submitQuestion] = useMutation(CREATE_QUESTION);

    const handleSubmit = (event) => {
        event.preventDefault();
        submitQuestion({
            variables: {
                input: formValues
            }
        }).then(() => {
            setFormValues({
                customer_name: '',
                title: '',
                content: ''
            });
        });
        setFormValues({
            customer_name: '',
            title: '',
            content: ''
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="customer_name" value={formValues.customer_name} onChange={handleChange} />
            </label>
            <label>
                Title:
                <input type="text" name="title" value={formValues.title} onChange={handleChange} />
            </label>
            <label>
                Content:
                <textarea name="content" value={formValues.content} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

const QuestionEdit = ({ question }) => {
    const [formValues, setFormValues] = useState({
        customer_name: question.customer_name,
        title: question.title,
        content: question.content
    });

    const [updateQuestion] = useMutation(UPDATE_QUESTION);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("DATA LOG",question.question_id);
        updateQuestion({
            variables: {
                id: question.question_id,
                input: formValues
            }
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="form-container" style={{ backgroundColor: 'white' }} >
            <table >
                <thead>
                <tr>
                    <td colSpan={2}>EDIT</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{ border: 'black solid 1px', padding: '5px' }}>Name:</td>
                    <td style={{ border: 'black solid 1px', padding: '5px' }}>
                        <input type="text" name="customer_name" value={formValues.customer_name} onChange={handleChange} className="form-input" />
                    </td>
                </tr>
                <tr>
                    <td style={{ border: 'black solid 1px', padding: '5px' }}>Title:</td>
                    <td style={{ border: 'black solid 1px', padding: '5px' }}>
                        <input type="text" name="title" value={formValues.title} onChange={handleChange} className="form-input" />
                    </td>
                </tr>
                <tr>
                    <td style={{ border: 'black solid 1px', padding: '5px' }}>Content:</td>
                    <td style={{ border: 'black solid 1px', padding: '5px' }}>
                        <textarea name="content" value={formValues.content} onChange={handleChange} className="form-input" rows={1}/>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <button type="submit" className="btn btn-submit">Save</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>

    );
};

const CustomerQuestion = () => {
    return (
        <ApolloProvider client={client}>
            <div>
                <h1>Question</h1>
                <hr/>
                <QuestionList />
                <QuestionCreate />
            </div>
        </ApolloProvider>
    );
};

export default CustomerQuestion;
