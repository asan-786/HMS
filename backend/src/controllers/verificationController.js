const VerifiedStudent =
require("../models/VerifiedStudent");

exports.uploadRollNumbers =
async (req, res) => {

   try {

      const { rollNumbers } =
         req.body;

      if (

         !rollNumbers ||

         !Array.isArray(rollNumbers)
      ) {

         return res.status(400).json({

            success: false,

            message:
               "Roll numbers required"
         });
      }

      const docs =
         rollNumbers.map((roll) => ({

            rollNumber:
               roll.trim(),

            isUsed: false
         }));

      await VerifiedStudent.insertMany(

         docs,

         { ordered: false }
      );

      res.json({

         success: true,

         message:
            "Roll numbers uploaded"
      });

   } catch (err) {

      console.log(err);

      res.status(500).json({

         success: false,

         message: err.message
      });
   }
};