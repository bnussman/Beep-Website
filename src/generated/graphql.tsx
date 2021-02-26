import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getUser: User;
  getUsers: UsersResponse;
  getRideHistory: Array<Beep>;
  getBeepHistory: Array<Beep>;
  getQueue: Array<QueueEntry>;
  findBeep: User;
  getRiderStatus: QueueEntry;
  getBeeperList: Array<User>;
  getBeeps: BeepsResponse;
  getBeep: Beep;
  getReports: ReportsResponse;
  getReport: Report;
  getDirections: Scalars['String'];
  getUserRating: Array<Rating>;
  getLocations: LocationsResponse;
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryGetUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  show?: Maybe<Scalars['Int']>;
};


export type QueryGetRideHistoryArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetBeepHistoryArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetQueueArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetBeepsArgs = {
  offset?: Maybe<Scalars['Int']>;
  show?: Maybe<Scalars['Int']>;
};


export type QueryGetBeepArgs = {
  id: Scalars['String'];
};


export type QueryGetReportsArgs = {
  offset?: Maybe<Scalars['Int']>;
  show?: Maybe<Scalars['Int']>;
};


export type QueryGetReportArgs = {
  id: Scalars['String'];
};


export type QueryGetDirectionsArgs = {
  end: Scalars['String'];
  start: Scalars['String'];
};


export type QueryGetUserRatingArgs = {
  id: Scalars['String'];
};


export type QueryGetLocationsArgs = {
  offset?: Maybe<Scalars['Int']>;
  show?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  first: Scalars['String'];
  last: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  venmo: Scalars['String'];
  password: Scalars['String'];
  isBeeping: Scalars['Boolean'];
  isEmailVerified: Scalars['Boolean'];
  isStudent: Scalars['Boolean'];
  groupRate: Scalars['Float'];
  singlesRate: Scalars['Float'];
  capacity: Scalars['Float'];
  masksRequired: Scalars['Boolean'];
  queueSize: Scalars['Float'];
  role: Scalars['String'];
  pushToken?: Maybe<Scalars['String']>;
  photoUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  queue: Array<QueueEntry>;
  locations: Array<Location>;
  ratings: Array<Rating>;
};

export type QueueEntry = {
  __typename?: 'QueueEntry';
  id: Scalars['String'];
  origin: Scalars['String'];
  destination: Scalars['String'];
  state: Scalars['Float'];
  isAccepted: Scalars['Boolean'];
  groupSize: Scalars['Float'];
  timeEnteredQueue: Scalars['Float'];
  beeper: User;
  rider: User;
  ridersQueuePosition: Scalars['Float'];
  location?: Maybe<Location>;
};

export type Location = {
  __typename?: 'Location';
  id: Scalars['String'];
  user: User;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  altitude: Scalars['Float'];
  accuracy: Scalars['Float'];
  altitudeAccuracy: Scalars['Float'];
  heading: Scalars['Float'];
  speed: Scalars['Float'];
  timestamp: Scalars['Float'];
};

export type Rating = {
  __typename?: 'Rating';
  id: Scalars['String'];
  rater: User;
  rated: User;
  stars: Scalars['Float'];
  message: Scalars['String'];
  timestamp: Scalars['Float'];
  beep: Beep;
};

export type Beep = {
  __typename?: 'Beep';
  id: Scalars['String'];
  beeper: User;
  rider: User;
  origin: Scalars['String'];
  destination: Scalars['String'];
  state: Scalars['Float'];
  isAccepted: Scalars['Boolean'];
  groupSize: Scalars['Float'];
  timeEnteredQueue: Scalars['Float'];
  doneTime: Scalars['Float'];
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  items: Array<User>;
  count: Scalars['Int'];
};

export type BeepsResponse = {
  __typename?: 'BeepsResponse';
  items: Array<Beep>;
  count: Scalars['Int'];
};

export type ReportsResponse = {
  __typename?: 'ReportsResponse';
  items: Array<Report>;
  count: Scalars['Int'];
};

export type Report = {
  __typename?: 'Report';
  id: Scalars['String'];
  reporter: User;
  reported: User;
  handledBy?: Maybe<User>;
  reason: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  timestamp: Scalars['Float'];
  handled: Scalars['Boolean'];
  beep?: Maybe<Beep>;
};

