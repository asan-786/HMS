const initialHostels = [

    {
        id: 1,
        name: "Aryabhatta Hostel",
        type: "Boys",
        roomCount: 30
    },

    {
        id: 2,
        name: "Bhaskara Hostel",
        type: "Boys",
        roomCount: 25
    },

    {
        id: 3,
        name: "Chanakya Hostel",
        type: "Boys",
        roomCount: 40
    },

    {
        id: 4,
        name: "Dronacharya Hostel",
        type: "Boys",
        roomCount: 35
    },

    {
        id: 5,
        name: "Gargi Hostel",
        type: "Girls",
        roomCount: 50
    },

    {
        id: 6,
        name: "Maitreyi Hostel",
        type: "Girls",
        roomCount: 45
    },

    {
        id: 7,
        name: "Sarojini Hostel",
        type: "Girls",
        roomCount: 30
    },

    {
        id: 8,
        name: "Kasturba Hostel",
        type: "Girls",
        roomCount: 35
    }
];


const generateRooms = (hostels) => {

    const rooms = [];

    const years = [

        "1st Year",

        "2nd Year",

        "3rd Year",

        "Final Year"
    ];

    hostels.forEach(hostel => {

        for (let i = 1; i <= hostel.roomCount; i++) {

            const capacity =
                Math.floor(Math.random() * 3) + 1;

            const year =
                years[
                    Math.floor(
                        Math.random() * years.length
                    )
                ];

        //    rooms.push({

//     roomId:
//         `${hostel.name.charAt(0)}${hostel.id}-${i}`,

//     roomName:
//         `${hostel.name.charAt(0)}${hostel.id}-${i}`,

//     block: hostel.name,

//     hostelId: hostel.id,

//     capacity,

//     occupied: 0,

//     genderType: hostel.type,

//     year,

//     isActive: true,

//     // ✅ REQUIRED FIELDS

//     type:

//         capacity === 1

//             ? "Single"

//             : capacity === 2

//                 ? "Double"

//                 : "Triple",

//     floor:

//         Math.floor(Math.random() * 3) + 1
// });




rooms.push({

   roomId:
      `${hostel.name.charAt(0)}${hostel.id}-${i}`,

   roomName:
      `${hostel.name.charAt(0)}${hostel.id}-${i}`,

   block: hostel.name,

   hostelId: hostel.id,

   capacity,

   occupied: 0,

   // ✅ VERY IMPORTANT

   genderType: hostel.type,

   // ✅ VERY IMPORTANT

   year,

   // existing fields

   type:

      capacity === 1

         ? "Single"

         : capacity === 2

            ? "Double"

            : "Triple",

   floor:
      Math.floor(Math.random() * 3) + 1,

   amenities: [],

   isActive: true,

   allocatedStudents: []
});


        }
    });

    return rooms;
};


const mockRooms =
    generateRooms(initialHostels);


module.exports = {
    mockRooms
};