"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as client from "../../client";

export default function PeoplePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const users = await client.findUsersForCourse(cid as string);
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}
