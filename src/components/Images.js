import React, { useState, useEffect, useRef, useReducer } from "react";
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";

import getBreedFilter from "../queries/getBreedFilter";

import CardContent from "./CardContent";
import MasonryLayout from "./MasonryLayout";
import MasonryLayoutClass from "./MasonryLayoutClass";

const query = gql`
  query getBreedFilter($path: String!) {
    images(path: $path) @rest(type: "images", path: $path) {
      message
      __typename
    }
  }
`;


function Images(props) {
  const changePath = () => {
    switch (props.breedFilter) {
      case "all":
        return "breeds/image/random/10";
      default:
        return `breed/${props.breedFilter}/images/random/50`;
    }
  };
  const [path, setPath] = useReducer(changePath, changePath())
  useEffect(() => {
    setPath()
  }, [props.breedFilter])

  return (
    <Query query={query} variables={{ path }}>
      {({ loading, error, data }) => {
        if (loading) return <div id="loading" />;
        if (error) return <p>Error</p>;
        const cards = data.images.message.map((image, index) => (
          <CardContent key={image} number={index + 1} image={image} />
        ));
        return (
          <div className="images-wrapper">

            <MasonryLayoutClass>
              {cards}
            </MasonryLayoutClass>
          </div>
        );
      }}
    </Query>
  );
}

export default graphql(getBreedFilter, {
    props: ({ data: { breedFilter, loading } }) => ({
      breedFilter,
      loading
    })
  })(Images);
