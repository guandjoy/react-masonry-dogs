import React, { useEffect, useState, useRef } from "react";
import { Query, compose, withApollo, graphql } from "react-apollo";
import gql from "graphql-tag";
import styled from 'styled-components'
import getBreedFilter from "../queries/getBreedFilter";

const FilterWrapper = styled.div`
  padding: 0px;
  overflow: hidden;
  width: 100vw;

  .filter {
    margin: 0px;
    padding: 12px 24px 12px 24px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;    
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
  const filterRef = useRef()
  const [filter, setFilter] = useState('all')
  const [scrollParams, setScrollParams] = useState({
    width: 0,
  })
  const scrollHandler = () => {
    setScrollParams({...scrollParams, left: filterRef.current.scrollLeft})
  }
  useEffect(() => {
    setScrollParams(filterRef.current ? {width: filterRef.current.scrollWidth, left: filterRef.current.scrollLeft} : scrollParams)
  }, [filter])
  return (
    <Query
      query={gql`
        query {
          breeds @rest(type: "breeds", path: "breeds/list/all") {
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
        const breedsArray = Object.keys(data.breeds.message)
        breedsArray.unshift('all')
        const breeds = breedsArray.map(breed => (
          <li
            key={breed}
            onClick={() => {
              props.client.writeData({ data: { breedFilter: breed } });
              setFilter(breed)
            }}
            className={filter === breed ? 'breed active' : 'breed'}
          >
            {breed}
          </li>
        ));
        return (
          <FilterWrapper>
            <ul ref={filterRef} onScroll={scrollHandler} className="filter">
              {breeds}
            </ul>
          </FilterWrapper>
        );
      }}
    </Query>
  );
}

export default withApollo(Filter);
