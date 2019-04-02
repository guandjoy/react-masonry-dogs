import React, { useEffect, useState, useRef } from "react";
import { Query, withApollo } from "react-apollo";
import styled from 'styled-components'

import "@material/react-chips/dist/chips.css";
import {ChipSet, Chip} from '@material/react-chips';

import getBreeds from '../queries/getBreeds'

const StyledDiv = styled.div`
  padding: 0px;
  overflow: hidden;
  width: 100vw;

  .filter {
    margin: 0px;
    padding: 12px 24px 12px 24px;
    justify-content: center;
  }

  .breed {
    font-size: 14px;
    cursor: pointer;
    color: #424242;
    list-style-type: none;
    border: 1px solid #d8d8d8;
    border-radius: 16px;
    padding: 0 12px 0 12px;
    margin: 4px 4px 4px 4px;
    line-height: 32px;
    height: 32px;
  }

  .breed:hover {
    background-color: #f4f4f4;
  }

  .breed.active {
    background-color: #FFCACA;
  }

  .breed.active:hover {
    background-color: #FFB3B3;
  }
`;


function Filter(props) {
  return (
    <Query query={getBreeds} >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return `Error!: ${error}`;
        const breedsArray = Object.keys(data.breeds.message)
        breedsArray.unshift('all')
        const breeds = breedsArray.map(breed => (
          <Chip
            id={breed}
            key={`chip-${breed}`}
            label={breed}
            onClick={() => { props.client.writeData({ data: { breedFilter: breed } }) }}
          />
        ));
        return (
          <StyledDiv>
            <ChipSet choice className="filter">
              {breeds}
            </ChipSet>
          </StyledDiv>
        );
      }}
    </Query>
  );
}

export default withApollo(Filter);
