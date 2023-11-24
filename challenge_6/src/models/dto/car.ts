interface CarRequest {
    name?: string,
    rent?: number,
    size?: string,
    image_url?: string,
    added_by?: string,
    created_by?: string,
    updated_by?: string,
    deleted_by?: string,
    is_deleted?: boolean,
    updated_at?: string,
    deleted_at?: string
}
interface saveUpdate {
    payload: CarRequest,
    imageUrl?: string,
    carId: number,
    getRole?: string,
}

export {CarRequest, saveUpdate}