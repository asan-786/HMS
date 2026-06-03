import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useHostel } from '../../context/HostelContext';

const AdmissionForm = () => {

    const { addAdmissionStudent } = useHostel();

    const [submitted, setSubmitted] = useState(false);

    const [isPaying, setIsPaying] = useState(false);

    const [formData, setFormData] = useState({

        name: "",
        percentile: "",
        phone: "",
        gender: "",

        parentName: "",
        parentPhone: "",
        guardianName: "",

        guardianPhone: "",

        cgpa: "",
        category: "",

        year: "",

        address: "",
        
    });

    const handleChange = (e) => {

        console.log(e.target.name, e.target.value);

        setFormData({

            ...formData,

            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log("FORM DATA:", formData);

        setIsPaying(true);
    };

    // const handlePayment = async () => {

    //     try {

    //         console.log("SUBMITTING FORM:", formData);

    //         // ✅ Fake Payment Success
    //         alert("₹100 Payment Successful");

    //         // ✅ Fake Processing Delay
    //         setTimeout(async () => {

    //             try {

    //                 await addAdmissionStudent(formData);

    //                 setIsPaying(false);

    //                 setSubmitted(true);

    //                 // ✅ Reset Form
    //                 setFormData({

    //                     name: "",
    //                     percentile: "",
    //                     phone: "",
    //                     gender: "",

    //                     parentName: "",
    //                     parentPhone: "",
    //                     rollNumber: "",

    //                     cgpa: "",
    //                     category: "",

    //                     year: "",

    //                     address: "",
                        
    //                 });

    //             } catch (err) {

    //                 console.log(err);

    //                 alert("Admission Failed");
    //             }

    //         }, 1500);

    //     } catch (err) {

    //         console.log(err);

    //         alert("Admission Failed");
    //     }
    // };


    const handlePayment = async () => {


       if (

   formData.parentPhone ===

   formData.guardianPhone
) {

   alert(

      "Parent phone and Guardian phone cannot be same"
   );

   return;
}

           
   try {


   

      console.log(
         "SUBMITTING FORM:",
         formData
      );
   

      // ✅ FIRST SAVE ADMISSION
      await addAdmissionStudent(
         formData
      );


      // ✅ ONLY IF SUCCESS
      alert(
         "₹100 Payment Successful"
      );

      setIsPaying(false);

      setSubmitted(true);

      // ✅ RESET FORM
      setFormData({

         name: "",

         phone: "",

         gender: "",

         parentName: "",
          percentile: "",

         parentPhone: "",
         guardianName: "",

       guardianPhone: "",

         rollNumber: "",

         cgpa: "",

         category: "",

         year: "",

         address: ""
      });

   } catch (err) {

      console.log(err);

      setIsPaying(false);

      alert(

         err.response?.data?.message ||

         "Admission Failed"
      );
   }
};


    if (submitted) {

        return (

            <div
                className="animate-fade-in"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    textAlign: 'center'
                }}
            >

                <div
                    style={{
                        width: 64,
                        height: 64,
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: 'var(--success)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem'
                    }}
                >
                    ✓
                </div>

                <h2 style={{ marginBottom: '0.5rem' }}>
                    Application Submitted!
                </h2>

                <p
                    className="subtitle"
                    style={{
                        maxWidth: 400,
                        marginBottom: '2rem'
                    }}
                >
                    Registration Fee of ₹100 received.
                    Your hostel admission request
                    has been submitted.
                </p>

                <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                >
                    Submit Another Request
                </Button>

            </div>
        );
    }

    if (isPaying) {

        return (

            <div
                className="animate-fade-in"
                style={{
                    maxWidth: 450,
                    margin: '4rem auto',
                    textAlign: 'center'
                }}
            >

                <Card style={{ padding: '2.5rem' }}>

                    <h2 style={{ marginBottom: '1rem' }}>
                        Registration Fee
                    </h2>

                    <div
                        style={{
                            fontSize: '3rem',
                            fontWeight: 800,
                            color: 'var(--primary)',
                            marginBottom: '0.5rem'
                        }}
                    >
                        ₹100
                    </div>

                    <p
                        className="subtitle"
                        style={{
                            marginBottom: '2rem'
                        }}
                    >
                        Secure portal registration fee.
                    </p>

                    <Button
                        variant="primary"
                        style={{
                            width: '100%',
                            padding: '1rem'
                        }}
                        onClick={handlePayment}
                    >
                        Pay ₹100 & Submit
                    </Button>

                    <button
                        onClick={() => setIsPaying(false)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            marginTop: '1.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>

                </Card>

            </div>
        );
    }

    return (

        <div
            className="animate-fade-in"
            style={{
                maxWidth: 700,
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}
        >

            <header>

                <h1
                    style={{
                        fontSize: '2rem',
                        marginBottom: '0.25rem'
                    }}
                >
                    Hostel Admission
                </h1>

                <p className="subtitle">
                    Apply for hostel room.
                </p>

            </header>

            <Card>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }}
                >

                    {/* NAME + PERCENTILE */}

                    <div className="grid-2">

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}
                        >

                            <label>Name</label>

                            <input
                                type="text"
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: '#fff'
                                }}
                            />

                        </div>

                        {/* <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}
                        >

                            <label>Percentile</label>

                            <input
                                type="number"
                                required
                                name="percentile"
                                value={formData.percentile}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: '#fff'
                                }}
                            />

                        </div> */}

                    </div>

                    {/* PHONE + GENDER */}

                    <div className="grid-2">

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}
                        >

                            <label>Phone Number</label>

                            <input
                                type="tel"
                                required
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: '#fff'
                                }}
                            />

                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}
                        >

                            <label>Gender</label>

                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: '#fff'
                                }}
                            >

                                <option value="">
                                    Select Gender
                                </option>

                                <option value="Male">
                                    Male
                                </option>

                                <option value="Female">
                                    Female
                                </option>

                            </select>

                        </div>

                    </div>

                    {/* PARENT */}

                    <div className="grid-2">

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}
                        >

                            <label>Parent Name</label>

                            <input
                                type="text"
                                required
                                name="parentName"
                                value={formData.parentName}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: '#fff'
                                }}
                            />

                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}
                        >

                            <label>Parent Phone</label>

                            <input
                                type="tel"
                                required
                                name="parentPhone"
                                value={formData.parentPhone}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: '#fff'
                                }}
                            />

                        </div>

                    </div>

                    <div>

   <label>
      Guardian Name
   </label>

   <input

      type="text"

      value={formData.guardianName}

      onChange={(e) =>
         setFormData({

            ...formData,

            guardianName:
               e.target.value
         })
      }

      placeholder="Enter Guardian Name"
   />