export type LocationsResponse = {
  __typename?: 'LocationsResponse';
  items: Array<Location>;
  count: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  removeUser: Scalars['Boolean'];
  editUser: User;
  chooseBeep: QueueEntry;
  riderLeaveQueue: Scalars['Boolean'];
  setBeeperStatus: Scalars['Boolean'];
  setBeeperQueue: Scalars['Boolean'];
  deleteBeep: Scalars['Boolean'];
  reportUser: Scalars['Boolean'];
  updateReport: Report;
  deleteReport: Scalars['Boolean'];
  login: Auth;
  signup: Auth;
  logout: Scalars['Boolean'];
  removeToken: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
  editAccount: User;
  changePassword: Scalars['Boolean'];
  updatePushToken: Scalars['Boolean'];
  verifyAccount: Scalars['Boolean'];
  resendEmailVarification: Scalars['Boolean'];
  deleteAccount: Scalars['Boolean'];
  rateUser: Scalars['Boolean'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String'];
};


export type MutationEditUserArgs = {
  data: EditUserValidator;
  id: Scalars['String'];
};


export type MutationChooseBeepArgs = {
  input: GetBeepInput;
  beeperId: Scalars['String'];
};


export type MutationSetBeeperStatusArgs = {
  input: BeeperSettingsInput;
};


export type MutationSetBeeperQueueArgs = {
  input: UpdateQueueEntryInput;
};


export type MutationDeleteBeepArgs = {
  id: Scalars['String'];
};


export type MutationReportUserArgs = {
  input: ReportInput;
};


export type MutationUpdateReportArgs = {
  input: UpdateReportInput;
  id: Scalars['String'];
};


export type MutationDeleteReportArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignupArgs = {
  input: SignUpInput;
};


export type MutationLogoutArgs = {
  isApp?: Maybe<Scalars['Boolean']>;
};


export type MutationRemoveTokenArgs = {
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  id: Scalars['String'];
};


export type MutationEditAccountArgs = {
  input: EditAccountInput;
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
};


export type MutationUpdatePushTokenArgs = {
  pushToken: Scalars['String'];
};


export type MutationVerifyAccountArgs = {
  id: Scalars['String'];
};


export type MutationRateUserArgs = {
  input: RatingInput;
};

export type EditUserValidator = {
  first?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  venmo?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  isBeeping?: Maybe<Scalars['Boolean']>;
  isEmailVerified?: Maybe<Scalars['Boolean']>;
  isStudent?: Maybe<Scalars['Boolean']>;
  groupRate?: Maybe<Scalars['Float']>;
  singlesRate?: Maybe<Scalars['Float']>;
  capacity?: Maybe<Scalars['Float']>;
  masksRequired?: Maybe<Scalars['Boolean']>;
  queueSize?: Maybe<Scalars['Float']>;
  role?: Maybe<Scalars['String']>;
  pushToken?: Maybe<Scalars['String']>;
};

export type GetBeepInput = {
  origin: Scalars['String'];
  destination: Scalars['String'];
  groupSize: Scalars['Float'];
};

export type BeeperSettingsInput = {
  singlesRate?: Maybe<Scalars['Float']>;
  groupRate?: Maybe<Scalars['Float']>;
  capacity?: Maybe<Scalars['Float']>;
  isBeeping?: Maybe<Scalars['Boolean']>;
  masksRequired?: Maybe<Scalars['Boolean']>;
};

export type UpdateQueueEntryInput = {
  value: Scalars['String'];
  riderId: Scalars['String'];
  queueId: Scalars['String'];
};

export type ReportInput = {
  userId: Scalars['String'];
  reason: Scalars['String'];
  beepId?: Maybe<Scalars['String']>;
};

export type UpdateReportInput = {
  handled?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
};

export type Auth = {
  __typename?: 'Auth';
  user: User;
  tokens: TokenEntry;
};

export type TokenEntry = {
  __typename?: 'TokenEntry';
  id: Scalars['String'];
  tokenid: Scalars['String'];
  user: User;
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  pushToken?: Maybe<Scalars['String']>;
};

export type SignUpInput = {
  username: Scalars['String'];
  first: Scalars['String'];
  last: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
  venmo: Scalars['String'];
  password: Scalars['String'];
  pushToken?: Maybe<Scalars['String']>;
};

export type EditAccountInput = {
  first?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  venmo?: Maybe<Scalars['String']>;
};

export type RatingInput = {
  userId: Scalars['String'];
  stars: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  beepId?: Maybe<Scalars['String']>;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ResendEmailMutationVariables = Exact<{ [key: string]: never; }>;


export type ResendEmailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resendEmailVarification'>
);

export type GetBeeperHistoryQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetBeeperHistoryQuery = (
  { __typename?: 'Query' }
  & { getBeepHistory: Array<(
    { __typename?: 'Beep' }
    & Pick<Beep, 'id' | 'origin' | 'destination' | 'timeEnteredQueue' | 'doneTime' | 'groupSize'>
    & { rider: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'photoUrl' | 'username' | 'first' | 'last' | 'name'>
    ) }
  )> }
);

