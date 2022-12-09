import React, { useState, useEffect } from "react";

export default function DropDown({
    setChange,
    data,
    startValue,
    name,
}: {
    setChange: (value: number) => void;
    data: { label: string; value: number }[];
    startValue: number;
    name: string;
}) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setChange(Number(event.target.value));
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
