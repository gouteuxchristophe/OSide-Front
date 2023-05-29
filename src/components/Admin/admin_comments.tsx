import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { deleteMessageAdd, deleteRoleErrorMessage, getAllRole } from "../../store/reducers/role";
import { Edit3, PlusSquare, Trash2 } from "react-feather";
import DeleteConfirmation from "./deleteConfirmation";
import { Navigate, useNavigate } from "react-router-dom";

function Admin_Comments(){
return(
    <div>
        <h1>Admin_Comments</h1>
    </div>
)

}

export default Admin_Comments;