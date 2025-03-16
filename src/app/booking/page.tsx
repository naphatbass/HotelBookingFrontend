import DateReserve from "@/components/DateReserve";
import { TextField } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
export default function Booking() {
    return (
        <div className="mt-[12vh] h-[80vh] bg-white">
            <h1 className="text-xl p-5 pt-10">
            Venue Booking Form
            </h1>
            <p className="text-lg p-5">Please enter your information</p>
            <TextField className="m-5" label="Name-Lastname" variant="standard" name="Name-Lastname"/>
            <TextField className="m-5" label="Contact-Number" variant="standard" name="Contact-Number"/>
            <p className="text-lg p-5">Select venue reservetion date</p>
            <DateReserve/>
            <p className="text-lg p-5">Select your dentist application place</p>
            <div className="p-5">
            <Select variant="standard" name="vanue" id="vanue" className="h-[2em] w-[200px]">
                <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                <MenuItem value="Spark">Spark Space</MenuItem>
                <MenuItem value="GrandTable">The Grand Table</MenuItem>
            </Select>
            <button name="Book Venue" className="bg-blue-200 p-5 rounded-md m-2 shadow-sm hover:bg-blue-500 hover:text-white">Book Venue</button>
            </div>
        </div>
        
    );
}