"use client";
import React from "react";
import { usePathname } from "next/navigation";
export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
 const pathname = usePathname();

 const sectionNameFirstCharCapitalized = pathname.split("/").pop().charAt(0).toUpperCase();
 const sectionName = sectionNameFirstCharCapitalized + pathname.split("/").pop().slice(1);

 return (
   <span>
    {course?.name} &gt; {sectionName}
   </span>
);}

