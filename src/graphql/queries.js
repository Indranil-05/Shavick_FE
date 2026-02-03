import { gql } from "@apollo/client";

/* PRODUCTS */
export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      _id
      name
      price
      images
      ratingAvg
      reviewCount
    }
  }
`;

export const PRODUCTS_BY_CATEGORY = gql`
  query ProductsByCategory($slug: String!) {
    productsByCategory(slug: $slug) {
      _id
      name
      price
      images
      ratingAvg
      reviewCount
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      _id
      name
      description
      price
      images
      ratingAvg
      reviewCount
    }
  }
`;

/* CATEGORIES */
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      _id
      name
      slug
      image
    }
  }
`;

/* REVIEWS */
export const GET_REVIEWS = gql`
  query GetReviews($productId: ID!) {
    reviews(productId: $productId) {
      _id
      rating
      text
      userId
      createdAt
    }
  }
`;

/* ORDERS */
export const MY_ORDERS = gql`
  query MyOrders {
    myOrders {
      _id
      orderId
      total
      status
      createdAt
    }
  }
`;

export const TRACK_ORDER = gql`
  query TrackOrder($id: ID!) {
    orderById(id: $id) {
      orderId
      status
      total
      address {
        name
        city
        pincode
      }
    }
  }
`;
