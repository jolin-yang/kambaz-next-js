"use client";
import React from "react";
import { usePathname } from "next/navigation";
export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
 const pathname = usePathname();

 const urlSegments = pathname.split("/");
 const assignmentSegment = urlSegments[urlSegments.length - 1];
 const sectionName = assignmentSegment.charAt(0).toUpperCase() + assignmentSegment.slice(1);

 return (
   <span>
    {course?.name} &gt; {sectionName}
   </span>
);}

