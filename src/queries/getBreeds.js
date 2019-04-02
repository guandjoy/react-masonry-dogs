import gql from "graphql-tag";

export default gql`
	query {
		breeds @rest(type: "breeds", path: "breeds/list/all") {
			status
			message
			__typename
		}
	}
`;
