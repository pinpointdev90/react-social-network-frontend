import {ChangeEvent, useState} from "react"

export type useFormType = {
    handleInputChange: ({target}: React.ChangeEvent<HTMLInputElement>) => void;
    value: {} | {value: string};
}

const useForm = (initialState: {}) => {
    const [inputValue, setInputValue] = useState(initialState)

    const handleInputChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue({
            ...inputValue,
            [target.name]: target.value
        })
    }

    return {
        handleInputChange: handleInputChange,
        value: inputValue
    }
}

export default useForm