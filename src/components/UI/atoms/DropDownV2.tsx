import React, { useState, useEffect } from "react";

export default function DropDownV2({
    setChange,
    data,
    startValue,
    name,
}: {
    setChange: (value: string) => void;
    data: { label: string; value: string }[];
    startValue: string;
    name: string;
}) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setChange(event.target.value);
    };

    const [items, setItems] = useState(data);

    useEffect(() => {
        setItems(data);
    }, [data]);

    return (
        <select
            className="select select-bordered select-lg w-full max-w-xs"
            onChange={handleChange}
            defaultValue={startValue}
        >
            {items.map((item) => (
                <option key={item.value} value={item.value}>
                    {item.label}
                </option>
            ))}
        </select>
    );
}
