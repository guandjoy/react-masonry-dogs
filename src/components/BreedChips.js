import React, { useState } from 'react'
import { withApollo } from 'react-apollo'


function BreedChips(props) {
	const [filter, setFilter] = useState('all')
	return (
    <li
      onClick={() => {
        props.client.writeData({ data: { breedFilter: props.breed } });
        setFilter(props.breed)
      }}
      className={filter === props.breed ? 'breed active' : 'breed'}
    >
      {props.breed}
    </li>
	)
}

export default withApollo(BreedChips)