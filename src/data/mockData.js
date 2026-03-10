export const mockStudents = [
    { id: 1, name: "Mahesh Lodha", email: "student@college.edu", room: "H4-15", cgpa: 8.9, category: "General", year: 2, gender: "Male", feesPaid: true, messEnrolled: true, messFeesPaid: true },
    { id: 2, name: "Sarah Connor", email: "sarah@college.edu", room: null, cgpa: 9.3, category: "OBC", year: 3, gender: "Female", feesPaid: false, messEnrolled: true, messFeesPaid: false },
    { id: 3, name: "John Smith", email: "john@college.edu", room: null, cgpa: 7.8, category: "SC", year: 1, gender: "Male", feesPaid: false, messEnrolled: false, messFeesPaid: true },
    { id: 4, name: "Priya Sharma", email: "priya@college.edu", room: null, cgpa: 9.5, category: "General", year: 4, gender: "Female", feesPaid: true, messEnrolled: true, messFeesPaid: true },
    { id: 5, name: "Rahul Verma", email: "rahul@college.edu", room: null, cgpa: 8.2, category: "ST", year: 2, gender: "Male", feesPaid: true, messEnrolled: true, messFeesPaid: false },
    { id: 6, name: "Ananya Iyer", email: "ananya@college.edu", room: null, cgpa: 9.1, category: "General", year: 1, gender: "Female", feesPaid: true, messEnrolled: false, messFeesPaid: true },
    { id: 7, name: "Vikram Singh", email: "vikram@college.edu", room: null, cgpa: 7.5, category: "OBC", year: 3, gender: "Male", feesPaid: false, messEnrolled: true, messFeesPaid: false },
    { id: 8, name: "Sanya Gupta", email: "sanya@college.edu", room: null, cgpa: 8.7, category: "EWS", year: 2, gender: "Female", feesPaid: true, messEnrolled: true, messFeesPaid: true },
    { id: 9, name: "Amit Patel", email: "amit@college.edu", room: null, cgpa: 6.9, category: "MBC", year: 1, gender: "Male", feesPaid: false, messEnrolled: false, messFeesPaid: true },
    { id: 10, name: "Kavita Rao", email: "kavita@college.edu", room: null, cgpa: 9.2, category: "General", year: 4, gender: "Female", feesPaid: true, messEnrolled: true, messFeesPaid: true },
    { id: 11, name: "Deepak Kumar", email: "deepak@college.edu", room: null, cgpa: 7.2, category: "SC", year: 2, gender: "Male", feesPaid: true, messEnrolled: true, messFeesPaid: false },
    { id: 12, name: "Neha Jha", email: "neha@college.edu", room: null, cgpa: 8.5, category: "OBC", year: 3, gender: "Female", feesPaid: true, messEnrolled: true, messFeesPaid: true },
    { id: 13, name: "Suresh Meena", email: "suresh@college.edu", room: null, cgpa: 7.9, category: "ST", year: 1, gender: "Male", feesPaid: true, messEnrolled: false, messFeesPaid: true },
    { id: 14, name: "Megha Malhotra", email: "megha@college.edu", room: null, cgpa: 9.6, category: "General", year: 4, gender: "Female", feesPaid: true, messEnrolled: true, messFeesPaid: true },
    { id: 15, name: "Abhishek Singh", email: "abhishek@college.edu", room: null, cgpa: 8.1, category: "OBC", year: 2, gender: "Male", feesPaid: true, messEnrolled: true, messFeesPaid: false },
    { id: 16, name: "Pooja Bisht", email: "pooja@college.edu", room: null, cgpa: 7.4, category: "MBC", year: 3, gender: "Female", feesPaid: true, messEnrolled: true, messFeesPaid: true },
    { id: 17, name: "Rohan Das", email: "rohan@college.edu", room: null, cgpa: 8.8, category: "EWS", year: 1, gender: "Male", feesPaid: true, messEnrolled: false, messFeesPaid: true },
    { id: 18, name: "Sneha Nair", email: "sneha@college.edu", room: null, cgpa: 9.0, category: "General", year: 4, gender: "Female", feesPaid: true, messEnrolled: true, messFeesPaid: true },
    { id: 19, name: "Manoj Tiwari", email: "manoj@college.edu", room: null, cgpa: 6.5, category: "SC", year: 2, gender: "Male", feesPaid: false, messEnrolled: true, messFeesPaid: false },
    { id: 20, name: "Divya Joshi", email: "divya@college.edu", room: null, cgpa: 8.3, category: "OBC", year: 3, gender: "Female", feesPaid: true, messEnrolled: true, messFeesPaid: true }
];

