import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

/* GraphQL API URL */
const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql",
});

/* Attach JWT token (if exists) */
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

/* Apollo Client */
export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});