export type GetLocationsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetLocationsQuery = (
  { __typename?: 'Query' }
  & { getLocations: (
    { __typename?: 'LocationsResponse' }
    & Pick<LocationsResponse, 'count'>
    & { items: Array<(
      { __typename?: 'Location' }
      & Pick<Location, 'id' | 'longitude' | 'latitude' | 'speed' | 'timestamp' | 'accuracy' | 'heading'>
    )> }
  ) }
);

export type GetQueueQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetQueueQuery = (
  { __typename?: 'Query' }
  & { getQueue: Array<(
    { __typename?: 'QueueEntry' }
    & Pick<QueueEntry, 'id' | 'origin' | 'destination' | 'timeEnteredQueue' | 'groupSize' | 'isAccepted' | 'state'>
    & { rider: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'photoUrl' | 'username' | 'first' | 'last' | 'name'>
    ) }
  )> }
);

export type GetRideHistoryQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetRideHistoryQuery = (
  { __typename?: 'Query' }
  & { getRideHistory: Array<(
    { __typename?: 'Beep' }
    & Pick<Beep, 'id' | 'origin' | 'destination' | 'timeEnteredQueue' | 'doneTime' | 'groupSize'>
    & { beeper: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'photoUrl' | 'username' | 'first' | 'last' | 'name'>
    ) }
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changePassword'>
);

export type EditAccountMutationVariables = Exact<{
  first?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  venmo?: Maybe<Scalars['String']>;
}>;


export type EditAccountMutation = (
  { __typename?: 'Mutation' }
  & { editAccount: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'Auth' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first' | 'last' | 'username' | 'email' | 'phone' | 'venmo' | 'isBeeping' | 'isEmailVerified' | 'isStudent' | 'groupRate' | 'singlesRate' | 'capacity' | 'masksRequired' | 'queueSize' | 'role' | 'photoUrl' | 'name'>
    ), tokens: (
      { __typename?: 'TokenEntry' }
      & Pick<TokenEntry, 'id' | 'tokenid'>
    ) }
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  id: Scalars['String'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resetPassword'>
);

export type VerifyAccountMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type VerifyAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'verifyAccount'>
);

export type GetBeepersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBeepersQuery = (
  { __typename?: 'Query' }
  & { getBeeperList: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'photoUrl' | 'singlesRate' | 'groupRate' | 'capacity' | 'isStudent' | 'first' | 'last' | 'queueSize' | 'masksRequired'>
  )> }
);

export type DeleteBeepMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteBeepMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteBeep'>
);

export type GetBeepQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetBeepQuery = (
  { __typename?: 'Query' }
  & { getBeep: (
    { __typename?: 'Beep' }
    & Pick<Beep, 'id' | 'origin' | 'destination' | 'timeEnteredQueue' | 'doneTime' | 'groupSize'>
    & { beeper: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first' | 'last' | 'photoUrl' | 'username'>
    ), rider: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first' | 'last' | 'photoUrl' | 'username'>
    ) }
  ) }
);

export type GetBeepsQueryVariables = Exact<{
  show?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type GetBeepsQuery = (
  { __typename?: 'Query' }
  & { getBeeps: (
    { __typename?: 'BeepsResponse' }
    & Pick<BeepsResponse, 'count'>
    & { items: Array<(
      { __typename?: 'Beep' }
      & Pick<Beep, 'id' | 'origin' | 'destination' | 'timeEnteredQueue' | 'doneTime' | 'groupSize'>
      & { beeper: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'first' | 'last' | 'photoUrl' | 'username'>
      ), rider: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'first' | 'last' | 'photoUrl' | 'username'>
      ) }
    )> }
  ) }
);

