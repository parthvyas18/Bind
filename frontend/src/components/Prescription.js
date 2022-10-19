import React from "react";
import '../app.css'

const Prescription = () => {
    return(
        <div >
            <form className="d-flex flex-column">
                <div className="formFeilds">
                    <div className="labelFields">
                        <label for="pID" >Patient ID:</label>
                    </div>
                    <div className="inputFields">
                         <input type="text"   id="pID" name="fname" style={{width:'100%'}}  />
                    </div>
                    
                </div>
                <div className="formFeilds">
                    <label for="pName" className="labelFields">Patient Name:</label>
                    <input type="text" className="inputFields" id="pName" name="fname"  />
                </div>
                <div className="formFeilds">
                    <label for="dID" className="labelFields">Doctor ID:</label>
                    <input type="text" className="inputFields" id="dID" name="fname"  />
                </div>
                <div className="formFeilds">
                    <label for="dName" className="labelFields">Doctor Name:</label>
                    <input type="text" className="inputFields" id="dName" name="fname"  />
                </div>
                <div className="formFeilds">
                    <label for="SymptomSummary" className="labelFields">Symptom Summary:</label>
                    <textarea type="text" rows="4" className="inputFields" id="SymptomSummary" name="fname"  />
                </div>
                <div className="formFeilds">
                    <label for="DiagnosisDescription" className="labelFields">Diagnosis Description:</label>
                    <textarea type="text" rows="4" className="inputFields" id="DiagnosisDescription" name="fname"  />
                </div>
                <form>
                    
                </form>
               
                
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Prescription;