/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright  Copyright (c)  2023.  Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient({
    uri: 'https://pwa-test.local.pwadev:8525/graphql'
});

const CATEGORY_LIST_QUERY = gql`
  query {
    categories(filters: {}) {
      items {
        id
        name
        description
      }
    }
  }
`;

function CategoryList() {
    return (
        <Query query={CATEGORY_LIST_QUERY}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                return (
                    <ul>
                        {data.categories.items.map(category => (
                            <li key={category.id}>
                                {category.name}: {category.description}
                            </li>
                        ))}
                    </ul>
                );
            }}
        </Query>
    );
}

const CustomerQuestion = () => {
    return (
        <ApolloProvider client={client}>
            <div>
                <h1>Categories</h1>
                <CategoryList />
            </div>
        </ApolloProvider>
    );
};

export default CustomerQuestion;