export type DeleteReportMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteReportMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteReport'>
);

export type UpdateReportMutationVariables = Exact<{
  id: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  handled?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateReportMutation = (
  { __typename?: 'Mutation' }
  & { updateReport: (
    { __typename?: 'Report' }
    & Pick<Report, 'id'>
  ) }
);

export type GetReportQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetReportQuery = (
  { __typename?: 'Query' }
  & { getReport: (
    { __typename?: 'Report' }
    & Pick<Report, 'id' | 'reason' | 'timestamp' | 'handled' | 'notes'>
    & { beep?: Maybe<(
      { __typename?: 'Beep' }
      & Pick<Beep, 'id'>
    )>, reporter: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first' | 'last' | 'photoUrl' | 'username'>
    ), reported: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first' | 'last' | 'photoUrl' | 'username'>
    ), handledBy?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first' | 'last' | 'photoUrl' | 'username'>
    )> }
  ) }
);

export type GetReportsQueryVariables = Exact<{
  show?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type GetReportsQuery = (
  { __typename?: 'Query' }
  & { getReports: (
    { __typename?: 'ReportsResponse' }
    & Pick<ReportsResponse, 'count'>
    & { items: Array<(
      { __typename?: 'Report' }
      & Pick<Report, 'id' | 'timestamp' | 'reason' | 'notes' | 'handled'>
      & { reporter: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'first' | 'last' | 'photoUrl' | 'username'>
      ), reported: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'first' | 'last' | 'photoUrl' | 'username'>
      ) }
    )> }
  ) }
);

export type GetUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'first' | 'last' | 'isBeeping' | 'isStudent' | 'role' | 'venmo' | 'singlesRate' | 'groupRate' | 'capacity' | 'masksRequired' | 'photoUrl' | 'queueSize' | 'phone' | 'username'>
  ) }
);

export type GetUsersQueryVariables = Exact<{
  show?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { getUsers: (
    { __typename?: 'UsersResponse' }
    & Pick<UsersResponse, 'count'>
    & { items: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'photoUrl' | 'first' | 'last' | 'email' | 'isStudent' | 'isEmailVerified' | 'username' | 'phone' | 'isBeeping'>
    )> }
  ) }
);


export const LogoutDocument = gql`
    mutation Logout {
  logout(isApp: false)
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ResendEmailDocument = gql`
    mutation ResendEmail {
  resendEmailVarification
}
    `;
export type ResendEmailMutationFn = Apollo.MutationFunction<ResendEmailMutation, ResendEmailMutationVariables>;

/**
 * __useResendEmailMutation__
 *
 * To run a mutation, you first call `useResendEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendEmailMutation, { data, loading, error }] = useResendEmailMutation({
 *   variables: {
 *   },
 * });
 */
export function useResendEmailMutation(baseOptions?: Apollo.MutationHookOptions<ResendEmailMutation, ResendEmailMutationVariables>) {
        return Apollo.useMutation<ResendEmailMutation, ResendEmailMutationVariables>(ResendEmailDocument, baseOptions);
      }
export type ResendEmailMutationHookResult = ReturnType<typeof useResendEmailMutation>;
export type ResendEmailMutationResult = Apollo.MutationResult<ResendEmailMutation>;
export type ResendEmailMutationOptions = Apollo.BaseMutationOptions<ResendEmailMutation, ResendEmailMutationVariables>;
export const GetBeeperHistoryDocument = gql`
    query GetBeeperHistory($id: String!) {
  getBeepHistory(id: $id) {
    id
    origin
    destination
    timeEnteredQueue
    doneTime
    groupSize
    rider {
      id
      photoUrl
      username
      first
      last
      name
    }
  }
}
    `;

