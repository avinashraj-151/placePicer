import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";



export default function DeleteConfirmation({ onConfirm, onCancel }) {

  useEffect(() => {
    console.log('Time satarted');
    const ref_timer = setTimeout(function () {
      onConfirm();
    }, 3000);
    // console.log(ref_timer);
    return () => {
      console.log('Time Stopped successfully');
      clearTimeout(ref_timer);
    }
  }, [onConfirm]);
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar></ProgressBar>
    </div>
  );
}
