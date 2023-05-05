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

const CustomerQuestion = () => {
    return (
        <ApolloProvider client={client}>
            <div>
                <h1>Create question</h1>
                <hr/>
                <QuestionCreate />
            </div>
        </ApolloProvider>
    );
};

export default CustomerQuestion;
