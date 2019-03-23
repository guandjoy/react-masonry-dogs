import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { RestLink } from "apollo-link-rest";
import { withClientState } from "apollo-link-state";

const cache = new InMemoryCache();

const defaultState = {
  breedFilter: "all"
};

const restLink = new RestLink({
  uri: "https://dog.ceo/api/"
});

const stateLink = new withClientState({
  cache,
  defaults: defaultState,
  resolvers: undefined
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([restLink, stateLink]),
  cache
});

export default apolloClient;
