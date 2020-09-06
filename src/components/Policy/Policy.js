import React from "react";
import { Link } from "react-router-dom";
import {
  PolicyWrapper,
  PolicyHeader,
  PolicyList,
  PolicyListItem,
  PolicyFooter,
} from "./policy.style";
function Policy() {
  return (
    <PolicyWrapper>
      <PolicyHeader>Privacy policy:</PolicyHeader>
      <PolicyList>
        <PolicyListItem>
          We store your e-mail adress for filtering the messages by author
        </PolicyListItem>
        <PolicyListItem>
          We store your displayname for displaying a "nickname" above the
          message
        </PolicyListItem>
        <PolicyListItem>
          We store your avatar from google for displaying current logged user
          avatar in the application
        </PolicyListItem>
        <PolicyListItem>
          All of the data is used only for application performance
        </PolicyListItem>
        <PolicyListItem>
          The data is stored by: Damian Czarnota, contact me:
          godevdamian@gmail.com
        </PolicyListItem>
      </PolicyList>
      <Link to='/'>Back to login</Link>
      <PolicyFooter>
        If you decide to log in to the application, you declare that you are
        aware and that you consent to the storage of data by me
      </PolicyFooter>
    </PolicyWrapper>
  );
}

export default Policy;
