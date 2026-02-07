import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <FormControl id="wd-username"
        value="alice"
        className="mb-2"/>
      <FormControl id="wd-password"
        value="123"
        type="password"
        className="mb-2"/>
      <FormControl id="wd-first-name"
        value="Alice"
        className="mb-2"/>
      <FormControl id="wd-last-name" 
        value="Wonderland"
        className="mb-2"/>
      <FormControl id="wd-birthdate"
        type="date"
        className="mb-2"/>
      <FormControl id="wd-email"
        value="alice@wonderland.com"
        type="email"
        className="mb-2"/>
      <FormControl id="wd-user"
        value="User"
        className="mb-2"/>
      <Link id="signout-btn"
          href="/account/signin"
          className="btn btn-danger w-100 mb-2"> Sign out </Link>
    </div>
);}
