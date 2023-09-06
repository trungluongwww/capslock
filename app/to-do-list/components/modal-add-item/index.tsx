'use client'

import styles from './style.module.css'
import {useEffect, useState} from "react";
import {IToDoListItem} from "@/app/to-do-list/interfaces";
import Service from "@/app/to-do-list/service";

interface IPropsModalAddItem {
    isActive: boolean
}

export default function ModalAddItem(props: IPropsModalAddItem) {
    const [payload, setPayload] = useState<IToDoListItem>({} as IToDoListItem)
    const [errMsg, setErrMsg] = useState("")
    const [hidden, setHidden] = useState(true)
    const [isFirstLoad,setIsFirstLoad] = useState(true)
    const onSubmitForm = (e: any) => {
        e.preventDefault();
        if (!payload.title || !payload.description || !payload.deadline) {
            setErrMsg("Chưa nhập đầy đủ thông tin")
            return false;
        }
        const rs = {
            ...payload,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        } as IToDoListItem

        Service.addItem(rs);

        setHidden(true);

        return false;
    }

    const onChangeInput = (e: any) => {
        switch (e.target.name) {
            case 'title':
                setPayload(pre => {
                    return {...pre, title: e.target.value}
                });
                break;
            case 'description':
                setPayload(pre => {
                    return {...pre, description: e.target.value}
                });
                break;
            case 'deadline':
                setPayload(pre => {
                    return {...pre, deadline: e.target.value}
                });
                break;
        }
    }

    useEffect(() => {
        if(!isFirstLoad){
            setHidden(false);
        }else{
            setIsFirstLoad(false);
        }
    }, [props.isActive])

    return (
        <div hidden={hidden} className={styles.modalAddItemTodo}>
            <form onSubmit={onSubmitForm} className={styles.modalAddItemTodoForm}>
                <div>
                    <h3 className={styles.modalAddItemTodoTitle}>Tạo mới</h3>
                </div>
                <div className={styles.modalAddItemTodoContainerInput}>
                    <p className={styles.modalAddItemTodoTitleInput}>Tên công việc</p>
                    <input onChange={onChangeInput} name={'title'} id={'title'} className={styles.modalAddItemTodoInput}
                           type={"text"}
                           placeholder={'title'}/>
                    <p className={styles.modalAddItemTodoTitleInput}>Mô tả chi tiết </p>
                    <input onChange={onChangeInput} name={'description'} id={'description'}
                           className={styles.modalAddItemTodoInput}
                           type={"text"}
                           placeholder={'description'}/>
                    <p className={styles.modalAddItemTodoTitleInput}>Thời gian kết thúc</p>
                    <input onChange={onChangeInput} name={'deadline'} id={'deadline'}
                           className={styles.modalAddItemTodoInput} type={"date"}
                           placeholder={'deadline'} defaultValue={(new Date()).toDateString()}/>
                </div>
                <div>
                    <p className={styles.modalAddItemTodoWarning}>{errMsg}</p>
                </div>
                <div>
                    <button className={styles.modalAddItemTodoSubmitButton} type={"submit"}>Thêm</button>
                </div>
            </form>
        </div>
    )
}