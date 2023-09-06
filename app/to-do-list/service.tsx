import {IToDoListData, IToDoListItem} from "@/app/to-do-list/interfaces";

const keyData = "todolist";

export default class Service {
    static getLocalItems = (): IToDoListData => {
        const strData = localStorage.getItem(keyData)
        if (!strData) {
            return {
                items: []
            }
        }

        const data = JSON.parse(strData) as IToDoListData
        if (!data.items?.length) {
            return {
                items: []
            }
        }

        return data
    };
    static addItem = (data: IToDoListItem) => {
        const olds = this.getLocalItems()
        olds.items.push(data)
        localStorage.setItem(keyData, JSON.stringify(olds))
    }
}