'use client'
import { useState } from "react"

const RangeSelect = ({ onRadiusChange }) => {
    const [radius, setRadius] = useState(5)
    return (
        <div className="mt-5">
            <h2 className="font-bold px-2">Select Radius (In Meter)</h2>
            <input type="range" className="w-full h-2 bg-neutral-200 rounded-lg 
                appearance-none cursor-pointer"
                min={0}
                max={100}
                step={5}
                defaultValue={radius}
                onChange={(e) => {
                    setRadius(e.target.value);
                    onRadiusChange(e.target.value);
                }}
            />
            <label className="text-gray-500 text-[15px]">{radius * 100} in Meter</label>
        </div>
    )
}

export default RangeSelect