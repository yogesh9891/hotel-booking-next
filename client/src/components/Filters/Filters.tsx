'use client'

import React, { useEffect, useRef, useState } from 'react'
import style from '@/components/Filters/Filters.module.scss'
import { GoChevronDown, GoChevronUp } from 'react-icons/go'
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import Select, { components } from 'react-select';
const options = [
    { value: 'high to low', label: 'High To Low' },
    { value: 'low to high', label: 'Low To High' },
    { value: 'relevent', label: 'Relevent' },
];


export default function Filters() {

    // Price Slider
    const [clicked, setClicked] = useState<boolean>(false)

    const ref: any = useRef(null)
    useEffect(() => {
        function handleOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setClicked(false)
            }
        }
        document.addEventListener("mousedown", handleOutside);
        return () => {
            document.removeEventListener("mousedown", handleOutside);
        };
    }, [ref, ref.current]);

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [minValue2, setMinValue2] = useState(0);
    const [maxValue2, setMaxValue2] = useState(0);

    // collection

    const [category, setCategory] = useState(false)

    const refs: any = useRef(null)
    useEffect(() => {
        function handleOutside(event: any) {
            if (refs.current && !refs.current.contains(event.target)) {
                setCategory(false)
            }
        }
        document.addEventListener("mousedown", handleOutside);
        return () => {
            document.removeEventListener("mousedown", handleOutside);
        };
    }, [refs, refs.current]);


    // location

    const [location, setLocation] = useState(false)

    const wrapperRef: any = useRef(null)
    useEffect(() => {
        function handleOutside(event: any) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setLocation(false)
            }
        }
        document.addEventListener("mousedown", handleOutside);
        return () => {
            document.removeEventListener("mousedown", handleOutside);
        };
    }, [wrapperRef, wrapperRef.current]);


    // property type

    const [property, setProperty] = useState(false)

    const wrappers: any = useRef(null)
    useEffect(() => {
        function handleOutside(event: any) {
            if (wrappers.current && !wrappers.current.contains(event.target)) {
                setProperty(false)
            }
        }
        document.addEventListener("mousedown", handleOutside);
        return () => {
            document.removeEventListener("mousedown", handleOutside);
        };
    }, [wrappers, wrappers.current]);


    const [selected, setSelected] = useState<any>(null)

    const styling = {
        control: (base: any) => ({
            ...base,
            backgroundColor: 'transparent',
            border: '1px solid #dbdbdb !important',
            boxShadow: 'none !important',
            color: '#A88041 !important',
            borderRadius: '0px',
            padding: '0px 15px !important',
            cursor: 'pointer !important',
            '&:hover': {
                border: '1px solid #dbdbdb !important',
            },
        }),
        placeholder: (defaultStyles: any) => ({
            ...defaultStyles,
            color: ' #fff !important',
            textTransform: 'uppercase !important',
            fontSize: '16px !important',
            fontWeight: '500 !important',
            fontFamily: 'var(--playfair) !important',
            margin: '0 !important',
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            "svg": {
                fill: '#fff !important',
            }
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: '#fff !important',
            fontSize: '16px !important',
            fontWeight: '600 !important',
            fontFamily: 'var(--playfair) !important',
            margin: '0 !important',
        }),
        option: (base: any, { isFocused, isSelected }: any) => ({
            ...base,
            fontFamily: 'var(--mons) !important',
            fontSize: '15px !important',
            fontWeight: '400 !important',
            color: isFocused
                ? "#09021C !important"
                : isSelected
                    ? "#09021C !important"
                    : "#09021C",
            background: isFocused
                ? "#fff !important"
                : isSelected
                    ? "#fff !important"
                    : "white",
            cursor: "pointer !important",
        }),
    };



    return (

        <div className={style.filter_content}>

            <div className={style.filters}>

                <div className={style.box}>
                    <div onClick={() => setClicked(!clicked)}>
                        <div className={style.fliter_box} >
                            <span className={style.tag}>Price</span>
                            {
                                clicked ? <GoChevronUp /> : <GoChevronDown />
                            }

                        </div>
                    </div>

                    {
                        clicked ?

                            <div className={style.slider} ref={ref}>
                                <MultiRangeSlider
                                    min={0}
                                    max={100}
                                    canMinMaxValueSame={true}
                                    onInput={(e: ChangeResult) => {
                                        setMinValue(e.minValue);
                                        setMaxValue(e.maxValue);
                                    }}
                                    onChange={(e: ChangeResult) => {
                                        setMinValue2(e.minValue);
                                        setMaxValue2(e.maxValue);
                                    }}
                                    label={false}
                                    ruler={false}
                                    style={{ border: "none", boxShadow: "none", padding: " 48px 20px" }}
                                    barLeftColor="rgba(198, 204, 221, 1)"
                                    barInnerColor="#1A1A1A"
                                    barRightColor="rgba(198, 204, 221, 1)"
                                    thumbLeftColor="#1A1A1A"
                                    thumbRightColor="#1A1A1A"
                                />
                            </div>
                            : ""
                    }
                </div>

                <div className={style.box}>
                    <div onClick={() => setCategory(!category)}>
                        <div className={style.fliter_box} >
                            <span className={style.tag}>Collection</span>
                            {
                                category ? <GoChevronUp /> : <GoChevronDown />
                            }

                        </div>
                    </div>

                    {
                        category ?

                            <ul className={style.list} ref={refs}>
                                <li className={style.item}>
                                    <input type='checkbox' className={`${style.control} form-check-input`} />
                                    <span className={style.name}>Spa hotel</span>
                                </li>
                                <li className={style.item}>
                                    <input type='checkbox' className={`${style.control} form-check-input`} />
                                    <span className={style.name}>hotel with pools </span>
                                </li>
                                <li className={style.item}>
                                    <input type='checkbox' className={`${style.control} form-check-input`} />
                                    <span className={style.name}>press pause </span>
                                </li>
                                <li className={style.item}>
                                    <input type='checkbox' className={`${style.control} form-check-input`} />
                                    <span className={style.name}>splash out </span>
                                </li>
                            </ul>
                            : ''
                    }
                </div>

                <div className={style.box}>
                    <div onClick={() => setLocation(!location)}>
                        <div className={style.fliter_box} >
                            <span className={style.tag}>Location</span>
                            {
                                location ? <GoChevronUp /> : <GoChevronDown />
                            }

                        </div>
                    </div>

                    {
                        location ?

                            <ul className={style.list} ref={wrapperRef}>
                                <li className={style.item}>
                                    <input type='checkbox' className={`${style.control} form-check-input`} />
                                    <span className={style.name}>Mussoorie</span>
                                </li>
                                <li className={style.item}>
                                    <input type='checkbox' className={`${style.control} form-check-input`} />
                                    <span className={style.name}>Dehradun </span>
                                </li>
                                <li className={style.item}>
                                    <input type='checkbox' className={`${style.control} form-check-input`} />
                                    <span className={style.name}>Rishikesh</span>
                                </li>
                            </ul>
                            : ''
                    }
                </div>

                <div className={style.box}>
                    <div onClick={() => setProperty(!property)}>
                        <div className={style.fliter_box} >
                            <span className={style.tag}>Propety Type</span>
                            {
                                property ? <GoChevronUp /> : <GoChevronDown />
                            }

                        </div>
                    </div>

                    {
                        property ?

                            <ul className={style.list} ref={wrappers}>
                                <li className={style.item}>
                                    <input type='checkbox' className={`${style.control} form-check-input`} />
                                    <span className={style.name}>Hotels</span>
                                </li>
                                <li className={style.item}>
                                    <input type='checkbox' className={`${style.control} form-check-input`} />
                                    <span className={style.name}>Apartments </span>
                                </li>
                            </ul>
                            : ''
                    }
                </div>
            </div>

            <Select
                placeholder='Sort By'
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                value={selected}
                onChange={setSelected}
                options={options}
                styles={styling}

            />
        </div>
    )
}
