import { gql } from "@apollo/client";

/* AUTH */
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation SignupUser(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signupUser(
      name: $name
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

/* ORDERS */
export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $items: [OrderItemInput!]!
    $total: Float!
    $address: AddressInput!
  ) {
    createOrder(
      items: $items
      total: $total
      address: $address
    ) {
      _id
      orderId
      status
      total
    }
  }
`;

/* REVIEWS */
export const ADD_REVIEW = gql`
  mutation AddReview(
    $productId: ID!
    $rating: Int!
    $text: String!
  ) {
    addReview(
      productId: $productId
      rating: $rating
      text: $text
    ) {
      _id
      rating
      text
      createdAt
    }
  }
`;
