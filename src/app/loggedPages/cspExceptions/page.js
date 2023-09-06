"use client"
import { useState, useEffect } from "react";
import { db } from "../../../../firebase/SettingFirebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Link from "next/link";
import TopNavBar from "@/app/CommonComponents/topNavBar";

const getAllExceptions = async (month, setException, currentStartCount) => {
  // console.log({ month, setException, currentStartCount})
  const mon = month.replace("-0", "-");
  const q = query(
    collection(db, "csp_visit_collection"),
    where("visit_month", "==", mon),
    where("is_it_exception", "==", "Yes")
    // , orderBy('actual_marks')
    // , limit(25)
  );

  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
    console.log(doc.id, " => ", doc.data());
  });

  setException(data);
};

export default function CSPExceptionPage() {
  const [cspException, setException] = useState([]);
  const [currentStartCount, setCurrentStartCount] = useState(1);
  const [monthData, setMonthData] = useState("");
  const callExcepDataFunc = () =>
    getAllExceptions(monthData, setException, currentStartCount);

  useEffect(() => {
    callExcepDataFunc();
  }, [currentStartCount, monthData]);

  const getMonth = (e) => {
    setMonthData(e.target.value);
  };
  return (
    <>
     <TopNavBar header="CSP Exception Report"/>     
       
        <div className="p-8 ">
          <div className="text-center m-4">
            {" "}
            Month:
            <input
              className="px-3 py-3 placeholder-slate-300 
                text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring "
              onInput={getMonth}
              type="month"
            />
          </div>

          <table className="border-collapse table-fixed w-full text-sm">
            <thead>
              <tr>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  S.No:
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Region
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Branch
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Branch Code
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Csp Details
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Csp Code
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Csp Terminal ID
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Csp Vendor
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Actual Marks
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Exception List
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Exception List Combined
                </td>

              </tr>
            </thead>
            <tbody>
              {cspException.map((data, k) => {
                return (
                  <tr key={k}>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {k + 1}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {data.reg_name}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {data.br_name}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {data.br_details.br_code}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 break-words">
                      {data.csp_details.csp_name} - {data.csp_details.csp_id}{" "}
                      <br />
                      {data.csp_details.csp_phone} <br />
                      {data.csp_details.csp_ssa_village}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {data.csp_details.csp_id}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {data.csp_details.csp_teriminal_id}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {data.csp_details.csp_vendor}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {data.actual_marks}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {Object.values(data.parameters)
                        .filter((x) => x.question.indexOf("Test") < 0)
                        .map((x, k) => {
                          if (x.correct_answer != x.answer)
                            return (
                              <span key={k}>
                                {" "}
                                {x.question} <br />{" "}
                              </span>
                            );
                        })}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {Object.values(data.parameters)
                        .filter((x) => x.question.indexOf("Test") < 0)
                        .map((x, k) => {
                          if (x.correct_answer != x.answer)
                            return <span key={k}> {x.question}... </span>;
                        })}
                    </td>
              
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      
    </>
  );
}