</div>

<div>

   <label>
      Guardian Phone
   </label>

   <input

      type="text"

      value={formData.guardianPhone}

      onChange={(e) =>
         setFormData({

            ...formData,

            guardianPhone:
               e.target.value
         })
      }

      placeholder="Enter Guardian Phone"
   />
</div>

                    {/* CGPA + CATEGORY */}

                    <div className="grid-2">

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}
                        >

                            <label>CGPA</label>

                            <input
                                type="number"
                                step="0.1"
                                max="10"
                                required
                                name="cgpa"
                                value={formData.cgpa}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: '#fff'
                                }}
                            />

           <label>College Roll Number</label>

<input
   type="text"
   required
   name="rollNumber"
   placeholder="Enter Roll Number"
   value={formData.rollNumber}
   onChange={handleChange}
/>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}
                        >

                            <label>Category</label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: '#fff'
                                }}
                            >

                                <option value="">
                                    Select Category
                                </option>

                                <option value="General">General</option>
                                <option value="OBC">OBC</option>
                                <option value="SC">SC</option>
                                <option value="ST">ST</option>
                                <option value="MBC">MBC</option>
                                <option value="EWS">EWS</option>

                            </select>

                        </div>

                    </div>

                    {/* YEAR */}

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}
                    >

                        <label>Year</label>

                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid var(--border-light)',
                                borderRadius: 'var(--radius-sm)',
                                color: '#fff'
                            }}
                        >

                            <option value="">
                                Select Year
                            </option>

                            <option value="1st Year">
                                1st Year
                            </option>

                            <option value="2nd Year">
                                2nd Year
                            </option>

                            <option value="3rd Year">
                                3rd Year
                            </option>

                            <option value="Final Year">
                                Final Year
                            </option>

                        </select>

                    </div>

                    {/* ADDRESS */}

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}
                    >

                        <label>Address</label>

                        <textarea
                            rows="3"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid var(--border-light)',
                                borderRadius: 'var(--radius-sm)',
                                color: '#fff'
                            }}
                        />

                    </div>

                    <div
                        style={{
                            marginTop: '2rem',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}
                    >

                        <Button
                            type="submit"
                            variant="primary"
                            style={{
                                padding: '0.8rem 2rem'
                            }}
                        >
                            Proceed To Payment
                        </Button>

                    </div>

                </form>

            </Card>

        </div>
    );
};

export default AdmissionForm;