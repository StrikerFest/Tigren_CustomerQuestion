/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright  Copyright (c)  2023.  Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

import React, { useState } from 'react';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { ApolloProvider, useMutation } from 'react-apollo';

const client = new ApolloClient({
    uri: 'https://pwa-test.local.pwadev:8525/graphql',
    cache: new InMemoryCache(),
});

const question_id = window.location.pathname.split('/').pop();
console.log("ID",question_id);

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

const QuestionEdit = () => {
    const [formValues, setFormValues] = useState({
        customer_name: '',
        title:'',
        content: ''
    });

    const [updateQuestion] = useMutation(UPDATE_QUESTION);

    const handleSubmit = (event) => {
        event.preventDefault();
        updateQuestion({
            variables: {
                id: question_id,
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
                        <input type="text" name="customer_name" onChange={handleChange} className="form-input" />
                    </td>
                </tr>
                <tr>
                    <td style={{ border: 'black solid 1px', padding: '5px' }}>Title:</td>
                    <td style={{ border: 'black solid 1px', padding: '5px' }}>
                        <input type="text" name="title"  onChange={handleChange} className="form-input" />
                    </td>
                </tr>
                <tr>
                    <td style={{ border: 'black solid 1px', padding: '5px' }}>Content:</td>
                    <td style={{ border: 'black solid 1px', padding: '5px' }}>
                        <textarea name="content" onChange={handleChange} className="form-input" rows={1}/>
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
                <h1>Edit Question</h1>
                <hr/>
                <QuestionEdit  />
            </div>
        </ApolloProvider>
    );
};

export default CustomerQuestion;
