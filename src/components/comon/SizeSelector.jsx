import { useState } from "react";
import "../../styles/SizeSelector.css";

const sizes = [
    { label: "S", disabled:true},
    { label: "M", disabled:false},
    { label: "L", disabled:false },
    { label: "XL", disabled:false },
    { label: "XXL", disabled:true },
    { label: "3XL", disabled:true },
    { label: "5XL", disabled:true },
];

export default function SizeSelector() {
    const [selected, setSelected] = useState("M");
    return (
        <div className="size-container">
            <span className="size-title">Size</span>
            <div className="size-options">
                {sizes.map((size) => (
                    <button
                        key={size.label}
                        disabled={size.disabled}
                        className={`size-btn
                        ${selected === size.label ? "active":""}
                        ${size.disabled ? "disabled" : ""}`}
                        onClick={() => setSelected(size.label)}>
                        {size.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
