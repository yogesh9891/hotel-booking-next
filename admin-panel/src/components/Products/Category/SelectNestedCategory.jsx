import React, { useState, useEffect } from 'react';
import { toastError } from '../../Utility/ToastUtils';
import { getCategory } from '../../../services/category.service';
import Select from 'react-select'

export default function SelectNestedCategory({ onChange, onChangeParentCategoryArr, parentCategoryIdArr = [], categoryId = '' }) {
    const [innerCategoryId, setInnerCategoryId] = useState('')
    const [innerParentCategoryIdArr, setInnerParentCategoryIdArr] = useState([])
    const [categoryArr, setCategoryArr] = useState([])
    const [selectOptions, setSelectOptions] = useState([[]])

    useEffect(() => {
        setDataOnInit()
    }, [])




    const setDataOnInit = async () => {
        try {
            if (parentCategoryIdArr.length == 0) {
                const arr = await getCategoryData()
                setSelectOptions([[...arr]])
                console.log({ arr })
            }
            else { // loop and get for update
            }

        } catch (error) {
            console.error(error)
        }
    }

    const onChangeSelect = async (index, value) => {
        try {
            if (onChange)
                onChange(value)
            if (onChangeParentCategoryArr) {
                let arr = selectOptions[index]
                let obj = arr.find(el => el?._id == value)
                if (obj?.parentCategoryArr?.length >= 0) {
                    onChangeParentCategoryArr(obj?.parentCategoryArr)
                }
            }
            setInnerCategoryId(value);
            const arr = await getCategoryData(index + 2, value)
            console.log({ arr })
            // setSelectOptions(prev => [...prev.filter((el, i) => i <= index), arr])

            // to reset the value of react select
            setSelectOptions(prev => [...prev.filter((el, i) => i <= index)])
            setTimeout(() => {
                setSelectOptions(prev => [...prev, arr])
            }, 100)

        } catch (error) {
            console.error(error)
        }
    }



    const getCategoryData = async (level = 1, parentId = undefined) => {
        try {
            let query = `level=${level}`;
            if (parentId) {
                query = query + `&parentCategoryId=${parentId}`
            }
            const res = await getCategory(query);
            // console.log(res?.data)
            if (res?.data?.data) {
                return (res?.data?.data)
            }
        } catch (error) {
            console.error(error);
            toastError(error)
        }
        return ([])
    }





    return (
        <div>
            <h6>
                Select Category:
            </h6>
            {selectOptions.map(((el, i) => (
                <div key={i}>
                    <Select defaultValue={''} options={el.map(ele => ({ label: ele?.name, value: ele?._id }))} onChange={(val) => onChangeSelect(i, val.value)} />
                </div>
            )))}


        </div>
    )

}