/**
 * __useGetBeeperHistoryQuery__
 *
 * To run a query within a React component, call `useGetBeeperHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBeeperHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBeeperHistoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBeeperHistoryQuery(baseOptions: Apollo.QueryHookOptions<GetBeeperHistoryQuery, GetBeeperHistoryQueryVariables>) {
        return Apollo.useQuery<GetBeeperHistoryQuery, GetBeeperHistoryQueryVariables>(GetBeeperHistoryDocument, baseOptions);
      }
export function useGetBeeperHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBeeperHistoryQuery, GetBeeperHistoryQueryVariables>) {
          return Apollo.useLazyQuery<GetBeeperHistoryQuery, GetBeeperHistoryQueryVariables>(GetBeeperHistoryDocument, baseOptions);
        }
export type GetBeeperHistoryQueryHookResult = ReturnType<typeof useGetBeeperHistoryQuery>;
export type GetBeeperHistoryLazyQueryHookResult = ReturnType<typeof useGetBeeperHistoryLazyQuery>;
export type GetBeeperHistoryQueryResult = Apollo.QueryResult<GetBeeperHistoryQuery, GetBeeperHistoryQueryVariables>;
export const GetLocationsDocument = gql`
    query GetLocations($id: String!) {
  getLocations(id: $id) {
    items {
      id
      longitude
      latitude
      speed
      timestamp
      accuracy
      heading
    }
    count
  }
}
    `;

/**
 * __useGetLocationsQuery__
 *
 * To run a query within a React component, call `useGetLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocationsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLocationsQuery(baseOptions: Apollo.QueryHookOptions<GetLocationsQuery, GetLocationsQueryVariables>) {
        return Apollo.useQuery<GetLocationsQuery, GetLocationsQueryVariables>(GetLocationsDocument, baseOptions);
      }
export function useGetLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLocationsQuery, GetLocationsQueryVariables>) {
          return Apollo.useLazyQuery<GetLocationsQuery, GetLocationsQueryVariables>(GetLocationsDocument, baseOptions);
        }
export type GetLocationsQueryHookResult = ReturnType<typeof useGetLocationsQuery>;
export type GetLocationsLazyQueryHookResult = ReturnType<typeof useGetLocationsLazyQuery>;
export type GetLocationsQueryResult = Apollo.QueryResult<GetLocationsQuery, GetLocationsQueryVariables>;
export const GetQueueDocument = gql`
    query GetQueue($id: String!) {
  getQueue(id: $id) {
    id
    origin
    destination
    timeEnteredQueue
    groupSize
    isAccepted
    state
    rider {
      id
      photoUrl
      username
      first
      last
      name
    }
  }
}
    `;

/**
 * __useGetQueueQuery__
 *
 * To run a query within a React component, call `useGetQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQueueQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetQueueQuery(baseOptions: Apollo.QueryHookOptions<GetQueueQuery, GetQueueQueryVariables>) {
        return Apollo.useQuery<GetQueueQuery, GetQueueQueryVariables>(GetQueueDocument, baseOptions);
      }
export function useGetQueueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQueueQuery, GetQueueQueryVariables>) {
          return Apollo.useLazyQuery<GetQueueQuery, GetQueueQueryVariables>(GetQueueDocument, baseOptions);
        }
export type GetQueueQueryHookResult = ReturnType<typeof useGetQueueQuery>;
export type GetQueueLazyQueryHookResult = ReturnType<typeof useGetQueueLazyQuery>;
export type GetQueueQueryResult = Apollo.QueryResult<GetQueueQuery, GetQueueQueryVariables>;
export const GetRideHistoryDocument = gql`
    query GetRideHistory($id: String!) {
  getRideHistory(id: $id) {
    id
    origin
    destination
    timeEnteredQueue
    doneTime
    groupSize
    beeper {
      id
      photoUrl
      username
      first
      last
      name
    }
  }
}
    `;

/**
 * __useGetRideHistoryQuery__
 *
 * To run a query within a React component, call `useGetRideHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRideHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRideHistoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRideHistoryQuery(baseOptions: Apollo.QueryHookOptions<GetRideHistoryQuery, GetRideHistoryQueryVariables>) {
        return Apollo.useQuery<GetRideHistoryQuery, GetRideHistoryQueryVariables>(GetRideHistoryDocument, baseOptions);
      }
export function useGetRideHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRideHistoryQuery, GetRideHistoryQueryVariables>) {
          return Apollo.useLazyQuery<GetRideHistoryQuery, GetRideHistoryQueryVariables>(GetRideHistoryDocument, baseOptions);
        }
export type GetRideHistoryQueryHookResult = ReturnType<typeof useGetRideHistoryQuery>;
export type GetRideHistoryLazyQueryHookResult = ReturnType<typeof useGetRideHistoryLazyQuery>;
export type GetRideHistoryQueryResult = Apollo.QueryResult<GetRideHistoryQuery, GetRideHistoryQueryVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($password: String!) {
  changePassword(password: $password)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const EditAccountDocument = gql`
    mutation EditAccount($first: String, $last: String, $email: String, $phone: String, $venmo: String) {
  editAccount(
    input: {first: $first, last: $last, email: $email, phone: $phone, venmo: $venmo}
  ) {
    id
    name
  }
}
    `;
export type EditAccountMutationFn = Apollo.MutationFunction<EditAccountMutation, EditAccountMutationVariables>;

/**
 * __useEditAccountMutation__
 *
 * To run a mutation, you first call `useEditAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAccountMutation, { data, loading, error }] = useEditAccountMutation({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *      venmo: // value for 'venmo'
 *   },
 * });
 */
