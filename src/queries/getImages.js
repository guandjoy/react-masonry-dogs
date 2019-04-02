import gql from "graphql-tag";

export default gql`
	query getImages($path: String!) {
		images(path: $path) @rest(type: "images", path: $path) {
			message
			__typename
		}
	}
`;
