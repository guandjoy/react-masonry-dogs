import React from "react";
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";

function Filter({ client }) {
  return (
    <Query
      query={gql`
        query {
          breeds @rest(type: "breeds", path: "breeds/list/all") {
            id
            status
            message
            __typename
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return `Error!: ${error}`;
        const allTag = (
          <li
            key="all"
            onClick={() => {
              client.writeData({ data: { breedFilter: "all" } });
            }}
            className="breed"
          >
            All
          </li>
        );
        const breeds = Object.keys(data.breeds.message).map(breed => (
          <li
            key={breed}
            onClick={() => {
              client.writeData({ data: { breedFilter: breed } });
            }}
            className="breed"
          >
            {breed}
          </li>
        ));
        return (
          <div className="filter-wrapper">
            <ul className="filter">
              {allTag}
              {breeds}
            </ul>
          </div>
        );
      }}
    </Query>
  );
}

export default withApollo(Filter);