export const initialHostels = [
    { id: 1, name: "Aryabhatta Hostel", type: "Boys", roomCount: 30 },
    { id: 2, name: "Bhaskara Hostel", type: "Boys", roomCount: 25 },
    { id: 3, name: "Chanakya Hostel", type: "Boys", roomCount: 40 },
    { id: 4, name: "Dronacharya Hostel", type: "Boys", roomCount: 35 },
    { id: 5, name: "Gargi Hostel", type: "Girls", roomCount: 50 },
    { id: 6, name: "Maitreyi Hostel", type: "Girls", roomCount: 45 },
    { id: 7, name: "Sarojini Hostel", type: "Girls", roomCount: 30 },
    { id: 8, name: "Kasturba Hostel", type: "Girls", roomCount: 35 }
];

export const generateRooms = (hostels) => {
    const rooms = [];
    hostels.forEach(hostel => {
        for (let i = 1; i <= hostel.roomCount; i++) {
            // Randomly assign capacity 1, 2, or 3
            const capacity = Math.floor(Math.random() * 3) + 1;
            rooms.push({
                id: `${hostel.name.substring(0, 1)}${hostel.id}-${i}`,
                block: hostel.name,
                hostelId: hostel.id,
                capacity: capacity,
                occupants: 0,
                type: hostel.type // Boys/Girls
            });
        }
    });
    return rooms;
};

export const mockRooms = generateRooms(initialHostels);

export const mockComplaints = [
    { id: 101, studentName: "Mahesh", room: "H4-15", category: "Electrical", description: "Fan regulator is broken.", status: "Pending", date: "2026-03-08" },
    { id: 102, studentName: "Sarah Connor", room: "H6-42", category: "Plumbing", description: "Leaking tap in bathroom.", status: "Resolved", date: "2026-03-05", reply: "Plumber fixed it yesterday." }
];

export const mockNotices = [
    { id: 1, title: "Semester Fee Deadline", content: "Last date to pay hostel fees is 15th March.", date: "2026-03-09", important: true },
    { id: 2, title: "Mess Menu Change", content: "Wednesday dinner will now feature Chhole Bhature.", date: "2026-03-07", important: false }
];

const baseMenu = {
    Monday: { breakfast: "Aalu Paratha + Milk + Tea", lunch: "Sev Tamater + Daal Makhni + Chawal + Chach + Salad", dinner: "Gravy Aalu Pyaz + Namkeen Chawal + Salad" },
    Tuesday: { breakfast: "Aalu Sandwich + Milk + Tea", lunch: "Loki Kofte + Jeera Rice + Daal + Chach + Salad", dinner: "Mix Veg. + Chawal + Daal + Salad" },
    Wednesday: { breakfast: "Poha + Namkeen + Milk + Tea", lunch: "Kadai Paneer + Mix Veg Chawal + Daal + Chach + Salad", dinner: "Kale Chane + Namkeen Chawal + Salad" },
    Thursday: { breakfast: "Aalu Paratha + Milk + Tea", lunch: "Kadhi Pakora + Daal + Pulav / Veg Chawal + Salad", dinner: "Chole ki sabji + Jeera Rice + Daal + Salad" },
    Friday: { breakfast: "2* Pav Bhaji + Milk + Tea", lunch: "Gatta + Namkeen Chawal + Salad + Chach", dinner: "Bhindi + Chawal + Daal + Salad" },
    Saturday: { breakfast: "Poha + Namkeen + Milk + Tea", lunch: "Rajma + Namkeen Chawal + Chach + Salad", dinner: "Aalu Matar Tamatar + Jeera Rice + Daal + Salad" },
    Sunday: { breakfast: "Samosa + Milk + Tea", lunch: "Daal Baati + Churma + Pyaz + Papad + Chach |OR| Paneer + Kheer/Custard + Poodi + Papad + Salad", dinner: "Patta Gobi + Chawal + Daal + Salad" }
};

export const messMenuData = {
    Boys: {
        1: { ...baseMenu },
        2: { ...baseMenu },
        3: { ...baseMenu },
        4: { ...baseMenu }
    },
    Girls: {
        1: { ...baseMenu },
        2: { ...baseMenu },
        3: { ...baseMenu },
        4: { ...baseMenu }
    }
};
