"use client"

import Link from "next/link";
import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import UrlEncoding from "./query-parameters";
import StringStateVariables from "./StringStateVariables";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

    return (
        <div id="wd-lab4">
            <h2>Lab 4</h2><br/>
            <ClickEvent/>
            <PassingDataOnEvent/>
            <PassingFunctions theFunction={sayHello} />
            <Counter/>
            <BooleanStateVariables/>
            <StringStateVariables/>
            <DateStateVariable/>
            <ObjectStateVariable/>
            <ArrayStateVariable/>
            <ParentStateComponent/>
            <UrlEncoding/><hr/>
            <Link href="/labs/lab4/redux"><h3>Redux Examples</h3></Link>
            </div>
);}


    