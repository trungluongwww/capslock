'use client'
import {useEffect, useState} from "react";

import {IToDoListData} from "@/app/to-do-list/interfaces";
import ModalAddItem from "@/app/to-do-list/components/modal-add-item";
import Service from "@/app/to-do-list/service";

export default function ToDoList() {
    const [data, setData] = useState<IToDoListData>({
        items: []
    })
    const [activeModal, setActiveModal] = useState(false)

    useEffect(() => {
        setData(Service.getLocalItems())
    }, [])

    const handleActiveModal = () => {
        setActiveModal(pre => !pre)
    }

    return (
        <div>
            <div>
                <button onClick={handleActiveModal}>

                </button>
            </div>
            <div>
                {data.items.map((item) => {
                    return (
                        <div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <p>{item.deadline.toLocaleString()}</p>
                        </div>
                    )
                })}
            </div>
            <ModalAddItem isActive={activeModal}/>
        </div>
    )
}