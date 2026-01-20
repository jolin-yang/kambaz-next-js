export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <h3>
            <label htmlFor="wd-name">Assignment Name</label>
        </h3>
        <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br /><br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr><br />

          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-assignment-group">Assignment Group</label>
            </td>
            <td>
                <select>
                    <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                    <option value="EXAMS">EXAMS</option>
                </select>
            </td>
          </tr><br />

          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
                <select>
                    <option selected value="PERCENTAGE">Percentage</option>
                    <option value="POINT">Point</option>
                </select>
            </td>
          </tr><br />

          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
                <select>
                    <option selected value="ONLINE">Online</option>
                    <option value="IN PERSON">In Person</option>
                </select>
            </td>
          </tr><br />

          <tr>
            <td align="right" valign="top"></td>
            <td>
                <label>Online Entry Options</label><br />
                
                <input type="checkbox" name="check-online-entry" id="wd-chkbox-text-entry"/>
                <label htmlFor="wd-chkbox-text-entry">Text Entry</label><br/>

                <input type="checkbox" name="check-online-entry" id="wd-chkbox-website-url"/>
                <label htmlFor="wd-chkbox-website-url">Website URL</label><br/>

                <input type="checkbox" name="check-online-entry" id="wd-chkbox-media-recordings"/>
                <label htmlFor="wd-chkbox-media-recordings">Media Recordings</label><br/>

                <input type="checkbox" name="check-online-entry" id="wd-chkbox-annotation"/>
                <label htmlFor="wd-chkbox-annotation">Student Annotation</label><br/>

                <input type="checkbox" name="check-online-entry" id="wd-chkbox-file-uploads"/>
                <label htmlFor="wd-chkbox-file-uploads">File Uploads</label><br/>
            </td>
          </tr><br />

          <tr>
            <td align="right" valign="top">
                <label>Assign</label>
            </td>
            <td>
                <label htmlFor="wd-assign-to">Assign to</label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
                <input id="wd-assign-to" defaultValue={"Everyone"} />
            </td>
          </tr><br />

          <tr>
            <td align="right" valign="top"></td>
            <td>
                <label htmlFor="wd-due-date">Due</label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
                <input type="date" 
                        defaultValue="2024-05-13"
                        id="wd-due-date"/>
            </td>
          </tr><br />
          
          <tr>
            <td align="right" valign="top"></td>
            <td>
                <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
                <label htmlFor="wd-until">Until</label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
                <input type="date" 
                        defaultValue="2024-05-06"
                        id="wd-available-from"/>
            </td>
            <td>
                <input type="date"
                        defaultValue="2024-05-20"
                        id="wd-until"/>
            </td>
          </tr>

          <tr>
            <td colSpan={3}><hr />
            </td>
          </tr>
          
          <tr>
            <td></td>
            <td></td>
            <td align="right" valign="top">
                <button>Cancel</button> <button>Save</button>
            </td>
          </tr>
        </table>
      </div>
  );}
  
  