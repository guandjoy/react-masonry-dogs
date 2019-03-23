import gql from "graphql-tag";

export default gql`
  query {
    breedFilter @client
  }
`;
