export interface IToDoListData {
    items: Array<IToDoListItem>
}

export interface IToDoListItem {
    id: string
    title: string
    description: string
    deadline: Date
    createdAt: Date
    updatedAt: Date
}