export function useEditAccountMutation(baseOptions?: Apollo.MutationHookOptions<EditAccountMutation, EditAccountMutationVariables>) {
        return Apollo.useMutation<EditAccountMutation, EditAccountMutationVariables>(EditAccountDocument, baseOptions);
      }
export type EditAccountMutationHookResult = ReturnType<typeof useEditAccountMutation>;
export type EditAccountMutationResult = Apollo.MutationResult<EditAccountMutation>;
export type EditAccountMutationOptions = Apollo.BaseMutationOptions<EditAccountMutation, EditAccountMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(input: {username: $username, password: $password}) {
    user {
      id
      first
      last
      username
      email
      phone
      venmo
      isBeeping
      isEmailVerified
      isStudent
      groupRate
      singlesRate
      capacity
      masksRequired
      queueSize
      role
      photoUrl
      name
    }
    tokens {
      id
      tokenid
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($id: String!, $password: String!) {
  resetPassword(id: $id, password: $password)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      id: // value for 'id'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const VerifyAccountDocument = gql`
    mutation VerifyAccount($id: String!) {
  verifyAccount(id: $id)
}
    `;
export type VerifyAccountMutationFn = Apollo.MutationFunction<VerifyAccountMutation, VerifyAccountMutationVariables>;

/**
 * __useVerifyAccountMutation__
 *
 * To run a mutation, you first call `useVerifyAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyAccountMutation, { data, loading, error }] = useVerifyAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVerifyAccountMutation(baseOptions?: Apollo.MutationHookOptions<VerifyAccountMutation, VerifyAccountMutationVariables>) {
        return Apollo.useMutation<VerifyAccountMutation, VerifyAccountMutationVariables>(VerifyAccountDocument, baseOptions);
      }
export type VerifyAccountMutationHookResult = ReturnType<typeof useVerifyAccountMutation>;
export type VerifyAccountMutationResult = Apollo.MutationResult<VerifyAccountMutation>;
export type VerifyAccountMutationOptions = Apollo.BaseMutationOptions<VerifyAccountMutation, VerifyAccountMutationVariables>;
export const GetBeepersDocument = gql`
    query GetBeepers {
  getBeeperList {
    id
    username
    photoUrl
    singlesRate
    groupRate
    capacity
    isStudent
    first
    last
    queueSize
    masksRequired
  }
}
    `;

/**
 * __useGetBeepersQuery__
 *
 * To run a query within a React component, call `useGetBeepersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBeepersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBeepersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBeepersQuery(baseOptions?: Apollo.QueryHookOptions<GetBeepersQuery, GetBeepersQueryVariables>) {
        return Apollo.useQuery<GetBeepersQuery, GetBeepersQueryVariables>(GetBeepersDocument, baseOptions);
      }
export function useGetBeepersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBeepersQuery, GetBeepersQueryVariables>) {
          return Apollo.useLazyQuery<GetBeepersQuery, GetBeepersQueryVariables>(GetBeepersDocument, baseOptions);
        }
export type GetBeepersQueryHookResult = ReturnType<typeof useGetBeepersQuery>;
export type GetBeepersLazyQueryHookResult = ReturnType<typeof useGetBeepersLazyQuery>;
export type GetBeepersQueryResult = Apollo.QueryResult<GetBeepersQuery, GetBeepersQueryVariables>;
export const DeleteBeepDocument = gql`
    mutation DeleteBeep($id: String!) {
  deleteBeep(id: $id)
}
    `;
export type DeleteBeepMutationFn = Apollo.MutationFunction<DeleteBeepMutation, DeleteBeepMutationVariables>;

/**
 * __useDeleteBeepMutation__
 *
 * To run a mutation, you first call `useDeleteBeepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBeepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBeepMutation, { data, loading, error }] = useDeleteBeepMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBeepMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBeepMutation, DeleteBeepMutationVariables>) {
        return Apollo.useMutation<DeleteBeepMutation, DeleteBeepMutationVariables>(DeleteBeepDocument, baseOptions);
      }
export type DeleteBeepMutationHookResult = ReturnType<typeof useDeleteBeepMutation>;
export type DeleteBeepMutationResult = Apollo.MutationResult<DeleteBeepMutation>;
export type DeleteBeepMutationOptions = Apollo.BaseMutationOptions<DeleteBeepMutation, DeleteBeepMutationVariables>;
export const GetBeepDocument = gql`
    query GetBeep($id: String!) {
  getBeep(id: $id) {
    id
    origin
    destination
    timeEnteredQueue
    doneTime
    groupSize
    beeper {
      id
      first
      last
      photoUrl
      username
    }
    rider {
      id
      first
      last
      photoUrl
      username
    }
  }
}
    `;

/**
 * __useGetBeepQuery__
 *
 * To run a query within a React component, call `useGetBeepQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBeepQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBeepQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBeepQuery(baseOptions: Apollo.QueryHookOptions<GetBeepQuery, GetBeepQueryVariables>) {
        return Apollo.useQuery<GetBeepQuery, GetBeepQueryVariables>(GetBeepDocument, baseOptions);
      }
export function useGetBeepLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBeepQuery, GetBeepQueryVariables>) {
          return Apollo.useLazyQuery<GetBeepQuery, GetBeepQueryVariables>(GetBeepDocument, baseOptions);
        }
export type GetBeepQueryHookResult = ReturnType<typeof useGetBeepQuery>;
export type GetBeepLazyQueryHookResult = ReturnType<typeof useGetBeepLazyQuery>;
export type GetBeepQueryResult = Apollo.QueryResult<GetBeepQuery, GetBeepQueryVariables>;
export const GetBeepsDocument = gql`
    query getBeeps($show: Int, $offset: Int) {
  getBeeps(show: $show, offset: $offset) {
    items {
      id
      origin
      destination
      timeEnteredQueue
      doneTime
      groupSize
      beeper {
        id
        first
        last
        photoUrl
        username
      }
      rider {
        id
        first
        last
        photoUrl
        username
      }
    }
    count
  }
}
    `;

/**
 * __useGetBeepsQuery__
 *
 * To run a query within a React component, call `useGetBeepsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBeepsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBeepsQuery({
 *   variables: {
 *      show: // value for 'show'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetBeepsQuery(baseOptions?: Apollo.QueryHookOptions<GetBeepsQuery, GetBeepsQueryVariables>) {
        return Apollo.useQuery<GetBeepsQuery, GetBeepsQueryVariables>(GetBeepsDocument, baseOptions);
      }
export function useGetBeepsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBeepsQuery, GetBeepsQueryVariables>) {
          return Apollo.useLazyQuery<GetBeepsQuery, GetBeepsQueryVariables>(GetBeepsDocument, baseOptions);
        }
export type GetBeepsQueryHookResult = ReturnType<typeof useGetBeepsQuery>;
export type GetBeepsLazyQueryHookResult = ReturnType<typeof useGetBeepsLazyQuery>;
export type GetBeepsQueryResult = Apollo.QueryResult<GetBeepsQuery, GetBeepsQueryVariables>;
export const DeleteReportDocument = gql`
    mutation DeleteReport($id: String!) {
  deleteReport(id: $id)
}
    `;
export type DeleteReportMutationFn = Apollo.MutationFunction<DeleteReportMutation, DeleteReportMutationVariables>;

/**
 * __useDeleteReportMutation__
 *
 * To run a mutation, you first call `useDeleteReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReportMutation, { data, loading, error }] = useDeleteReportMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteReportMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReportMutation, DeleteReportMutationVariables>) {
        return Apollo.useMutation<DeleteReportMutation, DeleteReportMutationVariables>(DeleteReportDocument, baseOptions);
      }
export type DeleteReportMutationHookResult = ReturnType<typeof useDeleteReportMutation>;
export type DeleteReportMutationResult = Apollo.MutationResult<DeleteReportMutation>;
export type DeleteReportMutationOptions = Apollo.BaseMutationOptions<DeleteReportMutation, DeleteReportMutationVariables>;
export const UpdateReportDocument = gql`
    mutation UpdateReport($id: String!, $notes: String, $handled: Boolean) {
  updateReport(id: $id, input: {notes: $notes, handled: $handled}) {
    id
  }
}
    `;
export type UpdateReportMutationFn = Apollo.MutationFunction<UpdateReportMutation, UpdateReportMutationVariables>;

/**
 * __useUpdateReportMutation__
 *
 * To run a mutation, you first call `useUpdateReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReportMutation, { data, loading, error }] = useUpdateReportMutation({
 *   variables: {
 *      id: // value for 'id'
 *      notes: // value for 'notes'
 *      handled: // value for 'handled'
 *   },
 * });
 */
export function useUpdateReportMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReportMutation, UpdateReportMutationVariables>) {
        return Apollo.useMutation<UpdateReportMutation, UpdateReportMutationVariables>(UpdateReportDocument, baseOptions);
      }
export type UpdateReportMutationHookResult = ReturnType<typeof useUpdateReportMutation>;
export type UpdateReportMutationResult = Apollo.MutationResult<UpdateReportMutation>;
export type UpdateReportMutationOptions = Apollo.BaseMutationOptions<UpdateReportMutation, UpdateReportMutationVariables>;
export const GetReportDocument = gql`
    query GetReport($id: String!) {
  getReport(id: $id) {
    id
    reason
    timestamp
    handled
    notes
    beep {
      id
    }
    reporter {
      id
      first
      last
      photoUrl
      username
    }
    reported {
      id
      first
      last
      photoUrl
      username
    }
    handledBy {
      id
      first
      last
      photoUrl
      username
    }
  }
}
    `;

/**
 * __useGetReportQuery__
 *
 * To run a query within a React component, call `useGetReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReportQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetReportQuery(baseOptions: Apollo.QueryHookOptions<GetReportQuery, GetReportQueryVariables>) {
        return Apollo.useQuery<GetReportQuery, GetReportQueryVariables>(GetReportDocument, baseOptions);
      }
export function useGetReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReportQuery, GetReportQueryVariables>) {
          return Apollo.useLazyQuery<GetReportQuery, GetReportQueryVariables>(GetReportDocument, baseOptions);
        }
export type GetReportQueryHookResult = ReturnType<typeof useGetReportQuery>;
export type GetReportLazyQueryHookResult = ReturnType<typeof useGetReportLazyQuery>;
export type GetReportQueryResult = Apollo.QueryResult<GetReportQuery, GetReportQueryVariables>;
export const GetReportsDocument = gql`
    query getReports($show: Int, $offset: Int) {
  getReports(show: $show, offset: $offset) {
    items {
      id
      timestamp
      reason
      notes
      handled
      reporter {
        id
        first
        last
        photoUrl
        username
      }
      reported {
        id
        first
        last
        photoUrl
        username
      }
    }
    count
  }
}
    `;

/**
 * __useGetReportsQuery__
 *
 * To run a query within a React component, call `useGetReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReportsQuery({
 *   variables: {
 *      show: // value for 'show'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetReportsQuery(baseOptions?: Apollo.QueryHookOptions<GetReportsQuery, GetReportsQueryVariables>) {
        return Apollo.useQuery<GetReportsQuery, GetReportsQueryVariables>(GetReportsDocument, baseOptions);
      }
export function useGetReportsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReportsQuery, GetReportsQueryVariables>) {
          return Apollo.useLazyQuery<GetReportsQuery, GetReportsQueryVariables>(GetReportsDocument, baseOptions);
        }
export type GetReportsQueryHookResult = ReturnType<typeof useGetReportsQuery>;
export type GetReportsLazyQueryHookResult = ReturnType<typeof useGetReportsLazyQuery>;
export type GetReportsQueryResult = Apollo.QueryResult<GetReportsQuery, GetReportsQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: String!) {
  getUser(id: $id) {
    id
    first
    last
    isBeeping
    isStudent
    role
    venmo
    singlesRate
    groupRate
    capacity
    masksRequired
    photoUrl
    queueSize
    phone
    username
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = gql`
    query getUsers($show: Int, $offset: Int) {
  getUsers(show: $show, offset: $offset) {
    items {
      id
      photoUrl
      first
      last
      email
      isStudent
      isEmailVerified
      username
      phone
      isBeeping
    }
    count
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      show: // value for 'show'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;