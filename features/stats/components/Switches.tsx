import React, { useEffect, useState } from "react";
import { Stats } from "../definitions";

export default function Switches({
  highScore,
  onCheck,
}: {
  highScore: any;
  onCheck: Function;
}) {
  const [checkedID, setCheckedID] = useState([]);

  function updateCheckedID(e) {
    if (e.target.checked) {
      setCheckedID([...checkedID, e.target.id]);
    } else {
      setCheckedID(checkedID.filter((id) => id !== e.target.id));
    }
  }

  useEffect(() => {
    onCheck(checkedID);
    return () => {};
  }, [checkedID, onCheck]);
  useEffect(() => {
    console.log("rendered");

    return () => {};
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Show</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {highScore.map((score) => {
            return (
              <tr key={score.userID}>
                <td>
                  <input
                    type="checkbox"
                    name=""
                    id={`${score.userID}`}
                    onChange={updateCheckedID}
                  />
                </td>
                <td>{score.userName}</td>
                <td>{score.seconds}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
