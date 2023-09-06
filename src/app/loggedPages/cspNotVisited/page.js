"use client"
import { useState, useEffect, useCallback } from "react";
import { db } from "../../../../firebase/SettingFirebase";
import {
  collection,
  query,
  doc,
  where,
  getDocs,
  getDoc,
  limit,
  startAt,
  orderBy,
  endAt,
  startAfter,
} from "firebase/firestore";
import Link from "next/link";
import TopNavBar from "@/app/CommonComponents/topNavBar";

const getAllExceptions = async (month, setCspData, setCspVisited) => {

  if (month.length <= 0) return;

  // console.log({ month, setException, currentStartCount})
  const mon = month.replace("-0", "-");

  const q = query(
    collection(db, "csp_details_collection")
    // , orderBy('actual_marks'), limit(25), startAt(28)
  );

  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
    // console.log(doc.id, " => ", doc.data());
  });

  const q2 = doc(db, "csp_visit_summary_collection", mon);
  console.log(q2);
  const querySnapshotOfCSPVisited = await getDoc(q2);

  let data1 = [];

  if (querySnapshotOfCSPVisited.exists()) {
    data1 = querySnapshotOfCSPVisited.data();

    console.log("Document data:", querySnapshotOfCSPVisited.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

  setCspData(data);
  setCspVisited(data1);
};

export default function CSPNotVisitedPage() {
  const [cspData, setCspData] = useState([]);
  const [cspNotVisited, setCspNotVisited] = useState([]);
  const [cspVisited, setCspVisited] = useState([]);
  const [monthData, setMonthData] = useState("");

  const callExcepDataFunc = () =>
    getAllExceptions(monthData, setCspData, setCspVisited);

  useEffect(() => {
    callExcepDataFunc();
  }, [monthData]);

  useEffect(() => {
    if (cspVisited.length > 0 || Object.values(cspVisited).length > 0) {
      let totalVisited = 0;

      let collectAllBranchesData = [];
      for (let regData of Object.values(
        cspVisited.region_wise_summary_collection
      )) {
        totalVisited += regData.list_of_csp_id_visited.length;
        console.log({ totalVisited });
        collectAllBranchesData = [
          ...collectAllBranchesData,
          ...regData.list_of_csp_id_visited,
        ];
      }
      console.log("collectAllBranchesData: ", { collectAllBranchesData });
      console.log("CSP Data: ", { cspData });
      for (let index = 0; index < cspData.length; index++) {
        const element = cspData[index];
        if (collectAllBranchesData.indexOf(element.csp_code) < 0) {
          console.log(
            "X: ",
            element.csp_code +
              " => " +
              collectAllBranchesData.indexOf(element.csp_code)
          );
        }
      }

      let notVisted = cspData.filter(
        (x) =>
          collectAllBranchesData.indexOf(x.csp_code) < 0 &&
          x.csp_status == "Active"
      );
      // console.log({ notVisted})
      setCspNotVisited(notVisted);
    }
    console.log({ cspVisited, cspData, cspNotVisited });
  }, [cspVisited]);

  const getMonth = (e) => {
    setMonthData(e.target.value);
  };

  return (
    <>
      {/* <DialogBox showModal={showit} setVal={setShowIt} data={exceptionDataIndiv}  />
        <ParameterDialogBox showModal={showitParam} setVal={setShowItParam} data={cspException}  /> */}

      <div>
        <TopNavBar header="CSP Not Visited"/>

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
                  Vendor
                </td>

                {/* <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left" >View Exception</td> */}
              </tr>
            </thead>
            <tbody>
              {cspNotVisited.map((data, k) => {
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
                      {data.br_code}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 break-words">
                      {data.csp_name} - {data.csp_code} <br />
                      {data.csp_phone} <br />
                      {data.csp_ssa_village}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {data.csp_vendor}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
