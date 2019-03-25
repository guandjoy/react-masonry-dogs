import React, { useState, useEffect, useRef } from "react";
import { Query, compose, graphql } from "react-apollo";
import gql from "graphql-tag";

import getBreedFilter from "./queries/getBreedFilter";

import CardContent from "./CardContent";
import MasonryLayout from "./MasonryLayout";

const query = gql`
  query getBreedFilter($path: String!) {
    images(path: $path) @rest(type: "images", path: $path) {
      message
      __typename
    }
  }
`;

const randomKey = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

function Images(props) {
  const initialPath = () => {
    switch (props.breedFilter) {
      case "all":
        return "breeds/image/random/10";
      default:
        return `breed/${props.breedFilter}/images/random/50`;
    }
  };
  const [path, setPath] = useState(initialPath());
  useEffect(() => {
    setPath(initialPath);
  });

  return (
    <Query query={query} variables={{ path }}>
      {({ loading, error, data }) => {
        if (loading) return <div id="loading" />;
        if (error) return <p>Error</p>;
        const cards = data.images.message.map((image, index) => (
          <CardContent key={randomKey()} image={image} />
        ));
        return (
          <div className="images-wrapper">
            <h1>{props.breedFilter}</h1>
            <MasonryLayout style={{ border: "5px solid red" }}>
              {cards}
            </MasonryLayout>
          </div>
        );
      }}
    </Query>
  );
}

export default compose(
  graphql(getBreedFilter, {
    props: ({ data: { breedFilter, loading } }) => ({
      breedFilter,
      loading
    })
  })
)(Images);
