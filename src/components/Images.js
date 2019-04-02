import React, { useEffect, useReducer } from "react";
import { Query, graphql } from "react-apollo";
// components
import CardContent from "./CardContent";
import MasonryLayout from "./MasonryLayout";
import MasonryLayoutClass from "./MasonryLayoutClass";
import Spinner from './Spinner'
// qraphql queries
import getBreedFilter from "../queries/getBreedFilter";
import getImages from "../queries/getImages"

function Images(props) {
  const changePath = () => {
    // changing REST path depends on the filter
    switch (props.breedFilter) {
      case "all":
        return "breeds/image/random/10";
      default:
        return `breed/${props.breedFilter}/images/random/20`;
    }
  };
  
  const [path, setPath] = useReducer(changePath, changePath())
  useEffect(() => {
    setPath()
  }, [props.breedFilter])

  return (
    <Query query={getImages} variables={{ path }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />
        if (error) return <p>Error</p>;
        const cards = data.images.message.map((image, index) => (
          <CardContent key={image} number={index + 1} image={image} />
        ));
        return (
          <div className="images-wrapper">
            <MasonryLayout>
              {cards}
            </MasonryLayout>
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
