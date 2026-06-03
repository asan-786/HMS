import { useState } from "react";

import axios from "axios";

const RollVerification = () => {

   const [text, setText] =
      useState("");

   const handleUpload =
      async () => {

         try {

            const token =
               localStorage.getItem(
                  "token"
               );

            const rollNumbers =
               text
                  .split("\n")
                  .filter((r) => r.trim());

            const res =
               await axios.post(

                  "http://localhost:5000/api/verification/upload",

                  { rollNumbers },

                  {

                     headers: {

                        Authorization:
                           `Bearer ${token}`
                     }
                  }
               );

            alert(res.data.message);

            setText("");

         } catch (err) {

            console.log(err);

            alert("Upload failed");
         }
      };

   return (

      <div
         style={{
            padding: "2rem"
         }}
      >

         <h2>
            Upload Roll Numbers
         </h2>

         <textarea

            rows={15}

            value={text}

            onChange={(e) =>
               setText(e.target.value)
            }

            placeholder={`MBM001
MBM002
MBM003`}

            style={{

               width: "100%",

               padding: "1rem",

               marginTop: "1rem"
            }}
         />

         <button

            onClick={handleUpload}

            style={{

               marginTop: "1rem",

               padding:
                  "0.8rem 1.5rem"
            }}
         >

            Upload Roll Numbers

         </button>

      </div>
   );
};

export default RollVerification;